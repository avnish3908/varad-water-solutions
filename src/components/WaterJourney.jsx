import React, { useState, useEffect, useRef } from 'react';
import { Waves, Filter, Gauge, Disc, Sparkles } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Water Journey Component adhering to prompt Requirement 11:
 * - Title: "From Source to Pure"
 * - 5 Stages: SOURCE -> FILTER -> PURIFICATION -> RO MEMBRANE -> PURE WATER
 * - Scroll-driven progressive path drawing (#A9D1E3 -> #3FAFD0 -> #2C7DA0)
 * - Travelling blue particle along the conduit
 * - Active stage highlighted, previous stages muted, next stages subtle
 * - Final stage (PURE WATER) receives signature blue highlight
 */
export default function WaterJourney() {
  const [activeStage, setActiveStage] = useState(0);
  const sectionRef = useRef(null);

  const stages = [
    {
      id: 'source',
      stepNumber: '01',
      name: 'SOURCE',
      title: 'Raw Water Inflow',
      summary: 'Raw groundwater or municipal supply with regional TDS, suspended solids, and minerals.',
      specs: 'Input TDS: 400–2500+ PPM',
      icon: Waves,
      tag: 'Raw Feed',
    },
    {
      id: 'filter',
      stepNumber: '02',
      name: 'FILTER',
      title: 'Dual Pre-Filtration',
      summary: 'Dual media and 5-micron sediment barriers intercept silt, iron rust, and particulate matter.',
      specs: 'Sediment Cutoff: < 5 Micron',
      icon: Filter,
      tag: 'Pre-Barrier',
    },
    {
      id: 'purification',
      stepNumber: '03',
      name: 'PURIFICATION',
      title: 'High-Pressure Drive',
      summary: 'Vertical multistage booster pumps pressurize conditioned water toward semi-permeable vessels.',
      specs: 'Hydraulic Drive: 12–16 Bar',
      icon: Gauge,
      tag: 'Pressure Stage',
    },
    {
      id: 'ro-membrane',
      stepNumber: '04',
      name: 'RO MEMBRANE',
      title: 'Molecular Separation',
      summary: 'Thin Film Composite (TFC) membranes separate dissolved salts, heavy metals, and bacteria into concentrate.',
      specs: 'Mineral Rejection: 95–99%',
      icon: Disc,
      tag: 'Core Separation',
    },
    {
      id: 'pure-water',
      stepNumber: '05',
      name: 'PURE WATER',
      title: 'Pure Conditioned Output',
      summary: 'Crystal-clear, sweet-tasting, mineral-balanced permeate for drinking and institutional hydration.',
      specs: 'Potable TDS: 50–120 PPM',
      icon: Sparkles,
      tag: 'Final Permeate',
    },
  ];

  // ScrollTrigger integration for scroll-driven progression
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const el = sectionRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      end: 'bottom 40%',
      onUpdate: (self) => {
        const progress = self.progress; // 0 to 1
        const stageIndex = Math.min(stages.length - 1, Math.floor(progress * stages.length));
        setActiveStage(stageIndex);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [stages.length]);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 relative bg-brand-mistBlue overflow-hidden border-t border-brand-border"
    >
      {/* Soft background ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-gradient-to-r from-brand-iceBlue/40 via-brand-white/50 to-brand-iceBlue/40 pointer-events-none rounded-full blur-3xl opacity-75" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <SectionHeading
          badge="Signature Engineering Process"
          title="From Source to Pure"
          subtitle="A five-stage reverse osmosis continuum designed for Solapur water dynamics. Pure water engineered at every stage."
        />

        {/* Desktop Pipeline Diagram */}
        <div className="relative mt-10 mb-14">
          {/* Connecting Conduit Line (Gradient #A9D1E3 -> #3FAFD0 -> #2C7DA0) */}
          <div className="hidden lg:block absolute top-[68px] left-[5%] right-[5%] h-1.5 bg-brand-softWaterBlue/30 -translate-y-1/2 z-0 rounded-full overflow-hidden">
            {/* Travelling Particle Pulse & Draw Progress */}
            <div
              className="h-full bg-gradient-to-r from-brand-softWaterBlue via-brand-brightWater to-brand-primaryWaterBlue rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(63,175,208,0.5)]"
              style={{
                width: `${((activeStage + 1) / stages.length) * 100}%`,
              }}
            />
          </div>

          {/* 5 Stages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = activeStage === index;
              const isPast = activeStage > index;
              const isFinal = index === stages.length - 1;

              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStage(index)}
                  className={`cursor-pointer rounded-card p-5 transition-all duration-300 relative flex flex-col justify-between ${
                    isActive
                      ? isFinal
                        ? 'bg-brand-white border-2 border-brand-primaryWaterBlue shadow-[0_12px_36px_rgba(44,125,160,0.18)] scale-[1.03] ring-2 ring-brand-brightWater/30'
                        : 'bg-brand-white border-2 border-brand-primaryWaterBlue shadow-card-hover scale-[1.02]'
                      : isPast
                      ? 'bg-brand-white/90 border border-brand-borderBlue/70 opacity-90 hover:opacity-100 shadow-subtle'
                      : 'bg-brand-white/70 border border-brand-border opacity-65 hover:opacity-90 shadow-subtle'
                  }`}
                >
                  {/* Top stage marker */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[11px] font-mono font-bold tracking-widest ${
                        isActive
                          ? 'text-brand-primaryWaterBlue'
                          : isPast
                          ? 'text-brand-deepOcean'
                          : 'text-brand-bodyText'
                      }`}
                    >
                      {stage.stepNumber} // {stage.name}
                    </span>

                    <span
                      className={`text-[9px] uppercase font-semibold px-2 py-0.5 rounded-full border ${
                        isActive
                          ? 'bg-brand-iceBlue text-brand-primaryWaterBlue border-brand-primaryWaterBlue/40'
                          : 'bg-brand-coolWhite text-brand-bodyText border-brand-border'
                      }`}
                    >
                      {stage.tag}
                    </span>
                  </div>

                  {/* Icon & Pulse Node */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-brand-primaryWaterBlue text-white shadow-card-soft'
                          : isPast
                          ? 'bg-brand-iceBlue text-brand-primaryWaterBlue border border-brand-borderBlue'
                          : 'bg-brand-mistBlue text-brand-bodyText border border-brand-border'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-brand-ink leading-tight">
                        {stage.title}
                      </h4>
                      <span className="text-[10px] font-mono text-brand-primaryWaterBlue font-semibold block">
                        {stage.specs}
                      </span>
                    </div>
                  </div>

                  {/* Stage Description */}
                  <p className="text-xs text-brand-bodyText leading-relaxed pt-2.5 border-t border-brand-border font-normal">
                    {stage.summary}
                  </p>

                  {/* Active Indicator Pulse */}
                  {isActive && (
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-brand-primaryWaterBlue">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-brightWater animate-ping" />
                      <span>{isFinal ? 'High Purity Permeate' : 'Active Flow Stage'}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Clean Process Summary Banner */}
        <div className="p-4 rounded-xl bg-brand-white border border-brand-border shadow-subtle flex items-center justify-between flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-primaryWaterBlue" />
            <span className="text-brand-bodyText font-medium">Continuous Closed-Loop Reverse Osmosis Engineering</span>
          </div>
          <span className="text-brand-deepOcean font-mono font-semibold">Verified Installation: Ambedkar High School, Solapur</span>
        </div>
      </div>
    </section>
  );
}
