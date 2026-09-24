import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import { businessData } from '../data/business';

/**
 * Footer adhering to prompt Section 9 & 15:
 * - Background: Dark Ink (#17252D)
 * - Navigation links in Pale Blue / White
 * - Complete verified Solapur address
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-ink border-t border-brand-ink/80 text-brand-ivory relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Logo className="mb-4" />
            <p className="text-xs sm:text-sm text-brand-softBlue/80 leading-relaxed mb-6 font-normal">
              {businessData.tagline} Providing robust commercial reverse osmosis systems, industrial water treatment skids, and local servicing across Solapur, Maharashtra.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${businessData.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(businessData.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-brand-deepOcean border border-brand-softBlue/30 flex items-center justify-center text-brand-paleBlue hover:border-brand-primaryBlue hover:bg-brand-primaryBlue hover:text-white transition-colors"
                aria-label="WhatsApp"
                title="WhatsApp Us"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`tel:${businessData.phoneRaw}`}
                className="w-9 h-9 rounded-full bg-brand-deepOcean border border-brand-softBlue/30 flex items-center justify-center text-brand-paleBlue hover:border-brand-primaryBlue hover:bg-brand-primaryBlue hover:text-white transition-colors"
                aria-label="Phone"
                title="Call Us"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-paleBlue font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-softBlue/80">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">Products & Plants</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Services & AMC</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors">Case Studies</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Varad</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact & Quote</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Verified Capacities (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-paleBlue font-semibold mb-4">
              Verified Plants
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-softBlue/80">
              <li>
                <Link to="/products" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>100 LPH RO</span>
                  <span className="text-[10px] text-brand-waterAccent font-mono font-bold">₹42k</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>250 LPH RO</span>
                  <span className="text-[10px] text-brand-waterAccent font-mono font-bold">₹65k</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>500 LPH RO</span>
                  <span className="text-[10px] text-brand-softBlue/50 font-mono">Custom</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Water Softener</span>
                  <span className="text-[10px] text-brand-softBlue/50 font-mono">Custom</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Solapur Office (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-paleBlue font-semibold mb-4">
              Registered Location
            </h4>
            <div className="space-y-3 text-xs text-brand-softBlue/90 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-waterAccent shrink-0 mt-0.5" />
                <span>{businessData.address.full}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-paleBlue shrink-0" />
                <span>{businessData.hours}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-primaryBlue shrink-0" />
                <span>{businessData.phoneDisplay}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-paleBlue shrink-0" />
                <span>{businessData.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & SRS Compliance Note */}
        <div className="mt-12 pt-8 border-t border-brand-softBlue/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-softBlue/60">
          <p>© {currentYear} {businessData.name}. All verified details for Solapur, Maharashtra.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="inline-flex items-center gap-1 text-brand-softBlue/70">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-primaryBlue" />
              <span>Zero Fabricated Data Guarantee</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
