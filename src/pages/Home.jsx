import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import WaterJourney from '../components/WaterJourney';
import SolutionCard from '../components/SolutionCard';
import ProductCard from '../components/ProductCard';
import ProjectCard from '../components/ProjectCard';
import ServiceCard from '../components/ServiceCard';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Button from '../components/Button';
import { solutionsData } from '../data/solutions';
import { productsData } from '../data/products';
import { projectsData } from '../data/projects';
import { servicesData } from '../data/services';
import { businessData } from '../data/business';
import { ShieldCheck, CheckCircle2, MapPin, Gauge, ArrowRight, X, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageVariants, initScrollReveals } from '../animations/animations';

export default function Home() {
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  // Initialize GSAP ScrollTrigger reveals on mount
  useEffect(() => {
    initScrollReveals();
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col bg-transparent text-brand-ink"
    >
      {/* 1. Hero Section (Ivory #FAF9F4) */}
      <Hero />

      {/* 2. Introduction Section (White #FFFFFF) */}
      <section className="py-20 lg:py-28 relative bg-brand-white border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6" data-reveal="fade-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-paleBlue border border-brand-border text-brand-primaryBlue text-xs font-semibold uppercase tracking-wider mb-4 shadow-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-waterAccent animate-pulse" />
                Rooted in Solapur, Maharashtra
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink tracking-tight leading-tight mb-6">
                Engineering Water Purity with Regional Reliability.
              </h2>
              <p className="text-base text-brand-bodyText leading-relaxed mb-6 font-normal">
                At <strong>Varad Water Solutions</strong>, we engineer commercial and industrial reverse osmosis systems configured specifically for the groundwater and municipal water dynamics of Solapur and surrounding districts.
              </p>
              <p className="text-sm text-brand-bodyText leading-relaxed mb-8 font-normal">
                From supplying educational institutions like Ambedkar High School with safe campus drinking water to configuring high-throughput multi-stage skids for manufacturing units in Solapur MIDC, our focus is mechanical integrity, transparent pricing, and fast local service.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button variant="secondary" to="/about">
                  Learn About Our Approach
                </Button>
                <div className="flex items-center gap-2 text-xs text-brand-bodyText">
                  <MapPin className="w-4 h-4 text-brand-primaryBlue" />
                  <span>Jule Solapur Road, Solapur</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6" data-reveal="fade-up">
              <div className="rounded-card bg-brand-coolWhite border border-brand-border p-8 shadow-card-soft relative overflow-hidden">
                <h3 className="text-lg font-bold text-brand-deepOcean mb-6 flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-brand-primaryBlue" />
                  <span>The Varad Engineering Standard</span>
                </h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-brand-white border border-brand-border flex items-start gap-3 shadow-subtle">
                    <CheckCircle2 className="w-5 h-5 text-brand-primaryBlue shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-brand-ink mb-0.5">Custom Sizing for Solapur Water</h4>
                      <p className="text-xs text-brand-bodyText">Pre-treatment configured according to regional TDS levels and mineral hardness.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-brand-white border border-brand-border flex items-start gap-3 shadow-subtle">
                    <CheckCircle2 className="w-5 h-5 text-brand-primaryBlue shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-brand-ink mb-0.5">Heavy-Gauge SS-304 Skids</h4>
                      <p className="text-xs text-brand-bodyText">Corrosion-resistant stainless steel structural frames built for commercial longevity.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-brand-white border border-brand-border flex items-start gap-3 shadow-subtle">
                    <CheckCircle2 className="w-5 h-5 text-brand-primaryBlue shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-brand-ink mb-0.5">Transparent Published Pricing</h4>
                      <p className="text-xs text-brand-bodyText">100 LPH @ ₹42,000 and 250 LPH @ ₹65,000 (+ 18% GST) with zero hidden markups.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solutions Section (Cool White #F5F8FA) */}
      <section className="py-20 lg:py-28 relative bg-brand-coolWhite border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal="fade-up">
            <SectionHeading
              badge="Engineering Spectrum"
              title="Purification Solutions"
              subtitle="Tailored water treatment systems for commercial facilities, industrial manufacturing, institutions, and residential societies."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-reveal-group>
            {solutionsData.map((solution) => (
              <div key={solution.id} data-reveal-item>
                <SolutionCard solution={solution} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Water Journey Visual Metaphor (Pale Blue #E8F2F7) */}
      <div data-reveal="fade-up">
        <WaterJourney />
      </div>

      {/* 5. Products Section (White #FFFFFF) */}
      <section className="py-20 lg:py-28 relative bg-brand-white border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12" data-reveal="fade-up">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-paleBlue border border-brand-border text-brand-primaryBlue text-xs font-semibold uppercase tracking-wider mb-4 shadow-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-waterAccent animate-pulse" />
                Featured Equipment
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink tracking-tight">
                Commercial & Industrial RO Plants
              </h2>
            </div>
            <Link
              to="/products"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-brand-primaryBlue hover:text-brand-deepOcean transition-colors"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4 text-brand-primaryBlue" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-reveal-group>
            {productsData.slice(0, 3).map((product) => (
              <div key={product.id} data-reveal-item>
                <ProductCard
                  product={product}
                  onViewDetails={(prod) => setSelectedProductForModal(prod)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Varad Section (Ivory #FAF9F4) */}
      <section className="py-20 lg:py-28 relative bg-brand-ivory border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-reveal="fade-up">
            <SectionHeading
              badge="The Regional Advantage"
              title="Why Choose Varad Water Solutions"
              subtitle="Built on factual engineering capability, prompt local technician response in Solapur, and uncompromised component quality."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-reveal-group>
            <div data-reveal-item className="p-7 rounded-card bg-brand-white border border-brand-border hover:border-brand-primaryBlue/40 transition-colors shadow-subtle hover:shadow-card-soft">
              <div className="w-10 h-10 rounded-xl bg-brand-paleBlue border border-brand-border flex items-center justify-center text-brand-primaryBlue mb-5">
                <MapPin className="w-5 h-5 text-brand-primaryBlue" />
              </div>
              <h3 className="text-lg font-bold text-brand-ink mb-2">Local Solapur Support</h3>
              <p className="text-xs sm:text-sm text-brand-bodyText leading-relaxed font-normal">
                Direct technician presence in Jule Solapur ensures prompt on-site attendance, regular membrane flushing, and rapid emergency troubleshooting.
              </p>
            </div>

            <div data-reveal-item className="p-7 rounded-card bg-brand-white border border-brand-border hover:border-brand-primaryBlue/40 transition-colors shadow-subtle hover:shadow-card-soft">
              <div className="w-10 h-10 rounded-xl bg-brand-paleBlue border border-brand-border flex items-center justify-center text-brand-primaryBlue mb-5">
                <Droplets className="w-5 h-5 text-brand-primaryBlue" />
              </div>
              <h3 className="text-lg font-bold text-brand-ink mb-2">High-Rejection Membranes</h3>
              <p className="text-xs sm:text-sm text-brand-bodyText leading-relaxed font-normal">
                We select genuine commercial Thin Film Composite (TFC) reverse osmosis membranes optimized for high TDS rejection and energy-efficient recovery.
              </p>
            </div>

            <div data-reveal-item className="p-7 rounded-card bg-brand-white border border-brand-border hover:border-brand-primaryBlue/40 transition-colors shadow-subtle hover:shadow-card-soft">
              <div className="w-10 h-10 rounded-xl bg-brand-paleBlue border border-brand-border flex items-center justify-center text-brand-primaryBlue mb-5">
                <ShieldCheck className="w-5 h-5 text-brand-primaryBlue" />
              </div>
              <h3 className="text-lg font-bold text-brand-ink mb-2">Zero Fabricated Claims</h3>
              <p className="text-xs sm:text-sm text-brand-bodyText leading-relaxed font-normal">
                We communicate verified data: clear equipment prices, authentic case study references (Ambedkar High School), and transparent component origins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Projects Section (Deep Ocean #123B52 - Intentional Dark Contrast Section) */}
      <section className="py-20 lg:py-28 relative bg-brand-deepOcean border-t border-brand-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12" data-reveal="fade-up">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-ink/50 border border-brand-softBlue/30 text-brand-paleBlue text-xs font-semibold uppercase tracking-wider mb-4 shadow-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-waterAccent animate-pulse" />
                Case Studies
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-white tracking-tight">
                Proven Installations in Solapur
              </h2>
            </div>
            <Link
              to="/projects"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-brand-paleBlue hover:text-white transition-colors"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4 text-brand-paleBlue" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-reveal-group>
            {projectsData.slice(0, 2).map((project) => (
              <div key={project.id} data-reveal-item>
                <ProjectCard project={project} inDarkSection={true} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Services Preview (Cool White #F5F8FA) */}
      <section className="py-20 lg:py-28 relative bg-brand-coolWhite border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12" data-reveal="fade-up">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-paleBlue border border-brand-border text-brand-primaryBlue text-xs font-semibold uppercase tracking-wider mb-4 shadow-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-waterAccent animate-pulse" />
                End-to-End Support
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-ink tracking-tight">
                Engineering Services & Maintenance
              </h2>
            </div>
            <Link
              to="/services"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-brand-primaryBlue hover:text-brand-deepOcean transition-colors"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 text-brand-primaryBlue" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-reveal-group>
            {servicesData.slice(0, 3).map((service) => (
              <div key={service.id} data-reveal-item>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ Section (White #FFFFFF) */}
      <div data-reveal="fade-up">
        <FAQ />
      </div>

      {/* 10. Final CTA Section (Deep Ocean #123B52) */}
      <div data-reveal="fade-up">
        <CTA />
      </div>

      {/* Product Details Modal */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-ink/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-brand-white border border-brand-border rounded-surface-lg max-w-xl w-full p-6 sm:p-8 shadow-card-hover relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedProductForModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-brand-coolWhite border border-brand-border text-brand-bodyText hover:text-brand-ink"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono uppercase tracking-wider text-brand-primaryBlue px-2.5 py-1 rounded-full bg-brand-paleBlue border border-brand-border inline-block mb-3 font-semibold">
              {selectedProductForModal.category}
            </span>

            {selectedProductForModal.image && (
              <div className="w-full h-44 mb-4 rounded-lg bg-brand-paleBlue/30 border border-brand-border/60 flex items-center justify-center p-3 overflow-hidden">
                <img
                  src={selectedProductForModal.image}
                  alt={selectedProductForModal.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                  loading="lazy"
                />
              </div>
            )}

            <h3 className="text-2xl font-bold text-brand-ink mb-2">
              {selectedProductForModal.name}
            </h3>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-extrabold text-brand-deepOcean">
                {selectedProductForModal.price}
              </span>
              <span className="text-xs text-brand-bodyText">
                + {selectedProductForModal.gst}
              </span>
            </div>

            <p className="text-sm text-brand-bodyText leading-relaxed mb-6 font-normal">
              {selectedProductForModal.description}
            </p>

            <h4 className="text-xs font-mono uppercase text-brand-primaryBlue tracking-wider mb-3 font-semibold">
              Technical Specifications Breakdown
            </h4>
            <div className="space-y-2 mb-6">
              {selectedProductForModal.keySpecs.map((spec, i) => (
                <div key={i} className="flex justify-between p-2.5 rounded bg-brand-coolWhite text-xs">
                  <span className="text-brand-bodyText">{spec.label}</span>
                  <span className="text-brand-deepOcean font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant="primary"
                to={`/contact?model=${encodeURIComponent(selectedProductForModal.name)}`}
                className="flex-1 justify-center"
                onClick={() => setSelectedProductForModal(null)}
              >
                Request Quotation
              </Button>
              <button
                type="button"
                onClick={() => setSelectedProductForModal(null)}
                className="px-5 py-3 rounded-full bg-brand-coolWhite border border-brand-border text-xs font-semibold text-brand-bodyText hover:text-brand-ink"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
