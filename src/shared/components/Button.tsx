import { NavLink } from 'react-router-dom';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'default';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean; // New prop for full width
  disabled?: boolean;
  className?: string;
  to?: string;
}

const Button = ({
  label,
  onClick,
  type,
  variant = 'primary',
  size = 'medium',
  fullWidth = false, // Default is not full width
  disabled = false,
  className = '',
  to,
}: ButtonProps) => {
  const baseClasses = 'rounded transition-colors duration-200 font-bold';

  const variantClasses: { [key in 'primary' | 'secondary' | 'default']: string } = {
    primary: 'bg-pink-gradient hover:bg-pink-gradient-dark text-typography-primary-white',
    secondary: 'border border-neutral-default text-typography-primary-grey bg-background-default hover:scale-105',
    default: 'bg-main-blue hover:bg-blue-primary-dark text-typography-primary-white text-center',
  };

  const sizeClasses: { [key in 'small' | 'medium' | 'large']: string } = {
    small: 'py-1 px-2 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-lg',
  };

  const fullWidthClass = fullWidth ? 'w-full' : '';

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidthClass} ${className}`;

  if (to) {
    return (
      <NavLink to={to} className={combinedClasses}>
        {label}
      </NavLink>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
