import React from 'react';
import { MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * ProjectCard adhering to prompt Section 9 & 15:
 * Designed to look stunning in Deep Ocean (#123B52) contrast sections as well as light pages
 */
export default function ProjectCard({ project, inDarkSection = false }) {
  return (
    <div
      className={`group rounded-card transition-all duration-300 flex flex-col justify-between overflow-hidden border hover:-translate-y-1 ${
        inDarkSection
          ? 'bg-brand-ink/75 border-brand-softBlue/25 hover:border-brand-waterAccent/60 hover:bg-brand-ink/90 shadow-elevated'
          : 'bg-brand-white border-brand-border hover:border-brand-primaryBlue/50 hover:bg-brand-paleBlue/20 shadow-subtle hover:shadow-card-hover'
      }`}
    >
      <div className="p-6 sm:p-8">
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`flex items-center gap-1.5 text-xs font-medium ${
              inDarkSection ? 'text-brand-softBlue' : 'text-brand-bodyText'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-brand-primaryBlue" />
            <span>{project.location}</span>
          </div>

          {project.isVerified ? (
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                inDarkSection
                  ? 'bg-brand-primaryBlue/30 border-brand-softBlue/40 text-brand-paleBlue'
                  : 'bg-brand-paleBlue border-brand-softBlue/60 text-brand-primaryBlue'
              }`}
            >
              Verified Project
            </span>
          ) : (
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                inDarkSection
                  ? 'bg-brand-ink border-brand-softBlue/20 text-brand-softBlue/60'
                  : 'bg-brand-coolWhite border-brand-border text-brand-bodyText'
              }`}
            >
              Sample Case Study
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3
          className={`text-xl font-bold transition-colors mb-2 ${
            inDarkSection
              ? 'text-brand-white group-hover:text-brand-paleBlue'
              : 'text-brand-ink group-hover:text-brand-primaryBlue'
          }`}
        >
          {project.title}
        </h3>

        {/* System Installed Badge */}
        <div
          className={`inline-block px-3 py-1 rounded-md text-xs font-mono font-semibold mb-4 border ${
            inDarkSection
              ? 'bg-brand-deepOcean border-brand-softBlue/30 text-brand-paleBlue'
              : 'bg-brand-paleBlue/60 border-brand-border text-brand-deepOcean'
          }`}
        >
          System: {project.system}
        </div>

        {/* Summary Description */}
        <p
          className={`text-xs sm:text-sm leading-relaxed mb-6 font-normal ${
            inDarkSection ? 'text-brand-softBlue/90' : 'text-brand-bodyText'
          }`}
        >
          {project.description}
        </p>

        {/* Key Metrics */}
        <div
          className={`grid grid-cols-2 gap-2 pt-4 border-t ${
            inDarkSection ? 'border-brand-softBlue/20' : 'border-brand-border'
          }`}
        >
          {project.metrics.map((metric, i) => (
            <div
              key={i}
              className={`p-2.5 rounded-lg border ${
                inDarkSection
                  ? 'bg-brand-deepOcean/50 border-brand-softBlue/20'
                  : 'bg-brand-coolWhite border-brand-border'
              }`}
            >
              <span
                className={`text-[10px] block font-mono ${
                  inDarkSection ? 'text-brand-softBlue/70' : 'text-brand-bodyText'
                }`}
              >
                {metric.label}
              </span>
              <span
                className={`text-xs font-bold ${
                  inDarkSection ? 'text-brand-white' : 'text-brand-deepOcean'
                }`}
              >
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div
        className={`p-6 pt-0 border-t mt-4 flex items-center justify-between ${
          inDarkSection ? 'border-brand-softBlue/20' : 'border-brand-border/60'
        }`}
      >
        <span
          className={`text-[11px] font-mono ${
            inDarkSection ? 'text-brand-softBlue/70' : 'text-brand-bodyText'
          }`}
        >
          Client: {project.clientType}
        </span>
        <Link
          to="/projects"
          className={`inline-flex items-center gap-1 text-xs font-semibold transition-colors group/link ${
            inDarkSection
              ? 'text-brand-paleBlue hover:text-white'
              : 'text-brand-primaryBlue hover:text-brand-deepOcean'
          }`}
        >
          <span>Read Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
