/**
 * SkillsSection Component
 * Skill categories with progress bars and icons
 * Skills organized by category (languages, ai-ml, cloud, databases, other)
 */

import {
  CodeBracketIcon,
  CpuChipIcon,
  CloudIcon,
  CircleStackIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { SectionReveal } from '../shared/SectionReveal';
import { Card } from '../shared/Card';
import type { SkillCategory, Skill } from '../../types/sections';

const skillsData: SkillCategory[] = [
  {
    category: 'languages',
    title: 'Programming Languages',
    icon: CodeBracketIcon,
    skills: [
      { name: 'Python', level: 95, category: 'languages' },
      { name: 'JavaScript/TypeScript', level: 90, category: 'languages' },
      { name: 'SQL', level: 85, category: 'languages' },
      { name: 'Bash/Shell', level: 80, category: 'languages' },
    ],
  },
  {
    category: 'ai-ml',
    title: 'AI & Machine Learning',
    icon: CpuChipIcon,
    skills: [
      { name: 'LangChain', level: 95, category: 'ai-ml' },
      { name: 'OpenAI/Gemini APIs', level: 93, category: 'ai-ml' },
      { name: 'RAG Systems', level: 90, category: 'ai-ml' },
      { name: 'Vector Databases', level: 88, category: 'ai-ml' },
      { name: 'Hugging Face', level: 85, category: 'ai-ml' },
    ],
  },
  {
    category: 'cloud-devops',
    title: 'Cloud & DevOps',
    icon: CloudIcon,
    skills: [
      { name: 'Azure', level: 90, category: 'cloud-devops' },
      { name: 'AWS', level: 85, category: 'cloud-devops' },
      { name: 'Docker', level: 88, category: 'cloud-devops' },
      { name: 'Terraform', level: 82, category: 'cloud-devops' },
      { name: 'CI/CD', level: 85, category: 'cloud-devops' },
    ],
  },
  {
    category: 'databases',
    title: 'Databases',
    icon: CircleStackIcon,
    skills: [
      { name: 'PostgreSQL', level: 88, category: 'databases' },
      { name: 'MongoDB', level: 85, category: 'databases' },
      { name: 'Redis', level: 80, category: 'databases' },
      { name: 'FAISS', level: 87, category: 'databases' },
    ],
  },
  {
    category: 'other',
    title: 'Frameworks & Tools',
    icon: WrenchScrewdriverIcon,
    skills: [
      { name: 'FastAPI', level: 93, category: 'other' },
      { name: 'React', level: 90, category: 'other' },
      { name: 'Node.js', level: 85, category: 'other' },
      { name: 'Git', level: 92, category: 'other' },
    ],
  },
];

interface SkillBarProps {
  skill: Skill;
  delay: number;
}

const SkillBar = ({ skill, delay }: SkillBarProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-text dark:text-text-dark">
          {skill.name}
        </span>
        <span className="text-sm text-text-secondary dark:text-text-dark-secondary">
          {skill.level}%
        </span>
      </div>
      <div className="h-2 bg-surface dark:bg-surface-dark rounded-full overflow-hidden">
        <div
          className="h-full bg-primary dark:bg-primary-dark rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${skill.level}%`,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
};

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <h2 className="text-4xl font-display font-bold text-text dark:text-text-dark mb-12 text-center">
            Skills & Expertise
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <SectionReveal
                key={category.category}
                delay={categoryIndex * 100}
                animation="slide-up"
              >
                <Card variant="glass" className="h-full">
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border dark:border-border-dark">
                    <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary-dark/20">
                      <Icon className="w-6 h-6 text-primary dark:text-primary-dark" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-text dark:text-text-dark">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills */}
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBar
                        key={skill.name}
                        skill={skill}
                        delay={categoryIndex * 100 + skillIndex * 50}
                      />
                    ))}
                  </div>
                </Card>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
