import React, { useState, useMemo, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { productsData } from '../data/products';
import { businessData } from '../data/business';
import { Sliders, ShieldAlert, X, ArrowRight, Gauge, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageVariants, initScrollReveals } from '../animations/animations';

/**
 * Products Page redesigned for Light-First Editorial Water Theme
 */
export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  useEffect(() => {
    initScrollReveals();
  }, [selectedCategory]);

  // Sizing Calculator State
  const [occupancy, setOccupancy] = useState('medium');

  const categories = ['All', 'Commercial', 'Industrial', 'Water Softening', 'Domestic'];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return productsData;
    if (selectedCategory === 'Commercial') {
      return productsData.filter((p) => p.category.includes('Commercial'));
    }
    return productsData.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));
  }, [selectedCategory]);

  const recommendedProduct = useMemo(() => {
    switch (occupancy) {
      case 'small':
        return productsData.find((p) => p.id === '100lph-ro');
      case 'medium':
        return productsData.find((p) => p.id === '250lph-ro');
      case 'large':
      case 'industrial':
        return productsData.find((p) => p.id === '500lph-ro') || productsData[1];
      default:
        return productsData[0];
    }
  }, [occupancy]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28 pb-20 lg:pt-36 lg:pb-28 bg-transparent min-h-screen text-brand-ink"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div data-reveal="fade-up">
          <SectionHeading
            badge="Product Catalog & Specifications"
            title="Reverse Osmosis & Water Treatment Plants"
            subtitle="Precision-engineered purification skids manufactured for commercial establishments, educational campuses, and industrial processing in Solapur."
          />
        </div>

        {/* Capacity Sizing Advisor Widget */}
        <div data-reveal="fade-up" className="rounded-surface-lg bg-gradient-to-r from-brand-paleBlue via-brand-coolWhite to-brand-paleBlue border border-brand-border p-6 sm:p-8 mb-12 shadow-card-soft relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-white text-brand-primaryBlue text-xs font-mono uppercase tracking-wider mb-4 border border-brand-border shadow-xs font-semibold">
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Sizing Calculator</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-brand-deepOcean mb-2">
              Find the Right Plant Capacity for Your Daily Usage
            </h3>
            <p className="text-xs sm:text-sm text-brand-bodyText mb-6 font-normal">
              Select your institution or workplace scale to calculate estimated hourly water demand and view recommended equipment.
            </p>

            {/* Occupancy Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { key: 'small', label: '30–100 People', note: 'Clinics, Small Offices' },
                { key: 'medium', label: '100–350 People', note: 'Schools, Hostels, Hotels' },
                { key: 'large', label: '350–800 People', note: 'Colleges, Canteens' },
                { key: 'industrial', label: 'Industrial Line', note: 'Boiler / Processing' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setOccupancy(opt.key)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    occupancy === opt.key
                      ? 'bg-brand-primaryBlue text-brand-white border-brand-primaryBlue font-semibold shadow-card-soft'
                      : 'bg-brand-white border-brand-border text-brand-ink hover:border-brand-primaryBlue/50'
                  }`}
                >
                  <span className="block text-xs font-bold">{opt.label}</span>
                  <span className={`text-[10px] block mt-0.5 ${occupancy === opt.key ? 'text-brand-white/80' : 'text-brand-bodyText'}`}>
                    {opt.note}
                  </span>
                </button>
              ))}
            </div>

            {/* Recommendation Result Banner */}
            {recommendedProduct && (
              <div className="p-4 rounded-xl bg-brand-white border border-brand-primaryBlue/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle">
                <div>
                  <span className="text-[10px] uppercase font-mono text-brand-bodyText tracking-wider block">
                    Recommended Model for Your Scale:
                  </span>
                  <span className="text-base font-bold text-brand-deepOcean">
                    {recommendedProduct.name} ({recommendedProduct.capacity})
                  </span>
                  <div className="text-xs text-brand-primaryBlue font-bold">
                    {recommendedProduct.price} {recommendedProduct.isVerified && `+ ${recommendedProduct.gst}`}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProductForModal(recommendedProduct)}
                    className="px-4 py-2 rounded-full bg-brand-paleBlue text-xs font-semibold text-brand-primaryBlue border border-brand-border hover:bg-brand-softBlue/60"
                  >
                    View Specs
                  </button>
                  <Button
                    variant="primary"
                    to={`/contact?model=${encodeURIComponent(recommendedProduct.name)}`}
                    className="!py-2 !px-4 !text-xs font-semibold"
                  >
                    Request Quote
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div data-reveal="fade-up" className="flex items-center justify-between flex-wrap gap-4 border-b border-brand-border pb-6 mb-10">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-brand-primaryBlue text-brand-white font-semibold shadow-card-soft'
                    : 'bg-brand-white border border-brand-border text-brand-bodyText hover:text-brand-ink hover:border-brand-primaryBlue/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-brand-bodyText">
            Showing {filteredProducts.length} {selectedCategory === 'Domestic' ? 'Domestic Systems' : selectedCategory === 'All' ? 'Systems' : `${selectedCategory} Systems`}
          </div>
        </div>

        {/* Product Cards Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20" data-reveal-group>
          {filteredProducts.map((product) => (
            <div key={product.id} data-reveal-item>
              <ProductCard
                product={product}
                onViewDetails={(prod) => setSelectedProductForModal(prod)}
              />
            </div>
          ))}
        </div>

        {/* Technical Specification Matrix (Comparison) */}
        <div data-reveal="fade-up" className="rounded-surface-lg bg-brand-white border border-brand-border p-6 sm:p-8 overflow-hidden mb-16 shadow-card-soft">
          <div className="mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-primaryBlue font-semibold">
              Engineering Comparison Matrix
            </span>
            <h3 className="text-2xl font-bold text-brand-ink mt-1">
              RO Systems Specifications Breakdown
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-brand-border text-brand-deepOcean font-mono text-xs bg-brand-paleBlue/40">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">100 LPH RO Plant</th>
                  <th className="py-3 px-4">250 LPH RO Plant</th>
                  <th className="py-3 px-4">500 LPH Industrial</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-brand-ink font-normal">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-brand-deepOcean">Base Price</td>
                  <td className="py-3.5 px-4 font-bold text-brand-deepOcean">₹42,000</td>
                  <td className="py-3.5 px-4 font-bold text-brand-deepOcean">₹65,000</td>
                  <td className="py-3.5 px-4 font-semibold text-brand-bodyText">[Custom Quote]</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-brand-bodyText">Applicable Tax</td>
                  <td className="py-3 px-4">18% GST Extra</td>
                  <td className="py-3 px-4">18% GST Extra</td>
                  <td className="py-3 px-4">18% GST Extra</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-brand-bodyText">Purification Capacity</td>
                  <td className="py-3 px-4 font-mono font-semibold">100 Litres / Hour</td>
                  <td className="py-3 px-4 font-mono font-semibold">250 Litres / Hour</td>
                  <td className="py-3 px-4 font-mono">500 Litres / Hour</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-brand-bodyText">Skid Frame Construction</td>
                  <td className="py-3 px-4">Stainless Steel SS-304</td>
                  <td className="py-3 px-4">Stainless Steel SS-304</td>
                  <td className="py-3 px-4">Heavy Gauge SS-304 Skid</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-brand-bodyText">Booster Pumping</td>
                  <td className="py-3 px-4">Commercial Grade Pump</td>
                  <td className="py-3 px-4">Vertical Multistage High-Pressure</td>
                  <td className="py-3 px-4">Vertical Multistage Industrial</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-brand-bodyText">Typical Deployment</td>
                  <td className="py-3 px-4">Clinics, Offices, Small Schools</td>
                  <td className="py-3 px-4">Schools, Hostels, Hotels, Mess</td>
                  <td className="py-3 px-4">Manufacturing, Dyeing, Canteens</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-brand-bodyText">Reference Installation</td>
                  <td className="py-3 px-4 text-brand-primaryBlue font-semibold">Ambedkar High School, Solapur</td>
                  <td className="py-3 px-4 text-brand-bodyText">Solapur Institutional Setups</td>
                  <td className="py-3 px-4 text-brand-bodyText">MIDC Solapur Region</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer / Data Integrity Banner (SRS Section 6) */}
        <div data-reveal="fade-up" className="p-4 rounded-xl bg-brand-paleBlue/50 border border-brand-border flex items-start gap-3 text-xs text-brand-bodyText">
          <ShieldAlert className="w-4 h-4 text-brand-primaryBlue shrink-0 mt-0.5" />
          <p>
            <strong>Data Integrity Notice:</strong> 100 LPH (₹42,000) and 250 LPH (₹65,000) are verified baseline quotations subject to 18% GST. All other listings and higher capacity ratings represent configurable sample items. Custom quotations depend on raw water TDS and piping requirements in Solapur.
          </p>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-ink/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-brand-white border border-brand-border rounded-surface-lg max-w-xl w-full p-6 sm:p-8 shadow-card-hover relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedProductForModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-brand-coolWhite border border-brand-border text-brand-bodyText hover:text-brand-ink"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono uppercase tracking-wider text-brand-primaryBlue px-2.5 py-1 rounded-full bg-brand-paleBlue border border-brand-border inline-block mb-3 font-semibold">
              {selectedProductForModal.category}
            </span>

            {selectedProductForModal.image && (
              <div className="w-full h-44 mb-4 rounded-lg bg-brand-paleBlue/30 border border-brand-border/60 flex items-center justify-center p-3 overflow-hidden">
                <img
                  src={selectedProductForModal.image}
                  alt={selectedProductForModal.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                  loading="lazy"
                />
              </div>
            )}

            <h3 className="text-2xl font-bold text-brand-ink mb-2">
              {selectedProductForModal.name}
            </h3>

            <div className="flex items-baseline gap-2 mb-4">
              <span className={`${selectedProductForModal.priceRaw ? 'text-2xl' : 'text-xl'} font-extrabold text-brand-deepOcean`}>
                {selectedProductForModal.price}
              </span>
              {selectedProductForModal.priceRaw && (
                <span className="text-xs text-brand-bodyText font-medium">
                  + {selectedProductForModal.gst}
                </span>
              )}
            </div>

            <p className="text-sm text-brand-bodyText leading-relaxed mb-6 font-normal">
              {selectedProductForModal.description}
            </p>

            <h4 className="text-xs font-mono uppercase text-brand-primaryBlue tracking-wider mb-3 font-semibold">
              Technical Specifications Breakdown
            </h4>
            <div className="space-y-2 mb-6">
              {selectedProductForModal.keySpecs.map((spec, i) => (
                <div key={i} className="flex justify-between p-2.5 rounded bg-brand-coolWhite text-xs">
                  <span className="text-brand-bodyText">{spec.label}</span>
                  <span className="text-brand-deepOcean font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>

            {selectedProductForModal.recommendedFor && (
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase text-brand-primaryBlue tracking-wider mb-2 font-semibold">
                  Recommended Deployment
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProductForModal.recommendedFor.map((item, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded bg-brand-paleBlue border border-brand-border text-brand-deepOcean font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-brand-border">
              <Button
                variant="primary"
                to={`/contact?model=${encodeURIComponent(selectedProductForModal.name)}`}
                className="flex-1 justify-center"
                onClick={() => setSelectedProductForModal(null)}
              >
                Request Quotation
              </Button>
              <button
                type="button"
                onClick={() => setSelectedProductForModal(null)}
                className="px-5 py-3 rounded-full bg-brand-coolWhite border border-brand-border text-xs font-semibold text-brand-bodyText hover:text-brand-ink"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
