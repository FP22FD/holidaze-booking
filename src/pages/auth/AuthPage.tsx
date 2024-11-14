import { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '/src/assets/images/logo.svg';

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === '/auth/login';

  const [isLoginTab, setIsLoginTab] = useState(isLogin);

  useEffect(() => {
    if (isLogin) {
      setIsLoginTab(true);
    } else {
      setIsLoginTab(false);
    }
  }, [isLogin]);

  const handleTabClick = (isLoginTab: boolean) => {
    setIsLoginTab(isLoginTab);
    navigate(isLoginTab ? '/auth/login' : '/auth/register');
  };

  return (
    <div className="bg-auth-background bg-cover bg-center min-h-screen flex items-center justify-center p-6 sm:p-12 lg:pt-16">
      <Link to={'/'}>
        <img src={logo} alt="Logo" className="absolute top-8 w-auto sm:top-12 sm:left-12" />
      </Link>

      <div className="bg-neutral-white shadow-custom rounded-lg w-full max-w-md flex flex-col mt-8">
        <div className="flex">
          <button
            onClick={() => handleTabClick(true)}
            className={`w-1/2 py-2 text-center font-bold rounded-tl-lg ${isLoginTab ? ' border border-b-0 border-neutral-default text-primary-dark' : ' bg-neutral-lighter border border-neutral-default border-x-0 border-t-0 text-typography-primary-grey rounded-tl-lg'}`}
          >
            Login
          </button>
          <button
            onClick={() => handleTabClick(false)}
            className={`w-1/2 py-2 text-center font-bold rounded-tr-lg ${!isLoginTab ? 'border border-b-0 border-neutral-default text-primary-dark-blue' : 'text-typography-primary-grey border border-x-0 border-t-0 bg-neutral-lighter'}`}
          >
            Register
          </button>
        </div>
        <div className="p-2 justify-center items-center min-h-[545px] lg:min-h-[576px]">
          {isLoginTab ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}
