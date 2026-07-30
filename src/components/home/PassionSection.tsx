"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";
import { AnimatePresence, motion } from "framer-motion";
import { FAN_QUOTES } from "@/lib/constants";
import { Quote, ChevronLeft, ChevronRight, Heart, ArrowRight } from "lucide-react";

const HIGHLIGHTS = [
  {
    category: "Orígenes",
    title: "1925: Nace la Furia Verde",
    text: "Fundado el 25 de noviembre de 1925 en San Pedro Sula. Una leyenda de lucha, carácter y fidelidad incondicional.",
    image: "/assets/history/historic_1925.png",
  },
  {
    category: "Identidad",
    title: "Verde, Blanco y Rojo",
    text: "El verde es la selva, el blanco es el honor, el rojo es la sangre del hincha. Tres colores que definen a un pueblo.",
    image: "/assets/stadium/celebration.png",
  },
  {
    category: "Pasión",
    title: "La Hinchada Inmortal",
    text: "El Yankel Rosenthal ruge en cada jornada. La afición más apasionada de Honduras, de la cuna al cajón.",
    image: "/assets/fans/stadium_passion.png",
  },
];

export default function PassionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentQuote, setCurrentQuote] = useState(0);

  const nextQuote = () => setCurrentQuote((p) => (p + 1) % FAN_QUOTES.length);
  const prevQuote = () => setCurrentQuote((p) => (p - 1 + FAN_QUOTES.length) % FAN_QUOTES.length);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Cards stagger reveal
      gsap.fromTo(
        ".passion-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".passion-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Quotes section
      gsap.fromTo(
        ".passion-quotes",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".passion-quotes",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-marathon-darkest py-20 md:py-28 overflow-hidden"
    >
      {/* Background watermark */}
      <div className="absolute right-0 top-[10%] text-[18vw] font-bold text-white/[0.01] select-none pointer-events-none tracking-tighter whitespace-nowrap font-elrotex z-0">
        PASION
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14 relative z-10">
        <span className="inline-block text-xs font-heading font-semibold text-marathon-lime tracking-[0.3em] uppercase border-b border-marathon-lime/30 pb-2 mb-4">
          Desde 1925
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white leading-none uppercase">
          Bandera de nuestra <span className="text-gradient">Pasión</span>
        </h2>
      </div>

      {/* ── Cards Grid (simplified — no SVG path) ── */}
      <div className="passion-grid relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {HIGHLIGHTS.map((item, i) => (
          <div
            key={i}
            className="passion-card group relative rounded-2xl overflow-hidden border border-white/8 bg-marathon-dark/30 hover:border-marathon-lime/25 transition-all duration-500"
          >
            {/* Image */}
            <div className="relative h-48 sm:h-56 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-marathon-darkest via-marathon-darkest/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6">
              <span className="text-marathon-lime font-heading font-bold text-[10px] tracking-[0.25em] uppercase block mb-2">
                {item.category}
              </span>
              <h3 className="text-lg sm:text-xl font-heading font-black text-white mb-2 leading-tight">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/55 font-body leading-relaxed">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Quotes Section (simplified) ── */}
      <div className="passion-quotes relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.3em] text-marathon-lime/70 mb-3 block">
            Voz del Hincha
          </span>
          <h3 className="text-2xl md:text-3xl font-heading font-black text-white">
            La Hinchada <span className="text-marathon-lime">Habla</span>
          </h3>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-10 text-center min-h-[220px] flex flex-col items-center justify-center">
          <Quote size={32} className="text-marathon-green/30 mb-5" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              <blockquote className="text-lg md:text-xl lg:text-2xl font-heading font-medium text-marathon-light leading-relaxed mb-5">
                &ldquo;{FAN_QUOTES[currentQuote].text}&rdquo;
              </blockquote>
              <cite className="text-marathon-lime text-sm font-heading not-italic flex items-center justify-center gap-2">
                <Heart size={12} className="fill-marathon-lime" />
                {FAN_QUOTES[currentQuote].author}
              </cite>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-4 mt-6">
            <button onClick={prevQuote} className="w-9 h-9 rounded-full border border-marathon-green/30 flex items-center justify-center text-marathon-light/50 hover:text-marathon-lime hover:border-marathon-lime/50 transition-all duration-300 cursor-pointer" aria-label="Cita anterior">
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              {FAN_QUOTES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuote(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${index === currentQuote ? "bg-marathon-lime w-5" : "bg-marathon-light/20 hover:bg-marathon-light/40"}`}
                  aria-label={`Cita ${index + 1}`}
                />
              ))}
            </div>
            <button onClick={nextQuote} className="w-9 h-9 rounded-full border border-marathon-green/30 flex items-center justify-center text-marathon-light/50 hover:text-marathon-lime hover:border-marathon-lime/50 transition-all duration-300 cursor-pointer" aria-label="Siguiente cita">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
