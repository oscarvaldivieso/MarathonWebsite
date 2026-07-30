"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/hooks/useGsap";
import { STATS } from "@/lib/constants";
import { Trophy, Calendar, Users, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";

const statIcons = [
  <Calendar key="cal" size={24} className="text-marathon-green" />,
  <Trophy key="tro" size={24} className="text-marathon-green" />,
  <Users key="usr" size={24} className="text-marathon-green" />,
  <Clock key="clk" size={24} className="text-marathon-green" />,
];

// Imágnes de fondo sustituibles (placeholders de alta calidad)
const statImages = [
  "/assets/history/historic_1925.png",
  "/assets/stadium/celebration.png",
  "/assets/fans/stadium_passion.png",
  "/assets/brand/pattern.png",
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Línea de separación animada
      gsap.fromTo(
        ".stats-line-light",
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards stagger 3D reveal
      gsap.fromTo(
        ".stat-card-light",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // GSAP Number Counters
      gsap.utils.toArray<HTMLElement>(".stat-number-light").forEach((el) => {
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
          duration: 2.2,
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
      className="relative py-24 md:py-32 overflow-hidden bg-[#F8F9FA] text-marathon-darkest select-none"
    >
      {/* ── 1. AURA AMBIENTAL VERDE SOBRE FONDO BLANCO ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[900px] h-[500px] bg-gradient-to-tr from-marathon-lime/20 via-marathon-green/10 to-transparent rounded-full blur-[140px] pointer-events-none transform-gpu z-0" />
      <div className="absolute -top-24 left-1/3 w-96 h-96 bg-marathon-lime/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 right-1/3 w-96 h-96 bg-marathon-green/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Sutil textura de puntos verdolagas */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #01402E 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Línea divisoria decorativa */}
        <div className="mb-14 flex justify-center">
          <div className="stats-line-light w-full max-w-xl h-[2px] bg-gradient-to-r from-transparent via-marathon-green/50 to-transparent shadow-[0_0_12px_rgba(46,156,63,0.3)] origin-center" />
        </div>

        {/* Header de Sección sobre fondo claro */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-marathon-green/10 border border-marathon-green/20 text-marathon-green text-xs font-heading font-bold uppercase tracking-[0.3em] mb-4">
            <ShieldCheck size={14} />
            <span>En Números · Cien Años de Gloria</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-marathon-darkest uppercase tracking-tight leading-none">
            La Leyenda del <span className="text-marathon-green">Monstruo</span>
          </h2>
          <p className="text-marathon-darkest/60 text-xs sm:text-sm max-w-lg mx-auto mt-3 font-body">
            Estadísticas históricas que inmortalizan un siglo de lucha, triunfos y pasión inquebrantable.
          </p>
        </div>

        {/* ── 2. CARDS BLANCAS DE ALTA ESTÉTICA CON PLACEHOLDERS DE IMAGEN ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card-light group relative rounded-3xl overflow-hidden border border-marathon-green/15 bg-white/90 backdrop-blur-md shadow-xl shadow-marathon-green/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-marathon-green/20 hover:border-marathon-green/40 flex flex-col justify-between"
            >
              {/* Top Image Placeholder Container (2/5 de la tarjeta) */}
              <div className="relative h-36 w-full overflow-hidden bg-marathon-darkest/10">
                <Image
                  src={statImages[index]}
                  alt={stat.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-center opacity-85 group-hover:scale-110 transition-all duration-700 pointer-events-none"
                />
                {/* Gradient Overlay blanco que difumina suavemente hacia la base */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent z-1" />
                
                {/* Icono Flotante en la esquina superior */}
                <div className="absolute top-3 right-3 z-10 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md border border-marathon-green/20 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  {statIcons[index]}
                </div>
              </div>

              {/* Contenido de la Tarjeta (3/5 de la tarjeta) */}
              <div className="relative z-10 p-6 pt-1 flex flex-col items-center text-center justify-center min-h-[160px]">
                
                {/* Número Gigante en Fuente Elrotex con Verde Esmeralda */}
                <div className="my-1">
                  <span
                    className="stat-number-light font-elrotex text-5xl sm:text-6xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-marathon-green via-[#1a702b] to-marathon-darkest drop-shadow-sm"
                    data-value={stat.value}
                    data-suffix={stat.suffix}
                    data-year={stat.isYear ? "true" : "false"}
                  >
                    {stat.isYear ? `${stat.value}${stat.suffix}` : `0${stat.suffix}`}
                  </span>
                </div>

                {/* Etiqueta */}
                <p className="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.2em] text-marathon-darkest/80 group-hover:text-marathon-green transition-colors duration-300">
                  {stat.label}
                </p>

                {/* Resplandor neón inferior en hover */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-marathon-green to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA al final de la sección clara */}
        <div className="text-center mt-16 relative z-10">
          <a
            href="#partidos"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white hover:bg-marathon-green text-marathon-darkest hover:text-white border border-marathon-green/25 font-heading font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-marathon-green/10 hover:shadow-xl hover:shadow-marathon-green/30 group"
          >
            <span>Explorar más del club</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>

      </div>
    </section>
  );
}
