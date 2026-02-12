/**
 * Card Component
 * With hover effects, glass morph option
 * bg-white/90 minimum light mode, cursor-pointer if interactive
 */

import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  interactive?: boolean;
  noPadding?: boolean;
}

export const Card = ({
  children,
  variant = 'default',
  interactive = false,
  noPadding = false,
  className = '',
  ...props
}: CardProps) => {
  // Base styles
  const baseStyles = `
    rounded-lg transition-all duration-200
    ${noPadding ? '' : 'p-6'}
  `;

  // Variant styles
  const variantStyles = {
    default: `
      bg-white border border-border
      dark:bg-surface-dark dark:border-border-dark
      ${interactive ? 'hover:shadow-md hover:border-border-dark' : ''}
      ${interactive ? 'dark:hover:bg-elevated-dark dark:hover:border-primary-dark/30' : ''}
    `,
    glass: `
      bg-white/90 backdrop-blur-md border border-white/20
      shadow-sm
      dark:bg-surface-dark/80 dark:border-white/10
      ${interactive ? 'hover:bg-white/95 hover:shadow-md' : ''}
      ${interactive ? 'dark:hover:bg-surface-dark/90' : ''}
    `,
    elevated: `
      bg-white shadow-lg border border-border/50
      dark:bg-elevated-dark dark:border-border-dark/50
      ${interactive ? 'hover:shadow-xl' : ''}
    `,
  };

  const interactiveStyles = interactive ? 'cursor-pointer' : '';

  return (
    <div
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${interactiveStyles}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
