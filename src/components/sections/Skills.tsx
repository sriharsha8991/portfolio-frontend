'use client';

import { motion } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Sparkles } from 'lucide-react';

export function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/98 to-[#0a0a0a]">
      {/* Container */}
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#9B5DE5] to-[#00BBF9] bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              The tools I use to build intelligent systems
            </p>
          </div>
        </FadeIn>

        {/* Skills Categories */}
        <div className="space-y-16">
          {skillCategories.map((category, index) => (
            <FadeIn key={category.title} delay={index * 0.15}>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 p-8 md:p-12">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-10">
                  <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl md:text-4xl shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${category.color}40, ${category.color}20)`,
                      border: `2px solid ${category.color}60`
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {category.icon}
                  </motion.div>
                  <h3
                    className="text-3xl md:text-4xl lg:text-5xl font-bold"
                    style={{ color: category.color }}
                  >
                    {category.title}
                  </h3>
                </div>

                {/* Skills Grid */}
                <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
                  {category.skills.map((skill) => (
                    <StaggerItem key={skill}>
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: `${category.color}15`,
                          borderColor: `${category.color}60`
                        }}
                        className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-4 md:p-5 text-center transition-all cursor-default"
                      >
                        <p className="font-semibold text-sm md:text-base text-gray-200 group-hover:text-white transition-colors">
                          {skill}
                        </p>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Specializations */}
        <FadeIn delay={0.6}>
          <div className="mt-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <Sparkles className="w-5 h-5 text-[#FEE440]" />
                <span className="text-sm font-semibold text-gray-300">Core Specializations</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'RAG Systems',
                  desc: 'Advanced retrieval pipelines with vector databases',
                  icon: '',
                  color: '#9B5DE5'
                },
                {
                  title: 'Healthcare AI',
                  desc: 'HIPAA-compliant medical AI applications',
                  icon: '',
                  color: '#00BBF9'
                },
                {
                  title: 'Agentic Systems',
                  desc: 'Multi-agent orchestration & workflows',
                  icon: '',
                  color: '#FEE440'
                }
              ].map((spec) => (
                <motion.div
                  key={spec.title}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border-2 transition-all p-6"
                  style={{ borderColor: `${spec.color}30` }}
                >
                  <div className="text-4xl mb-4">{spec.icon}</div>
                  <h4 className="text-xl font-bold mb-2" style={{ color: spec.color }}>
                    {spec.title}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {spec.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
