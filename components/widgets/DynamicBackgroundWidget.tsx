"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

interface MousePosition {
  x: number;
  y: number;
}

export const DynamicBackgroundWidget: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number>();
  const dimensionsRef = useRef({ width: 0, height: 0 });

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    const particleCount = Math.min(150, Math.floor((width * height) / 10000));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: `hsl(${Math.random() * 30 + 200}, 60%, 65%)`, // Light blue to purple range
        alpha: Math.random() * 0.5 + 0.2
      });
    }
    
    return particles;
  };

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        dimensionsRef.current = { width: window.innerWidth, height: window.innerHeight };
        particlesRef.current = initParticles(canvas.width, canvas.height);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(240, 242, 255, 0.05)");
      gradient.addColorStop(1, "rgba(235, 240, 255, 0.05)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mouse interaction
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx -= (dx / distance) * force * 0.2;
          particle.vy -= (dy / distance) * force * 0.2;
        }

        // Apply velocity damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace("50%)", `50%, ${particle.alpha})`);
        ctx.fill();

        // Draw connections between nearby particles
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = otherParticle.x - particle.x;
          const dy = otherParticle.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(150, 180, 255, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Draw mouse glow effect
      const mouseGradient = ctx.createRadialGradient(
        mousePosition.x, mousePosition.y, 0,
        mousePosition.x, mousePosition.y, 150
      );
      mouseGradient.addColorStop(0, "rgba(150, 180, 255, 0.08)");
      mouseGradient.addColorStop(1, "rgba(150, 180, 255, 0)");
      ctx.fillStyle = mouseGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [mousePosition]);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      <div className="futuristic-bg">
        <div className="futuristic-grid"></div>
        <div className="futuristic-glow"></div>
        <div className="futuristic-overlay"></div>
      </div>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ background: "transparent" }}
      />
    </div>
  );
};