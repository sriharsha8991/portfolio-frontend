/**
 * HeroSection Component
 * Asymmetric layout with 40px overlap
 * Particle background, typewriter effect, profile image, magnetic buttons
 */

import { ArrowDownIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import ParticleSystem from './ParticleSystem';
import TypewriterEffect from './TypewriterEffect';
import ProfileImage from './ProfileImage';
import MagneticButton from './MagneticButton';
import SectionReveal from '../shared/SectionReveal';

export const HeroSection = () => {
  const titles = ['GenAI Engineer', 'Freelancer', 'YouTuber', 'Developer'];

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

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Particle background */}
      <ParticleSystem />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background dark:via-background-dark/50 dark:to-background-dark pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column - Text content */}
          <SectionReveal animation="slide-right" className="text-center lg:text-left">
            <div className="space-y-6">
              {/* Greeting */}
              <p className="text-lg text-text-secondary dark:text-text-dark-secondary font-medium">
                Hi, I'm
              </p>

              {/* Name */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-text dark:text-text-dark">
                Sriharsha
                <br />
                Velicheti
              </h1>

              {/* Typewriter titles */}
              <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-primary dark:text-primary-dark min-h-[44px] flex items-center justify-center lg:justify-start">
                <TypewriterEffect titles={titles} />
              </div>

              {/* Description */}
              <p className="text-lg text-text-secondary dark:text-text-dark-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Passionate about building intelligent systems with Generative AI,
                cloud technologies, and modern web development. Creating innovative
                solutions that make a difference.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                <MagneticButton
                  variant="primary"
                  onClick={() => scrollToSection('contact')}
                >
                  <EnvelopeIcon className="w-5 h-5" />
                  Get In Touch
                </MagneticButton>

                <MagneticButton
                  variant="secondary"
                  onClick={() => scrollToSection('projects')}
                >
                  View Projects
                  <ArrowDownIcon className="w-5 h-5" />
                </MagneticButton>
              </div>
            </div>
          </SectionReveal>

          {/* Right column - Profile Image */}
          <SectionReveal animation="slide-left" delay={200} className="flex justify-center lg:justify-end">
            <ProfileImage
              src="/images/profile.jpg"
              alt="Sriharsha Velicheti - GenAI Engineer"
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
            />
          </SectionReveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection('about')}
            className="
              text-text-secondary dark:text-text-dark-secondary
              hover:text-primary dark:hover:text-primary-dark
              transition-colors duration-200
              cursor-pointer
              min-h-[44px] min-w-[44px]
              flex items-center justify-center
            "
            aria-label="Scroll to about section"
          >
            <ArrowDownIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
