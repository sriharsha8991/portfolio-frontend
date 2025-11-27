"use client";

import { motion } from "framer-motion";
import { ScrambleText } from "@/components/ui/scramble-text";
import { Award, GraduationCap } from "lucide-react";

const TIMELINE = [
  { 
    year: "Nov 2024 - Present", 
    role: "Gen AI Engineer", 
    company: "DatasmithAI", 
    desc: "Spearheaded the development of TenderGenie, a document intelligence app. Reduced tender review time by 10x using RAG. Achieved 89.77% accuracy in custom evaluations and optimized keyword extraction by 100x." 
  },
  { 
    year: "Jan 2024 - May 2024", 
    role: "Research Intern", 
    company: "Siemens", 
    desc: "Conducted comprehensive research on end-to-end RAG architectures. Implemented PDF ingestion, schema-aware parsing, and multi-LLM benchmarking for knowledge graph integration." 
  },
];

const SKILLS = [
  "Python", "FastAPI", "TypeScript", "Gemini AI", "OpenAI", 
  "LangChain", "Docker", "Azure Cloud", "Qdrant", "RAG Architecture", 
  "SQL", "NLP", "System Design", "CI/CD"
];

const ACCOMPLISHMENTS = [
  "Deployed TenderGenie to 3 business clients in <1 year",
  "3x Kaggle Bronze Medalist (Contributor)",
  "6th Place (Top 4%) in Machine Hack Hackathon (92.6% Accuracy)",
  "Conducted Generative AI Workshop at I2IT Pune College",
  "President of Data Science Student Club (10 Months)",
  "Mentored 100+ students as Google Developer Student Club Facilitator",
  "NPTEL Certification: Python for Data Science (IIT Madras)"
];

export default function About() {
  return (
    <main className="min-h-screen pt-32 pb-32 px-6 max-w-5xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <ScrambleText text="Professional Profile" />
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
            Generative AI Engineer with a focus on building scalable, production-grade RAG systems and agentic architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Column: Experience */}
        <div>
          <h2 className="text-2xl font-mono text-accent-cyan mb-8 flex items-center gap-2">
            <span className="text-accent-cyan/50">01.</span> EXPERIENCE
          </h2>
          <div className="relative border-l border-white/10 pl-8 space-y-12">
            {TIMELINE.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-black border border-accent-indigo shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                <span className="text-sm font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">{item.year}</span>
                <h3 className="text-xl font-bold mt-3 text-white">{item.role}</h3>
                <p className="text-accent-indigo font-medium mb-2">{item.company}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Skills, Education, Awards */}
        <div className="space-y-16">
          
          {/* Skills */}
          <div>
            <h2 className="text-2xl font-mono text-accent-cyan mb-8 flex items-center gap-2">
                <span className="text-accent-cyan/50">02.</span> TECHNICAL_ARSENAL
            </h2>
            <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill, index) => (
                <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="px-3 py-1.5 rounded-md border border-white/10 bg-white/5 text-sm text-gray-300 hover:border-accent-cyan/50 hover:text-accent-cyan hover:bg-accent-cyan/5 transition-all cursor-default"
                >
                    {skill}
                </motion.span>
                ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-2xl font-mono text-accent-cyan mb-6 flex items-center gap-2">
                <span className="text-accent-cyan/50">03.</span> EDUCATION
            </h2>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-accent-indigo/10 text-accent-indigo">
                        <GraduationCap size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Jain University, Bengaluru</h3>
                        <p className="text-gray-400 text-sm">B.Tech CSE (Data Science)</p>
                        <div className="flex gap-4 mt-2 text-xs font-mono text-gray-500">
                            <span>2020 - 2024</span>
                            <span>•</span>
                            <span>CGPA: 8.76</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Accomplishments */}
          <div>
            <h2 className="text-2xl font-mono text-accent-cyan mb-6 flex items-center gap-2">
                <span className="text-accent-cyan/50">04.</span> ACHIEVEMENTS
            </h2>
            <div className="space-y-4">
                {ACCOMPLISHMENTS.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                        <Award size={18} className="text-yellow-500/50 mt-1 group-hover:text-yellow-400 transition-colors" />
                        <p className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors">{item}</p>
                    </div>
                ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
