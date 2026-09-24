import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * Water-Inspired Particle Background (Prompt Requirements 3, 4, 5, 6)
 * - Fluid flow of microscopic water droplets drifting upward-diagonal (↗)
 * - Distinct, elegant palette: #A9D1E3, #7FB8D0, #3FAFD0, occasional #2C7DA0
 * - Subtle connecting lines (< 95px) in #A9D1E3 with low opacity
 * - Interactive cursor repulsion and brightening on desktop
 * - Responsive particle density: Desktop (48), Tablet (30), Mobile (18)
 * - 100% reliable hardware-accelerated Canvas implementation with zero async failure points
 */
export default function ParticleBackground({ className = '' }) {
  const canvasRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Water droplet colors requested: #A9D1E3, #7FB8D0, #3FAFD0, occasional #2C7DA0
    const colors = ['#A9D1E3', '#7FB8D0', '#3FAFD0', '#A9D1E3', '#2C7DA0'];

    // Density: Desktop 48, Tablet 30, Mobile 18, Reduced motion 12
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const particleCount = prefersReducedMotion ? 12 : isMobile ? 18 : isTablet ? 30 : 48;

    const mouse = { x: -1000, y: -1000, radius: 110 };

    const handleMouseMove = (e) => {
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initialize particles with upward-diagonal organic drift
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 1.8, // 1.8px - 4px
        color: colors[Math.floor(Math.random() * colors.length)],
        baseOpacity: Math.random() * 0.28 + 0.18, // 0.18 - 0.46
        opacity: Math.random() * 0.28 + 0.18,
        vx: Math.random() * 0.35 + 0.18, // rightward drift (↗)
        vy: -(Math.random() * 0.32 + 0.16), // upward drift (↗)
        wobbleSpeed: Math.random() * 0.02 + 0.012,
        wobbleOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // Draw subtle connecting lines between nearby particles (< 95px)
      const maxDistance = 95;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineOpacity = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(169, 209, 227, ${lineOpacity})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // Update and draw each particle
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          // Upward diagonal fluid drift with gentle sinusoidal wave
          p.x += p.vx + Math.sin(time + p.wobbleOffset) * 0.16;
          p.y += p.vy + Math.cos(time + p.wobbleOffset) * 0.12;

          // Cursor interaction on desktop: gentle repulsion & brightening
          if (!isMobile) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius && dist > 0) {
              const force = (mouse.radius - dist) / mouse.radius;
              p.x += (dx / dist) * force * 1.6;
              p.y += (dy / dist) * force * 1.6;
              p.opacity = Math.min(0.68, p.baseOpacity + force * 0.35);
            } else {
              p.opacity = p.baseOpacity;
            }
          }

          // Wrap around edges seamlessly to maintain continuous fluid drift
          if (p.x > width + 20) p.x = -20;
          if (p.x < -20) p.x = width + 20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }

        // Draw particle body
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        // Subtle specular highlight on droplet
        ctx.beginPath();
        ctx.arc(p.x - p.radius * 0.25, p.y - p.radius * 0.25, p.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = p.opacity * 0.75;
        ctx.fill();

        ctx.globalAlpha = 1.0;
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />
    </div>
  );
}
