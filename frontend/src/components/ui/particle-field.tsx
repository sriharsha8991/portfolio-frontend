"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle colors
    const colors = [
      "rgba(99, 102, 241, ", // indigo
      "rgba(6, 182, 212, ",  // cyan
      "rgba(168, 85, 247, ", // purple
      "rgba(255, 255, 255, ", // white
    ];

    // Initialize particles
    const initParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000); // ~50-100 particles
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(canvas.width, canvas.height, colors));
      }
      return particles;
    };

    const createParticle = (width: number, height: number, colors: string[]): Particle => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.1, // Drift upward
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 300 + 200,
      };
    };

    particlesRef.current = initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Calculate fade based on life
        let fadeOpacity = particle.opacity;
        const fadeIn = particle.life / 50;
        const fadeOut = (particle.maxLife - particle.life) / 50;
        fadeOpacity *= Math.min(fadeIn, fadeOut, 1);

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + fadeOpacity + ")";
        ctx.fill();

        // Add subtle glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, particle.color + (fadeOpacity * 0.3) + ")");
        gradient.addColorStop(1, particle.color + "0)");
        ctx.fillStyle = gradient;
        ctx.fill();

        // Reset particle if out of bounds or life ended
        if (
          particle.x < -10 ||
          particle.x > canvas.width + 10 ||
          particle.y < -10 ||
          particle.y > canvas.height + 10 ||
          particle.life >= particle.maxLife
        ) {
          particlesRef.current[index] = createParticle(canvas.width, canvas.height, colors);
          // Start from bottom for upward drift effect
          particlesRef.current[index].y = canvas.height + 10;
        }
      });

      // Draw connection lines between nearby particles
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
