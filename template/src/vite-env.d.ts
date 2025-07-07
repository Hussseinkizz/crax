/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client-react" />

declare module 'virtual:generated-pages-react' {
  import { RouteObject } from 'react-router-dom';
  const routes: RouteObject[];
  export default routes;
}
