/**
 * Button Component
 * Primary, secondary, ghost variants - monochrome styled
 * Min 44x44px touch targets, cursor-pointer, disabled state
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled = false,
  ...props
}: ButtonProps) => {
  // Base styles (always applied)
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-medium transition-colors duration-200
    cursor-pointer disabled:cursor-not-allowed
    disabled:opacity-50 focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-offset-2
    focus-visible:ring-primary
  `;

  // Size styles (44x44px minimum for 'md')
  const sizeStyles = {
    sm: 'min-h-[36px] min-w-[36px] px-3 py-1.5 text-sm',
    md: 'min-h-[44px] min-w-[44px] px-6 py-2.5 text-base',
    lg: 'min-h-[52px] min-w-[52px] px-8 py-3 text-lg',
  };

  // Variant styles
  const variantStyles = {
    primary: `
      bg-primary text-background
      hover:bg-primary/90
      dark:bg-primary-dark dark:text-background-dark
      dark:hover:bg-primary-dark/90
    `,
    secondary: `
      bg-surface text-text border border-border
      hover:bg-surface-dark hover:border-border-dark
      dark:bg-surface-dark dark:text-text-dark
      dark:hover:bg-elevated-dark dark:border-border-dark
    `,
    ghost: `
      bg-transparent text-text
      hover:bg-surface hover:text-primary
      dark:text-text-dark dark:hover:bg-surface-dark
      dark:hover:text-primary-dark
    `,
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${widthStyles}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="w-5 h-5 flex-shrink-0">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="w-5 h-5 flex-shrink-0">{icon}</span>
      )}
    </button>
  );
};

export default Button;
