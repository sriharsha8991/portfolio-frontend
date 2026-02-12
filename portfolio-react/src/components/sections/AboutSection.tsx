/**
 * AboutSection Component
 * Grain card with description, markdown rendering support
 */

import { SectionReveal } from '../shared/SectionReveal';
import { Card } from '../shared/Card';

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionReveal>
          <h2 className="text-4xl font-display font-bold text-text dark:text-text-dark mb-12 text-center">
            About Me
          </h2>
        </SectionReveal>

        <SectionReveal delay={100}>
          <Card variant="glass" className="space-y-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-text-secondary dark:text-text-dark-secondary leading-relaxed">
                I'm a passionate <strong>GenAI Engineer</strong> and <strong>Full-Stack Developer</strong> with
                expertise in building intelligent systems using cutting-edge AI technologies. My journey in
                technology has been driven by curiosity and a desire to create impactful solutions.
              </p>

              <p className="text-text-secondary dark:text-text-dark-secondary leading-relaxed">
                With a strong foundation in <strong>Python</strong>, <strong>Cloud Technologies</strong>, and
                <strong> Machine Learning</strong>, I specialize in developing scalable applications that
                leverage Generative AI to solve real-world problems. I'm particularly interested in LLM
                applications, RAG systems, and AI-powered automation.
              </p>

              <p className="text-text-secondary dark:text-text-dark-secondary leading-relaxed">
                When I'm not coding, you'll find me sharing knowledge through my{' '}
                <a
                  href="https://youtube.com/@sriharsha8991"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary dark:text-primary-dark hover:underline cursor-pointer"
                >
                  YouTube channel
                </a>
                , exploring new technologies, or contributing to open-source projects.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {[
                  { label: 'Projects', value: '15+' },
                  { label: 'Experience', value: '3+ Years' },
                  { label: 'Technologies', value: '20+' },
                  { label: 'Certifications', value: '5+' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-lg bg-surface/50 dark:bg-surface-dark/50"
                  >
                    <div className="text-3xl font-display font-bold text-primary dark:text-primary-dark">
                      {stat.value}
                    </div>
                    <div className="text-sm text-text-secondary dark:text-text-dark-secondary mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </SectionReveal>
      </div>
    </section>
  );
};

export default AboutSection;
