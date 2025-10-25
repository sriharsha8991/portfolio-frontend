'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timeline, quickFacts } from '@/data/timeline';
import { BIO } from '@/lib/constants';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function About() {
  const [showFullBio, setShowFullBio] = useState(false);

  return (
    <section id="about" className="relative py-32 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/95 to-[#0a0a0a]">
      {/* Container */}
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#9B5DE5] to-[#00BBF9] bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              My journey in AI & Machine Learning
            </p>
          </div>
        </FadeIn>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left Column - Bio & Facts */}
          <div className="lg:col-span-2 space-y-10">
            {/* Bio Card */}
            <FadeIn delay={0.2}>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 p-8 lg:p-10">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-[#9B5DE5] to-[#B47FE5] bg-clip-text text-transparent">
                      Who I Am
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-base lg:text-lg">
                      {BIO.short}
                    </p>
                  </div>

                  <AnimatePresence>
                    {showFullBio && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 overflow-hidden pt-2"
                      >
                        {BIO.full.map((paragraph, index) => (
                          <p key={index} className="text-gray-300 leading-relaxed text-base lg:text-lg">
                            {paragraph}
                          </p>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    onClick={() => setShowFullBio(!showFullBio)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#9B5DE5]/10 hover:bg-[#9B5DE5]/20 border border-[#9B5DE5]/30 text-[#9B5DE5] font-semibold transition-all"
                  >
                    {showFullBio ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Read More
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </FadeIn>

            {/* Quick Facts */}
            <FadeIn delay={0.4}>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 p-8 lg:p-10">
                <h4 className="text-2xl lg:text-3xl font-bold mb-8 bg-gradient-to-r from-[#00BBF9] to-[#00D4FF] bg-clip-text text-transparent">
                  Quick Facts
                </h4>
                <ul className="space-y-5">
                  {quickFacts.map((fact, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <span className="text-2xl flex-shrink-0 mt-1">{fact.icon}</span>
                      <span className="text-gray-300 leading-relaxed text-base">{fact.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Timeline */}
          <div className="lg:col-span-3">
            <FadeIn delay={0.3}>
              <h3 className="text-3xl lg:text-4xl font-bold mb-12 bg-gradient-to-r from-[#00BBF9] to-[#00D4FF] bg-clip-text text-transparent">
                Experience Timeline
              </h3>
            </FadeIn>

            <StaggerContainer className="space-y-10">
              {timeline.map((item, index) => (
                <StaggerItem key={item.id}>
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex gap-6 md:gap-8">
                      {/* Timeline Line & Dot */}
                      <div className="relative flex flex-col items-center">
                        <motion.div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)`,
                            border: `2px solid ${item.color}60`
                          }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {item.icon}
                        </motion.div>
                        {index !== timeline.length - 1 && (
                          <div
                            className="w-0.5 flex-1 mt-6"
                            style={{ background: `${item.color}30` }}
                          />
                        )}
                      </div>

                      {/* Content Card */}
                      <div className="flex-1 pb-2">
                        <div className="rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 hover:border-white/20 p-6 lg:p-8 transition-all">
                          <div className="space-y-4">
                            <div className="space-y-3">
                              <h4 className="text-2xl lg:text-3xl font-bold" style={{ color: item.color }}>
                                {item.title}
                              </h4>
                              <p className="text-[#00BBF9] font-semibold text-lg">
                                {item.organization}
                              </p>
                              <p className="text-gray-500 text-sm">
                                {item.period}
                              </p>
                            </div>

                            <p className="text-gray-400 leading-relaxed text-base">
                              {item.description}
                            </p>

                            {item.achievements && item.achievements.length > 0 && (
                              <ul className="space-y-3 pt-6 border-t border-white/10">
                                {item.achievements.map((achievement, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-3 text-sm text-gray-400"
                                  >
                                    <span
                                      className="mt-1 flex-shrink-0"
                                      style={{ color: item.color }}
                                    >
                                      ●
                                    </span>
                                    <span className="leading-relaxed">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
