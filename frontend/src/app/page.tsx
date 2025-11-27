"use client";

import { ScrambleText } from "@/components/ui/scramble-text";
import { ArrowRight, Copy, Terminal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-accent-indigo/30">
      {/* Hero Section - Cinematic Noir Split Layout */}
      <section className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col lg:flex-row items-center justify-center lg:justify-end">
        
        {/* 1. The Light Source (Behind Image) */}
        <div className="absolute bottom-0 left-[10%] w-[500px] h-[800px] bg-gradient-to-t from-indigo-600/20 via-purple-500/10 to-transparent blur-[150px] -z-10 rounded-full pointer-events-none" />

        {/* 2. The Subject Image (Left) */}
        <div className="absolute bottom-0 left-0 lg:left-[0%] z-10 w-full lg:w-auto flex items-end justify-center lg:justify-start pointer-events-none">
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative h-[60vh] lg:h-[105vh] w-auto"
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
            </motion.div>
        </div>

        {/* 3. Background Depth (Name Overlay) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-0 select-none hidden lg:block">
             <h1 className="text-[20vh] font-black text-white opacity-[0.03] hover:opacity-[0.15] transition-opacity duration-500 leading-none tracking-tighter vertical-rl writing-mode-vertical cursor-default">
                SRIHARSHA
             </h1>
        </div>

        {/* 4. The Content (Right Area) */}
        <div className="relative z-20 w-full lg:w-1/2 flex flex-col items-start px-8 lg:px-0 lg:pr-20 mt-[-20vh] lg:mt-0">
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
             >
                 <div className="w-12 h-1 bg-indigo-500 mb-6 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                 <h1 className="text-5xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-6 text-white">
                   ARCHITECTING <br/> 
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                     <ScrambleText text="INTELLIGENCE" />
                   </span>
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
                        className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
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
        </div>
      </section>

      {/* Bento Grid */}
      <section className="w-full max-w-5xl px-6 py-24 mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        {/* Status Card */}
        <div className="col-span-1 md:col-span-2 p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-mono text-gray-400">CURRENT_STATUS</h3>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs text-green-400 font-mono">Building TenderGenie</span>
            </div>
          </div>
          <div className="h-32 flex items-end">
             <div className="w-full bg-black/30 rounded-lg p-3 font-mono text-xs text-gray-400">
                &gt; Optimizing RAG pipeline...<br/>
                &gt; Indexing 10k+ documents...<br/>
                &gt; Accuracy: 89.77%<br/>
                <span className="animate-pulse">&gt; _</span>
             </div>
          </div>
        </div>

        {/* Location Card */}
        <div className="col-span-1 p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 transition-colors flex flex-col justify-between">
           <h3 className="text-sm font-mono text-gray-400">LOCATION</h3>
           <div className="flex-1 flex items-center justify-center">
              <div className="text-4xl">📍</div>
           </div>
           <div className="text-right">
              <p className="text-xl font-bold">Bengaluru, India</p>
              <p className="text-xs text-gray-500 font-mono">12.9716° N, 77.5946° E</p>
           </div>
        </div>

        {/* Github Card */}
        <div className="col-span-1 p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 transition-colors">
           <h3 className="text-sm font-mono text-gray-400 mb-4">CONTRIBUTIONS</h3>
           <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 49 }).map((_, i) => (
                 <div 
                    key={i} 
                    className={`w-full aspect-square rounded-sm ${Math.random() > 0.7 ? 'bg-accent-indigo' : 'bg-white/10'}`}
                    style={{ opacity: Math.random() * 0.5 + 0.2 }}
                 />
              ))}
           </div>
        </div>

        {/* Stack Cube (Placeholder) */}
        <div className="col-span-1 md:col-span-2 p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 transition-colors overflow-hidden relative group">
           <h3 className="text-sm font-mono text-gray-400 relative z-10">CORE_COMPETENCIES</h3>
           <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
              <div className="w-40 h-40 border border-accent-cyan rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute w-32 h-32 border border-accent-indigo rounded-full animate-[spin_15s_linear_infinite_reverse]" />
           </div>
           <div className="relative z-10 mt-8 grid grid-cols-2 gap-4">
              <div>
                 <div className="text-2xl font-bold">RAG</div>
                 <div className="text-xs text-gray-500">Retrieval Augmented Gen</div>
              </div>
              <div>
                 <div className="text-2xl font-bold">LLM</div>
                 <div className="text-xs text-gray-500">Orchestration & Agents</div>
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}
