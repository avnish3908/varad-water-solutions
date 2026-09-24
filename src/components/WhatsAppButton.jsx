import React from 'react';
import { MessageSquare } from 'lucide-react';
import { businessData } from '../data/business';

/**
 * Floating WhatsApp CTA Button (SRS Section 3 Component Architecture)
 * Fixed on bottom-right, unobtrusive, accessible
 */
export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${businessData.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(businessData.whatsappMessage)}`;

  return (
    <aside
      aria-label="Direct Support"
      className="fixed bottom-6 right-6 z-40 flex items-center group"
    >
      <div className="mr-3 px-3 py-1.5 rounded-full bg-brand-charcoal/90 border border-brand-border text-xs text-brand-softBlue shadow-elevated opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 hidden sm:block">
        Quick Quote on WhatsApp
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Varad Water Solutions on WhatsApp"
        className="w-13 h-13 p-3.5 rounded-full bg-brand-electric text-white shadow-electric-glow hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-brand-softBlue/30 hover:border-white focus:outline-none focus:ring-4 focus:ring-brand-electric/50"
      >
        <MessageSquare className="w-6 h-6 fill-white/20" />
      </a>
    </aside>
  );
}
