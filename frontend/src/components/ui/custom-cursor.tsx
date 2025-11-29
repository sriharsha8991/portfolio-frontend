"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  
  // Position refs for smooth interpolation
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const trailPositions = useRef<{ x: number; y: number }[]>(
    Array(5).fill({ x: 0, y: 0 })
  );

  useEffect(() => {
    // Check for touch device
    if ("ontouchstart" in window) return;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest("[role='button']") !== null;
      setIsPointer(isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Smooth animation loop
    let animationId: number;
    const animate = () => {
      // Smooth cursor follow
      cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.15);
      cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.15);
      
      // Slower ring follow for trailing effect
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.08);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.08);

      // Update trail positions (chain reaction)
      for (let i = trailPositions.current.length - 1; i >= 0; i--) {
        const target = i === 0 ? cursorPos.current : trailPositions.current[i - 1];
        trailPositions.current[i] = {
          x: lerp(trailPositions.current[i].x, target.x, 0.3),
          y: lerp(trailPositions.current[i].y, target.y, 0.3),
        };
      }

      // Apply transforms
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x - 6}px, ${cursorPos.current.y - 6}px) scale(${isPointer ? 1.5 : 1})`;
      }
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px) scale(${isPointer ? 1.5 : 1})`;
      }

      // Update trail particles
      trailRefs.current.forEach((ref, i) => {
        if (ref) {
          const pos = trailPositions.current[i];
          const size = 6 - i * 1;
          const opacity = 0.5 - i * 0.1;
          ref.style.transform = `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px)`;
          ref.style.width = `${size}px`;
          ref.style.height = `${size}px`;
          ref.style.opacity = `${opacity}`;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible, isPointer]);

  // Don't render on touch devices or SSR
  if (typeof window === "undefined") return null;

  return (
    <div className={`${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}>
      {/* Trail particles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full bg-indigo-500/50 will-change-transform"
          style={{ 
            width: 6, 
            height: 6,
            transition: "opacity 0.1s ease"
          }}
        />
      ))}

      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform"
        style={{ transition: "transform 0.05s ease-out" }}
      >
        <div 
          className={`w-3 h-3 rounded-full mix-blend-difference transition-colors duration-200 ${
            isPointer ? "bg-indigo-400" : "bg-white"
          }`} 
        />
      </div>

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{ transition: "transform 0.1s ease-out" }}
      >
        <div 
          className={`w-10 h-10 rounded-full border transition-all duration-200 ${
            isPointer ? "border-indigo-400/50" : "border-white/30"
          }`} 
        />
      </div>
    </div>
  );
}
