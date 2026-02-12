/**
 * ProjectCard Component
 * Reusable project card with image, description, tech stack
 * Links to live demo and GitHub
 */

import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { Card } from '../shared/Card';
import { Badge } from '../shared/Badge';
import type { Project } from '../../types/sections';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card variant="glass" interactive className="group h-full flex flex-col">
      {/* Project image */}
      {project.image && (
        <div className="relative overflow-hidden rounded-lg mb-4 -mx-6 -mt-6">
          <div className="aspect-video bg-surface dark:bg-surface-dark">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
              loading="lazy"
            />
          </div>
          {project.featured && (
            <div className="absolute top-4 right-4">
              <Badge variant="primary">Featured</Badge>
            </div>
          )}
        </div>
      )}

      {/* Project details */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-display font-semibold text-text dark:text-text-dark mb-2">
          {project.title}
        </h3>

        <p className="text-text-secondary dark:text-text-dark-secondary mb-4 flex-1">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <Badge key={tech} size="sm" variant="outline">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-border dark:border-border-dark">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-2 text-sm font-medium
                text-primary dark:text-primary-dark
                hover:underline cursor-pointer
                min-h-[44px] px-2
              "
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-2 text-sm font-medium
                text-text-secondary dark:text-text-dark-secondary
                hover:text-primary dark:hover:text-primary-dark
                cursor-pointer min-h-[44px] px-2
              "
            >
              <CodeBracketIcon className="w-4 h-4" />
              Source Code
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
