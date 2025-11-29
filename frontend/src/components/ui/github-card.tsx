"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TiltCard } from "./tilt-card";

interface GitHubStats {
  lastMonth: number;
  lastYear: number;
  totalRepos: number;
  followers: number;
  contributionGraph: number[];
}

export function GitHubCard() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/github-stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  // Default graph if no data
  const defaultGraph = [0,1,0,2,1,0,1,2,0,1,3,2, 1,2,1,0,2,3,2,1,0,2,1,3, 0,1,2,3,2,1,0,1,2,3,2,1, 2,3,2,1,2,3,2,3,2,1,3,2, 1,2,3,2,1,2,1,2,3,2,1,2, 0,1,2,1,0,1,0,1,2,1,0,1];
  const graph = stats?.contributionGraph?.length === 72 ? stats.contributionGraph : defaultGraph;

  return (
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
        
        {/* Contribution Graph */}
        <div className="grid grid-cols-12 gap-1 mb-4">
          {graph.map((level, i) => (
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
            {isLoading ? (
              <div className="h-7 w-12 mx-auto bg-white/10 rounded animate-pulse" />
            ) : (
              <div className="text-green-400 font-mono font-bold text-xl">{stats?.lastMonth || 0}</div>
            )}
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Last Month</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5 hover:border-green-500/20 transition-colors">
            {isLoading ? (
              <div className="h-7 w-12 mx-auto bg-white/10 rounded animate-pulse" />
            ) : (
              <div className="text-green-400 font-mono font-bold text-xl">{stats?.lastYear || 0}</div>
            )}
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Last Year</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5 hover:border-green-500/20 transition-colors">
            {isLoading ? (
              <div className="h-7 w-12 mx-auto bg-white/10 rounded animate-pulse" />
            ) : (
              <div className="text-green-400 font-mono font-bold text-xl">{stats?.totalRepos || 0}</div>
            )}
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
  );
}
