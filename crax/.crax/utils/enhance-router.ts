export const routeImportMap = new Map<string, () => Promise<any>>();

/**
 * Recursively converts vite-plugin-pages routes to Data Router compatible ones
 * - Wraps route.component in a lazy loader
 * - Automatically attaches `loader`, `action`, `ErrorBoundary` if exported
 */
export function convertToDataRoutes(routes: any[]): any[] {
  return routes.map((route) => {
    const newRoute: any = { ...route };

    if (route.element?.type?._payload?._result) {
      const importFn = route.element.type._payload._result;

      // Register this route's importer by its path (can also include parent if needed)
      if (route.path) {
        routeImportMap.set(route.path, importFn);
      }

      newRoute.lazy = async () => {
        const mod = await importFn();

        const result: Record<string, any> = {};

        if (mod.default) result.Component = mod.default;
        if (mod.loader) result.loader = mod.loader;
        if (mod.action) result.action = mod.action;
        if (mod.ErrorBoundary) result.ErrorBoundary = mod.ErrorBoundary;

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
