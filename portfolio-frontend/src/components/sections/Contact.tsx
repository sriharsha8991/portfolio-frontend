'use client';

import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/constants';
import { FadeIn } from '@/components/animations/FadeIn';
import { Mail, Phone, Github, Linkedin, TrendingUp, MapPin, Send } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-[#0a0a0a] to-[#000000]">
      {/* Container */}
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#9B5DE5] to-[#00BBF9] bg-clip-text text-transparent leading-tight">
              Let's Build Something Intelligent Together
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to transform your business with AI? I'm available for consulting, collaborations, and exciting projects.
            </p>
          </div>
        </FadeIn>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 gap-8 mb-16">
          {/* Email Card */}
          <FadeIn delay={0.2}>
            <motion.a
              href={`mailto:${PERSONAL_INFO.email}`}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border-2 border-white/10 hover:border-[#9B5DE5]/60 p-8 transition-all group"
            >
              <motion.div
                className="absolute top-4 right-4 text-[#9B5DE5]/20 text-6xl"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <Mail className="w-16 h-16" />
              </motion.div>
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 rounded-xl bg-[#9B5DE5]/20 flex items-center justify-center border-2 border-[#9B5DE5]/40 group-hover:bg-[#9B5DE5]/30 transition-colors">
                  <Mail className="w-7 h-7 text-[#9B5DE5]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-[#9B5DE5] transition-colors">
                    Email Me
                  </h3>
                  <p className="text-gray-400 text-sm break-all mb-3">
                    {PERSONAL_INFO.email}
                  </p>
                  <div className="flex items-center gap-2 text-[#9B5DE5] font-semibold text-sm">
                    <span>Send email</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.a>
          </FadeIn>

          {/* Phone Card */}
          <FadeIn delay={0.3}>
            <motion.a
              href={`tel:${PERSONAL_INFO.phone}`}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border-2 border-white/10 hover:border-[#00BBF9]/60 p-8 transition-all group"
            >
              <motion.div
                className="absolute top-4 right-4 text-[#00BBF9]/20 text-6xl"
                whileHover={{ scale: 1.2, rotate: -10 }}
              >
                <Phone className="w-16 h-16" />
              </motion.div>
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 rounded-xl bg-[#00BBF9]/20 flex items-center justify-center border-2 border-[#00BBF9]/40 group-hover:bg-[#00BBF9]/30 transition-colors">
                  <Phone className="w-7 h-7 text-[#00BBF9]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-[#00BBF9] transition-colors">
                    Call Me
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {PERSONAL_INFO.phone}
                  </p>
                  <div className="flex items-center gap-2 text-[#00BBF9] font-semibold text-sm">
                    <span>Click to call</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.a>
          </FadeIn>
        </div>

        {/* Social Links */}
        <FadeIn delay={0.4}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#9B5DE5] to-[#00BBF9] bg-clip-text text-transparent">
                Connect on Social
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {[
                { icon: Github, href: PERSONAL_INFO.github, label: 'GitHub', color: '#9B5DE5' },
                { icon: Linkedin, href: PERSONAL_INFO.linkedin, label: 'LinkedIn', color: '#00BBF9' },
                { icon: TrendingUp, href: PERSONAL_INFO.kaggle, label: 'Kaggle', color: '#FEE440' }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -6, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  style={{ '--hover-color': social.color } as React.CSSProperties}
                >
                  <social.icon
                    className="w-10 h-10 md:w-12 md:h-12 transition-colors"
                    style={{ color: social.color }}
                  />
                  <span className="text-sm md:text-base font-semibold text-gray-300 group-hover:text-white transition-colors">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA Button */}
        <FadeIn delay={0.6}>
          <div className="text-center">
            <motion.a
              href={`mailto:${PERSONAL_INFO.email}?subject=Let's Collaborate on AI Projects`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-[#9B5DE5] via-[#B47FE5] to-[#00BBF9] hover:shadow-2xl hover:shadow-[#9B5DE5]/50 transition-all text-white font-bold text-lg"
            >
              <span>Start a Conversation</span>
              <Send className="w-5 h-5" />
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
