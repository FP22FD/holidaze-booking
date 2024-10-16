import Home from './pages/home/Home';
import Layout from './shared/components/Layout';
import PageNotFound from './pages/notFound/NotFound';
import Venues from './pages/home/components/Venues';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import VenueDetails from './pages/venueDetails/venueDetails';
import Profile from './pages/profile/Profile';

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
          path: '/venues',
          element: <Venues />,
        },
        {
          path: '/venues/:id',
          element: <VenueDetails />,
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
