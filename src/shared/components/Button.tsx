import { NavLink } from 'react-router-dom';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'default';
  disabled?: boolean;
  className?: string;
  to?: string;
}

const Button = ({ label, onClick, type, variant = 'primary', disabled = false, className = '', to }: ButtonProps) => {
  const baseClasses = 'py-2 px-4 rounded transition-colors duration-200 font-bold';

  const variantClasses: { [key in 'primary' | 'secondary' | 'default']: string } = {
    primary: 'bg-pink-gradient hover:bg-pink-gradient-dark text-typography-primary-white',
    secondary: 'border border-neutral-default text-typography-primary-grey bg-background-default hover:scale-105',
    default: 'bg-main-blue hover:bg-blue-primary-dark text-typography-primary-white text-center',
  };

  if (to) {
    return (
      <NavLink to={to} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        {label}
      </NavLink>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
