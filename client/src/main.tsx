import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { redirect, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouteObject } from 'react-router';
import { RootLayout } from './components/RootLayout';
import ErrorPage from './pages/ErrorPage';

import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toaster } from 'sonner';
import { FilesInFolder } from './components/files/FilesInFolder';
import { ThemeProvider } from './context/themeContext';
import { AuthLayout } from './components/AuthLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 10 * 60,
    },
  },
});
// separate routesConfig for testing
export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Home />,
        children: [
          { index: true, element: <div>Click some folder</div> },
          {
            path: '/:folderId',
            element: <FilesInFolder />,
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, loader: () => redirect('/auth/login') },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
    ],
  },
  {},
];
const router = createBrowserRouter(routesConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster richColors />
        <ReactQueryDevtools />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
