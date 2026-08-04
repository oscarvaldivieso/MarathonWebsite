"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";
import { AnimatePresence, motion } from "framer-motion";
import { FAN_QUOTES } from "@/lib/constants";
import { Quote, ChevronLeft, ChevronRight, Heart, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

const SLIDES = [
  {
    category: "Orígenes y Cuna",
    title: "1925: Nace la Furia Verde",
    text: "Fundado el 25 de noviembre de 1925 en el corazón de San Pedro Sula. Nace una leyenda de lucha, carácter y fidelidad incondicional, forjando el mito del único Monstruo Verde de Centroamérica.",
    image: "/assets/history/historic_1925.png"
  },
  {
    category: "Valores y Honor",
    title: "El Alma Blanca de la Costa",
    text: "El color blanco representa el honor en el campo de batalla deportivo y la hermandad de una familia que comparte un mismo latido. Un club que compite con hidalguía pero defiende con orgullo cada palmo de su historia.",
    image: "/assets/stadium/celebration.png"
  },
  {
    category: "Sangre y Fuego",
    title: "La Pasión Roja del Yankel",
    text: "El rojo simboliza la sangre y el fuego de la afición más apasionada de Honduras. Las banderas ondean y el Yankel Rosenthal ruge en cada jornada, demostrando que este sentimiento verdolaga es inmortal.",
    image: "/assets/fans/stadium_passion.png"
  }
];

export default function PassionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const greenPathRef = useRef<SVGPathElement>(null);
  const whitePathRef = useRef<SVGPathElement>(null);
  const redPathRef = useRef<SVGPathElement>(null);
  const greenGlowRef = useRef<SVGPathElement>(null);
  const redGlowRef = useRef<SVGPathElement>(null);

  const [currentQuote, setCurrentQuote] = useState(0);

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % FAN_QUOTES.length);
  };

  const prevQuote = () => {
    setCurrentQuote(
      (prev) => (prev - 1 + FAN_QUOTES.length) % FAN_QUOTES.length
    );
  };

  useEffect(() => {
    const paths = [
      greenPathRef.current,
      whitePathRef.current,
      redPathRef.current,
      greenGlowRef.current,
      redGlowRef.current
    ];

    // Filter out null elements
    const activePaths = paths.filter((p): p is SVGPathElement => p !== null);
    if (activePaths.length === 0) return;

    const ctx = gsap.context(() => {
      // Set initial dasharray & dashoffset based on total length for each path
      activePaths.forEach((path) => {
        const pathLength = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength
        });
      });

      // Master Scroll-driven timeline coordinating path drawing and content reveals
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".spotlight",
          start: "top 35%",
          end: "bottom 85%",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // 1. Draw SVG paths continuously from 0% to 100% of scroll timeline
      tl.to(activePaths, {
        strokeDashoffset: 0,
        ease: "none",
        duration: 1
      }, 0);

      // 2. Coreographed Reveals based on scroll progress of the drawing path (total duration: 1)

      // Row 1 (Origins Centered Image) - appears at 8% progress
      tl.fromTo(".row-1-img",
        { opacity: 0, scale: 0.85, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.15, ease: "back.out(1.5)" },
        0.08
      );

      // Row 2 (Origins Card left, Celebration Image right) - appears at 28% progress
      tl.fromTo(".row-2-card",
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.18, ease: "power2.out" },
        0.28
      );
      tl.fromTo(".row-2-img",
        { opacity: 0, x: 60, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.18, ease: "power2.out" },
        0.30
      );

      // Row 3 (Fans Image left, Identity Card right) - appears at 58% progress
      tl.fromTo(".row-3-img",
        { opacity: 0, x: -60, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.18, ease: "power2.out" },
        0.58
      );
      tl.fromTo(".row-3-card",
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.18, ease: "power2.out" },
        0.60
      );

      // Row 4 (Passion Card left, Heart Box right) - appears at 82% progress
      tl.fromTo(".row-4-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" },
        0.82
      );
      tl.fromTo(".row-4-decor",
        { opacity: 0, scale: 0.75, rotate: -5 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.18, ease: "back.out(1.8)" },
        0.85
      );

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-marathon-darkest py-24 overflow-hidden flex flex-col z-20"
    >
      {/* Absolute background watermark text */}
      <div className="absolute right-0 top-[12%] text-[20vw] font-bold text-white/[0.01] select-none pointer-events-none tracking-tighter whitespace-nowrap font-elrotex z-0">
        PASION
      </div>

      {/* Header block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-12 relative z-10">
        <span className="inline-block text-[14px] font-heading font-semibold text-marathon-lime tracking-[0.3em] uppercase border-b border-marathon-lime/30 pb-2 mb-4">
          DESDE 1925
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-white leading-none uppercase">
          BANDERA DE NUESTRA <span className="text-gradient">PASIÓN</span>
        </h2>
        <p className="text-marathon-light/45 text-xs mt-3 tracking-widest uppercase">
          San Pedro Sula • Honduras
        </p>
      </div>

      {/* ── SPOTLIGHT CONTAINER (Wavy SVG drawing path) ─────────────────── */}
      <div className="spotlight relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-32 md:gap-44 overflow-visible z-10">

        {/* Contenedor del trazo SVG de fondo animado (Garantizado por debajo de todo el contenido) */}
        <div className="svg-path absolute top-[3%] bottom-[3%] left-1/2 -translate-x-1/2 w-[90%] md:w-[94%] z-0 pointer-events-none">
          <svg
            viewBox="0 0 1378 2760"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            {/* 1. Franja Verde (Izquierda) */}
            <path
              ref={greenPathRef}
              d="M639.668 100C639.668 100 105.669 100 199.669 601.503C293.669 1103.01 1277.17 691.502 1277.17 1399.5C1277.17 2107.5 -155.332 1968 140.168 1438.5C435.669 909.002 1442.66 2093.5 713.168 2659.5"
              stroke="#0e721d"
              strokeWidth="56"
              strokeLinecap="round"
              transform="translate(-52, 0)"
              className="opacity-90"
            />
            {/* 2. Franja Blanca (Centro) */}
            <path
              ref={whitePathRef}
              d="M639.668 100C639.668 100 105.669 100 199.669 601.503C293.669 1103.01 1277.17 691.502 1277.17 1399.5C1277.17 2107.5 -155.332 1968 140.168 1438.5C435.669 909.002 1442.66 2093.5 713.168 2659.5"
              stroke="#FFFFFF"
              strokeWidth="56"
              strokeLinecap="round"
              className="opacity-95"
            />
            {/* 3. Franja Roja (Derecha) */}
            <path
              ref={redPathRef}
              d="M639.668 100C639.668 100 105.669 100 199.669 601.503C293.669 1103.01 1277.17 691.502 1277.17 1399.5C1277.17 2107.5 -155.332 1968 140.168 1438.5C435.669 909.002 1442.66 2093.5 713.168 2659.5"
              stroke="#d92121"
              strokeWidth="56"
              strokeLinecap="round"
              transform="translate(52, 0)"
              className="opacity-90"
            />

            {/* Bordes de Luz / Brillo Neon Creativos */}
            {/* Brillo Extremo Izquierdo (Verde Limón) */}
            <path
              ref={greenGlowRef}
              d="M639.668 100C639.668 100 105.669 100 199.669 601.503C293.669 1103.01 1277.17 691.502 1277.17 1399.5C1277.17 2107.5 -155.332 1968 140.168 1438.5C435.669 909.002 1442.66 2093.5 713.168 2659.5"
              stroke="#92BF4E"
              strokeWidth="5"
              strokeLinecap="round"
              transform="translate(-80, 0)"
              className="opacity-60 filter drop-shadow-[0_0_8px_#92BF4E]"
            />
            {/* Brillo Extremo Derecho (Rojo Neon) */}
            <path
              ref={redGlowRef}
              d="M639.668 100C639.668 100 105.669 100 199.669 601.503C293.669 1103.01 1277.17 691.502 1277.17 1399.5C1277.17 2107.5 -155.332 1968 140.168 1438.5C435.669 909.002 1442.66 2093.5 713.168 2659.5"
              stroke="#FF3B30"
              strokeWidth="5"
              strokeLinecap="round"
              transform="translate(80, 0)"
              className="opacity-60 filter drop-shadow-[0_0_8px_#FF3B30]"
            />
          </svg>
        </div>

        {/* Fila 1 (Imagen Histórica Centrada) */}
        <div className="row relative z-10 flex justify-center items-center">
          <div className="row-1-img img-wrapper relative z-10 w-full max-w-[650px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 filter drop-shadow-[0_15px_30px_rgba(14,114,29,0.25)] opacity-0 will-change-transform bg-black/80 backdrop-blur-sm">
            <img
              src={SLIDES[0].image}
              alt="Club Deportivo Marathón 1925"
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </div>
        </div>

        {/* Fila 2 (Tarjeta 1 a la izquierda, Imagen 2 a la derecha) */}
        <div className="row relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="col flex flex-col justify-center">
            <div className="row-2-card card-box relative z-10 glass-card bg-black/80 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-4 max-w-[500px] mx-auto md:mr-0 opacity-0 will-change-transform">
              <span className="text-marathon-lime font-bold tracking-[0.25em] text-xs uppercase block">
                {SLIDES[0].category}
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-black text-white leading-tight uppercase">
                {SLIDES[0].title}
              </h3>
              <p className="text-marathon-light/80 font-body text-sm md:text-base leading-relaxed">
                {SLIDES[0].text}
              </p>
            </div>
          </div>
          <div className="col flex justify-center">
            <div className="row-2-img img-wrapper relative z-10 w-full max-w-[480px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 filter drop-shadow-[0_15px_30px_rgba(255,255,255,0.15)] opacity-0 will-change-transform bg-black/80 backdrop-blur-sm">
              <img
                src={SLIDES[1].image}
                alt="Celebración Plantel de Marathón"
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Fila 3 (Imagen 3 a la izquierda, Tarjeta 2 a la derecha) */}
        <div className="row relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="col flex justify-center md:order-1 order-2">
            <div className="row-3-img img-wrapper relative z-10 w-full max-w-[480px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 filter drop-shadow-[0_15px_30px_rgba(217,33,33,0.25)] opacity-0 will-change-transform bg-black/80 backdrop-blur-sm">
              <img
                src={SLIDES[2].image}
                alt="Hinchada Verdolaga en el Yankel"
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>
          </div>
          <div className="col flex flex-col justify-center md:order-2 order-1">
            <div className="row-3-card card-box relative z-10 glass-card bg-black/80 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-4 max-w-[500px] mx-auto md:ml-0 opacity-0 will-change-transform">
              <span className="text-marathon-lime font-bold tracking-[0.25em] text-xs uppercase block">
                {SLIDES[1].category}
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-black text-white leading-tight uppercase">
                {SLIDES[1].title}
              </h3>
              <p className="text-marathon-light/80 font-body text-sm md:text-base leading-relaxed">
                {SLIDES[1].text}
              </p>
            </div>
          </div>
        </div>

        {/* Fila 4 (Tarjeta 3 a la izquierda, detalle a la derecha) */}
        <div className="row relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="col flex flex-col justify-center">
            <div className="row-4-card card-box relative z-10 glass-card bg-black/80 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-4 max-w-[500px] mx-auto md:mr-0 opacity-0 will-change-transform">
              <span className="text-marathon-lime font-bold tracking-[0.25em] text-xs uppercase block">
                {SLIDES[2].category}
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-black text-white leading-tight uppercase">
                {SLIDES[2].title}
              </h3>
              <p className="text-marathon-light/80 font-body text-sm md:text-base leading-relaxed">
                {SLIDES[2].text}
              </p>
            </div>
          </div>
          <div className="col flex justify-center items-center">
            <div className="row-4-decor relative z-10 text-center p-8 border border-marathon-green/20 rounded-3xl bg-marathon-darkest/90 backdrop-blur-xl max-w-[360px] shadow-lg opacity-0 will-change-transform">
              <Heart size={36} className="text-marathon-lime mx-auto mb-4 animate-pulse fill-marathon-lime" />
              <h4 className="text-lg font-heading font-bold text-white mb-2 uppercase">Un sentimiento inmortal</h4>
              <p className="text-xs text-marathon-light/60 leading-relaxed">
                Cruzando generaciones desde 1925, latiendo más fuerte que nunca en la costa norte de Honduras.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ── LOWER SCROLLABLE SECTION (Quotes & Fan Base) ── */}

    </section>
  );
}
