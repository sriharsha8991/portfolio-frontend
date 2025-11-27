"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ScrambleText } from "@/components/ui/scramble-text";
import { useRef } from "react";

const TIMELINE_STAGES = [
  {
    year: "2024 - Present",
    title: "The GenAI Era",
    description: "Building agents, deploying RAG systems, and pushing the boundaries of what's possible with LLMs.",
    photos: [
      { src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485", caption: "Deploying TenderGenie" },
      { src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c", caption: "Late Night Debugging" },
      { src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", caption: "Hackathon Win" },
    ]
  },
  {
    year: "2023",
    title: "Research & Development",
    description: "Deep diving into neural networks, Siemens internship, and mastering the art of system design.",
    photos: [
      { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998", caption: "Siemens Research Lab" },
      { src: "https://images.unsplash.com/photo-1504384308090-c54be3855833", caption: "First Neural Net" },
    ]
  },
  {
    year: "2022",
    title: "Data Science Core",
    description: "Honors in Data Science. Mastering Python, SQL, and the foundations of machine learning.",
    photos: [
      { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71", caption: "Data Visualization" },
      { src: "https://images.unsplash.com/photo-1543286386-713df548e9cc", caption: "Team Project" },
      { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644", caption: "Campus Life" },
    ]
  },
  {
    year: "2021",
    title: "The Learning Curve",
    description: "Exploring algorithms, competitive coding, and building the first set of real-world projects.",
    photos: [
      { src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97", caption: "First Setup" },
      { src: "https://images.unsplash.com/photo-1587620962725-abab7fe55159", caption: "Coding Marathon" },
    ]
  },
  {
    year: "Early Days",
    title: "Hello World",
    description: "Where it all started. The curiosity, the first lines of code, and the dream of building the future.",
    photos: [
      { src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4", caption: "First Laptop" },
      { src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", caption: "Hello World" },
    ]
  }
];

export default function Life() {
  return (
    <main className="min-h-screen pt-32 pb-32 px-6 max-w-5xl mx-auto">
      <div className="mb-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <ScrambleText text="Personal Archives" />
        </h1>
        <p className="text-gray-400 text-lg">
          A visual timeline of the journey.
        </p>
      </div>

      <div className="relative border-l-2 border-white/10 ml-4 md:ml-1/2 space-y-32">
        {TIMELINE_STAGES.map((stage, index) => (
          <TimelineSection key={index} stage={stage} index={index} />
        ))}
      </div>
    </main>
  );
}

function TimelineSection({ stage, index }: { stage: typeof TIMELINE_STAGES[0], index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, y }}
      className="relative pl-12 md:pl-0"
    >
      {/* Timeline Dot */}
      <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 top-0 w-3 h-3 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)] z-10" />

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
        
        {/* Text Content */}
        <div className={`text-left ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'}`}>
          <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-cyan font-mono text-sm mb-4">
            {stage.year}
          </span>
          <h2 className="text-3xl font-bold mb-4 text-white">{stage.title}</h2>
          <p className="text-gray-400 leading-relaxed">{stage.description}</p>
        </div>

        {/* Photos Grid */}
        <div className={`grid grid-cols-2 gap-4 ${index % 2 === 0 ? 'md:pl-12' : 'md:order-1 md:pr-12'}`}>
          {stage.photos.map((photo, i) => (
            <div 
              key={i} 
              className={`relative rounded-xl overflow-hidden border border-white/10 bg-white/5 group ${i === 0 && stage.photos.length === 3 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}`}
            >
              <img 
                src={photo.src} 
                alt={photo.caption}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-mono text-xs">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
