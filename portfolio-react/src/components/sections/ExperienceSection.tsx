/**
 * ExperienceSection Component
 * Timeline with role cards - company, period, achievements
 */

import { BriefcaseIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { SectionReveal } from '../shared/SectionReveal';
import { Card } from '../shared/Card';
import type { Experience } from '../../types/sections';

const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Freelance',
    role: 'GenAI Engineer & Full-Stack Developer',
    period: '2022 - Present',
    location: 'Remote',
    description: 'Building AI-powered applications and web solutions for clients worldwide',
    achievements: [
      'Developed 15+ production-ready GenAI applications using LLMs and RAG systems',
      'Created scalable cloud architectures on AWS and Azure for enterprise clients',
      'Implemented end-to-end ML pipelines with 95%+ accuracy for business automation',
      'Led technical workshops and created educational content for 10K+ developers',
    ],
    technologies: ['Python', 'LangChain', 'OpenAI', 'Azure', 'React', 'FastAPI'],
  },
  {
    id: 'exp-2',
    company: 'YouTube Creator',
    role: 'Tech Content Creator',
    period: '2021 - Present',
    location: 'Remote',
    description: 'Sharing knowledge about GenAI, cloud technologies, and software development',
    achievements: [
      'Built a community of 5K+ subscribers interested in AI and development',
      'Published 50+ technical tutorials on GenAI, Python, and Cloud technologies',
      'Received positive feedback from developers across 20+ countries',
      'Collaborated with tech brands for educational content creation',
    ],
    technologies: ['Python', 'Generative AI', 'Cloud Computing', 'Teaching'],
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <h2 className="text-4xl font-display font-bold text-text dark:text-text-dark mb-12 text-center">
            Experience
          </h2>
        </SectionReveal>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="
              absolute left-8 top-0 bottom-0 w-0.5
              bg-border dark:bg-border-dark
              hidden md:block
            "
          />

          {/* Experience cards */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <SectionReveal key={exp.id} delay={index * 100} animation="slide-up">
                <div className="relative md:ml-16">
                  {/* Timeline dot */}
                  <div
                    className="
                      absolute -left-[34px] top-6
                      w-4 h-4 rounded-full
                      bg-primary dark:bg-primary-dark
                      ring-4 ring-background dark:ring-background-dark
                      hidden md:block
                    "
                  />

                  <Card variant="glass" interactive className="group">
                    <div className="space-y-4">
                      {/* Header */}
                      <div>
                        <h3 className="text-2xl font-display font-semibold text-text dark:text-text-dark mb-2">
                          {exp.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-text-secondary dark:text-text-dark-secondary">
                          <div className="flex items-center gap-2">
                            <BriefcaseIcon className="w-5 h-5" />
                            <span className="font-medium text-primary dark:text-primary-dark">
                              {exp.company}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="w-5 h-5" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-text-secondary dark:text-text-dark-secondary">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div>
                        <h4 className="font-semibold text-text dark:text-text-dark mb-2">
                          Key Achievements:
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-text-secondary dark:text-text-dark-secondary"
                            >
                              <span className="text-primary dark:text-primary-dark mt-1">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="
                              px-3 py-1 text-sm rounded-full
                              bg-primary/10 text-primary
                              dark:bg-primary-dark/20 dark:text-primary-dark
                            "
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
