import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ className = '', showText = true }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 group ${className}`} aria-label="Varad Water Solutions Home">
      <div className="relative w-10 h-10 rounded-xl bg-brand-white border border-brand-border flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-brand-primaryBlue group-hover:shadow-card-soft">
        {/* Exact Authentic Graphical Emblem uploaded by user */}
        <img
          src="/images/varad-emblem.jpg"
          alt="Varad Water Solutions Emblem"
          className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-105"
          loading="eager"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-lg tracking-tight text-brand-ink group-hover:text-brand-primaryBlue transition-colors">
              VARAD
            </span>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-brand-paleBlue border border-brand-border text-brand-primaryBlue font-semibold tracking-wider">
              WATER
            </span>
          </div>
          <span className="text-[10px] tracking-widest text-brand-bodyText uppercase font-medium">
             Solutions
          </span>
        </div>
      )}
    </Link>
  );
}
