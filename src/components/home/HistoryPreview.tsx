"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";
import { CLUB } from "@/lib/constants";
import { ArrowRight, MapPin } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

export default function HistoryPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── CLIP-PATH REVEAL for stadium card ────────────────────
      gsap.fromTo(
        ".history-image-card",
        {
          clipPath: "inset(0 100% 0 0)",
          opacity: 0,
        },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".history-image-card",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Corner decorations scale in ──────────────────────────
      gsap.fromTo(
        ".history-corner",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ".history-image-card",
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── TEXT STAGGER CASCADE ─────────────────────────────────
      gsap.fromTo(
        ".history-label",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".history-text-block",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".history-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".history-text-block",
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".history-paragraph",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".history-text-block",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── BUTTON REVEAL ────────────────────────────────────────
      gsap.fromTo(
        ".history-cta",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".history-cta",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── YEAR NUMBER REVEAL ───────────────────────────────────
      const yearEl = sectionRef.current?.querySelector(".history-year") as HTMLElement;
      if (yearEl) {
        const counter = { value: 1900 };
        gsap.to(counter, {
          value: CLUB.founded,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: yearEl,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            yearEl.textContent = String(Math.floor(counter.value));
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="historia"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-marathon-darkest overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-marathon-green/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Nuestra Historia"
          subtitle={`Más de ${new Date().getFullYear() - CLUB.founded} años de pasión, gloria y tradición verdolaga`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Stadium Card with clip-path reveal */}
          <div className="history-image-card relative rounded-2xl overflow-hidden aspect-[4/3]">
            {/* Gradient placeholder for stadium image */}
            <div className="absolute inset-0 bg-gradient-to-br from-marathon-dark via-marathon-green/20 to-marathon-darkest" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-marathon-green/20 flex items-center justify-center mb-4 animate-pulse-glow">
                <span className="text-4xl">🏟️</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-marathon-light mb-2">
                Estadio {CLUB.stadium}
              </h3>
              <p className="flex items-center gap-1 text-marathon-light/50 text-sm">
                <MapPin size={14} />
                {CLUB.city}, {CLUB.country}
              </p>
            </div>

            {/* Corner decorations */}
            <div className="history-corner absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-marathon-lime/30 rounded-tl-lg" />
            <div className="history-corner absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-marathon-lime/30 rounded-br-lg" />
          </div>

          {/* Right: History Text */}
          <div className="history-text-block">
            <h3 className="history-label text-marathon-lime text-sm font-heading font-semibold uppercase tracking-widest mb-4">
              {CLUB.historicName}
            </h3>
            <h4 className="history-heading text-2xl md:text-3xl font-heading font-bold text-marathon-light mb-6">
              Una tradición que nació en{" "}
              <span className="text-gradient history-year">{CLUB.founded}</span>
            </h4>
            <div className="space-y-4 text-marathon-light/60 leading-relaxed font-body">
              <p className="history-paragraph">
                El Club Deportivo Marathón, conocido como la <strong className="text-marathon-lime">Furia Verde</strong>, 
                es uno de los clubes más emblemáticos del fútbol hondureño. Fundado en {CLUB.founded} en la ciudad de {CLUB.city}, 
                ha sido protagonista de las gestas más importantes del deporte catracho.
              </p>
              <p className="history-paragraph">
                Con <strong className="text-marathon-light">{CLUB.titles} títulos de liga</strong> en su vitrina, 
                el Verdolaga ha escrito capítulos de gloria en el Estadio {CLUB.stadium}, 
                un templo donde miles de aficionados viven, sufren y celebran con su equipo del alma.
              </p>
              <p className="history-paragraph">
                Su identidad, representada por el <strong className="text-marathon-lime">{CLUB.mascot}</strong>, 
                simboliza la fuerza, la garra y el espíritu indomable de un club que nunca se rinde.
              </p>
            </div>

            <div className="history-cta mt-8">
              <Button variant="outline" href="/historia">
                Descubre nuestra historia
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
