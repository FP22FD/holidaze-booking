import { NavLink } from 'react-router-dom';
import Button from './Button';
import logo from '../../assets/images/logo.svg';
import {
  PiExportLight,
  PiHouseLineLight,
  PiLayoutLight,
  PiTextAlignJustifyLight,
  PiUserRectangleLight,
  PiXLight,
} from 'react-icons/pi';

interface MenuMobileProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export function MenuMobile({ isMobileMenuOpen, toggleMobileMenu }: MenuMobileProps) {
  const isCustomer = false;
  const isManager = false;

  const handleLogout = () => {};

  const pageLinks = [
    { label: 'Home', to: '/home', icon: <PiHouseLineLight className="w-5 h-5" /> },
    { label: 'Profile', to: '/profile', icon: <PiUserRectangleLight className="w-5 h-5" /> },
    ...(isManager ? [{ label: 'Dashboard', to: '/dashboard', icon: <PiLayoutLight className="w-5 h-5" /> }] : []),
    ...(isCustomer || isManager
      ? [
          {
            label: 'Log out',
            to: '/auth/login',
            icon: <PiExportLight className="w-5 h-5 rotate-[-90deg]" />,
            onClick: handleLogout,
          },
        ]
      : []),
  ];

  const userType = isManager ? 'Manager' : 'Customer';

  return (
    <>
      <div className="md:hidden flex items-center justify-between w-full p-4">
        <NavLink to="/" aria-label="Go to homepage">
          <img src={logo} alt="Website logo" className="h-7 w-auto" />
        </NavLink>

        <button
          onClick={toggleMobileMenu}
          className="relative"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {!isMobileMenuOpen ? (
            <PiTextAlignJustifyLight className="w-8 h-8" aria-hidden="true" />
          ) : (
            <PiXLight className="w-8 h-8" aria-hidden="true" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-custom z-20 transition-transform duration-300 transform flex flex-col ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          role="menu"
          aria-label="Mobile navigation"
        >
          <div className="p-6 flex justify-end">
            <button
              onClick={toggleMobileMenu}
              aria-label="Close menu"
              className="focus:outline-none bg-pink-gradient rounded p-1"
            >
              <PiXLight className="w-6 h-6 text-typography-primary-white" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col space-y-4">
              {/* Show avatar and dropdown for customer or manager*/}
              {(isCustomer || isManager) && (
                <>
                  <div className="flex items-center px-6 space-x-2 mb-6">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBvcnRyYWl0fGVufDB8fDB8fHwy"
                        alt="Profile Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col text-md">
                      <span className="font-semibold text-primary-dark-blue">Carol_Carter</span>
                      <span className="text-gray-600 text-body-medium">{userType}</span>
                    </div>
                  </div>

                  <div className="flex flex-col px-6 space-y-4 mb-6">
                    <div className="border-t border-neutral-default mb-4"></div>

                    {pageLinks.map(({ label, to, icon }) => (
                      <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                          `flex items-center space-x-2 p-3 py-2 rounded-lg pl-5 overflow-hidden relative ${
                            isActive ? 'bg-red-50 text-status-error-red' : 'bg-transparent'
                          }`
                        }
                        aria-label={`Go to ${label}`}
                      >
                        {({ isActive }) => (
                          <>
                            <div
                              className={`absolute w-1.5 top-0 bottom-0 left-0 ${isActive ? 'bg-pink-gradient' : 'bg-transparent'}`}
                            ></div>
                            <div className="flex space-x-4">
                              {icon}
                              <span>{label}</span>
                            </div>
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Link to list property if the user is not a manager and is customer*/}
            <div className="flex flex-col items-center space-y-4 px-6 mb-20">
              {!isManager && (
                <NavLink to="/list-property" className="text-primary-dark-blue hover:text-accent-pink font-bold">
                  List Your Property
                </NavLink>
              )}

              {!(isCustomer || isManager) && (
                <div className="flex space-x-4">
                  <Button type="button" label="Login" to="/auth/login" variant="secondary" />
                  <Button type="button" label="Register" to="/auth/register" variant="primary" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
