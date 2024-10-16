import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="row-start-1 col-span-12">
      <nav className="flex p-5 border border-x-0 border-b-secondary" aria-label="Main navigation">
        <MenuDesktop />
      </nav>
    </header>
  );
}

export default Header;

export function MenuDesktop() {
  const pageLinks = [
    { label: 'Home', to: '/' },
    { label: 'Profile', to: '/profile' },
  ];

  return (
    <div className="flex w-full items-center justify-between">
      <NavLink to="/" aria-label="Go to homepage">
        <img src="" alt="Website logo" />
      </NavLink>

      <div className="md:flex hidden space-x-4">
        {pageLinks.map(({ label, to }) => (
          <NavLink
            key={to}
            className={({ isActive }) =>
              `px-2 py-2 ${isActive ? 'underline font-semibold decoration-gray-800 decoration-4' : 'bg-transparent'}`
            }
            to={to}
            aria-label={`Go to ${label}`}
          >
            {label}
          </NavLink>
        ))}
      </div>

      <div>Avatar</div>
    </div>
  );
}
