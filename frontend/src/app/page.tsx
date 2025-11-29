"use client";

import { ScrambleText } from "@/components/ui/scramble-text";
import { TiltCard } from "@/components/ui/tilt-card";
import { ArrowRight, Copy, Terminal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [time, setTime] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  
  // Parallax scroll hooks
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Trigger intro animation after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-background selection:bg-accent-indigo/30">
      {/* Film Grain Overlay */}
      <div className="film-grain" />
      
      {/* Hero Section - Cinematic Noir Split Layout */}
      <section ref={heroRef} className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col lg:flex-row items-center justify-center lg:justify-end">
        
        {/* Neural Noise Background */}
        <motion.div 
          className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none animate-pan" 
          style={{ 
            y: bgY,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* 1. The Light Source (Behind Image) - Volumetric Lighting */}
        <motion.div 
          className="absolute bottom-0 left-[15%] w-[600px] h-[800px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Lens Flare Separator */}
        <motion.div 
          className="absolute left-[45%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent hidden lg:block z-10"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isLoaded ? { scaleY: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        />

        {/* Name Separator - Rotated 90 degrees */}
        <motion.div 
          className="absolute left-[38%] top-1/2 -translate-y-1/2 -translate-x-1/2 z-5 select-none hidden lg:block"
          initial={{ opacity: 0, x: -50 }}
          animate={isLoaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
             <h1 
               className="glitch-text text-[14vh] font-black text-white opacity-[0.1] hover:opacity-100 transition-all duration-500 leading-none tracking-tighter -rotate-90 whitespace-nowrap cursor-default hover:text-white hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] hover:[text-shadow:0_0_40px_#fff,0_0_80px_#fff,0_0_120px_#6366f1]"
               data-text="SRIHARSHA"
             >
                SRIHARSHA
             </h1>
        </motion.div>

        {/* Decor: Top Right Time */}
        <motion.div 
          className="absolute top-8 right-8 font-mono text-xs text-white/20 tracking-widest z-30 hidden lg:block"
          initial={{ opacity: 0, y: -20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
            SYS_OPTIMIZED // [{time}]
        </motion.div>

        {/* 2. The Subject Image (Left) */}
        <motion.div 
          className="absolute bottom-0 left-0 lg:left-[2%] z-10 w-full lg:w-auto flex items-end justify-center lg:justify-start pointer-events-none"
          style={{ y: imageY, opacity }}
        >
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative h-[55vh] lg:h-[95vh] w-auto"
            >
                <Image
                    src="/hero-profile.png"
                    alt="Sriharsha Velicheti"
                    height={1600}
                    width={1000}
                    quality={100}
                    className="h-full w-auto object-contain object-bottom"
                    style={{
                        filter: "grayscale(100%) contrast(1.25) brightness(1.1) drop-shadow(0 25px 50px -12px rgba(0, 0, 0, 0.5))",
                        maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent 100%)"
                    }}
                    priority
                />
                <div className="absolute bottom-[15%] left-[10%] px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-xs font-mono text-white/60 hidden lg:block">
                    ENTITY: 001 // ARCHITECT
                </div>
            </motion.div>
        </motion.div>

        {/* 4. The Content (Right Area) */}
        <motion.div 
          className="relative z-20 w-full lg:w-1/2 flex flex-col items-start px-8 lg:px-0 lg:pr-20 mt-[-20vh] lg:mt-0"
          style={{ y: textY }}
        >
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
             >
                 <div className="w-12 h-1 bg-indigo-500 mb-6 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                 <h1 className="text-5xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-6 text-white">
                   <ScrambleText text="ARCHITECTING" delay={300} /> <br/> 
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-gray-400">
                     <ScrambleText text="INTELLIGENCE" delay={800} />
                   </span>
                   <span className="inline-block w-3 h-12 bg-indigo-500 ml-2 animate-pulse align-middle" />
                 </h1>
                 <p className="text-lg lg:text-xl text-gray-400 max-w-md font-light border-l-2 border-white/10 pl-4 mb-8">
                   Gen-AI Engineer • Systems Architect • Builder
                   <br/>
                   <span className="text-sm text-gray-500 mt-2 block">Developing High-Fidelity RAG Systems & Agents. Based in Bangalore.</span>
                 </p>
                 
                 {/* Buttons */}
                 <div className="flex flex-wrap gap-4">
                      <Link
                        href="/projects"
                        className="px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:bg-indigo-500 hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] hover:scale-105"
                      >
                        View Work <ArrowRight size={18} />
                      </Link>
                      <button className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-full transition-colors flex items-center gap-2 group text-white">
                        <Terminal size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                        <span className="font-mono text-sm">Copy Terminal</span>
                        <Copy size={14} className="text-gray-500 group-hover:text-white transition-colors" />
                      </button>
                 </div>
             </motion.div>
        </motion.div>

        {/* Infinite Marquee */}
        <motion.div 
          className="absolute bottom-0 w-full bg-gradient-to-r from-black via-black/80 to-black border-t border-white/10 py-4 overflow-hidden z-30 group/marquee"
          initial={{ y: 100, opacity: 0 }}
          animate={isLoaded ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
            <div className="animate-marquee flex items-center gap-6 group-hover/marquee:[animation-play-state:paused]">
                {[1, 2, 3, 4].map((idx) => (
                  <div key={idx} className="flex items-center gap-6 shrink-0">
                    <span className="px-4 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-400 text-sm font-mono whitespace-nowrap cursor-pointer hover:bg-indigo-500/40 hover:scale-105 transition-all">RAG</span>
                    <span className="text-white/20">•</span>
                    <span className="px-4 py-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-mono whitespace-nowrap cursor-pointer hover:bg-cyan-500/40 hover:scale-105 transition-all">AGENTS</span>
                    <span className="text-white/20">•</span>
                    <span className="px-4 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-mono whitespace-nowrap cursor-pointer hover:bg-purple-500/40 hover:scale-105 transition-all">LLMs</span>
                    <span className="text-white/20">•</span>
                    <span className="text-white/40 font-mono text-sm whitespace-nowrap cursor-pointer hover:text-white/70 transition-all">PYTHON</span>
                    <span className="text-white/20">•</span>
                    <span className="text-white/40 font-mono text-sm whitespace-nowrap cursor-pointer hover:text-white/70 transition-all">NEXT.JS</span>
                    <span className="text-white/20">•</span>
                    <span className="text-white/40 font-mono text-sm whitespace-nowrap cursor-pointer hover:text-white/70 transition-all">TYPESCRIPT</span>
                    <span className="text-white/20">•</span>
                    <span className="text-white/40 font-mono text-sm whitespace-nowrap cursor-pointer hover:text-white/70 transition-all">LANGCHAIN</span>
                    <span className="text-white/20">•</span>
                    <span className="text-white/40 font-mono text-sm whitespace-nowrap cursor-pointer hover:text-white/70 transition-all">VECTOR DB</span>
                    <span className="text-white/20">•</span>
                    <span className="text-white/40 font-mono text-sm whitespace-nowrap cursor-pointer hover:text-white/70 transition-all">FASTAPI</span>
                    <span className="text-white/20">•</span>
                  </div>
                ))}
            </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 hidden lg:flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-white/30 text-xs font-mono tracking-widest">SCROLL</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* Section Transition */}
      <div className="relative w-full py-28 bg-gradient-to-b from-[#050505] via-[#080808] to-[#050505] overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_60%)]" />
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-500/30 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-500/40 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div 
            className="flex items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" />
              <h2 className="text-2xl md:text-3xl font-mono text-white/70 tracking-[0.3em]">AT A GLANCE</h2>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" />
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Bento Grid */}
      <section className="w-full max-w-6xl px-8 pb-32 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Status Card */}
        <TiltCard className="col-span-1 md:col-span-2">
          <motion.div 
            className="h-full p-10 rounded-4xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md hover:border-indigo-500/30 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(99,102,241,0.12)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-mono text-gray-400 group-hover:text-indigo-400 transition-colors tracking-wider">CURRENT_STATUS</h3>
            <div className="flex items-center gap-3">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
              </span>
              <span className="text-sm text-green-400 font-mono">Building TenderGenie</span>
            </div>
          </div>
          <div className="h-44 flex items-end">
             <div className="w-full bg-black/50 rounded-xl p-6 font-mono text-sm text-gray-400 border border-white/5 leading-relaxed">
                <div className="text-indigo-400 text-base">&gt; system.init()</div>
                <div className="mt-1">&gt; Optimizing RAG pipeline...</div>
                <div className="mt-1">&gt; Indexing <span className="text-cyan-400 font-semibold">10,247</span> documents...</div>
                <div className="mt-1">&gt; Accuracy: <span className="text-green-400 font-semibold">89.77%</span></div>
                <span className="animate-pulse text-indigo-400 text-base">&gt; _</span>
             </div>
          </div>
          </motion.div>
        </TiltCard>

        {/* Location Card */}
        <TiltCard className="col-span-1">
          <motion.div 
            className="h-full p-10 rounded-4xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md hover:border-cyan-500/30 transition-all duration-500 flex flex-col justify-between group hover:shadow-[0_0_40px_rgba(6,182,212,0.12)] relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
           {/* Map-like grid pattern */}
           <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
           <h3 className="text-base font-mono text-gray-400 group-hover:text-cyan-400 transition-colors relative z-10 tracking-wider">LOCATION</h3>
           <div className="flex-1 flex items-center justify-center relative z-10 py-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                  <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <div className="absolute inset-0 w-20 h-20 rounded-full border border-cyan-500/20 animate-ping" style={{ animationDuration: '2s' }} />
              </div>
           </div>
           <div className="text-right relative z-10">
              <p className="text-2xl font-bold">Bengaluru</p>
              <p className="text-sm text-gray-500 font-mono mt-1">12.9716° N, 77.5946° E</p>
           </div>
          </motion.div>
        </TiltCard>

        {/* Github Card - Enhanced */}
        <TiltCard className="col-span-1">
          <motion.div 
            className="h-full p-10 rounded-4xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md hover:border-green-500/30 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(34,197,94,0.12)] relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
           {/* GitHub Icon Background */}
           <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity">
             <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
             </svg>
           </div>
           
           <div className="flex items-center justify-between mb-6">
             <h3 className="text-base font-mono text-gray-400 group-hover:text-green-400 transition-colors tracking-wider">CONTRIBUTIONS</h3>
             <a href="https://github.com/sriharsha8991" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-green-400 transition-colors font-mono">@sriharsha8991</a>
           </div>
           
           {/* Contribution Graph - More Dynamic */}
           <div className="grid grid-cols-12 gap-1 mb-4">
              {[0,1,0,2,1,0,1,2,0,1,3,2, 1,2,1,0,2,3,2,1,0,2,1,3, 0,1,2,3,2,1,0,1,2,3,2,1, 2,3,2,1,2,3,2,3,2,1,3,2, 1,2,3,2,1,2,1,2,3,2,1,2, 0,1,2,1,0,1,0,1,2,1,0,1].map((level, i) => (
                 <div 
                    key={i} 
                    className={`aspect-square rounded-sm transition-all duration-300 ${
                      level === 0 ? 'bg-white/5' :
                      level === 1 ? 'bg-green-500/30' :
                      level === 2 ? 'bg-green-500/50' :
                      'bg-green-500/80 shadow-[0_0_4px_rgba(34,197,94,0.5)]'
                    } group-hover:scale-110`}
                    style={{ transitionDelay: `${i * 8}ms` }}
                 />
              ))}
           </div>
           
           {/* Stats Row */}
           <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5 hover:border-green-500/20 transition-colors">
                <div className="text-green-400 font-mono font-bold text-xl">127</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Last Month</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5 hover:border-green-500/20 transition-colors">
                <div className="text-green-400 font-mono font-bold text-xl">847</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Last Year</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5 hover:border-green-500/20 transition-colors">
                <div className="text-green-400 font-mono font-bold text-xl">12</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Repos</div>
              </div>
           </div>
           
           <div className="flex items-center justify-between text-sm">
             <div className="flex items-center gap-1.5">
               <span className="text-gray-600">Less</span>
               {[0,1,2,3].map(l => (
                 <div key={l} className={`w-3.5 h-3.5 rounded-sm ${l === 0 ? 'bg-white/5' : l === 1 ? 'bg-green-500/30' : l === 2 ? 'bg-green-500/50' : 'bg-green-500/80'}`} />
               ))}
               <span className="text-gray-600">More</span>
             </div>
             <span className="text-gray-500 font-mono text-xs">2024-2025</span>
           </div>
          </motion.div>
        </TiltCard>

        {/* Stack / Core Competencies - Enhanced */}
        <TiltCard className="col-span-1 md:col-span-2">
          <motion.div 
            className="h-full p-10 rounded-4xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md hover:border-purple-500/30 transition-all duration-500 overflow-hidden relative group hover:shadow-[0_0_40px_rgba(168,85,247,0.12)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
           <h3 className="text-base font-mono text-gray-400 relative z-10 group-hover:text-purple-400 transition-colors tracking-wider">CORE_STACK</h3>
           
           {/* DNA Helix Style Background */}
           <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity overflow-hidden">
              <div className="absolute w-full h-[200%] animate-[spin_30s_linear_infinite]">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute left-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent origin-left"
                    style={{ transform: `rotate(${i * 45}deg)` }}
                  />
                ))}
              </div>
           </div>
           
           {/* Skill Cards with Progress */}
           <div className="relative z-10 mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { name: 'RAG', desc: 'Systems', color: 'indigo', level: 95 },
                { name: 'LLM', desc: 'Agents', color: 'cyan', level: 90 },
                { name: 'ML', desc: 'Pipeline', color: 'purple', level: 85 },
                { name: 'API', desc: 'Design', color: 'green', level: 92 },
              ].map((skill, idx) => (
                <div 
                  key={skill.name}
                  className={`p-5 rounded-2xl bg-${skill.color}-500/5 border border-${skill.color}-500/20 hover:bg-${skill.color}-500/10 transition-all duration-300 hover:scale-105 group/skill cursor-default`}
                >
                  <div className={`text-3xl font-bold text-${skill.color}-400 mb-2`}>{skill.name}</div>
                  <div className="text-xs text-gray-500 mb-4">{skill.desc}</div>
                  {/* Progress bar */}
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full bg-gradient-to-r from-${skill.color}-500 to-${skill.color}-400`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
           </div>
           
           {/* Tech Tags with Icons */}
           <div className="relative z-10 mt-8 flex flex-wrap gap-3">
              {[
                { name: 'Python', icon: '🐍' },
                { name: 'TypeScript', icon: '📘' },
                { name: 'LangChain', icon: '🔗' },
                { name: 'Pinecone', icon: '🌲' },
                { name: 'FastAPI', icon: '⚡' },
                { name: 'Next.js', icon: '▲' },
                { name: 'Docker', icon: '🐳' },
                { name: 'AWS', icon: '☁️' },
              ].map((tech) => (
                <span 
                  key={tech.name} 
                  className="px-4 py-2 text-sm font-mono text-gray-400 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300 cursor-default flex items-center gap-2 group/tech"
                >
                  <span className="group-hover/tech:scale-110 transition-transform text-base">{tech.icon}</span>
                  {tech.name}
                </span>
              ))}
           </div>
          </motion.div>
        </TiltCard>
      </section>
    </main>
  );
}
