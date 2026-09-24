import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqsData } from '../data/faqs';
import SectionHeading from './SectionHeading';
import { Link } from 'react-router-dom';

/**
 * FAQ Component adhering to prompt Section 9:
 * - Background: Pure White (#FFFFFF)
 * - Accordion items: Cool White (#F5F8FA) with #DCE7EC border
 * - Active item: Pale Blue (#E8F2F7) background with Primary Blue (#256B8A) border
 */
export default function FAQ({ className = '' }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className={`py-20 lg:py-28 relative bg-brand-white border-t border-brand-border overflow-hidden ${className}`}>
      {/* Background soft ambient water glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-subtle-water pointer-events-none opacity-40" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Clarifications"
          title="Frequently Asked Questions"
          subtitle="Direct, transparent answers regarding system sizing, pricing, GST compliance, and local Solapur servicing."
        />

        <div className="space-y-4">
          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-card transition-all duration-200 border ${
                  isOpen
                    ? 'bg-brand-paleBlue/40 border-brand-primaryBlue/60 shadow-subtle'
                    : 'bg-brand-coolWhite border-brand-border hover:border-brand-softBlue hover:bg-brand-paleBlue/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primaryBlue rounded-card"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-brand-ink">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-brand-primaryBlue text-white rotate-180 shadow-subtle'
                        : 'bg-brand-white border border-brand-border text-brand-primaryBlue'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm text-brand-bodyText leading-relaxed border-t border-brand-border/60 pt-4 animate-in fade-in duration-200 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-brand-bodyText">
          Have a specific industrial requirement?{' '}
          <Link to="/contact" className="text-brand-primaryBlue font-semibold underline hover:text-brand-deepOcean">
            Reach out to our engineering team in Solapur
          </Link>
        </div>
      </div>
    </section>
  );
}
