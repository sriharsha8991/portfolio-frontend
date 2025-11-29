"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Point {
  x: number;
  y: number;
  id: number;
}

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [trail, setTrail] = useState<Point[]>([]);

  const addToTrail = useCallback((x: number, y: number) => {
    setTrail((prev) => {
      const newTrail = [...prev, { x, y, id: Date.now() + Math.random() }];
      // Keep only last 8 points
      return newTrail.slice(-8);
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
      addToTrail(e.clientX, e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null
      );
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    // Clean up old trail points
    const trailCleanup = setInterval(() => {
      setTrail((prev) => prev.slice(-6));
    }, 100);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(trailCleanup);
    };
  }, [addToTrail]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Trail particles */}
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 0, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed pointer-events-none z-[9999] rounded-full bg-indigo-500/40"
            style={{
              left: point.x,
              top: point.y,
              width: 8 - index * 0.5,
              height: 8 - index * 0.5,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main cursor dot */}
      <motion.div
        className={`fixed pointer-events-none z-[10000] rounded-full mix-blend-difference ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div className={`w-3 h-3 rounded-full bg-white ${isPointer ? "bg-indigo-400" : ""}`} />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className={`fixed pointer-events-none z-[9999] rounded-full border border-white/30 ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.8,
        }}
      >
        <div className="w-10 h-10 rounded-full" />
      </motion.div>
    </>
  );
}
