import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <div className="min-h-screen grid grid-cols-12 grid-rows-[min-content_1fr_min-content]">
      <Header />

      <main className="row-start-2 col-span-12 p-6 md:px-12 lg:px-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
