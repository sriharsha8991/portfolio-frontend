/**
 * EducationSection Component
 * Education cards with degree, institution, period
 */

import { AcademicCapIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { SectionReveal } from '../shared/SectionReveal';
import { Card } from '../shared/Card';
import type { Education } from '../../types/sections';

const educationData: Education[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'Jawaharlal Nehru Technological University',
    period: '2018 - 2022',
    location: 'Hyderabad, India',
    description: 'Focused on software engineering, data structures, algorithms, and AI/ML fundamentals',
    achievements: [
      'Graduated with First Class with Distinction',
      'Led multiple technical projects and hackathons',
      'Published research paper on Machine Learning applications',
    ],
  },
];

const certifications = [
  'Microsoft Certified: Azure AI Engineer Associate',
  'AWS Certified Solutions Architect',
  'Google Cloud Professional Data Engineer',
  'LangChain & Vector Databases in Production',
  'Advanced Python Programming',
];

export const EducationSection = () => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <h2 className="text-4xl font-display font-bold text-text dark:text-text-dark mb-12 text-center">
            Education & Certifications
          </h2>
        </SectionReveal>

        {/* Education */}
        <div className="mb-12">
          {educationData.map((edu, index) => (
            <SectionReveal key={edu.id} delay={index * 100} animation="slide-up">
              <Card variant="glass">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 dark:bg-primary-dark/20 flex-shrink-0">
                    <AcademicCapIcon className="w-8 h-8 text-primary dark:text-primary-dark" />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-display font-semibold text-text dark:text-text-dark mb-2">
                        {edu.degree}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-text-secondary dark:text-text-dark-secondary">
                        <span className="font-medium text-primary dark:text-primary-dark">
                          {edu.institution}
                        </span>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-5 h-5" />
                          <span>{edu.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="w-5 h-5" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-text-secondary dark:text-text-dark-secondary">
                      {edu.description}
                    </p>

                    {edu.achievements && edu.achievements.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-text dark:text-text-dark mb-2">
                          Achievements:
                        </h4>
                        <ul className="space-y-2">
                          {edu.achievements.map((achievement, i) => (
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
                    )}
                  </div>
                </div>
              </Card>
            </SectionReveal>
          ))}
        </div>

        {/* Certifications */}
        <SectionReveal delay={200}>
          <Card variant="glass">
            <h3 className="text-2xl font-display font-semibold text-text dark:text-text-dark mb-6">
              Professional Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-surface/50 dark:bg-surface-dark/50"
                >
                  <div className="w-2 h-2 rounded-full bg-primary dark:bg-primary-dark mt-2 flex-shrink-0" />
                  <span className="text-text-secondary dark:text-text-dark-secondary">
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </SectionReveal>
      </div>
    </section>
  );
};

export default EducationSection;
