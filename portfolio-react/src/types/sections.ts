/**
 * Portfolio section-related TypeScript interfaces
 */

export interface Section {
  id: string;
  name: string;
  link: string;
  description: string;
}

export interface SectionsData {
  sections: Section[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured: boolean;
  category: 'ai' | 'web' | 'cloud' | 'other';
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'languages' | 'ai-ml' | 'cloud-devops' | 'databases' | 'other';
}

export interface SkillCategory {
  category: 'languages' | 'ai-ml' | 'cloud-devops' | 'databases' | 'other';
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  skills: Skill[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  achievements?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
  description: string;
  achievements?: string[];
}

export interface ContactMethod {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  href: string | null;
}
