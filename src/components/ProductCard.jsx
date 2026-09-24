import React from 'react';
import { Gauge } from 'lucide-react';
import Button from './Button';
import AnimatedCounter from './AnimatedCounter';

/**
 * ProductCard adhering to prompt Requirements 12, 13, 14:
 * - Subtle rising water-fill wash from bottom
 * - Smooth desktop hover (translates -5px, subtle blue border, cool shadow)
 * - Animated numerical counter for genuine capacity
 */
export default function ProductCard({ product, onViewDetails, onGetQuote }) {
  return (
    <div className="group relative rounded-card bg-brand-white border border-brand-border hover:border-brand-borderBlue transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-subtle hover:shadow-[0_16px_40px_rgba(18,59,82,0.1)] hover:-translate-y-1.5">
      {/* Subtle water-level fill effect from bottom */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none bg-gradient-to-t from-brand-iceBlue/40 via-brand-mistBlue/20 to-transparent h-28 opacity-80 transition-all duration-700 ease-out origin-bottom group-hover:h-36 z-0" />

      <div className="relative z-10">
        {/* Top Product Header & Technical Image Canvas */}
        <div className="relative h-64 sm:h-72 bg-gradient-to-b from-brand-coolWhite/90 via-brand-mistBlue/40 to-brand-mistBlue/70 border-b border-brand-border overflow-hidden">
          {/* Subtle architectural drafting grid */}
          <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#123B52_1px,transparent_1px),linear-gradient(to_bottom,#123B52_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none" />

          {/* Floating Top Badges */}
          <div className="absolute top-3.5 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-brand-white/90 backdrop-blur-sm border border-brand-border/80 text-brand-primaryWaterBlue font-medium shadow-xs pointer-events-auto">
              {product.category}
            </span>

            {product.isVerified ? (
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-brand-iceBlue/90 backdrop-blur-sm border border-brand-softWaterBlue/60 text-brand-primaryWaterBlue flex items-center gap-1.5 shadow-xs pointer-events-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primaryWaterBlue animate-pulse" />
                Verified Pricing
              </span>
            ) : (
              <span className="text-[10px] font-mono text-brand-bodyText/70 px-2 py-0.5 rounded-full bg-brand-white/80 backdrop-blur-sm border border-brand-border/60 pointer-events-auto">
                Industrial Grade
              </span>
            )}
          </div>

          {/* Central Area: Product Image (Full Visual Section) or Fallback Technical Skid */}
          {product.image && !product.image.endsWith('.svg') ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center p-4 pt-11 pb-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain object-bottom filter drop-shadow-[0_12px_22px_rgba(18,59,82,0.13)] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="absolute inset-0 z-10 flex items-center justify-center p-6 pt-12">
              <div className="w-full max-w-[240px] h-28 rounded-xl bg-brand-white/90 backdrop-blur-sm border border-brand-border p-3.5 flex flex-col justify-between shadow-xs transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center gap-1 text-brand-primaryWaterBlue font-semibold">
                    <Gauge className="w-3.5 h-3.5" />
                    {product.capacityValue ? (
                      <AnimatedCounter value={product.capacityValue} suffix=" LPH" />
                    ) : (
                      product.capacity
                    )}
                  </span>
                  <span className="text-brand-deepOcean font-bold">{product.price}</span>
                </div>

                {/* Skid tube visual */}
                <div className="flex items-center gap-1.5 justify-center my-1">
                  <div className="h-7 w-6 rounded bg-brand-paleBlue border border-brand-border flex items-center justify-center text-[9px] font-mono text-brand-primaryBlue font-bold">
                    F1
                  </div>
                  <div className="h-7 w-6 rounded bg-brand-paleBlue border border-brand-border flex items-center justify-center text-[9px] font-mono text-brand-primaryBlue font-bold">
                    F2
                  </div>
                  <div className="h-8 flex-1 rounded bg-brand-primaryBlue text-brand-white flex items-center justify-center text-[10px] font-mono font-bold shadow-subtle">
                    RO MEMBRANE
                  </div>
                  <div className="h-7 w-7 rounded bg-brand-paleBlue border border-brand-border flex items-center justify-center text-[9px] font-mono text-brand-deepOcean font-bold">
                    PUMP
                  </div>
                </div>

                <div className="text-[9px] text-center text-brand-bodyText font-mono">
                  SS-304 Skid Frame • Pure Permeate
                </div>
              </div>
            </div>
          )}

          {/* Bottom grounding gradient transition */}
          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-brand-white/80 via-brand-white/30 to-transparent pointer-events-none z-15" />

          {/* Bottom ID tag inside canvas */}
          <div className="absolute bottom-2.5 right-4 z-20 pointer-events-none text-[10px] font-mono text-brand-bodyText/70 bg-brand-white/70 backdrop-blur-xs px-2 py-0.5 rounded border border-brand-border/40">
            ID: {product.id}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="p-6 sm:p-7">
          <div className="flex items-baseline justify-between mb-1.5">
            <h3 className="text-xl font-bold text-brand-ink group-hover:text-brand-primaryWaterBlue transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Pricing Highlight */}
          <div className="mb-4 flex items-baseline gap-2">
            <span className={`${product.priceRaw ? 'text-2xl font-extrabold' : 'text-base font-bold'} text-brand-deepOcean`}>
              {product.price}
            </span>
            {product.priceRaw && (
              <span className="text-xs text-brand-bodyText font-medium">
                + {product.gst}
              </span>
            )}
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-brand-bodyText leading-relaxed mb-6 font-normal">
            {product.description}
          </p>

          {/* Key Specifications (2 items) */}
          <div className="grid grid-cols-2 gap-2 mb-6 text-xs">
            {product.keySpecs.slice(0, 2).map((spec, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-brand-coolWhite border border-brand-border">
                <span className="text-[10px] text-brand-bodyText block font-mono">{spec.label}</span>
                <span className="font-semibold text-brand-deepOcean">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Buttons (Section 10 & 16) */}
      <div className="p-6 pt-0 border-t border-brand-border/60 mt-auto flex items-center gap-3">
        <button
          type="button"
          onClick={() => onViewDetails ? onViewDetails(product) : null}
          className="flex-1 py-2.5 px-3 rounded-full text-xs font-semibold text-brand-deepOcean bg-brand-coolWhite border border-brand-border hover:bg-brand-paleBlue hover:border-brand-primaryBlue transition-all text-center"
        >
          View Details
        </button>

        <Button
          variant="primary"
          to={`/contact?model=${encodeURIComponent(product.name)}`}
          onClick={() => onGetQuote ? onGetQuote(product) : null}
          className="flex-1 !py-2.5 !px-3 !text-xs font-semibold justify-center"
          showArrow={false}
        >
          Get Quote
        </Button>
      </div>
    </div>
  );
}
