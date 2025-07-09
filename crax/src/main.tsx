import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from 'virtual:generated-pages-react';
import { convertToDataRoutes } from '@crax/utils/enhance-router';
import './index.css';

const dataRoutes = convertToDataRoutes(routes);
const router = createBrowserRouter(dataRoutes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
