import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with safety check
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Check if the user has requested reduced motion at system level
 */
export const isReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Initializes restrained GSAP ScrollTrigger section reveals (SRS 4.2 & Prompt 17)
 * Gentle fade-up feeling like flowing water and engineering precision
 */
export const initScrollReveals = () => {
  if (typeof window === 'undefined' || isReducedMotion()) return;

  try {
    // Clean up any stale scroll triggers before re-init
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Animate elements with data-reveal="fade-up"
    const revealElements = document.querySelectorAll('[data-reveal="fade-up"]');
    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Staggered reveals for cards inside grids
    const staggerContainers = document.querySelectorAll('[data-reveal-group]');
    staggerContainers.forEach((container) => {
      const children = container.querySelectorAll('[data-reveal-item]');
      if (children.length > 0) {
        gsap.fromTo(
          children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    // Water Journey conduit line progression scroll effect
    const pipeline = document.querySelector('[data-water-conduit]');
    if (pipeline) {
      gsap.fromTo(
        pipeline,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: pipeline,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Delayed refresh to ensure accurate layout calculation
    setTimeout(() => {
      try {
        ScrollTrigger.refresh();
      } catch (e) {
        // safe ignore
      }
    }, 120);
  } catch (err) {
    console.warn('ScrollTrigger animation initialization fallback:', err);
    // Safety fallback: ensure all elements remain fully visible if animation setup fails
    document.querySelectorAll('[data-reveal="fade-up"], [data-reveal-item]').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
};

/**
 * Framer Motion transition variants for page transitions and card interactions
 */
export const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.25,
      ease: 'easeIn',
    },
  },
};

export const cardHoverMotion = {
  rest: { y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  hover: { y: -4, transition: { duration: 0.3, ease: 'easeOut' } },
};
