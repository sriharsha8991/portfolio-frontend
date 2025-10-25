'use client';

import { motion } from 'framer-motion';
import { featuredProjects } from '@/data/projects';
import { PERSONAL_INFO } from '@/lib/constants';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { ExternalLink, Github } from 'lucide-react';

export function Projects() {
  const largeProjects = featuredProjects.filter(p => p.size === 'large');
  const mediumProjects = featuredProjects.filter(p => p.size === 'medium');

  return (
    <section id="projects" className="relative py-32 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-[#000000] to-[#0a0a0a]">
      {/* Container */}
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#9B5DE5] to-[#00BBF9] bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Production-ready AI applications solving real-world problems
            </p>
          </div>
        </FadeIn>

        {/* Projects Grid */}
        <div className="space-y-12">
          {/* Large Projects - Full Width */}
          {largeProjects.length > 0 && (
            <StaggerContainer className="space-y-8">
              {largeProjects.map((project, index) => (
                <StaggerItem key={project.id}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 hover:border-[#9B5DE5]/50 transition-all duration-500"
                  >
                    <div className="p-8 md:p-12">
                      <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* Project Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#9B5DE5]/20 to-[#00BBF9]/20 flex items-center justify-center text-5xl md:text-6xl group-hover:scale-110 transition-transform duration-500">
                            {project.icon}
                          </div>
                        </div>

                        {/* Project Content */}
                        <div className="flex-1 space-y-6">
                          <div>
                            <h3 className="text-3xl md:text-4xl font-bold mb-3 group-hover:text-[#9B5DE5] transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                              {project.longDescription}
                            </p>
                          </div>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-[#9B5DE5]/10 hover:border-[#9B5DE5]/30 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Impact & Actions */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                            <div className="flex items-center gap-2 text-[#00BBF9] font-semibold">
                              <span className="text-2xl"></span>
                              <span>{project.impact}</span>
                            </div>
                            <div className="flex gap-3">
                              {project.githubUrl && (
                                <motion.a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-[#9B5DE5]/20 border border-white/10 hover:border-[#9B5DE5]/50 transition-all"
                                >
                                  <Github className="w-5 h-5" />
                                  <span className="text-sm font-medium">Code</span>
                                </motion.a>
                              )}
                              {project.demoUrl && (
                                <motion.a
                                  href={project.demoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#9B5DE5] to-[#00BBF9] hover:opacity-90 transition-opacity"
                                >
                                  <ExternalLink className="w-5 h-5" />
                                  <span className="text-sm font-medium">Live Demo</span>
                                </motion.a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          {/* Medium Projects - Two Column Grid */}
          {mediumProjects.length > 0 && (
            <StaggerContainer className="grid md:grid-cols-2 gap-10 mt-12">
              {mediumProjects.map((project) => (
                <StaggerItem key={project.id}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group h-full relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 hover:border-[#00BBF9]/50 transition-all duration-500"
                  >
                    <div className="p-8 flex flex-col h-full">
                      {/* Project Icon */}
                      <div className="mb-6">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00BBF9]/20 to-[#9B5DE5]/20 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500">
                          {project.icon}
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-[#00BBF9] transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 leading-relaxed">
                            {project.longDescription}
                          </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 5 && (
                            <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-[#9B5DE5]">
                              +{project.technologies.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Impact & Actions */}
                      <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                        <div className="flex items-center gap-2 text-[#00BBF9] font-semibold text-sm">
                          <span className="text-xl"></span>
                          <span>{project.impact}</span>
                        </div>
                        <div className="flex gap-3">
                          {project.githubUrl && (
                            <motion.a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-[#9B5DE5]/20 border border-white/10 hover:border-[#9B5DE5]/50 transition-all"
                            >
                              <Github className="w-4 h-4" />
                              <span className="text-xs font-medium">Code</span>
                            </motion.a>
                          )}
                          {project.demoUrl && (
                            <motion.a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#9B5DE5] to-[#00BBF9] hover:opacity-90 transition-opacity"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span className="text-xs font-medium">Demo</span>
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>

        {/* View All CTA */}
        <FadeIn delay={0.6}>
          <div className="text-center mt-16">
            <motion.a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#9B5DE5]/50 transition-all group"
            >
              <span className="text-lg font-semibold">View All Projects on GitHub</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
