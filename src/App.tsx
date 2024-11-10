import Home from './pages/home/Home';
import Layout from './shared/components/Layout';
import PageNotFound from './pages/notFound/NotFound';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Profile from './pages/profile/Profile';
import Venue from './pages/venue/Venue';

function ErrorPage() {
  return (
    <div>
      <h1 className="text-3xl text-neutral-grayish-blue text-center">An error has occurred.</h1>
      <Link className="hover:text-gray-200" to="/">
        Home
      </Link>
    </div>
  );
}

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
          path: '/profile',
          element: <Profile />,
        },
      ],
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ]);

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
