import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  color: { r: number; g: number; b: number };
}

export const CursorGlow: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = usePortfolio();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: SmokeParticle[] = [];
    let mouse = { x: -1000, y: -1000, lastX: -1000, lastY: -1000, moved: false };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      if (!mouse.moved) {
        mouse.x = currentX;
        mouse.y = currentY;
        mouse.lastX = currentX;
        mouse.lastY = currentY;
        mouse.moved = true;
        return;
      }

      const dx = currentX - mouse.lastX;
      const dy = currentY - mouse.lastY;
      const dist = Math.hypot(dx, dy);

      // Spawn gentle smoke puffs (light, pleasant, short trail)
      const steps = Math.min(Math.max(Math.floor(dist / 14), 1), 3);
      for (let i = 0; i < steps; i++) {
        const interpX = mouse.lastX + (dx * i) / steps;
        const interpY = mouse.lastY + (dy * i) / steps;

        // Palette: Ethereal subtle cyan-blue smoke tint
        const isCyan = Math.random() > 0.35;
        const color = isCyan
          ? theme === 'dark'
            ? { r: 56, g: 189, b: 248 } // Soft Sky Blue
            : { r: 14, g: 165, b: 233 }
          : theme === 'dark'
          ? { r: 129, g: 140, b: 248 } // Soft Indigo
          : { r: 99, g: 102, b: 241 };

        particles.push({
          x: interpX + (Math.random() - 0.5) * 6,
          y: interpY + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.2 - Math.random() * 0.4, // Light upward drift
          radius: 12 + Math.random() * 10,
          maxRadius: 35 + Math.random() * 18, // Light puff
          alpha: theme === 'dark' ? 0.16 : 0.10,
          maxAlpha: theme === 'dark' ? 0.16 : 0.10,
          life: 0,
          maxLife: 22 + Math.random() * 10, // Short, graceful tail
          color,
        });
      }

      mouse.lastX = currentX;
      mouse.lastY = currentY;
      mouse.x = currentX;
      mouse.y = currentY;
    };

    const handleMouseLeave = () => {
      mouse.moved = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Smoke expands and drifts
        const progress = p.life / p.maxLife;
        const currentRadius = p.radius + (p.maxRadius - p.radius) * progress;
        const currentAlpha = p.maxAlpha * (1 - progress);

        if (p.life >= p.maxLife || currentAlpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw soft feathered smoke puff
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius);
        gradient.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha})`);
        gradient.addColorStop(0.4, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Limit particle array to prevent memory buildup
      if (particles.length > 250) {
        particles.splice(0, particles.length - 250);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 w-full h-full"
      style={{ mixBlendMode: theme === 'dark' ? 'screen' : 'multiply' }}
    />
  );
};
