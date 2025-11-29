"use client";

import { ReactNode } from "react";

interface GlowingBorderProps {
  children: ReactNode;
  className?: string;
  borderColor?: string;
  glowColor?: string;
  borderWidth?: number;
  animated?: boolean;
}

export function GlowingBorder({ 
  children, 
  className = "", 
  borderColor = "from-indigo-500 via-purple-500 to-cyan-500",
  glowColor = "rgba(99, 102, 241, 0.3)",
  borderWidth = 1,
  animated = true 
}: GlowingBorderProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated gradient border */}
      <div 
        className={`absolute -inset-[${borderWidth}px] rounded-[inherit] bg-gradient-to-r ${borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${animated ? 'animate-border-rotate' : ''}`}
        style={{
          background: animated 
            ? `conic-gradient(from var(--border-angle, 0deg), #6366f1, #a855f7, #06b6d4, #6366f1)`
            : undefined,
          padding: borderWidth,
          borderRadius: 'inherit',
        }}
      />
      {/* Glow effect */}
      <div 
        className="absolute -inset-1 rounded-[inherit] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        style={{ background: glowColor }}
      />
      {/* Content */}
      <div className="relative bg-[#0a0a0a] rounded-[inherit] h-full">
        {children}
      </div>
    </div>
  );
}
