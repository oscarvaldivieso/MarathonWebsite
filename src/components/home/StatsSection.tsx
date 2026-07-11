"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";
import { STATS } from "@/lib/constants";
import { Trophy, Calendar, Users, Clock } from "lucide-react";

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
          // Years don't animate — just set immediately
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-marathon-dark" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #2E9C3F 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top & Bottom gradient fades */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-marathon-darkest to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-marathon-darkest to-transparent" />

      {/* Animated line separator */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="stats-line h-px bg-gradient-to-r from-transparent via-marathon-lime/40 to-transparent origin-left" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, index) => (
            <div key={stat.label} className="stat-card relative group">
              <div className="glass-card rounded-2xl p-6 md:p-8 text-center group-hover:border-marathon-lime/30 transition-all duration-500">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-marathon-green/10 text-marathon-lime mb-4 group-hover:bg-marathon-green/20 transition-colors duration-300">
                  {statIcons[index]}
                </div>

                {/* Number — GSAP driven */}
                <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-marathon-light mb-2">
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
                <p className="text-sm text-marathon-light/50 uppercase tracking-wider font-heading">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
