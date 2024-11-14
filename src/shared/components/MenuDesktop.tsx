import { NavLink } from 'react-router-dom';
import Button from './Button';
import logo from '../../assets/images/logo.svg';
import { DropdownMenu } from './DropdownMenu';

export function MenuDesktop() {
  const isCustomer = true;
  const isManager = false;

  const handleLogout = () => {};

  return (
    <div className="flex w-full items-center justify-between">
      <NavLink to="/" aria-label="Go to homepage">
        <img src={logo} alt="Website logo" className="h-7 w-auto" />
      </NavLink>

      <div className="hidden md:flex items-center space-x-4">
        {/* If not manager, show 'List Your Property' */}
        {!isManager && (
          <NavLink to="/list-property" className="text-primary-dark-blue hover:text-accent-pink font-bold">
            List Your Property
          </NavLink>
        )}

        {/* Show authentication buttons */}
        <div className="flex space-x-4">
          {isCustomer || isManager ? (
            <>
              {
                <div className="flex space-x-4">
                  {<Button type="button" label="Log out" to="/auth/login" onClick={handleLogout} variant="secondary" />}
                </div>
              }
            </>
          ) : (
            <>
              {
                <div className="flex space-x-4">
                  <Button type="button" label="Login" to="/login" variant="secondary" />
                  <Button type="button" label="Register" to="/login" variant="primary" />
                </div>
              }
            </>
          )}
        </div>

        {/* Show avatar and dropdown if customer or manager */}
        {(isCustomer || isManager) && (
          <div className="flex items-center space-x-4">
            <div className="border-l border-neutral-dark h-6"></div>

            <DropdownMenu isCustomer={isCustomer} isManager={isManager} />
          </div>
        )}
      </div>
    </div>
  );
}
