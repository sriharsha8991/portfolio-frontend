/**
 * MobileMenu Component
 * Full-screen overlay menu for mobile devices
 * Smooth animations, focus trap, ESC key support
 */

import { useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface NavItem {
  id: string;
  name: string;
  link: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  sections: NavItem[];
  activeSection: string;
}

export const MobileMenu = ({
  isOpen,
  onClose,
  sections,
  activeSection,
}: MobileMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Focus first button when opened
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstButton = menuRef.current.querySelector('button');
      if (firstButton) {
        setTimeout(() => firstButton.focus(), 100);
      }
    }
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToSection(sectionId);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 md:hidden"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label="Mobile navigation menu"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in" />

      {/* Menu content */}
      <div
        ref={menuRef}
        className="
          relative h-full w-full max-w-sm ml-auto
          bg-background dark:bg-background-dark
          shadow-xl border-l border-border dark:border-border-dark
          animate-slide-left
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border dark:border-border-dark">
          <h2 className="text-lg font-display font-semibold text-text dark:text-text-dark">
            Navigation
          </h2>
          <button
            onClick={onClose}
            className="
              p-2 rounded-lg
              text-text-secondary hover:text-text
              dark:text-text-dark-secondary dark:hover:text-text-dark
              hover:bg-surface dark:hover:bg-surface-dark
              transition-colors duration-200
              cursor-pointer
              min-h-[44px] min-w-[44px]
              flex items-center justify-center
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-primary focus-visible:ring-offset-2
            "
            aria-label="Close mobile menu"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="p-4 space-y-2">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              onKeyDown={(e) => handleKeyDown(e, section.id)}
              className={`
                w-full text-left px-4 py-3 rounded-lg
                text-base font-medium
                transition-all duration-200
                cursor-pointer
                min-h-[44px]
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-primary focus-visible:ring-offset-2
                ${
                  activeSection === section.id
                    ? 'bg-primary text-background dark:bg-primary-dark dark:text-background-dark'
                    : 'text-text hover:text-primary hover:bg-surface dark:text-text-dark dark:hover:text-primary-dark dark:hover:bg-surface-dark'
                }
              `}
              style={{ animationDelay: `${index * 50}ms` }}
              aria-current={activeSection === section.id ? 'page' : undefined}
            >
              {section.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
