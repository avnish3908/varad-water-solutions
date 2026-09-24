import React, { useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { businessData } from '../data/business';
import { MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { pageVariants, initScrollReveals } from '../animations/animations';

/**
 * About Page adhering to SRS Section 2.5 with GSAP reveals & Framer Motion
 */
export default function About() {
  useEffect(() => {
    initScrollReveals();
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28 pb-20 lg:pt-36 lg:pb-28 bg-transparent min-h-screen text-brand-ink"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal="fade-up">
          <SectionHeading
            badge="Company Overview"
            title="About Varad Water Solutions"
            subtitle="A dedicated water engineering enterprise providing robust commercial purification systems and reliable on-ground service in Solapur, Maharashtra."
          />
        </div>

        {/* 1. Who We Are */}
        <section data-reveal="fade-up" className="mb-16 p-8 sm:p-10 rounded-surface-lg bg-brand-white border border-brand-border shadow-card-soft">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-primaryBlue font-semibold block mb-2">
            01 // Who We Are
          </span>
          <h3 className="text-2xl font-bold text-brand-ink mb-4">
            Regional Water Engineering Specialists in Solapur
          </h3>
          <p className="text-sm sm:text-base text-brand-bodyText leading-relaxed mb-4 font-normal">
            <strong>Varad Water Solutions</strong> is based in Jule Solapur, Maharashtra. We operate with a straightforward mission: delivering dependable, industrial-grade water purification equipment engineered specifically to solve regional groundwater and borewell water challenges.
          </p>
          <div className="flex items-center gap-2 text-xs font-medium text-brand-deepOcean">
            <MapPin className="w-4 h-4 text-brand-primaryBlue" />
            <span>Operating from 6, Mangal Terrace, Jule Solapur Road, opposite IMS School</span>
          </div>
        </section>

        {/* 2. What We Do */}
        <section data-reveal="fade-up" className="mb-16 p-8 sm:p-10 rounded-surface-lg bg-brand-coolWhite border border-brand-border shadow-subtle">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-primaryBlue font-semibold block mb-2">
            02 // What We Do
          </span>
          <h3 className="text-2xl font-bold text-brand-ink mb-4">
            Commercial RO Plants & Comprehensive Water Treatment
          </h3>
          <p className="text-sm sm:text-base text-brand-bodyText leading-relaxed mb-6 font-normal">
            We assemble, supply, install, and service commercial reverse osmosis plants (featuring our verified 100 LPH and 250 LPH systems), industrial process water skids, and ion-exchange water softeners.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-brand-white border border-brand-border flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-primaryBlue shrink-0" />
              <span className="font-medium text-brand-ink">Commercial RO Plants (100–500+ LPH)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-brand-white border border-brand-border flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-primaryBlue shrink-0" />
              <span className="font-medium text-brand-ink">Hardness Softening & Pre-Filtration</span>
            </div>
            <div className="p-3.5 rounded-xl bg-brand-white border border-brand-border flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-primaryBlue shrink-0" />
              <span className="font-medium text-brand-ink">Annual Maintenance Contracts (AMC)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-brand-white border border-brand-border flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-primaryBlue shrink-0" />
              <span className="font-medium text-brand-ink">Local Filter & Membrane Replacements</span>
            </div>
          </div>
        </section>

        {/* 3. Our Approach */}
        <section data-reveal="fade-up" className="mb-16 p-8 sm:p-10 rounded-surface-lg bg-brand-white border border-brand-border shadow-card-soft">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-primaryBlue font-semibold block mb-2">
            03 // Our Approach
          </span>
          <h3 className="text-2xl font-bold text-brand-ink mb-4">
            Integrity, Published Pricing & Technical Rigor
          </h3>
          <p className="text-sm sm:text-base text-brand-bodyText leading-relaxed mb-6 font-normal">
            We reject the aggressive sales tactics and vague pricing common in the retail RO space. Instead, we publish clear equipment costs (e.g. ₹42,000 for 100 LPH, ₹65,000 for 250 LPH, + 18% GST), specify authentic SS-304 frames, and conduct water tests before recommending membrane architectures.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-brand-paleBlue/40 border border-brand-border">
              <span className="text-lg font-bold text-brand-deepOcean block mb-1">01. Test</span>
              <p className="text-xs text-brand-bodyText">Evaluate inlet TDS & hardness</p>
            </div>
            <div className="p-4 rounded-xl bg-brand-paleBlue/40 border border-brand-border">
              <span className="text-lg font-bold text-brand-deepOcean block mb-1">02. Configure</span>
              <p className="text-xs text-brand-bodyText">Select optimal booster & membrane</p>
            </div>
            <div className="p-4 rounded-xl bg-brand-paleBlue/40 border border-brand-border">
              <span className="text-lg font-bold text-brand-deepOcean block mb-1">03. Support</span>
              <p className="text-xs text-brand-bodyText">Provide reliable local maintenance</p>
            </div>
          </div>
        </section>

        {/* 4. Why Water Quality Matters */}
        <section data-reveal="fade-up" className="mb-16 p-8 sm:p-10 rounded-surface-lg bg-brand-coolWhite border border-brand-border shadow-subtle">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-primaryBlue font-semibold block mb-2">
            04 // Why Water Quality Matters
          </span>
          <h3 className="text-2xl font-bold text-brand-ink mb-4">
            Protecting Health, Machinery, and Operational Uptime
          </h3>
          <p className="text-sm sm:text-base text-brand-bodyText leading-relaxed mb-4 font-normal">
            Across Solapur, groundwater often contains excessive Total Dissolved Solids (TDS) and mineral hardness. For educational institutions and workplaces, pure water directly safeguards health and daily productivity. For industrial units and boilers, conditioned water prevents scaling, protects expensive piping, and saves substantial energy costs.
          </p>
        </section>

        {/* 5. Contact CTA */}
        <section data-reveal="fade-up" className="p-8 sm:p-10 rounded-surface-lg bg-brand-deepOcean text-brand-white text-center shadow-elevated">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-paleBlue font-semibold block mb-2">
            05 // Get In Touch
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-brand-white mb-4">
            Discuss Your Water Requirements With Us
          </h3>
          <p className="text-sm text-brand-softBlue/90 max-w-xl mx-auto mb-8 font-normal">
            Whether for a school drinking water station, commercial establishment, or factory process, we provide straightforward consultations and transparent quotations.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" to="/contact" className="!bg-brand-primaryBlue hover:!bg-brand-white hover:!text-brand-deepOcean">
              Contact Us Directly
            </Button>
            <a
              href={`https://wa.me/${businessData.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(businessData.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-ink/80 border border-brand-softBlue/30 text-sm font-semibold text-brand-white hover:bg-brand-paleBlue hover:text-brand-deepOcean transition-all"
            >
              WhatsApp Support
            </a>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
