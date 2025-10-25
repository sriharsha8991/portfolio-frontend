'use client';

import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/constants';
import { Heart, Github, Linkedin, TrendingUp } from 'lucide-react';

export function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-20 px-6 md:px-12 lg:px-16 mt-0 border-t border-white/10 bg-gradient-to-b from-[#000000] to-black">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-[#9B5DE5] to-[#00BBF9] bg-clip-text text-transparent">
              {PERSONAL_INFO.name.split(' ')[0]}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI Engineer & Agentic Systems Developer
            </p>
            <p className="text-gray-500 text-xs">
              Building intelligent systems that bridge cutting-edge AI research with real-world applications
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-lg text-[#00BBF9]">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Projects', id: 'projects' },
                { label: 'About', id: 'about' },
                { label: 'Skills', id: 'skills' },
                { label: 'Contact', id: 'contact' }
              ].map((link) => (
                <li key={link.id}>
                  <motion.button
                    onClick={() => scrollToSection(link.id)}
                    whileHover={{ x: 4 }}
                    className="text-gray-400 hover:text-[#9B5DE5] transition-colors text-sm"
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4 text-lg text-[#00BBF9]">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <span></span>
                <span className="break-all">{PERSONAL_INFO.email}</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span></span>
                <span>{PERSONAL_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <span></span>
                <span>{PERSONAL_INFO.location}</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold mb-4 text-lg text-[#00BBF9]">Follow Me</h4>
            <div className="flex gap-4">
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
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" style={{ color: social.color }} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p className="flex items-center gap-2">
               {currentYear} {PERSONAL_INFO.name}. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              Built with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> using
              <span className="text-[#00BBF9] font-semibold">Next.js</span>
              <span className="text-gray-500">•</span>
              <span className="text-[#9B5DE5] font-semibold">Tailwind</span>
              <span className="text-gray-500">•</span>
              <span className="text-[#FEE440] font-semibold">TypeScript</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
