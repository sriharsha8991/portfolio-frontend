/**
 * ProfileImage Component
 * Parallax effect with ±15px vertical movement
 * Smooth border, shadow, and responsive sizing
 */

import { useState, useEffect } from 'react';

interface ProfileImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ProfileImage = ({ src, alt, className = '' }: ProfileImageProps) => {
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxOffset = 15;
      const offset = Math.min((scrollY / 500) * maxOffset, maxOffset);
      setParallaxOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`relative ${className}`}
      style={{
        transform: `translateY(${parallaxOffset}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Glow effect */}
      <div
        className="
          absolute inset-0 rounded-full
          bg-primary/20 dark:bg-primary-dark/20
          blur-2xl scale-105
        "
        aria-hidden="true"
      />

      {/* Image container */}
      <div
        className="
          relative rounded-full overflow-hidden
          border-4 border-white dark:border-surface-dark
          shadow-xl
        "
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
    </div>
  );
};

export default ProfileImage;
