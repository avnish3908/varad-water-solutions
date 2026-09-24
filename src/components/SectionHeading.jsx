import React from 'react';

/**
 * Reusable SectionHeading adhering to Light-First Editorial Water Design:
 * - Headline: Dark Ink (#17252D) or White (#FFFFFF in dark sections)
 * - Subtitle: Body Text (#53666F) or Soft Blue (#BFDCEB in dark sections)
 * - Badge: Pale Blue (#E8F2F7) with Primary Blue (#256B8A) text and Bright Water Accent (#35B8D0) dot
 */
export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  dark = false, // Set true for dark contrast sections (Projects, Final CTA)
  className = '',
}) {
  const alignClasses = {
    center: 'text-center mx-auto items-center',
    left: 'text-left items-start',
    right: 'text-right items-end',
  };

  return (
    <div className={`flex flex-col max-w-3xl mb-12 md:mb-16 ${alignClasses[align] || alignClasses.center} ${className}`}>
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 shadow-subtle ${
            dark
              ? 'bg-brand-deepOcean/80 border border-brand-softBlue/30 text-brand-softBlue'
              : 'bg-brand-paleBlue border border-brand-softBlue/60 text-brand-primaryBlue'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-waterAccent animate-pulse" />
          {badge}
        </div>
      )}

      <h2
        className={`text-3xl sm:text-4xl md:text-section font-bold tracking-tight leading-tight ${
          dark ? 'text-brand-white' : 'text-brand-ink'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-normal ${
            dark ? 'text-brand-softBlue/90' : 'text-brand-bodyText'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
