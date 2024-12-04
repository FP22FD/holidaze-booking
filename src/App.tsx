import Home from './pages/home/Home';
import Layout from './shared/components/Layout';
import PageNotFound from './pages/notFound/NotFound';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Profile from './pages/profile/Profile';
import Venue from './pages/venue/Venue';
import AuthPage from './pages/auth/AuthPage';
import Dashboard from './pages/adminPage/components/Dashboard';
import { PersistProvider } from './store/PersistContext';
import { ErrorPage } from './pages/errorPage/ErrorPage';

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/venues/:id',
          element: <Venue />,
        },
        {
          path: '/auth/login',
          element: <AuthPage />,
        },
        {
          path: '/auth/register',
          element: <AuthPage />,
        },
        {
          path: '/auth/register/admin',
          element: <AuthPage />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '/admin',
          element: <Dashboard />,
        },
      ],
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ]);

  return (
    <PersistProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </PersistProvider>
  );
}

export default App;
