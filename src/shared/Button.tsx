import { NavLink } from 'react-router-dom';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
  to?: string;
}

const Button = ({ label, onClick, variant = 'primary', disabled = false, className = '', to }: ButtonProps) => {
  const baseClasses = 'py-2 px-4 rounded transition-colors duration-200 font-bold';

  const variantClasses: { [key in 'primary' | 'secondary']: string } = {
    primary: 'bg-pink-gradient hover:bg-pink-gradient-dark text-typography-primary-white',
    secondary: 'border border-neutral-default text-typography-primary-grey bg-background-default hover:scale-105',
  };

  if (to) {
    return (
      <NavLink to={to} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        {label}
      </NavLink>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${className}`} disabled={disabled}>
      {label}w
    </button>
  );
};

export default Button;
