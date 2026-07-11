"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";
import { FAN_QUOTES, CLUB } from "@/lib/constants";
import { Quote, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";

export default function FanSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
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
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── QUOTE CARD ENTRANCE ──────────────────────────────────
      gsap.fromTo(
        ".fan-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".fan-card",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── PASSION STATEMENT ────────────────────────────────────
      gsap.fromTo(
        ".fan-passion",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".fan-passion",
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
      id="hinchada"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-marathon-darkest overflow-hidden"
    >
      {/* Parallax-like background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-marathon-darkest via-marathon-dark/30 to-marathon-darkest" />
        <div className="absolute inset-0 bg-gradient-to-r from-marathon-darkest via-transparent to-marathon-darkest" />
      </div>

      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-marathon-green/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-marathon-lime/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="La Hinchada"
          subtitle="Apasionados, fieles, sufren pero están ahí. Siempre."
        />

        {/* Quotes Carousel — Framer Motion for state-based transitions */}
        <div className="fan-card relative max-w-3xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center min-h-[280px] flex flex-col items-center justify-center">
            {/* Quote Icon */}
            <Quote
              size={40}
              className="text-marathon-green/30 mb-6"
            />

            {/* Quote Text — AnimatePresence for smooth carousel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <blockquote className="text-xl md:text-2xl lg:text-3xl font-heading font-medium text-marathon-light leading-relaxed mb-6">
                  &ldquo;{FAN_QUOTES[currentQuote].text}&rdquo;
                </blockquote>
                <cite className="text-marathon-lime text-sm font-heading not-italic flex items-center justify-center gap-2">
                  <Heart size={14} className="fill-marathon-lime" />
                  {FAN_QUOTES[currentQuote].author}
                </cite>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={prevQuote}
                className="w-10 h-10 rounded-full border border-marathon-green/30 flex items-center justify-center text-marathon-light/50 hover:text-marathon-lime hover:border-marathon-lime/50 transition-all duration-300 cursor-pointer"
                aria-label="Previous quote"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {FAN_QUOTES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuote(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      index === currentQuote
                        ? "bg-marathon-lime w-6"
                        : "bg-marathon-light/20 hover:bg-marathon-light/40"
                    }`}
                    aria-label={`Quote ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextQuote}
                className="w-10 h-10 rounded-full border border-marathon-green/30 flex items-center justify-center text-marathon-light/50 hover:text-marathon-lime hover:border-marathon-lime/50 transition-all duration-300 cursor-pointer"
                aria-label="Next quote"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Passion Statement */}
        <p className="fan-passion text-center mt-12 text-marathon-light/30 text-sm italic max-w-lg mx-auto">
          El {CLUB.shortName} no es solo un equipo, es una forma de vida. 
          Es el abrazo de un gol, la lágrima de una derrota y la fe inquebrantable 
          de que siempre habrá un mañana verde.
        </p>
      </div>
    </section>
  );
}
