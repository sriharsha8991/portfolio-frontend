/**
 * Navbar Component
 * Floating navbar (top-4 left-4 right-4), backdrop blur
 * Active section highlighting 4.5:1 contrast, theme toggle
 * Smooth scroll with offset, keyboard nav, z-40
 */

import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { SunIcon, MoonIcon, Bars3Icon } from '@heroicons/react/24/outline';

interface NavItem {
  id: string;
  name: string;
  link: string;
}

interface NavbarProps {
  sections: NavItem[];
  onMobileMenuToggle: () => void;
}

export const Navbar = ({ sections, onMobileMenuToggle }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Find active section
      const sectionElements = sections.map((section) =>
        document.getElementById(section.id)
      );

      const currentSection = sectionElements.find((element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToSection(sectionId);
    }
  };

  return (
    <nav
      className={`
        fixed top-4 left-4 right-4 z-40
        transition-all duration-400
        ${isScrolled ? 'shadow-lg' : 'shadow-md'}
      `}
      aria-label="Main navigation"
    >
      <div
        className={`
          mx-auto max-w-7xl
          rounded-lg backdrop-blur-md
          border transition-colors duration-200
          ${
            isScrolled
              ? 'bg-surface/90 dark:bg-surface-dark/90 border-border/50 dark:border-border-dark/50'
              : 'bg-surface/80 dark:bg-surface-dark/80 border-border/30 dark:border-border-dark/30'
          }
        `}
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo / Title */}
          <button
            onClick={() => scrollToSection('home')}
            onKeyDown={(e) => handleKeyDown(e, 'home')}
            className="
              text-xl font-display font-bold
              text-primary dark:text-primary-dark
              hover:text-primary/90 dark:hover:text-primary-dark/90
              transition-colors duration-200
              cursor-pointer
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-primary focus-visible:ring-offset-2
              rounded-lg px-2 py-1
              min-h-[44px] flex items-center
            "
            aria-label="Go to home section"
          >
            SV
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                onKeyDown={(e) => handleKeyDown(e, section.id)}
                className={`
                  px-4 py-2 rounded-lg
                  text-sm font-medium
                  transition-all duration-200
                  cursor-pointer
                  min-h-[44px] min-w-[44px]
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-primary focus-visible:ring-offset-2
                  ${
                    activeSection === section.id
                      ? 'bg-primary text-background dark:bg-primary-dark dark:text-background-dark'
                      : 'text-text hover:text-primary hover:bg-surface-dark dark:text-text-dark dark:hover:text-primary-dark dark:hover:bg-elevated-dark'
                  }
                `}
                aria-current={activeSection === section.id ? 'page' : undefined}
              >
                {section.name}
              </button>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="
                p-2 rounded-lg
                text-text-secondary hover:text-text
                dark:text-text-dark-secondary dark:hover:text-text-dark
                hover:bg-surface-dark dark:hover:bg-elevated-dark
                transition-colors duration-200
                cursor-pointer
                min-h-[44px] min-w-[44px]
                flex items-center justify-center
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-primary focus-visible:ring-offset-2
              "
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <MoonIcon className="w-5 h-5" />
              ) : (
                <SunIcon className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={onMobileMenuToggle}
              className="
                md:hidden p-2 rounded-lg
                text-text-secondary hover:text-text
                dark:text-text-dark-secondary dark:hover:text-text-dark
                hover:bg-surface-dark dark:hover:bg-elevated-dark
                transition-colors duration-200
                cursor-pointer
                min-h-[44px] min-w-[44px]
                flex items-center justify-center
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-primary focus-visible:ring-offset-2
              "
              aria-label="Toggle mobile menu"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
