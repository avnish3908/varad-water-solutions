import React, { useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import Button from '../components/Button';
import { servicesData } from '../data/services';
import { businessData } from '../data/business';
import { CheckCircle2, ShieldCheck, Clock, Phone, Wrench, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageVariants, initScrollReveals } from '../animations/animations';

/**
 * Services Page adhering to SRS Section 2.3 & light architectural palette with GSAP reveals
 */
export default function Services() {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal="fade-up">
          <SectionHeading
            badge="End-to-End Field Services"
            title="Water Engineering & Maintenance Solutions"
            subtitle="Precision on-site commissioning, scheduled preventive maintenance, membrane diagnostics, and genuine spares replacement across Solapur."
          />
        </div>

        {/* Local Support Guarantee Banner */}
        <div data-reveal="fade-up" className="rounded-surface-lg bg-gradient-to-r from-brand-paleBlue via-brand-white to-brand-paleBlue border border-brand-border p-6 sm:p-8 mb-14 shadow-card-soft">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-brand-white border border-brand-border flex items-center justify-center text-brand-primaryBlue shadow-xs shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-brand-ink text-sm sm:text-base">Prompt Regional Response</h4>
                <p className="text-xs text-brand-bodyText">Direct technician presence in Jule Solapur.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-brand-white border border-brand-border flex items-center justify-center text-brand-primaryBlue shadow-xs shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-brand-ink text-sm sm:text-base">100% Genuine Spares</h4>
                <p className="text-xs text-brand-bodyText">Authentic membranes, pumps, and cartridges.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-brand-white border border-brand-border flex items-center justify-center text-brand-primaryBlue shadow-xs shrink-0">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-brand-ink text-sm sm:text-base">Custom AMC Contracts</h4>
                <p className="text-xs text-brand-bodyText">Comprehensive uptime for schools & businesses.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20" data-reveal-group>
          {servicesData.map((service) => (
            <div key={service.id} data-reveal-item>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {/* AMC Structured Coverage Section */}
        <div data-reveal="fade-up" className="rounded-surface-lg bg-brand-white border border-brand-border p-8 sm:p-12 mb-16 shadow-card-soft">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-primaryBlue font-semibold block mb-2">
                Annual Maintenance Contracts (AMC)
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-ink mb-4">
                Structured Maintenance for Uninterrupted Hydration
              </h3>
              <p className="text-sm text-brand-bodyText leading-relaxed mb-6 font-normal">
                Avoid premature membrane fouling and expensive pump burnouts with scheduled periodic visits. Our Solapur technicians inspect raw water TDS fluctuations, sanitize distribution pipelines, and calibrate pressure cutoffs.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 text-xs mb-8">
                <div className="flex items-center gap-2 text-brand-ink">
                  <CheckCircle2 className="w-4 h-4 text-brand-primaryBlue shrink-0" />
                  <span>Scheduled quarterly visits</span>
                </div>
                <div className="flex items-center gap-2 text-brand-ink">
                  <CheckCircle2 className="w-4 h-4 text-brand-primaryBlue shrink-0" />
                  <span>Priority emergency breakdown calls</span>
                </div>
                <div className="flex items-center gap-2 text-brand-ink">
                  <CheckCircle2 className="w-4 h-4 text-brand-primaryBlue shrink-0" />
                  <span>Routine filter replacement service</span>
                </div>
                <div className="flex items-center gap-2 text-brand-ink">
                  <CheckCircle2 className="w-4 h-4 text-brand-primaryBlue shrink-0" />
                  <span>Documented service logs</span>
                </div>
              </div>

              <Button variant="primary" to="/contact?service=AMC">
                Inquire About AMC Plans
              </Button>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-brand-coolWhite border border-brand-border text-center">
                <Droplets className="w-12 h-12 text-brand-primaryBlue mx-auto mb-3" />
                <h4 className="font-bold text-brand-deepOcean text-lg mb-1">Need Urgent Breakdown Repair?</h4>
                <p className="text-xs text-brand-bodyText mb-5">
                  Call our technical desk directly for emergency repairs across Solapur.
                </p>
                <a
                  href={`tel:${businessData.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-primaryBlue text-white text-sm font-semibold hover:bg-brand-deepOcean transition-all shadow-subtle"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {businessData.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
