import React, { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * Desktop Cursor Aura (Prompt Requirement 20)
 * - Follows cursor smoothly with subtle fluid lag
 * - Translucent soft water blue aura (#2C7DA0 / #3FAFD0 at low opacity)
 * - Expands slightly when hovering over interactive elements (buttons, links)
 * - Auto-disabled on touch devices and when prefers-reduced-motion is true
 */
export default function CursorAura() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Only enable on desktop with fine pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch || prefersReducedMotion) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animationFrame;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const loop = () => {
      // Smooth linear interpolation (lerp)
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setPos({ x: currentX, y: currentY });
      animationFrame = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, [isVisible, prefersReducedMotion]);

  if (!isVisible || prefersReducedMotion) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ease-out hidden md:block"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: isHovered ? '46px' : '26px',
        height: isHovered ? '46px' : '26px',
        background: isHovered
          ? 'radial-gradient(circle, rgba(63, 175, 208, 0.22) 0%, rgba(44, 125, 160, 0.08) 70%, transparent 100%)'
          : 'radial-gradient(circle, rgba(44, 125, 160, 0.16) 0%, rgba(169, 209, 227, 0.06) 70%, transparent 100%)',
        border: isHovered ? '1px solid rgba(63, 175, 208, 0.35)' : '1px solid rgba(169, 209, 227, 0.25)',
      }}
    />
  );
}
