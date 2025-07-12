'use client';

import {
  Link as RouterLink,
  useFetcher,
  type LinkProps,
} from 'react-router-dom';
import {
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
  type ReactElement,
} from 'react';
import { routeImportMap } from '../utils/enhance-router';
import { stringTransform } from '@regist/regist';

type PrefetchStrategy = 'none' | 'hover+idle' | 'in-view' | 'auto';

interface SmartLinkProps extends Omit<LinkProps, 'prefetch'> {
  children: ReactNode;
  className?: string;
  prefetch?: PrefetchStrategy;
}

/**
 * A smart Link that supports various prefetching strategies using React Router + routeImportMap.
 */
export function SmartLink({
  children,
  className,
  to,
  prefetch = 'auto',
  ...rest
}: SmartLinkProps): ReactElement {
  const fetcher = useFetcher();
  const ref = useRef<HTMLAnchorElement>(null);
  const didPrefetch = useRef(false);

  const getPath = () => (typeof to === 'string' ? to : to?.pathname ?? '');

  const prefetchRoute = useCallback(async () => {
    if (didPrefetch.current) return;
    didPrefetch.current = true;

    const path = getPath();
    const cleanPath = stringTransform(path).try();
    const importer = cleanPath ? routeImportMap.get(cleanPath) : undefined;

    if (importer) await importer();

    // Preload current route to make sure back nav works
    const currentPath = window.location.pathname
      .replace(/^\//, '')
      .split('?')[0];
    const currentImporter = routeImportMap.get(currentPath);
    if (currentImporter) await currentImporter();

    if (fetcher.state === 'idle') {
      fetcher.load(path);
    }
  }, [fetcher, to]);

  // Prefetch on hover or focus
  const setupHover = () => {
    if (!ref.current) return;
    console.log('setupHover', prefetch);
    const node = ref.current;
    const handler = () => {
      prefetchRoute();
      node.removeEventListener('mouseenter', handler);
      node.removeEventListener('focus', handler);
    };
    node.addEventListener('mouseenter', handler, { once: true });
    node.addEventListener('focus', handler, { once: true });
  };

  // Prefetch when in view (with delay for auto)
  const setupInView = () => {
    if (!ref.current || prefetch === 'none') return;

    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (prefetch === 'in-view') {
            prefetchRoute();
            observer.disconnect();
          } else if (prefetch === 'auto') {
            // Delay before prefetch to avoid fast scroll
            const timeout = setTimeout(() => {
              if (entry.isIntersecting) {
                prefetchRoute();
                observer.disconnect();
              }
            }, 300);
            return () => clearTimeout(timeout);
          }
        }
      },
      { rootMargin: '100px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  };

  // Fallback prefetch if idle and still not prefetched
  useEffect(() => {
    if (prefetch === 'hover+idle') {
      setupHover();
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => prefetchRoute());
      } else {
        setTimeout(() => prefetchRoute(), 1000);
      }
    } else if (prefetch === 'in-view') {
      setupInView();
    } else {
      setupHover();
      setupInView();
    }
  }, [prefetch, prefetchRoute]);

  return (
    <RouterLink to={to} ref={ref} className={className} {...rest}>
      {children}
    </RouterLink>
  );
}
