import { RouteObject } from "react-router-dom";

export const routeImportMap = new Map<string, () => Promise<Record<string, unknown>>>();

/**
 * Recursively converts vite-plugin-pages routes to Data Router compatible ones
 * - Wraps route.component in a lazy loader
 * - Automatically attaches `loader`, `action`, `ErrorBoundary` if exported
 */
export function convertToDataRoutes(routes: RouteObject[]): RouteObject[] {
  return routes.map((route) => {
    const newRoute: RouteObject = { ...route };

    if (route.element?.type?._payload?._result) {
      const importFn = route.element.type._payload._result as () => Promise<Record<string, unknown>>;

      // Register this route's importer by its path (can also include parent if needed)
      if (route.path) {
        routeImportMap.set(route.path, importFn);
      }

      newRoute.lazy = async () => {
        const mod = await importFn();

        const result: Record<string, unknown> = {};

        if (mod.default) result.Component = mod.default as React.ComponentType;
        if (mod.loader) result.loader = mod.loader;
        if (mod.action) result.action = mod.action;
        if (mod.ErrorBoundary) result.ErrorBoundary = mod.ErrorBoundary as React.ComponentType;

        return result;
      };

      delete newRoute.element;
    }

    if (route.children) {
      newRoute.children = convertToDataRoutes(route.children);
    }

    return newRoute;
  });
}
