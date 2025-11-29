"use client";

import { useRef, useEffect, ReactNode } from "react";
import VanillaTilt from "vanilla-tilt";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  options?: {
    max?: number;
    speed?: number;
    glare?: boolean;
    "max-glare"?: number;
    scale?: number;
    perspective?: number;
  };
}

export function TiltCard({ children, className = "", options = {} }: TiltCardProps) {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = tiltRef.current;
    if (!node) return;

    const defaultOptions = {
      max: 8,
      speed: 400,
      glare: true,
      "max-glare": 0.15,
      scale: 1.02,
      perspective: 1000,
      ...options,
    };

    VanillaTilt.init(node, defaultOptions);

    return () => {
      if (node?.vanillaTilt) {
        node.vanillaTilt.destroy();
      }
    };
  }, [options]);

  return (
    <div ref={tiltRef} className={className} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}
