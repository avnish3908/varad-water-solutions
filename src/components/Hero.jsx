import React, { useState } from 'react';
import { ArrowRight, Droplets, CheckCircle2, ShieldCheck, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';
import { productsData } from '../data/products';
import { businessData } from '../data/business';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * Hero Section with Framer Motion text reveal & card entrance (SRS 4.1 & Prompt 17)
 */
export default function Hero({ onExploreClick, onQuoteClick }) {
  const verifiedProducts = productsData.filter((p) => p.isVerified);
  const [selectedProduct, setSelectedProduct] = useState(verifiedProducts[0] || productsData[0]);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Gentle motion transitions respecting reduced motion
  const fadeUp = (delay = 0) => ({
    initial: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: prefersReducedMotion ? 0 : delay, ease: [0.25, 0.1, 0.25, 1] },
  });

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-transparent">

      {/* Thin SVG architectural water-flow streamline paths */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
      >
        <path
          d="M-50,220 C320,160 620,310 1020,210 C1260,150 1420,260 1550,220"
          fill="none"
          stroke="#A9D1E3"
          strokeWidth="1.2"
          strokeDasharray="10 8"
        />
        <path
          d="M-80,410 C240,350 720,470 1120,370 C1360,310 1480,400 1560,380"
          fill="none"
          stroke="#3FAFD0"
          strokeWidth="1"
          strokeOpacity="0.45"
        />
        <path
          d="M-40,590 C420,520 810,630 1220,540 C1410,490 1530,570 1620,550"
          fill="none"
          stroke="#A9D1E3"
          strokeWidth="1.2"
          strokeDasharray="12 10"
        />
      </svg>

      {/* Atmospheric Soft Water Radials with blue gradation on right */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-subtle-water pointer-events-none opacity-80" />
      <div className="absolute top-12 right-0 w-[550px] h-[550px] bg-radial-soft pointer-events-none opacity-85" />

      {/* Fine architectural drafting grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[linear-gradient(to_right,#123B52_1px,transparent_1px),linear-gradient(to_bottom,#123B52_1px,transparent_1px)] bg-[size:32px_32px]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Editorial Headline & Copy with motion entrance */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Sub-badge */}
            <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-paleBlue border border-brand-border text-brand-primaryBlue text-xs sm:text-sm font-semibold mb-6 shadow-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-waterAccent animate-pulse" />
              <span>Commercial & Domestic Water Solutions • Solapur, Maharashtra</span>
            </motion.div>

            {/* Masked Line-Reveal Headline (Requirement 8) */}
            <h1 className="text-hero font-extrabold text-brand-ink tracking-tight mb-6 flex flex-col">
              <span className="overflow-hidden inline-block">
                <motion.span
                  initial={{ y: prefersReducedMotion ? 0 : "100%", opacity: prefersReducedMotion ? 1 : 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.75, delay: prefersReducedMotion ? 0 : 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                  className="inline-block"
                >
                  Water Solutions.
                </motion.span>
              </span>
              <span className="overflow-hidden inline-block">
                <motion.span
                  initial={{ y: prefersReducedMotion ? 0 : "100%", opacity: prefersReducedMotion ? 1 : 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.75, delay: prefersReducedMotion ? 0 : 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="inline-block text-brand-primaryBlue font-serif italic font-normal"
                >
                  Engineered for What Matters.
                </motion.span>
              </span>
            </h1>

            {/* Minimalist Editorial Supporting Copy */}
            <motion.p {...fadeUp(0.4)} className="text-subhead text-brand-bodyText max-w-2xl mb-8 font-normal leading-relaxed">
              Industrial and commercial reverse osmosis systems engineered for Solapur groundwater. Precision skids, transparent pricing, and direct regional technician support.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.5)} className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <Button
                variant="primary"
                to="/contact"
                onClick={onQuoteClick}
                className="w-full sm:w-auto text-base !px-8 !py-3.5 shadow-card-soft"
              >
                Get a Quote
              </Button>

              <Button
                variant="secondary"
                to="/products"
                onClick={onExploreClick}
                className="w-full sm:w-auto text-base !px-8 !py-3.5"
              >
                Explore Solutions
              </Button>
            </motion.div>

            {/* Genuine Trust Badges */}
            <motion.div {...fadeUp(0.6)} className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-brand-border w-full max-w-xl text-left">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-primaryBlue shrink-0" />
                <span className="text-xs text-brand-bodyText font-medium">100% Genuine Spares</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-brand-primaryBlue shrink-0" />
                <span className="text-xs text-brand-bodyText font-medium">Verified Service</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Gauge className="w-4 h-4 text-brand-primaryBlue shrink-0" />
                <span className="text-xs text-brand-bodyText font-medium">Published Quotations</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual - Clean Engineering Presentation Card */}
          <motion.div
            initial={{ opacity: prefersReducedMotion ? 1 : 0, scale: prefersReducedMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Soft pale blue back shadow */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-brand-paleBlue/80 via-brand-softBlue/30 to-brand-paleBlue/50 rounded-surface-lg blur-lg opacity-80" />

            <div className="relative rounded-surface-lg bg-brand-white border border-brand-border p-6 sm:p-7 shadow-card-soft">
              {/* Engineering Presentation Header */}
              <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-primaryBlue" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-brand-deepOcean font-mono">
                    System Architecture Specification
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-brand-paleBlue border border-brand-border text-brand-primaryBlue font-medium">
                  SERIES 2026
                </span>
              </div>

              {/* Verified Model Selector Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-brand-coolWhite border border-brand-border mb-6">
                {verifiedProducts.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => setSelectedProduct(prod)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                      selectedProduct.id === prod.id
                        ? 'bg-brand-white text-brand-deepOcean font-bold shadow-subtle border border-brand-border'
                        : 'text-brand-bodyText hover:text-brand-ink'
                    }`}
                  >
                    {prod.name.split(' ')[0]} {prod.name.split(' ')[1]}
                  </button>
                ))}
              </div>

              {/* Engineering Card Surface */}
              <div className="relative rounded-2xl bg-brand-coolWhite border border-brand-border p-5 mb-6 overflow-hidden">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-brand-bodyText block mb-1">
                      Purification Output
                    </span>
                    <div className="text-3xl font-extrabold text-brand-deepOcean flex items-baseline gap-1.5">
                      <span>{selectedProduct.capacityValue}</span>
                      <span className="text-sm font-semibold text-brand-primaryBlue">Litres / Hour</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-brand-bodyText block mb-1">
                      Verified Pricing
                    </span>
                    <div className="text-xl font-bold text-brand-deepOcean">
                      {selectedProduct.price}
                    </div>
                    <span className="text-[10px] text-brand-bodyText font-medium">
                      + {selectedProduct.gst}
                    </span>
                  </div>
                </div>

                {/* Clean Blue Line Conduit Diagram */}
                <div className="relative h-20 rounded-xl bg-brand-white border border-brand-border p-3 flex items-center justify-between px-5 shadow-xs">
                  {/* Inlet */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-brand-paleBlue border border-brand-border flex items-center justify-center text-brand-primaryBlue">
                      <Droplets className="w-4 h-4 text-brand-primaryBlue" />
                    </div>
                    <span className="text-[9px] mt-1 font-mono text-brand-bodyText">Raw Feed</span>
                  </div>

                  {/* Flow Conduit Line */}
                  <div className="flex-1 mx-3 relative flex items-center">
                    <div className="w-full h-1 bg-brand-paleBlue rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-brand-softBlue via-brand-primaryBlue to-brand-waterAccent rounded-full" />
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -top-3 px-2 py-0.5 rounded-full bg-brand-white border border-brand-border text-[9px] font-mono text-brand-deepOcean font-medium shadow-subtle">
                      RO Membrane
                    </div>
                  </div>

                  {/* Clean Output */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-brand-paleBlue border border-brand-primaryBlue flex items-center justify-center text-brand-primaryBlue shadow-subtle">
                      <Droplets className="w-4 h-4 text-brand-primaryBlue fill-brand-primaryBlue/20" />
                    </div>
                    <span className="text-[9px] mt-1 font-mono text-brand-primaryBlue font-bold">Pure Water</span>
                  </div>
                </div>
              </div>

              {/* Minimal Technical Labels */}
              <div className="grid grid-cols-2 gap-3 text-xs mb-5">
                <div className="p-2.5 rounded-xl bg-brand-paleBlue/40 border border-brand-border">
                  <span className="text-[10px] text-brand-bodyText block font-mono">Skid Construction</span>
                  <span className="font-semibold text-brand-deepOcean">Stainless Steel SS-304</span>
                </div>
                <div className="p-2.5 rounded-xl bg-brand-paleBlue/40 border border-brand-border">
                  <span className="text-[10px] text-brand-bodyText block font-mono">Regional Service</span>
                  <span className="font-semibold text-brand-deepOcean">Solapur District</span>
                </div>
              </div>

              {/* Presentation Footer Link */}
              <div className="pt-3 border-t border-brand-border flex items-center justify-between text-xs">
                <span className="text-brand-bodyText text-[11px]">
                  Ref Installation:{' '}
                  <span className="text-brand-deepOcean font-semibold">Ambedkar High School</span>
                </span>
                <Button
                  variant="secondary"
                  to="/products"
                  showArrow={true}
                  className="!py-1.5 !px-3.5 !text-xs font-semibold"
                >
                  View Plant Specs
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
