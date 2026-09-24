import React, { useEffect, useState, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * Animated Number Counter component (Prompt Requirement 14)
 * - Counts smoothly from 0 to target value on viewport entry
 * - Uses genuine business numbers only (e.g. 100 LPH, 250 LPH, etc.)
 * - Duration: ~1.2s
 * - Respects prefers-reduced-motion
 */
export default function AnimatedCounter({ value, duration = 1200, prefix = '', suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const element = counterRef.current;
    if (!element) return;

    let startTime = null;
    let animationFrame;
    let observer;

    const startCounting = () => {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * value);
        setDisplayValue(current);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        } else {
          setDisplayValue(value);
        }
      };
      animationFrame = requestAnimationFrame(step);
    };

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCounting();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(element);

    return () => {
      if (observer) observer.disconnect();
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [value, duration, prefersReducedMotion]);

  return (
    <span ref={counterRef}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}
