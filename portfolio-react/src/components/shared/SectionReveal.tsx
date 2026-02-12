/**
 * SectionReveal Component
 * IntersectionObserver wrapper - check prefers-reduced-motion
 * Fallback to instant reveal
 */

import { ReactNode, useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface SectionRevealProps {
  children: ReactNode;
  threshold?: number;
  delay?: number;
  className?: string;
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right';
}

export const SectionReveal = ({
  children,
  threshold = 0.1,
  delay = 0,
  className = '',
  animation = 'fade',
}: SectionRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(elementRef, {
    threshold,
    freezeOnceVisible: true,
  });

  // Animation styles
  const animationStyles = {
    fade: {
      initial: 'opacity-0',
      visible: 'opacity-100',
    },
    'slide-up': {
      initial: 'opacity-0 translate-y-8',
      visible: 'opacity-100 translate-y-0',
    },
    'slide-left': {
      initial: 'opacity-0 translate-x-8',
      visible: 'opacity-100 translate-x-0',
    },
    'slide-right': {
      initial: 'opacity-0 -translate-x-8',
      visible: 'opacity-100 translate-x-0',
    },
  };

  const { initial, visible } = animationStyles[animation];

  return (
    <div
      ref={elementRef}
      className={`
        transition-all duration-700 ease-out
        ${isVisible ? visible : initial}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
};

export default SectionReveal;
