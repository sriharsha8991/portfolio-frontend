"use client";

import { motion } from "framer-motion";

interface FloatingShape {
  id: number;
  type: "cube" | "sphere" | "ring" | "triangle";
  size: number;
  x: string;
  y: string;
  duration: number;
  delay: number;
  color: string;
}

const shapes: FloatingShape[] = [
  { id: 1, type: "cube", size: 40, x: "10%", y: "20%", duration: 20, delay: 0, color: "indigo" },
  { id: 2, type: "sphere", size: 30, x: "85%", y: "15%", duration: 15, delay: 2, color: "cyan" },
  { id: 3, type: "ring", size: 50, x: "75%", y: "70%", duration: 25, delay: 1, color: "purple" },
  { id: 4, type: "triangle", size: 35, x: "20%", y: "75%", duration: 18, delay: 3, color: "indigo" },
  { id: 5, type: "cube", size: 25, x: "60%", y: "85%", duration: 22, delay: 4, color: "cyan" },
  { id: 6, type: "sphere", size: 20, x: "40%", y: "10%", duration: 16, delay: 2, color: "purple" },
];

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {shape.type === "cube" && (
            <div
              className={`relative preserve-3d opacity-10 hover:opacity-30 transition-opacity`}
              style={{
                width: shape.size,
                height: shape.size,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Cube faces */}
              <div
                className={`absolute inset-0 border border-${shape.color}-500/30 bg-${shape.color}-500/5`}
                style={{ transform: `translateZ(${shape.size / 2}px)` }}
              />
              <div
                className={`absolute inset-0 border border-${shape.color}-500/30 bg-${shape.color}-500/5`}
                style={{ transform: `translateZ(-${shape.size / 2}px)` }}
              />
              <div
                className={`absolute inset-0 border border-${shape.color}-500/30 bg-${shape.color}-500/5`}
                style={{ transform: `rotateY(90deg) translateZ(${shape.size / 2}px)` }}
              />
              <div
                className={`absolute inset-0 border border-${shape.color}-500/30 bg-${shape.color}-500/5`}
                style={{ transform: `rotateY(-90deg) translateZ(${shape.size / 2}px)` }}
              />
            </div>
          )}
          
          {shape.type === "sphere" && (
            <div
              className={`rounded-full border border-${shape.color}-500/20 bg-gradient-to-br from-${shape.color}-500/10 to-transparent opacity-20`}
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          
          {shape.type === "ring" && (
            <div
              className={`rounded-full border-2 border-${shape.color}-500/20 opacity-15`}
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          
          {shape.type === "triangle" && (
            <div
              className="opacity-15"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid rgba(99, 102, 241, 0.2)`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
