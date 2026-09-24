import React, { useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import Button from '../components/Button';
import { projectsData } from '../data/projects';
import { businessData } from '../data/business';
import { MapPin, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageVariants, initScrollReveals } from '../animations/animations';

/**
 * Projects Page adhering to SRS Section 2.4 & Light Architectural Palette with GSAP reveals
 */
export default function Projects() {
  const verifiedProject = projectsData.find((p) => p.isVerified) || projectsData[0];
  const sampleProjects = projectsData.filter((p) => !p.isVerified);

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
            badge="Field Case Studies"
            title="Engineered Installations & Proven Results"
            subtitle="Documented deployments delivering reliable hydration and process water across schools, institutions, and industrial units in Solapur."
          />
        </div>

        {/* Featured Case Study Spotlight: Ambedkar High School, Solapur */}
        <div data-reveal="fade-up" className="rounded-surface-lg bg-brand-white border border-brand-border p-8 sm:p-12 mb-16 shadow-card-soft overflow-hidden relative">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-paleBlue border border-brand-softBlue/60 text-brand-primaryBlue flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primaryBlue" />
                  Verified Installation Spotlight
                </span>
                <span className="text-xs text-brand-bodyText flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-brand-primaryBlue" />
                  Solapur, Maharashtra
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-ink mb-4">
                {verifiedProject.title}: Campus Drinking Water Solution
              </h3>

              <div className="inline-block px-3 py-1 rounded-md bg-brand-coolWhite border border-brand-border text-xs font-mono font-bold text-brand-deepOcean mb-6">
                Installed: {verifiedProject.system} ({verifiedProject.capacity})
              </div>

              <p className="text-sm sm:text-base text-brand-bodyText leading-relaxed mb-6 font-normal">
                {verifiedProject.description}
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-brand-coolWhite border border-brand-border">
                  <span className="text-[10px] text-brand-bodyText block font-mono">Capacity</span>
                  <span className="text-base font-bold text-brand-deepOcean">100 Litres / Hr</span>
                </div>
                <div className="p-4 rounded-xl bg-brand-coolWhite border border-brand-border">
                  <span className="text-[10px] text-brand-bodyText block font-mono">Institution</span>
                  <span className="text-base font-bold text-brand-deepOcean">High School</span>
                </div>
                <div className="p-4 rounded-xl bg-brand-coolWhite border border-brand-border">
                  <span className="text-[10px] text-brand-bodyText block font-mono">Location</span>
                  <span className="text-base font-bold text-brand-deepOcean">Solapur, MH</span>
                </div>
              </div>

              <Button
                variant="primary"
                to={`/contact?requirement=Institutional+RO+like+Ambedkar+High+School`}
              >
                Inquire Similar Solution
              </Button>
            </div>

            {/* Right Side: Architectural Schematic representation */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-brand-coolWhite border border-brand-border p-6 shadow-subtle text-left">
                <div className="flex items-center justify-between pb-3 border-b border-brand-border mb-4">
                  <span className="text-xs font-mono font-semibold text-brand-primaryBlue uppercase">
                    Deployment Specs
                  </span>
                  <span className="text-[11px] font-mono text-brand-bodyText">100 LPH Skid</span>
                </div>

                <ul className="space-y-3 text-xs text-brand-bodyText mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-primaryBlue shrink-0" />
                    <span>Food-grade stainless steel SS-304 frame</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-primaryBlue shrink-0" />
                    <span>High-rejection Thin Film Composite membrane</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-primaryBlue shrink-0" />
                    <span>Dual multi-media pre-treatment protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-primaryBlue shrink-0" />
                    <span>Automatic pressure cutoff safety controls</span>
                  </li>
                </ul>

                <div className="p-3 rounded-lg bg-brand-paleBlue/50 text-xs text-brand-deepOcean font-medium">
                  Verified Quotation Basis: ₹42,000 + 18% GST equipment standard.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sample Case Studies */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-8" data-reveal="fade-up">
            <h3 className="text-xl font-bold text-brand-ink">
              Additional Industrial & Community Project Profiles
            </h3>
            <span className="text-xs text-brand-bodyText font-mono">[Configurable Sample Content]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-reveal-group>
            {sampleProjects.map((project) => (
              <div key={project.id} data-reveal-item>
                <ProjectCard project={project} inDarkSection={false} />
              </div>
            ))}
          </div>
        </div>

        {/* Data Integrity Disclaimer */}
        <div data-reveal="fade-up" className="p-5 rounded-xl bg-brand-white border border-brand-border flex items-start gap-3.5 text-xs text-brand-bodyText shadow-subtle">
          <ShieldAlert className="w-4 h-4 text-brand-primaryBlue shrink-0 mt-0.5" />
          <p>
            <strong>Content Integrity Notice:</strong> Ambedkar High School, Solapur is a verified project reference corresponding to a 100 LPH RO plant quotation. Other case studies above represent modular configurable sample templates for textile and community deployments.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
