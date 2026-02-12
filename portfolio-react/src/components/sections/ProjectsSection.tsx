/**
 * ProjectsSection Component
 * Grid of project cards with filtering
 */

import { useState } from 'react';
import { SectionReveal } from '../shared/SectionReveal';
import ProjectCard from './ProjectCard';
import type { Project } from '../../types/sections';

// Sample projects data - will be replaced with actual data
const allProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'AI Chat Assistant',
    description: 'Intelligent chat system powered by dual LLM architecture with navigation and Q&A capabilities',
    technologies: ['Python', 'FastAPI', 'Gemini AI', 'WebSocket', 'React'],
    image: '/images/projects/chat-assistant.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/sriharsha8991',
    featured: true,
    category: 'ai',
  },
  {
    id: 'proj-2',
    title: 'Portfolio Website',
    description: 'Modern portfolio with particle system, chat integration, and GitHub stats visualization',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Chart.js'],
    image: '/images/projects/portfolio.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/sriharsha8991',
    featured: true,
    category: 'web',
  },
  {
    id: 'proj-3',
    title: 'Cloud Infrastructure Automation',
    description: 'IaC templates and automation scripts for Azure and AWS cloud deployments',
    technologies: ['Terraform', 'Azure', 'AWS', 'Python', 'Docker'],
    image: '/images/projects/cloud-automation.jpg',
    githubUrl: 'https://github.com/sriharsha8991',
    featured: false,
    category: 'cloud',
  },
  {
    id: 'proj-4',
    title: 'RAG System with LangChain',
    description: 'Document Q&A system using Retrieval Augmented Generation with vector databases',
    technologies: ['Python', 'LangChain', 'FAISS', 'OpenAI', 'Streamlit'],
    image: '/images/projects/rag-system.jpg',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/sriharsha8991',
    featured: true,
    category: 'ai',
  },
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'web', label: 'Web Apps' },
  { id: 'cloud', label: 'Cloud' },
];

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? allProjects
      : allProjects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <h2 className="text-4xl font-display font-bold text-text dark:text-text-dark mb-12 text-center">
            Featured Projects
          </h2>
        </SectionReveal>

        {/* Category filters */}
        <SectionReveal delay={100}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  px-6 py-2.5 rounded-full font-medium
                  transition-all duration-200 cursor-pointer
                  min-h-[44px]
                  ${
                    activeCategory === category.id
                      ? 'bg-primary text-background dark:bg-primary-dark dark:text-background-dark'
                      : 'bg-surface text-text hover:bg-surface-dark dark:bg-surface-dark dark:text-text-dark dark:hover:bg-elevated-dark'
                  }
                `}
              >
                {category.label}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <SectionReveal key={project.id} delay={index * 50} animation="slide-up">
              <ProjectCard project={project} />
            </SectionReveal>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary dark:text-text-dark-secondary">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
