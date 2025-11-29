"use client";

import { motion } from "framer-motion";
import { ScrambleText } from "@/components/ui/scramble-text";
import { Award, GraduationCap, MapPin, Code, Cpu, Database, Cloud, Terminal, Globe, Zap, Layers } from "lucide-react";
import Image from "next/image";

const EXPERIENCE = [
  { 
    year: "Nov 2024 - Present", 
    role: "Gen AI Engineer", 
    company: "DatasmithAI", 
    desc: "Spearheaded TenderGenie (Doc Intelligence). Reduced review time by 10x. 89.77% Accuracy.",
    stack: ["Python", "RAG", "Azure", "Gemini"]
  },
  { 
    year: "Jan 2024 - May 2024", 
    role: "Research Intern", 
    company: "Siemens", 
    desc: "Research on End-to-End RAG. PDF Ingestion, Schema Parsing, Multi-LLM Benchmarking.",
    stack: ["Python", "Graph-RAG", "SQL"]
  },
];

const ARSENAL = [
  { name: "Python", icon: Code },
  { name: "FastAPI", icon: Zap },
  { name: "TypeScript", icon: Terminal },
  { name: "Gemini AI", icon: BrainIcon },
  { name: "OpenAI", icon: Cpu },
  { name: "LangChain", icon: Layers },
  { name: "Docker", icon: Database },
  { name: "Azure", icon: Cloud },
];

const STATS = [
  { label: "Kaggle Medals", value: "3x" },
  { label: "Hackathon Rank", value: "#6" },
  { label: "Students Mentored", value: "100+" },
  { label: "Projects Deployed", value: "5+" },
];

// Custom Icon component to avoid errors if Lucide icons are missing
function BrainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  )
}

export default function About() {
  return (
    <main className="min-h-screen pt-32 pb-32 px-6 max-w-[1400px] mx-auto bg-[#050505]">
      
      {/* Holographic Header */}
      <div className="mb-12 relative">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono tracking-tighter text-white">
            <ScrambleText text="OPERATIONAL_DATA" />
        </h1>
        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
            <motion.div 
               className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-accent-cyan to-transparent blur-[2px]"
               animate={{ x: ["-100%", "400%"] }}
               transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Column 1: Experience Timeline (40%) */}
        <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xl font-mono text-gray-400 mb-4 flex items-center gap-2">
                <Terminal size={18} /> MISSION_LOGS
            </h2>
            <div className="relative border-l-2 border-white/5 pl-6 space-y-8 ml-3">
                {EXPERIENCE.map((job, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative group"
                    >
                        {/* Node Dot */}
                        <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full bg-[#050505] border-2 border-accent-indigo group-hover:border-accent-cyan transition-colors shadow-[0_0_10px_rgba(99,102,241,0.3)]" />
                        
                        {/* Glass Card */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-accent-cyan/30 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative z-10">
                                <span className="text-xs font-mono text-accent-cyan bg-accent-cyan/10 px-2 py-1 rounded mb-2 inline-block">
                                    {job.year}
                                </span>
                                <h3 className="text-xl font-bold text-white mt-1">{job.role}</h3>
                                <p className="text-gray-400 text-sm font-mono mb-3">{job.company}</p>
                                <p className="text-gray-300 text-sm leading-relaxed mb-4">{job.desc}</p>
                                
                                <div className="flex flex-wrap gap-2">
                                    {job.stack.map((tech) => (
                                        <span key={tech} className="text-[10px] font-mono px-2 py-1 rounded border border-white/10 bg-black/20 text-gray-400">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Column 2: Digital Identity (25%) */}
        <div className="lg:col-span-3 h-full min-h-[500px] lg:min-h-0">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="h-full w-full relative rounded-3xl overflow-hidden border-2 border-white/10 group"
                style={{ borderImage: "linear-gradient(to bottom, rgba(99,102,241,0.5), rgba(0,0,0,0)) 1" }}
            >
                <Image 
                    src="/professional-photo.png" 
                    alt="Sriharsha Velicheti"
                    fill
                    className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                />
                
                {/* Status Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/10 backdrop-blur-md border-t border-white/10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-mono text-gray-300">STATUS</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-sm font-bold text-white tracking-wider">ONLINE</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-mono text-gray-300">LOCATION</p>
                            <p className="text-sm font-bold text-white flex items-center justify-end gap-1">
                                <MapPin size={12} /> BLR, IN
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>

        {/* Column 3: Arsenal & Stats (35%) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
            
            {/* Technical Arsenal */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden">
                <h2 className="text-xl font-mono text-gray-400 mb-6 flex items-center gap-2">
                    <Cpu size={18} /> ARSENAL
                </h2>
                <div className="grid grid-cols-4 gap-3">
                    {ARSENAL.map((tech, i) => (
                        <div key={i} className="aspect-square rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2 hover:bg-white/10 hover:border-accent-cyan/50 transition-all group cursor-default">
                            <tech.icon size={20} className="text-gray-400 group-hover:text-accent-cyan transition-colors" />
                            <span className="text-[10px] font-mono text-gray-500 group-hover:text-white transition-colors">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Key Metrics */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden">
                {/* World Map Watermark */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <Image src="/globe.svg" alt="World Map" fill className="object-cover" />
                </div>

                <h2 className="text-xl font-mono text-gray-400 mb-6 flex items-center gap-2 relative z-10">
                    <Award size={18} /> KEY_METRICS
                </h2>
                
                <div className="grid grid-cols-2 gap-4 relative z-10">
                    {STATS.map((stat, i) => (
                        <div key={i} className="p-4 rounded-xl bg-black/20 border border-white/5 hover:border-accent-indigo/50 transition-colors">
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-xs font-mono text-gray-400 uppercase">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Education Mini-Card */}
                <div className="mt-6 p-4 rounded-xl bg-accent-indigo/10 border border-accent-indigo/20 relative z-10">
                    <div className="flex items-center gap-3">
                        <GraduationCap className="text-accent-indigo" size={24} />
                        <div>
                            <div className="text-sm font-bold text-white">Jain University</div>
                            <div className="text-xs font-mono text-accent-indigo">B.Tech CSE (Data Science)</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </main>
  );
}
