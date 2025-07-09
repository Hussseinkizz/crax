'use client';
import { useMemo } from 'react';
import { type ForesightRegisterOptions } from 'js.foresight';
import { Link as ActualLink, useFetcher, type LinkProps } from 'react-router';
import useForesight from '../hooks/useForesight';
import { routeImportMap } from '../utils/enhance-router';
import { stringTransform } from '@regist/regist';

interface CraxLinkProps
  extends Omit<LinkProps, 'prefetch'>,
    Omit<ForesightRegisterOptions, 'element' | 'callback'> {
  children: React.ReactNode;
  className?: string;
}

/**
 * A crax Link component that integrates with Foresight for intelligent prefetching and loading.
 *
 * @param {CraxLinkProps} props - The properties for the Link component
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the link
 * @param {string} [props.className] - Optional CSS class name for styling the link
 * @param {number} [props.hitSlop=0] - The prefetch triggering area expansion for the link
 * @param {boolean} [props.unregisterOnCallback=true] - Whether to unregister the Foresight tracking after callback
 * @param {string} [props.name=''] - Optional name for tracking purposes
 * @returns {React.ReactElement} A React Router Link with enhanced prefetching behavior
 */

export function Link({
  children,
  className,
  hitSlop = 0,
  unregisterOnCallback = true,
  name = '',
  to,
  ...props
}: CraxLinkProps): React.ReactElement {
  const fetcher = useFetcher();

  const foresightOptions = useMemo(
    () => ({
      callback: async () => {
        const toPath = typeof to === 'string' ? to : to.pathname || '';
        // Preload route module if possible
        const route = stringTransform(toPath).replace('/', '').try();
        const importer = route ? routeImportMap.get(route) : undefined;
        // console.log(
        //   `Preloading route module for ${toPath}`,
        //   route,
        //   routeImportMap
        // );
        if (importer) {
          await importer(); // ensure React Router can match route
        }

        if (fetcher.state === 'idle' && !fetcher.data) {
          fetcher.load(to.toString());
        }
      },
      hitSlop,
      name,
      unregisterOnCallback,
    }),
    [fetcher.state, fetcher.data, to, hitSlop, name, unregisterOnCallback]
  );

  const { elementRef, registerResults } =
    useForesight<HTMLAnchorElement>(foresightOptions);

  return (
    <ActualLink
      to={to}
      {...props}
      prefetch={registerResults?.isTouchDevice ? 'render' : 'none'}
      ref={elementRef}
      className={className}>
      {children}
    </ActualLink>
  );
}
