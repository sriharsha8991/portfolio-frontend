/**
 * MagneticButton Component
 * Button with magnetic hover effect - 30px attraction radius
 * Smooth spring physics using transform
 */

import { useState, useRef, MouseEvent } from 'react';
import { Button } from '../shared/Button';

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  href?: string;
  className?: string;
  magnetRadius?: number;
}

export const MagneticButton = ({
  children,
  variant = 'primary',
  onClick,
  href,
  className = '',
  magnetRadius = 30,
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < magnetRadius + rect.width / 2) {
      const force = Math.max(0, 1 - distance / (magnetRadius + rect.width / 2));
      setPosition({
        x: deltaX * force * 0.3,
        y: deltaY * force * 0.3,
      });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const content = (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          <Button variant={variant} className={className}>
            {children}
          </Button>
        </a>
      ) : (
        <Button variant={variant} onClick={onClick} className={className}>
          {children}
        </Button>
      )}
    </div>
  );

  return content;
};

export default MagneticButton;
