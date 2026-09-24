import React, { useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import ContactForm from '../components/ContactForm';
import { businessData } from '../data/business';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { pageVariants, initScrollReveals } from '../animations/animations';

/**
 * Contact Page adhering to SRS Section 2.6 with GSAP reveals & Framer Motion
 */
export default function Contact() {
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
            badge="Direct Engineering Desk"
            title="Contact Varad Water Solutions"
            subtitle="Speak with our technicians, request formal equipment quotations, or book on-site water quality analysis in Solapur, Maharashtra."
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Business Information (5 cols) */}
          <div className="lg:col-span-5 space-y-8" data-reveal="fade-up">
            <div className="rounded-surface-lg bg-brand-white border border-brand-border p-8 shadow-card-soft">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-primaryBlue font-semibold block mb-2">
                Operational Office
              </span>
              <h3 className="text-2xl font-bold text-brand-ink mb-6">
                Varad Water Solutions
              </h3>

              <div className="space-y-6 text-sm">
                {/* Physical Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-paleBlue border border-brand-border flex items-center justify-center text-brand-primaryBlue shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-ink text-xs uppercase tracking-wider mb-1">
                      Facility Location (Solapur)
                    </h4>
                    <p className="text-brand-bodyText text-xs leading-relaxed">
                      {businessData.address.full}
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-paleBlue border border-brand-border flex items-center justify-center text-brand-primaryBlue shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-ink text-xs uppercase tracking-wider mb-1">
                      Working Hours
                    </h4>
                    <p className="text-brand-bodyText text-xs">
                      {businessData.hours}
                    </p>
                    <span className="text-[11px] text-brand-bodyText/70 block mt-0.5">
                      {businessData.hoursNote}
                    </span>
                  </div>
                </div>

                {/* Direct Calling */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-paleBlue border border-brand-border flex items-center justify-center text-brand-primaryBlue shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-ink text-xs uppercase tracking-wider mb-1">
                      Phone Inquiries
                    </h4>
                    <a
                      href={`tel:${businessData.phoneRaw}`}
                      className="text-brand-primaryBlue font-bold text-sm hover:text-brand-deepOcean transition-colors block"
                    >
                      {businessData.phoneDisplay}
                    </a>
                    <span className="text-[11px] text-brand-bodyText/70">
                      {businessData.phoneNote}
                    </span>
                  </div>
                </div>

                {/* Direct WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-paleBlue border border-brand-border flex items-center justify-center text-brand-primaryBlue shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-ink text-xs uppercase tracking-wider mb-1">
                      WhatsApp Messaging
                    </h4>
                    <a
                      href={`https://wa.me/${businessData.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(businessData.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-primaryBlue font-bold text-sm hover:text-brand-deepOcean transition-colors block"
                    >
                      Chat Directly via WhatsApp →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed Card */}
            <div data-reveal="fade-up" className="rounded-surface-lg bg-brand-white border border-brand-border p-4 shadow-card-soft overflow-hidden">
              <div className="flex items-center justify-between pb-3 px-2">
                <span className="text-xs font-mono uppercase tracking-wider text-brand-deepOcean font-semibold">
                  Solapur Map Coordinates
                </span>
                <a
                  href={businessData.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-primaryBlue hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="h-56 rounded-xl overflow-hidden border border-brand-border bg-brand-coolWhite">
                <iframe
                  title="Varad Water Solutions Location Map"
                  src={businessData.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form (7 cols) */}
          <div className="lg:col-span-7" data-reveal="fade-up">
            <ContactForm />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
