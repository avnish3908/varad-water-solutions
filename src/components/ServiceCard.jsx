import React from 'react';
import { Wrench, Activity, AlertCircle, RefreshCw, ShieldCheck, Droplets, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap = {
  Wrench,
  Activity,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
  Droplets,
};

export default function ServiceCard({ service }) {
  const IconComponent = iconMap[service.icon] || Wrench;

  return (
    <div className="group rounded-card p-6 bg-brand-white border border-brand-border hover:border-brand-primaryBlue/40 hover:bg-brand-paleBlue/15 transition-all duration-300 flex flex-col justify-between shadow-subtle hover:shadow-card-hover hover:-translate-y-1">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-11 h-11 rounded-xl bg-brand-paleBlue border border-brand-border flex items-center justify-center text-brand-primaryBlue group-hover:scale-105 group-hover:bg-brand-primaryBlue group-hover:text-brand-white transition-all duration-300 shadow-xs">
            <IconComponent className="w-5 h-5" />
          </div>

          <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-brand-coolWhite border border-brand-border text-brand-deepOcean font-medium">
            {service.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-brand-ink group-hover:text-brand-primaryBlue transition-colors mb-2">
          {service.title}
        </h3>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-brand-bodyText leading-relaxed mb-4 font-normal">
          {service.summary}
        </p>

        {/* Turnaround Time */}
        <div className="flex items-center gap-1.5 text-xs text-brand-primaryBlue mb-4 font-mono font-medium">
          <Clock className="w-3.5 h-3.5" />
          <span>{service.turnaround}</span>
        </div>
      </div>

      {/* Action link */}
      <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
        <Link
          to={`/contact?service=${encodeURIComponent(service.category)}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primaryBlue hover:text-brand-deepOcean transition-colors group/link"
        >
          <span>Book Service</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1 text-brand-primaryBlue" />
        </Link>
        <span className="text-[10px] text-brand-bodyText font-mono">Solapur On-Site</span>
      </div>
    </div>
  );
}
