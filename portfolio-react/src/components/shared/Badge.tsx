/**
 * Badge Component
 * Skill tags, tech stack - icons from @heroicons/react
 */

import { ReactNode } from 'react';

type BadgeVariant = 'default' | 'primary' | 'success' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  className?: string;
}

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className = '',
}: BadgeProps) => {
  // Base styles
  const baseStyles = `
    inline-flex items-center gap-1.5
    rounded-full font-medium
    transition-colors duration-200
  `;

  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  // Icon size
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  // Variant styles
  const variantStyles = {
    default: `
      bg-surface text-text
      dark:bg-surface-dark dark:text-text-dark
    `,
    primary: `
      bg-primary/10 text-primary
      dark:bg-primary-dark/20 dark:text-primary-dark
    `,
    success: `
      bg-green-500/10 text-green-700
      dark:bg-green-500/20 dark:text-green-400
    `,
    outline: `
      bg-transparent border border-border text-text
      dark:border-border-dark dark:text-text-dark
    `,
  };

  return (
    <span
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {icon && <span className={iconSizes[size]}>{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
