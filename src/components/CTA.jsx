import React from 'react';
import { MessageSquare, Phone, MapPin } from 'lucide-react';
import Button from './Button';
import { businessData } from '../data/business';

/**
 * Final CTA adhering to prompt Section 9 & 15:
 * - Intentional Dark Contrast Section in Deep Ocean (#123B52)
 * - Clear conversion actions (Request Quotation, WhatsApp, Direct Call)
 */
export default function CTA({ className = '' }) {
  return (
    <section className={`py-20 lg:py-28 relative overflow-hidden bg-brand-deepOcean ${className}`}>
      {/* Background soft water subtle lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-brand-primaryWaterBlue/20 to-transparent rounded-full blur-3xl pointer-events-none opacity-60" />

      {/* Gentle expanding radial water ripple pulse (Requirement 22) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full border border-brand-brightWater/20 pointer-events-none animate-ping opacity-15 duration-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full bg-radial from-brand-primaryWaterBlue/20 via-brand-brightWater/5 to-transparent pointer-events-none opacity-40 blur-xl" />

      {/* Fine drafting grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[linear-gradient(to_right,#FFFFFF_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF_1px,transparent_1px)] bg-[size:32px_32px]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="rounded-surface-lg bg-brand-ink/40 border border-brand-softBlue/25 p-8 sm:p-12 lg:p-16 shadow-elevated backdrop-blur-md relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-deepOcean border border-brand-softBlue/30 text-brand-paleBlue text-xs font-semibold uppercase tracking-wider mb-6 shadow-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-waterAccent animate-pulse" />
              Direct Solapur Water Engineering Support
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-section font-extrabold text-brand-white tracking-tight mb-6 leading-tight">
              Ready to Engineer Your Water Solution?
            </h2>

            <p className="text-base sm:text-lg text-brand-softBlue/90 leading-relaxed mb-8 font-normal">
              Whether you need a validated 100 LPH commercial plant, a high-throughput 250 LPH institutional setup, or custom hardness softening in Solapur, our team provides transparent specifications and fast on-site service.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Button
                variant="primary"
                to="/contact"
                className="!px-8 !py-4 text-base shadow-card-soft !bg-brand-primaryBlue hover:!bg-brand-white hover:!text-brand-deepOcean transition-all"
              >
                Request Quotation
              </Button>

              <a
                href={`https://wa.me/${businessData.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(businessData.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-brand-deepOcean/80 border border-brand-softBlue/40 text-sm font-semibold text-brand-white hover:bg-brand-paleBlue hover:text-brand-deepOcean transition-all shadow-subtle"
              >
                <MessageSquare className="w-4 h-4 text-brand-paleBlue" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${businessData.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-xs font-medium text-brand-softBlue/90 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-waterAccent" />
                <span>Direct: {businessData.phoneDisplay}</span>
              </a>
            </div>

            {/* Location & Trust footer inside banner */}
            <div className="pt-6 border-t border-brand-softBlue/20 flex items-center gap-2 text-xs text-brand-softBlue/80">
              <MapPin className="w-3.5 h-3.5 text-brand-waterAccent shrink-0" />
              <span>Location: {businessData.address.line1}, Jule Solapur, Maharashtra 413008</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
