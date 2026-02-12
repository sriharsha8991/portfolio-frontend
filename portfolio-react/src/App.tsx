/**
 * Main App Component
 * Assembles all sections, layout, and providers
 */

import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ChatProvider } from './context/ChatContext';
import { CustomCursor } from './components/shared/CustomCursor';
import { Navbar, MobileMenu, ProgressBar } from './components/layout';
import { HeroSection } from './components/hero';
import {
  AboutSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
  GitHubSection,
  EducationSection,
  ContactSection,
} from './components/sections';
import { ChatWidget } from './components/chat';
import { GrainTexture } from './utils/grain-texture';
import CONFIG from './config';

// Navigation sections from config
const sections = [
  { id: 'home', name: 'Home', link: '#home' },
  { id: 'about', name: 'About', link: '#about' },
  { id: 'experience', name: 'Experience', link: '#experience' },
  { id: 'projects', name: 'Projects', link: '#projects' },
  { id: 'skills', name: 'Skills', link: '#skills' },
  { id: 'github', name: 'GitHub', link: '#github' },
  { id: 'education', name: 'Education', link: '#education' },
  { id: 'contact', name: 'Contact', link: '#contact' },
];

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const config = CONFIG.getConfig();

  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="min-h-screen bg-background dark:bg-background-dark text-text dark:text-text-dark">
          {/* Grain texture overlay */}
          <GrainTexture />

          {/* Custom cursor (desktop only) */}
          <CustomCursor />

          {/* Progress bar */}
          <ProgressBar />

          {/* Navigation */}
          <Navbar
            sections={sections}
            onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />

          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            sections={sections}
            activeSection="home"
          />

          {/* Main content */}
          <main>
            <HeroSection />
            
            <AboutSection />
            
            <ExperienceSection />
            
            <ProjectsSection />
            
            <SkillsSection />
            
            {config.features.githubStatsEnabled && <GitHubSection />}
            
            <EducationSection />
            
            <ContactSection />
          </main>

          {/* Footer */}
          <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border dark:border-border-dark">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-text-secondary dark:text-text-dark-secondary text-sm text-center md:text-left">
                  © {new Date().getFullYear()} Sriharsha Velicheti. All rights reserved.
                </p>
                
                <div className="flex items-center gap-4">
                  <a
                    href={`https://github.com/${config.github.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary dark:text-text-dark-secondary hover:text-primary dark:hover:text-primary-dark transition-colors cursor-pointer"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://youtube.com/@sriharsha8991"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary dark:text-text-dark-secondary hover:text-primary dark:hover:text-primary-dark transition-colors cursor-pointer"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://linkedin.com/in/sriharsha8991"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary dark:text-text-dark-secondary hover:text-primary dark:hover:text-primary-dark transition-colors cursor-pointer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </footer>

          {/* Chat widget */}
          {config.features.chatEnabled && <ChatWidget />}
        </div>
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;
