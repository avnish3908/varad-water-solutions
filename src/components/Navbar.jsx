import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Phone, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import Button from './Button';
import { businessData } from '../data/business';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * Navbar component with dedicated, isolated mobile navigation system:
 * - Desktop (>= 1024px): Standard horizontal pill nav and desktop actions
 * - Mobile / Tablet (< 1024px): Dedicated isolated drawer panel with smooth backdrop
 * - Animated Hamburger ☰ ↔ × icon transition
 * - Body scroll locking while menu is open (preserves scroll position)
 * - Escape key & outside click auto-dismissal
 * - Staggered link reveal & consistent active state pill styling
 */
export default function Navbar({ onQuoteClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Scroll detection to adjust navbar height & blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close menu on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scrolling when mobile menu is open (Requirement 8)
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Keyboard accessibility: Escape key closes menu (Requirement 13)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Auto-close menu when viewport is resized to desktop width (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-brand-white/98 backdrop-blur-md border-b border-brand-border py-2.5 shadow-[0_4px_25px_rgba(18,59,82,0.07)]'
            : 'bg-brand-ivory/85 backdrop-blur-sm py-4 sm:py-5 border-b border-brand-border/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Logo />

            {/* Desktop Navigation Links (Visible on desktop >= 1024px) */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-1.5 px-3 py-1.5 rounded-full bg-brand-white/95 border border-brand-border shadow-subtle"
              aria-label="Main Navigation"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-[#E8F3F8] text-[#2C7DA0] font-semibold shadow-xs border border-brand-border/40'
                        : 'text-brand-ink/80 hover:text-[#2C7DA0] hover:bg-[#E8F3F8]/50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop Actions (Visible on desktop >= 1024px) */}
            <div className="hidden lg:flex items-center gap-3">
              {/* WhatsApp direct chat link */}
              <a
                href={`https://wa.me/${businessData.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(businessData.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-white border border-brand-border text-brand-primaryBlue hover:border-brand-primaryBlue hover:bg-brand-paleBlue transition-all shadow-subtle"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              {/* Direct phone link */}
              <a
                href={`tel:${businessData.phoneRaw}`}
                aria-label="Call Varad Water Solutions"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-brand-white border border-brand-border text-brand-deepOcean hover:border-brand-primaryBlue hover:bg-brand-paleBlue transition-all shadow-subtle"
                title="Call Us"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* Primary Blue Quote CTA Button */}
              <Button
                variant="primary"
                to="/contact"
                onClick={onQuoteClick}
                className="!py-2 !px-4 !text-xs uppercase tracking-wider font-semibold"
              >
                Get a Quote
              </Button>
            </div>

            {/* Mobile & Tablet Header Controls (Visible on < 1024px) */}
            <div className="flex lg:hidden items-center gap-2 sm:gap-2.5">
              {/* WhatsApp Quick Chat Icon */}
              <a
                href={`https://wa.me/${businessData.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(businessData.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-white border border-brand-border text-brand-primaryBlue flex items-center justify-center hover:border-brand-primaryBlue hover:bg-brand-paleBlue/50 transition-all shadow-subtle"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </a>

              {/* Direct Phone Call Icon (Shown on sm+ tablets / wide phones) */}
              <a
                href={`tel:${businessData.phoneRaw}`}
                className="hidden sm:flex w-10 h-10 rounded-xl bg-brand-white border border-brand-border text-brand-deepOcean items-center justify-center hover:border-brand-primaryBlue hover:bg-brand-paleBlue/50 transition-all shadow-subtle"
                aria-label="Call Varad Water Solutions"
                title="Call Us"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* Animated Menu Toggle Button (Requirement 5: smooth ☰ ↔ × transition) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="w-10 h-10 rounded-xl bg-brand-white border border-brand-border text-brand-ink flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-primaryBlue hover:border-brand-primaryBlue transition-all shadow-subtle"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-panel"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                <div className="w-5 h-3.5 relative flex flex-col justify-between items-center" aria-hidden="true">
                  <span
                    className={`w-5 h-0.5 bg-brand-deepOcean rounded-full transition-all duration-300 ease-out origin-center ${
                      mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''
                    }`}
                  />
                  <span
                    className={`w-5 h-0.5 bg-brand-deepOcean rounded-full transition-all duration-200 ease-out ${
                      mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`w-5 h-0.5 bg-brand-deepOcean rounded-full transition-all duration-300 ease-out origin-center ${
                      mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Isolated Layer (Rendered outside <header> to prevent containing-block / overflow traps) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Subtle Translucent Backdrop (Requirement 9) */}
            <motion.div
              key="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.22, ease: "easeOut" }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#123B52]/15 backdrop-blur-[2px] z-40 lg:hidden"
              aria-hidden="true"
            />

            {/* Mobile Navigation Dropdown / Drawer Panel (Requirements 2, 3, 4, 6) */}
            <motion.div
              key="mobile-nav-panel"
              id="mobile-navigation-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
              initial={{
                opacity: prefersReducedMotion ? 1 : 0,
                y: prefersReducedMotion ? 0 : -14,
                scale: prefersReducedMotion ? 1 : 0.98,
              }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.28,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="fixed top-[70px] sm:top-[78px] inset-x-3.5 sm:inset-x-auto sm:right-6 sm:w-[360px] max-w-md mx-auto z-50 bg-brand-white border border-brand-border rounded-2xl p-4 sm:p-5 shadow-[0_16px_40px_rgba(18,59,82,0.12)] max-h-[calc(100vh-86px)] overflow-y-auto lg:hidden"
            >
              {/* Header indicator inside panel */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-brand-border/60">
                <span className="text-[11px] font-mono uppercase tracking-widest text-brand-bodyText">
                  Navigation Menu
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-paleBlue text-brand-primaryBlue font-semibold">
                  Solapur, MH
                </span>
              </div>

              {/* Navigation Links with gentle stagger (Requirement 4) */}
              <motion.nav
                className="flex flex-col space-y-1"
                aria-label="Mobile Navigation Links"
                initial="initial"
                animate="animate"
                variants={{
                  animate: {
                    transition: {
                      staggerChildren: prefersReducedMotion ? 0 : 0.04,
                      delayChildren: prefersReducedMotion ? 0 : 0.04,
                    },
                  },
                }}
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.path}
                    variants={{
                      initial: { opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : -8 },
                      animate: { opacity: 1, x: 0, transition: { duration: 0.2, ease: "easeOut" } },
                    }}
                  >
                    <NavLink
                      to={link.path}
                      end={link.path === '/'}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? 'bg-[#E8F3F8] text-[#2C7DA0] shadow-xs border border-brand-border/50'
                            : 'text-brand-ink/80 hover:text-[#2C7DA0] hover:bg-[#E8F3F8]/40'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span>{link.label}</span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2C7DA0]" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Bottom Actions inside panel */}
              <div className="pt-3.5 mt-3 border-t border-brand-border/70 flex flex-col gap-2.5">
                <Button
                  variant="primary"
                  to="/contact"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onQuoteClick) onQuoteClick();
                  }}
                  className="w-full justify-center !py-2.5 !text-xs uppercase tracking-wider font-semibold shadow-card-soft"
                >
                  Get a Quote
                </Button>

                <div className="flex items-center justify-between pt-1 px-1 text-xs text-brand-bodyText">
                  <a
                    href={`tel:${businessData.phoneRaw}`}
                    className="inline-flex items-center gap-1.5 font-medium text-brand-deepOcean hover:text-brand-primaryBlue transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-primaryBlue" />
                    <span>{businessData.phoneDisplay}</span>
                  </a>

                  <span className="text-[11px] font-mono text-brand-bodyText/70">
                    {businessData.hours.split(':')[0]}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
