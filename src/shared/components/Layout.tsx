import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  const location = useLocation();
  const shouldHideHeader = ['/auth/login', '/auth/register'].includes(location.pathname);

  return (
    <div className="min-h-screen grid grid-cols-12 grid-rows-[min-content_1fr_min-content]">
      {!shouldHideHeader && <Header />}

      {/* <main className="row-start-2 col-span-12 px-4  md:px-12 lg:px-16"> */}
      <main className="col-span-12">
        <Outlet />
      </main>

      {!shouldHideHeader && <Footer />}
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
