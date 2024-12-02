import { createBrowserRouter, RouteObject } from 'react-router';
import { RootLayout } from './components/rootLayout';
import ErrorPage from './pages/errorPage';

// separate routesConfig for bettter testing
export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
  },
];
export const router = createBrowserRouter(routesConfig);
