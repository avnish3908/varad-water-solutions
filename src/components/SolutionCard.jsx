import React from 'react';
import { Building2, Factory, GraduationCap, Sliders, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap = {
  Building2,
  Factory,
  GraduationCap,
  Sliders,
};

export default function SolutionCard({ solution }) {
  const IconComponent = iconMap[solution.icon] || Building2;

  return (
    <div className="group rounded-card p-6 sm:p-8 bg-brand-white border border-brand-border hover:border-brand-primaryBlue/40 hover:bg-brand-paleBlue/15 transition-all duration-300 flex flex-col justify-between shadow-subtle hover:shadow-card-hover hover:-translate-y-1">
      <div>
        {/* Icon & Category */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-paleBlue border border-brand-border flex items-center justify-center text-brand-primaryBlue group-hover:scale-105 group-hover:bg-brand-primaryBlue group-hover:text-brand-white transition-all duration-300 shadow-xs">
            <IconComponent className="w-6 h-6" />
          </div>

          <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full bg-brand-coolWhite text-brand-deepOcean border border-brand-border font-medium">
            Engineering Solution
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl font-bold text-brand-ink group-hover:text-brand-primaryBlue transition-colors mb-2">
          {solution.title}
        </h3>
        <p className="text-xs font-semibold text-brand-primaryBlue mb-4">
          {solution.tagline}
        </p>

        {/* Description */}
        <p className="text-sm text-brand-bodyText leading-relaxed mb-6 font-normal">
          {solution.description}
        </p>

        {/* Key Features List */}
        <ul className="space-y-2.5 mb-8 border-t border-brand-border pt-5">
          {solution.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-brand-bodyText">
              <CheckCircle2 className="w-4 h-4 text-brand-primaryBlue shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action footer */}
      <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primaryBlue hover:text-brand-deepOcean transition-colors group/link"
        >
          <span>Explore Sizing</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1 text-brand-primaryBlue" />
        </Link>
        <Link
          to="/contact"
          className="text-[11px] font-semibold text-brand-deepOcean hover:underline"
        >
          Request Quote
        </Link>
      </div>
    </div>
  );
}
