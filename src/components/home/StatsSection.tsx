"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/hooks/useGsap";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// 5 Bento Cards Configuración Estilo Apple
const bentoCards = [
  {
    value: "1925",
    label: "Año de Fundación",
    description: "Cuna de la Furia Verde. Fundado el 25 de noviembre en San Pedro Sula.",
    image: "/assets/history/equipazo.png",
    colSpan: "lg:col-span-2 lg:row-span-2",
    height: "min-h-[440px] lg:min-h-[520px]",
    isLarge: true,
  },
  {
    value: "9",
    label: "Títulos de Liga",
    description: "Campeones de la Liga Nacional de Honduras.",
    image: "/assets/history/campeones.webp",
    colSpan: "lg:col-span-1",
    height: "min-h-[250px]",
    isLarge: false,
  },
  {
    value: "50K+",
    label: "Afición Incondicional",
    description: "La hinchada verdolaga más fiel del país y el liderazgo institucional.",
    image: "/assets/history/presi.webp",
    colSpan: "lg:col-span-1",
    height: "min-h-[250px]",
    isLarge: false,
  },
  {
    value: "1er",
    label: "Estadio Propio",
    description: "Estadio Yankel Rosenthal: el único escenario privado propiedad de un club en Honduras.",
    image: "/assets/history/equipazo.png",
    colSpan: "lg:col-span-1",
    height: "min-h-[260px]",
    isLarge: false,
  },
  {
    value: "100+",
    label: "Años de Gloria",
    description: "Un siglo de jerarquía e identidad ininterrumpida en el fútbol centroamericano.",
    image: "/assets/history/gloria.png",
    colSpan: "lg:col-span-2",
    height: "min-h-[260px]",
    isLarge: false,
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── 1. SCROLL-DRIVEN ANIMATION: BANDERAS TRICOLORES ──
      gsap.to(".flag-left", {
        rotate: -6,
        y: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".flag-right", {
        rotate: 6,
        y: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // ── 2. SCROLL-DRIVEN ANIMATION: HEADER APPLE ──
      gsap.fromTo(
        ".apple-stats-header",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 0.8,
          },
        }
      );

      // ── 3. SCROLL-DRIVEN ANIMATION: BENTO CARDS ──
      gsap.utils.toArray<HTMLElement>(".apple-bento-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0.3, y: 70 + index * 10, scale: 0.92, rotateX: 6 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 55%",
              scrub: 1,
            },
          }
        );
      });

      // ── 4. SCROLL-DRIVEN ANIMATION: PARALLAX EN IMÁGENES ──
      gsap.utils.toArray<HTMLElement>(".apple-card-img").forEach((img) => {
        gsap.to(img, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
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
      className="relative py-28 md:py-40 bg-[#F5F5F7] text-[#1D1D1F] select-none overflow-hidden"
    >
      {/* ── BANDERAS TRICOLORES ONDULADAS EN LAS ESQUINAS ── */}
      <div className="flag-left absolute top-0 left-0 z-20 pointer-events-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] origin-top-left">
        <svg width="150" height="240" viewBox="0 0 150 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 sm:w-36 md:w-40 h-auto">
          <path d="M0 0 L45 0 L45 190 L25 170 L0 190 Z" fill="#2E9C3F" />
          <path d="M45 0 L90 0 L90 210 L70 190 L45 210 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <path d="M90 0 L135 0 L135 180 L115 160 L90 180 Z" fill="#D92121" />
          <rect x="0" y="0" width="135" height="7" fill="#012919" opacity="0.35" />
        </svg>
      </div>

      <div className="flag-right absolute top-0 right-0 z-20 pointer-events-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] origin-top-right">
        <svg width="150" height="240" viewBox="0 0 150 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 sm:w-36 md:w-40 h-auto transform scale-x-[-1]">
          <path d="M0 0 L45 0 L45 190 L25 170 L0 190 Z" fill="#2E9C3F" />
          <path d="M45 0 L90 0 L90 210 L70 190 L45 210 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <path d="M90 0 L135 0 L135 180 L115 160 L90 180 Z" fill="#D92121" />
          <rect x="0" y="0" width="135" height="7" fill="#012919" opacity="0.35" />
        </svg>
      </div>

      {/* Luz ambiental difuminada estilo Apple */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[800px] h-[400px] bg-gradient-to-tr from-marathon-lime/20 via-marathon-green/15 to-transparent rounded-full blur-[160px] pointer-events-none transform-gpu z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Estilo Apple con FUENTE ELROTEX */}
        <div className="apple-stats-header text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm font-outfit font-bold uppercase tracking-[0.25em] text-marathon-green mb-4">
            Cien Años · En Números
          </p>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-elrotex tracking-wide leading-[1.05] text-[#1D1D1F] uppercase mb-6 drop-shadow-sm">
            La historia se mide en <span className="text-transparent bg-clip-text bg-gradient-to-r from-marathon-lime via-marathon-green to-marathon-dark">Grandeza.</span>
          </h2>

          <p className="text-base sm:text-lg font-outfit text-[#86868B] font-normal leading-relaxed">
            Un recorrido por los hitos que convirtieron al Club Deportivo Marathón en el referente histórico de la costa norte de Honduras.
          </p>
        </div>

        {/* ── BENTO GRID ESTILO APPLE (5 CARDS PERFECTAMENTE DISTRIBUIDAS) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {bentoCards.map((card) => (
            <div
              key={card.label}
              className={`apple-bento-card group relative rounded-[2.5rem] overflow-hidden bg-marathon-darkest border border-white/10 shadow-2xl transition-all duration-700 hover:shadow-[0_30px_80px_rgba(146,191,78,0.3)] hover:border-marathon-lime/60 flex flex-col justify-end ${card.colSpan} ${card.height}`}
            >
              {/* Contenedor de Imagen con Zoom Apple */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-marathon-darkest">
                <div className="apple-card-img absolute inset-[-10%] w-[120%] h-[120%]">
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] filter brightness-95 contrast-105"
                  />
                </div>

                {/* Overlays Cinemáticos Oscuros */}
                <div className="absolute inset-0 bg-gradient-to-t from-marathon-darkest via-marathon-darkest/60 to-transparent z-1" />
                <div className="absolute inset-0 bg-black/20 z-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Contenido Tipográfico Luminoso sobre Fondo Oscuro */}
              <div className="relative z-10 p-8 sm:p-10 flex flex-col justify-end">

                {/* Número Gigante con Fuente Elrotex ELEGANTE y LUMINOSA */}
                <div className="mb-1">
                  <span className={`font-elrotex font-normal text-transparent bg-clip-text bg-gradient-to-r from-marathon-lime via-[#a4d458] to-white drop-shadow-[0_4px_20px_rgba(146,191,78,0.45)] leading-none block ${card.isLarge ? "text-7xl sm:text-8xl lg:text-9xl" : "text-6xl sm:text-7xl"}`}>
                    {card.value}
                  </span>
                </div>

                {/* Título Principal (Elrotex Normal) */}
                <h3 className="text-xl sm:text-2xl font-elrotex font-normal uppercase tracking-wide text-white mb-2 group-hover:text-marathon-lime transition-colors duration-300">
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
        <div className="text-center mt-16 md:mt-20 relative z-10">
          <a
            href="#partidos"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#1D1D1F] hover:bg-marathon-green text-white font-outfit font-bold text-sm tracking-wide transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-marathon-green/30 group"
          >
            <span>Conoce la historia completa</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>

      </div>
    </section>
  );
}
