import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  const location = useLocation();
  const isAuthPage = ['/auth/login', '/auth/register'].includes(location.pathname);

  return (
    <div className="min-h-screen grid grid-cols-12 grid-rows-[min-content_1fr_min-content]">
      {!isAuthPage && <Header />}

      <main className={`col-span-12 ${isAuthPage ? 'mt-0' : 'mt-40'}`}>
        <Outlet />
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default Layout;
