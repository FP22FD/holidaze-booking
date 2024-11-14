import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { PiExportLight, PiHouseLineLight, PiLayoutLight, PiUserRectangleLight, PiXLight } from 'react-icons/pi';

interface DropdownMenuProps {
  isManager: boolean;
  isCustomer: boolean;
}

export function DropdownMenu({ isManager }: DropdownMenuProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pageLinks = [
    { label: 'Home', to: '/home', icon: <PiHouseLineLight className="w-5 h-5" /> },
    { label: 'Profile', to: '/profile', icon: <PiUserRectangleLight className="w-5 h-5" /> },
    ...(isManager ? [{ label: 'Dashboard', to: '/dashboard', icon: <PiLayoutLight className="w-5 h-5" /> }] : []),
    { label: 'Log out', to: '/auth/login', icon: <PiExportLight className="w-5 h-5 rotate-[-90deg]" /> },
  ];

  const userType = isManager ? 'Manager' : 'Customer';

  return (
    <div className="relative">
      <div
        className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1000&auto=format&fit=crop&q=60"
          alt="Profile Avatar"
          className="w-full h-full object-cover"
        />
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-6 w-48 bg-white border border-gray-200 rounded-lg shadow-custom">
          <div className="p-6 flex justify-end">
            <button
              aria-label="Close menu"
              onClick={() => setIsDropdownOpen(false)}
              className="focus:outline-none bg-pink-gradient rounded p-1"
            >
              <PiXLight className="w-6 h-6 text-white" aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-center px-6 space-x-2 mb-6">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1000&auto=format&fit=crop&q=60"
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col text-md">
              <span className="font-semibold text-primary-dark-blue">Carol_Carter</span>
              <span className="text-gray-600 text-body-medium">{userType}</span>
            </div>
          </div>

          <div className="flex flex-col px-2 space-y-4 mb-6">
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
        </div>
      )}
    </div>
  );
}
