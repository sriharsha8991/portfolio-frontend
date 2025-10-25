'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PERSONAL_INFO, STATS, COLORS } from '@/lib/constants';
import { FadeIn } from '@/components/animations/FadeIn';
import { Github, Linkedin, Mail, ChevronDown, Sparkles, Award, Code2, Heart, ArrowRight } from 'lucide-react';

// Rotating taglines for typewriter effect
const ROTATING_TAGLINES = [
  'Generative AI Engineer ',
  'Agentic Systems Developer',
  'Building Production-Ready Systems',
  'Healthcare AI Solutions Specialist',
  'Multimodal AI & Vision Expert',
  'Open Source Contributor',
];

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(60);

  const currentTagline = ROTATING_TAGLINES[currentTaglineIndex];

  // Enhanced typing animation with rotation
  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        if (typedText.length < currentTagline.length) {
          setTypedText(currentTagline.slice(0, typedText.length + 1));
          setTypingSpeed(60);
        } else {
          // Pause at end before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting backward
        if (typedText.length > 0) {
          setTypedText(currentTagline.slice(0, typedText.length - 1));
          setTypingSpeed(30);
        } else {
          // Move to next tagline
          setIsDeleting(false);
          setCurrentTaglineIndex((prev) => (prev + 1) % ROTATING_TAGLINES.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentTagline, typingSpeed, currentTaglineIndex]);

  // Mouse spotlight effect with throttling
  useEffect(() => {
    let rafId: number;
    let lastTime = 0;
    const throttleDelay = 50; // 50ms throttle

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      
      if (currentTime - lastTime >= throttleDelay) {
        lastTime = currentTime;
        
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        
        rafId = requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Stat icons mapping
  const statIcons: Record<string, any> = {
    '64+ AI Projects': Code2,
    '3 Kaggle Medals': Award,
    'Healthcare AI Specialist': Heart,
    '200+ LeetCode Solved': Sparkles,
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center bg-[#000000] overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      {/* Enhanced Gradient Blobs Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{ background: COLORS.primary }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{ background: COLORS.secondary }}
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.4, 0.2, 0.4],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
          style={{ background: COLORS.accent }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.25, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Enhanced Mouse Spotlight Effect */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(155, 93, 229, 0.12), transparent 60%)`
        }}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative z-20 px-6 md:px-8 py-16">
        {/* Top Hero Section - Grouped Together */}
        <div className="space-y-12 md:space-y-16 lg:space-y-20 mb-24 md:mb-32 lg:mb-40">
          {/* Availability Badge - Centered */}
          <FadeIn delay={0.05}>
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 backdrop-blur-sm"
                role="status"
                aria-live="polite"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-semibold text-emerald-300">Available for new opportunities</span>
              </motion.div>
            </div>
          </FadeIn>

          {/* Name and Photo Side by Side */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 xl:gap-20">
            {/* Enhanced Name with better gradient and animation */}
            <FadeIn delay={0.2}>
              <motion.h1 
                className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold leading-[1.1] text-center lg:text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <span className="inline-block bg-gradient-to-r from-[#9B5DE5] via-[#B47FE5] to-[#00BBF9] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  {PERSONAL_INFO.name.split(' ')[0]}
                </span>
                <br />
                <span className="inline-block bg-gradient-to-r from-[#00BBF9] via-[#00D4FF] to-[#FEE440] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  {PERSONAL_INFO.name.split(' ')[1]}
                </span>
              </motion.h1>
            </FadeIn>

            {/* Enhanced Profile Picture - Larger Size with Flip Effect */}
            <FadeIn delay={0.1}>
              <motion.div 
                className="relative w-64 h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 xl:w-[420px] xl:h-[420px] group flex-shrink-0 [perspective:1000px]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                {/* Flip Card Container */}
                <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
                  
                  {/* FRONT SIDE - Professional Photo */}
                  <div className="absolute inset-0 [backface-visibility:hidden]">
                    {/* Animated gradient ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9B5DE5] via-[#00BBF9] to-[#FEE440] opacity-75"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Inner border for professional look */}
                    <div className="absolute inset-[5px] rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#000000] flex items-center justify-center overflow-hidden">
                      {/* Professional Photo */}
                      <div className="absolute inset-[4px] rounded-full overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                        <Image
                          src="/profile.png"
                          alt="Sriharsha Velicheti - AI Engineer"
                          width={500}
                          height={500}
                          className="w-full h-full object-cover object-center"
                          priority
                        />
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE - Casual Photo */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    {/* Animated gradient ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FEE440] via-[#00BBF9] to-[#9B5DE5] opacity-75"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Inner border for professional look */}
                    <div className="absolute inset-[5px] rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#000000] flex items-center justify-center overflow-hidden">
                      {/* Casual Photo */}
                      <div className="absolute inset-[4px] rounded-full overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                        <Image
                          src="/profile-flip.jpg"
                          alt="Sriharsha Velicheti - Reading"
                          width={500}
                          height={500}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9B5DE5] via-[#00BBF9] to-[#FEE440] blur-[80px] opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
                />
                {/* Pulse effect for availability */}
                <motion.div
                  className="absolute -inset-3 rounded-full border-2 border-emerald-500/30 pointer-events-none"
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </FadeIn>
          </div>

          {/* Enhanced Rotating Typing Animation - Centered */}
          <FadeIn delay={0.3} direction="none">
            <div className="min-h-[120px] md:min-h-[140px] flex items-center justify-center px-4 text-center">
              <div className="relative">
                <motion.p 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-clip-text text-transparent"
                  key={currentTaglineIndex}
                >
                  {typedText}
                  <motion.span
                    className="inline-block w-1 h-8 sm:h-10 md:h-12 lg:h-14 bg-gradient-to-b from-[#9B5DE5] to-[#00BBF9] ml-2"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </motion.p>
              </div>
            </div>
          </FadeIn>

          {/* Enhanced Tagline with better spacing - Centered */}
          <FadeIn delay={0.5}>
            <div className="flex items-start justify-center gap-3 px-4 max-w-4xl mx-auto text-center">
              <Sparkles className="w-6 h-6 text-[#FEE440] flex-shrink-0 mt-1" />
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed">
                {PERSONAL_INFO.tagline}
              </p>
              <Sparkles className="w-6 h-6 text-[#FEE440] flex-shrink-0 mt-1" />
            </div>
          </FadeIn>
        </div>

    {/* Bottom Action Sections - With Clear Spacing */}
    <div className="flex flex-col gap-6 md:gap-10 lg:gap-10">
          {/* Enhanced Stats Grid with better spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 px-4 max-w-5xl mx-auto">
              {STATS.map((stat, index) => {
                const Icon = statIcons[stat.label];
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5, type: "spring" }}
                    whileHover={{ 
                      scale: 1.08, 
                      y: -8,
                      boxShadow: "0 20px 40px rgba(155, 93, 229, 0.3)"
                    }}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 hover:border-[#9B5DE5]/50 px-6 md:px-7 py-4 md:py-5 transition-all cursor-default"
                  >
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="relative flex items-center gap-3">
                      {Icon && <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#9B5DE5] group-hover:text-[#00BBF9] transition-colors" />}
                      <span className="text-sm md:text-base font-semibold text-gray-200 group-hover:text-white transition-colors whitespace-nowrap">
                        {stat.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Enhanced CTA Buttons with better spacing and design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center px-4 max-w-5xl mx-auto">
              <motion.button
                type="button"
                onClick={scrollToProjects}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(155, 93, 229, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex w-full sm:w-auto sm:min-w-[240px] items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#9B5DE5] via-[#B47FE5] to-[#00BBF9] px-10 md:px-12 py-5 md:py-6 text-white text-lg md:text-xl font-semibold shadow-[0_12px_30px_rgba(155,93,229,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B5DE5] transition-all after:absolute after:inset-0 after:rounded-2xl after:bg-white/15 after:opacity-0 after:transition-opacity after:duration-200 after:content-[''] hover:after:opacity-20"
                aria-label="View my work and projects"
              >
                <Sparkles className="relative z-10 w-6 h-6 md:w-7 md:h-7" />
                <span className="relative z-10">View My Work</span>
                <ArrowRight className="relative z-10 w-6 h-6 md:w-7 md:h-7 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                type="button"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05, borderColor: "rgba(155, 93, 229, 0.8)" }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex w-full sm:w-auto sm:min-w-[240px] items-center justify-center gap-3 rounded-2xl border-2 border-white/10 bg-white/5 px-10 md:px-12 py-5 md:py-6 text-lg md:text-xl font-semibold text-white/90 transition-all hover:bg-white/10 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B5DE5] backdrop-blur-sm shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                aria-label="Contact me to connect"
              >
                <span className="relative z-10">Let's Connect</span>
                <ArrowRight className="relative z-10 w-6 h-6 md:w-7 md:h-7 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </motion.div>

          {/* Enhanced Social Links with better spacing and design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <div className="flex justify-center items-center gap-8 px-4 max-w-5xl mx-auto">
              <motion.a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="group relative p-6 md:p-7 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 hover:border-[#9B5DE5]/50 transition-all shadow-lg hover:shadow-[#9B5DE5]/30"
                aria-label="GitHub Profile"
              >
                <Github className="w-8 h-8 md:w-9 md:h-9 text-gray-400 group-hover:text-[#9B5DE5] transition-colors" />
              </motion.a>
              
              <motion.a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="group relative p-6 md:p-7 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 hover:border-[#00BBF9]/50 transition-all shadow-lg hover:shadow-[#00BBF9]/30"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-8 h-8 md:w-9 md:h-9 text-gray-400 group-hover:text-[#00BBF9] transition-colors" />
              </motion.a>
              
              <motion.a
                href={`mailto:${PERSONAL_INFO.email}`}
                whileHover={{ scale: 1.15, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="group relative p-6 md:p-7 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 hover:border-[#FEE440]/50 transition-all shadow-lg hover:shadow-[#FEE440]/30"
                aria-label="Email Contact"
              >
                <Mail className="w-8 h-8 md:w-9 md:h-9 text-gray-400 group-hover:text-[#FEE440] transition-colors" />
              </motion.a>
            </div>
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <div className="flex justify-center">
              <motion.button
                onClick={scrollToProjects}
                className="cursor-pointer group"
                aria-label="Scroll to projects"
              >
                <div className="flex flex-col items-center gap-3">
                  <span className="text-sm font-medium text-gray-500 group-hover:text-gray-400 transition-colors">Scroll to explore</span>
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="p-3 rounded-full border-2 border-gray-700 group-hover:border-[#9B5DE5] group-hover:bg-[#9B5DE5]/10 transition-all"
                  >
                    <ChevronDown className="w-6 h-6 text-gray-500 group-hover:text-[#9B5DE5] transition-colors" />
                  </motion.div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
