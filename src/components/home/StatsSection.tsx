"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";
import { STATS } from "@/lib/constants";
import { Trophy, Calendar, Users, Clock, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

const statIcons = [
  <Calendar key="cal" size={28} />,
  <Trophy key="tro" size={28} />,
  <Users key="usr" size={28} />,
  <Clock key="clk" size={28} />,
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── ANIMATED LINE SEPARATOR ──────────────────────────────
      gsap.fromTo(
        ".stats-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── STAGGER CARD REVEAL ──────────────────────────────────
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── GSAP NUMBER COUNTERS ─────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".stat-number").forEach((el) => {
        const endValue = parseFloat(el.dataset.value || "0");
        const isYear = el.dataset.year === "true";
        const suffix = el.dataset.suffix || "";

        if (isYear) {
          el.textContent = `${endValue}${suffix}`;
          return;
        }

        const counter = { value: 0 };
        gsap.to(counter, {
          value: endValue,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = `${Math.floor(counter.value)}${suffix}`;
          },
        });
      });

      // ── CTA REVEAL ───────────────────────────────────────────
      gsap.fromTo(
        ".stats-cta",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stats-cta",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-[#F3F3F3]"
    >
      {/* Subtle dot pattern (dark on light) */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #012919 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top & Bottom gradient fades into neighbors */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#F3F3F3] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#F3F3F3] to-transparent" />

      {/* Animated line separator */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="stats-line h-px bg-gradient-to-r from-transparent via-marathon-green/40 to-transparent origin-left" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.3em] text-marathon-green/70 mb-3 block">
            En Números
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-marathon-darkest">
            La Grandeza del <span className="text-marathon-green">Monstruo</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, index) => (
            <div key={stat.label} className="stat-card relative group">
              <div className="bg-white rounded-2xl p-6 md:p-8 text-center border border-marathon-green/10 shadow-lg shadow-marathon-green/5 group-hover:border-marathon-green/30 group-hover:shadow-xl group-hover:shadow-marathon-green/10 transition-all duration-500">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-marathon-green/10 text-marathon-green mb-4 group-hover:bg-marathon-green/20 transition-colors duration-300">
                  {statIcons[index]}
                </div>

                {/* Number — GSAP driven */}
                <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-marathon-darkest mb-2">
                  <span
                    className="stat-number"
                    data-value={stat.value}
                    data-suffix={stat.suffix}
                    data-year={stat.isYear ? "true" : "false"}
                  >
                    {stat.isYear ? `${stat.value}${stat.suffix}` : `0${stat.suffix}`}
                  </span>
                </p>

                {/* Label */}
                <p className="text-sm text-marathon-darkest/50 uppercase tracking-wider font-heading">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="stats-cta text-center mt-12">
          <Button variant="outline" href="/estadisticas">
            Ver más estadísticas
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
