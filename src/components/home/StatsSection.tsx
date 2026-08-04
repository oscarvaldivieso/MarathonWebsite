"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/hooks/useGsap";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// Bento Cards Configuración Estilo Apple
const bentoCards = [
  {
    value: "1925",
    numericValue: 1925,
    label: "Año de Fundación",
    description: "Cuna de la Furia Verde. Fundado el 25 de noviembre en San Pedro Sula.",
    image: "/assets/history/historic_1925.png",
    colSpan: "md:col-span-2 lg:col-span-2 lg:row-span-2",
    height: "min-h-[380px] sm:min-h-[440px] lg:min-h-[520px]",
    isLarge: true,
  },
  {
    value: "9",
    numericValue: 9,
    label: "Títulos de Liga",
    description: "Campeones de la Liga Nacional de Honduras.",
    image: "/assets/history/campeones.webp",
    colSpan: "md:col-span-1 lg:col-span-1",
    height: "min-h-[240px] sm:min-h-[250px]",
    isLarge: false,
  },
  {
    value: "50K+",
    numericValue: 50,
    suffix: "K+",
    label: "Afición Incondicional",
    description: "La hinchada verdolaga más fiel del país y el liderazgo institucional.",
    image: "/assets/history/presi.webp",
    colSpan: "md:col-span-1 lg:col-span-1",
    height: "min-h-[240px] sm:min-h-[250px]",
    isLarge: false,
  },
  {
    value: "1er",
    isTextOnly: true,
    label: "Estadio Propio",
    description: "Estadio Yankel Rosenthal: el único escenario privado propiedad de un club en Honduras.",
    image: "/assets/history/equipazo.png",
    colSpan: "md:col-span-1 lg:col-span-1",
    height: "min-h-[240px] sm:min-h-[260px]",
    isLarge: false,
  },
  {
    value: "100+",
    numericValue: 100,
    suffix: "+",
    label: "Años de Gloria",
    description: "Un siglo de jerarquía e identidad ininterrumpida en el fútbol centroamericano.",
    image: "/assets/history/gloria.png",
    colSpan: "md:col-span-2 lg:col-span-2",
    height: "min-h-[250px] sm:min-h-[260px]",
    isLarge: false,
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── 1. ANIMACIÓN SCROLL ÁGIL: BANDERAS TRICOLORES ──
      gsap.to(".corner-ribbon-left", {
        rotate: -4,
        y: 8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      gsap.to(".corner-ribbon-right", {
        rotate: 4,
        y: 8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // ── 2. ANIMACIÓN HEADER (Rápida y fluida) ──
      gsap.fromTo(
        ".apple-stats-header",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── 3. BENTO CARDS REVEAL (Stagger ágil) ──
      gsap.fromTo(
        ".apple-bento-card",
        { opacity: 0, y: 45, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── 4. PARALLAX SUAVE EN IMÁGENES (Optimizado por hardware) ──
      gsap.utils.toArray<HTMLElement>(".apple-card-img").forEach((img) => {
        gsap.to(img, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.3,
          },
        });
      });

      // ── 5. CONTADORES NUMÉRICOS ──
      gsap.utils.toArray<HTMLElement>(".stat-counter-value").forEach((el) => {
        const endVal = parseFloat(el.dataset.value || "0");
        const suffix = el.dataset.suffix || "";
        const isYear = el.dataset.isyear === "true";

        if (isYear || !endVal) return;

        const counter = { val: 0 };
        gsap.to(counter, {
          val: endVal,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = `${Math.floor(counter.val)}${suffix}`;
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
      className="relative py-20 sm:py-28 md:py-36 lg:py-40 bg-[#F5F5F7] text-[#1D1D1F] select-none overflow-hidden"
    >
      {/* ── FRANJAS TRICOLORES ESQUINERAS ONDULADAS COLGADAS ── */}
      <div className="corner-ribbon-left absolute top-0 left-0 z-20 pointer-events-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.16)] origin-top-left will-change-transform">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-28 xs:w-36 sm:w-48 md:w-56 lg:w-64 h-auto"
        >
          <path d="M 0,0 L 160,0 C 130,50 80,80 0,110 Z" fill="#2E9C3F" />
          <path d="M 0,110 C 80,80 130,50 160,0 L 180,0 C 145,65 90,105 0,140 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
          <path d="M 0,140 C 90,105 145,65 180,0 L 200,0 C 160,80 100,130 0,170 Z" fill="#D92121" />
          <rect x="0" y="0" width="200" height="4" fill="#012919" opacity="0.3" />
        </svg>
      </div>

      <div className="corner-ribbon-right absolute top-0 right-0 z-20 pointer-events-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.16)] origin-top-right will-change-transform">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-28 xs:w-36 sm:w-48 md:w-56 lg:w-64 h-auto transform scale-x-[-1]"
        >
          <path d="M 0,0 L 160,0 C 130,50 80,80 0,110 Z" fill="#2E9C3F" />
          <path d="M 0,110 C 80,80 130,50 160,0 L 180,0 C 145,65 90,105 0,140 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
          <path d="M 0,140 C 90,105 145,65 180,0 L 200,0 C 160,80 100,130 0,170 Z" fill="#D92121" />
          <rect x="0" y="0" width="200" height="4" fill="#012919" opacity="0.3" />
        </svg>
      </div>

      {/* Luz ambiental difuminada estilo Apple */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[850px] h-[450px] bg-gradient-to-tr from-marathon-lime/20 via-marathon-green/15 to-transparent rounded-full blur-[160px] pointer-events-none transform-gpu z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">

        {/* Header Estilo Apple con FUENTE ELROTEX */}
        <div className="apple-stats-header text-center mb-12 sm:mb-16 md:mb-20 max-w-3xl mx-auto px-2">
          <p className="text-md sm:text-lg font-outfit font-bold text-marathon-green mb-3 sm:mb-4">
            Cien Años · En Números
          </p>

          <h2 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-elrotex tracking-wide leading-[1.08] text-[#1D1D1F] uppercase mb-4 sm:mb-6 drop-shadow-sm">
            La historia se mide en <span className="text-transparent bg-clip-text pl-2 bg-gradient-to-r from-marathon-lime via-marathon-green to-marathon-dark">Grandeza.</span>
          </h2>

          <p className="text-xs xs:text-sm sm:text-base md:text-lg font-outfit text-[#86868B] font-normal leading-relaxed">
            Un recorrido por los hitos que convirtieron al Club Deportivo Marathón en el referente histórico de la costa norte de Honduras.
          </p>
        </div>

        {/* ── BENTO GRID RESPONSIVE PERFECCIONADO ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 relative z-10">
          {bentoCards.map((card) => (
            <div
              key={card.label}
              className={`apple-bento-card group relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-marathon-darkest border border-white/10 shadow-xl sm:shadow-2xl transition-all duration-700 hover:shadow-[0_30px_80px_rgba(146,191,78,0.3)] hover:border-marathon-lime/60 flex flex-col justify-end will-change-transform ${card.colSpan} ${card.height}`}
            >
              {/* Contenedor de Imagen con Zoom Apple */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-marathon-darkest">
                <div className="apple-card-img absolute inset-[-10%] w-[120%] h-[120%] will-change-transform">
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] filter brightness-95 contrast-105"
                  />
                </div>

                {/* Overlays Cinemáticos Oscuros */}
                <div className="absolute inset-0 bg-gradient-to-t from-marathon-darkest via-marathon-darkest/60 to-transparent z-1" />
                <div className="absolute inset-0 bg-black/20 z-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Contenido Tipográfico Luminoso sobre Fondo Oscuro */}
              <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col justify-end">

                {/* Número Gigante con Fuente Elrotex ELEGANTE */}
                <div className="mb-1">
                  <span
                    className={`stat-counter-value font-elrotex font-normal text-transparent bg-clip-text bg-gradient-to-r from-marathon-lime via-[#a4d458] to-white drop-shadow-[0_4px_20px_rgba(146,191,78,0.45)] leading-none block ${card.isLarge ? "text-6xl sm:text-8xl lg:text-9xl" : "text-5xl sm:text-6xl lg:text-7xl"}`}
                    data-value={card.numericValue || 0}
                    data-suffix={card.suffix || ""}
                    data-isyear={card.value === "1925" ? "true" : "false"}
                  >
                    {card.value}
                  </span>
                </div>

                {/* Título Principal (Elrotex Normal) */}
                <h3 className="text-lg sm:text-xl lg:text-2xl font-elrotex font-normal uppercase tracking-wide text-white mb-1.5 sm:mb-2 group-hover:text-marathon-lime transition-colors duration-300">
                  {card.label}
                </h3>

                {/* Descripción Outfit Blanca Suave */}
                <p className="text-xs sm:text-sm font-outfit text-white/75 font-normal leading-relaxed max-w-md">
                  {card.description}
                </p>
              </div>

              {/* Resplandor verde neón brillante al hover */}
              <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-marathon-lime to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* CTA Minimalista Apple Style */}
        <div className="text-center mt-12 sm:mt-16 md:mt-20 relative z-10">
          <a
            href="#partidos"
            className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#1D1D1F] hover:bg-marathon-green text-[#FFFFFF] font-outfit font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-marathon-green/30 group"
          >
            <span>Conoce la historia completa</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>

      </div>
    </section>
  );
}
