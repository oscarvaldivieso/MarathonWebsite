"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";
import { NEXT_MATCH, CLUB } from "@/lib/constants";
import { Calendar, Clock, MapPin, Ticket, ArrowRight } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Image from "next/image";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("es-HN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function MatchdaySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── MATCH CARD ENTRANCE ──────────────────────────────────
      gsap.fromTo(
        ".matchday-card",
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── TEAM BADGES FROM SIDES ───────────────────────────────
      gsap.fromTo(
        ".matchday-home",
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".matchday-away",
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── VS ICON — scale + rotate ─────────────────────────────
      gsap.fromTo(
        ".matchday-vs",
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.7,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 68%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── BOTTOM BAR FADE IN ───────────────────────────────────
      gsap.fromTo(
        ".matchday-footer",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── CTA BUTTONS ──────────────────────────────────────────
      gsap.fromTo(
        ".matchday-cta",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".matchday-cta",
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
      id="matchday"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-[#F3F3F3]"
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(45deg, #012919 25%, transparent 25%, transparent 75%, #012919 75%),
            linear-gradient(45deg, #012919 25%, transparent 25%, transparent 75%, #012919 75%)`,
          backgroundSize: "60px 60px",
          backgroundPosition: "0 0, 30px 30px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header (dark text for light bg) */}
        <div className="text-center mb-12">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.3em] text-marathon-green/70 mb-3 block">
            Próximo Encuentro
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-marathon-darkest">
            Próximo <span className="text-marathon-green">Partido</span>
          </h2>
          <p className="text-marathon-darkest/50 mt-2 font-body">
            No te pierdas la acción de la Furia Verde
          </p>
        </div>

        <div className="matchday-card max-w-3xl mx-auto">
          {/* The card itself stays dark for contrast drama */}
          <div className="bg-marathon-darkest rounded-[2rem] overflow-hidden border border-marathon-green/20 shadow-2xl shadow-marathon-darkest/20">

            {/* Upper Branding Container with Pattern */}
            <div className="relative bg-gradient-to-b from-marathon-dark to-marathon-darkest p-8 md:p-12 overflow-hidden border-b border-marathon-green/10 flex items-center justify-center min-h-[260px]">
              {/* Branding pattern from public/assets/brand/pattern.png */}
              <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay">
                <Image
                  src="/assets/brand/pattern.png"
                  alt="Branding Pattern"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Centered glow behind VS */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[120px] bg-marathon-lime/10 rounded-full blur-[40px] pointer-events-none" />

              {/* Confrontation row */}
              <div className="relative z-10 w-full flex items-center justify-between gap-4 max-w-lg mx-auto">
                {/* Home Team */}
                <div className="matchday-home flex justify-center flex-1">
                  <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                    <Image
                      src="/assets/brand/escudo_normal.svg"
                      alt="CD Marathón"
                      width={100}
                      height={100}
                      className="object-contain filter drop-shadow-[0_6px_16px_rgba(46,156,63,0.3)]"
                    />
                  </div>
                </div>

                {/* VS - Elrotex Font */}
                <div className="matchday-vs flex flex-col items-center justify-center shrink-0 px-2 select-none">
                  <span
                    className="text-6xl md:text-8xl text-marathon-lime drop-shadow-[0_4px_10px_rgba(146,191,78,0.3)] tracking-wide"
                    style={{ fontFamily: "var(--font-elrotex), sans-serif" }}
                  >
                    VS
                  </span>
                </div>

                {/* Away Team */}
                <div className="matchday-away flex justify-center flex-1">
                  <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                    <Image
                      src="/assets/matchday/teams/escudo_olimpia.png"
                      alt="CD Olimpia"
                      width={100}
                      height={100}
                      className="object-contain filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.35)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* General Match Info Row */}
            <div className="p-6 md:p-8 bg-marathon-darkest/45 flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left Details */}
              <div className="flex flex-col gap-1.5 text-center md:text-left">
                <span className="text-xs font-heading font-semibold uppercase tracking-widest text-marathon-lime">
                  {NEXT_MATCH.competition}
                </span>
                <div className="flex items-center justify-center md:justify-start gap-2 text-marathon-light/75">
                  <Calendar size={14} className="text-marathon-green" />
                  <span className="text-sm font-medium">{formatDate(NEXT_MATCH.date)}</span>
                </div>
              </div>

              {/* Right Details */}
              <div className="flex flex-col gap-2 items-center md:items-end">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-marathon-green/10 border border-marathon-green/20 text-marathon-light">
                  <Clock size={14} className="text-marathon-lime" />
                  <span className="text-xs font-bold font-heading">{NEXT_MATCH.time}</span>
                </div>
                <div className="matchday-footer flex items-center gap-1 text-xs text-marathon-light/40">
                  <MapPin size={12} />
                  <span>Estadio {NEXT_MATCH.stadium} • {CLUB.city}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="matchday-cta flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Button variant="primary" size="lg" href="/entradas">
            <Ticket size={20} />
            Comprar Entradas
          </Button>
          <Button variant="outline" href="/calendario">
            Ver Calendario Completo
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
