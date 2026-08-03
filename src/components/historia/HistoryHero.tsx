"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useGsap, gsap } from "@/hooks/useGsap";
import { Trophy, Calendar, MapPin, Globe, ChevronDown, Sparkles, Shield } from "lucide-react";

export default function HistoryHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (!titleRef.current || !statsRef.current) return;

    // Parallax & scale effect on scroll
    gsap.to(titleRef.current, {
      yPercent: 30,
      opacity: 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Stagger animate stats cards on load
    gsap.from(statsRef.current.children, {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 1,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  const quickStats = [
    { label: "Fundado en", value: "1925", icon: Calendar, highlight: "25 de Noviembre" },
    { label: "Títulos de Liga", value: "9", icon: Trophy, highlight: "Nacional de Honduras" },
    { label: "Estadio Propio", value: "Yankel Rosenthal", icon: MapPin, highlight: "Pioneros en Honduras" },
    { label: "Hazaña Internacional", value: "3-1 vs River", icon: Globe, highlight: "Verdugo de Extranjeros" },
  ];

  const anchorLinks = [
    { name: "Origen 1925", href: "#origen" },
    { name: "Línea de Tiempo", href: "#timeline" },
    { name: "Verdugo Internacional", href: "#internacional" },
    { name: "Identidad & Apodos", href: "#identidad" },
    { name: "El Templo & Afición", href: "#templo-aficion" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 overflow-hidden bg-gradient-to-b from-marathon-darkest via-marathon-dark/50 to-marathon-darkest"
    >
      {/* Background visual effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glow ambient spots */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-marathon-green/20 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-marathon-lime/15 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 -left-20 w-[450px] h-[450px] bg-marathon-green/15 rounded-full blur-[130px]" />
        
        {/* Subtle grid line overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#01402e15_1px,transparent_1px),linear-gradient(to_bottom,#01402e15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
        {/* Centenary Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-marathon-lime/40 text-marathon-lime text-xs sm:text-sm font-semibold mb-6 tracking-widest uppercase shadow-lg shadow-marathon-green/20"
        >
          <Sparkles className="w-4 h-4 text-marathon-lime animate-pulse" />
          <span>Centenario Verdolaga &bull; 1925 - 2025</span>
        </motion.div>

        {/* Title with font-elrotex */}
        <h1
          ref={titleRef}
          className="font-elrotex text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-marathon-light uppercase tracking-wide leading-none mb-6 drop-shadow-lg"
        >
          100 AÑOS DE <span className="text-gradient">LEYENDA Y PASIÓN</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-marathon-light/80 max-w-3xl mx-auto font-light leading-relaxed mb-10 px-2">
          Descubre el mito, la gloria y el legado inmortal del <span className="text-marathon-lime font-medium">Club Deportivo Marathón</span>: 
          desde una pelota de fútbol americano pedida a Chicago en 1925, hasta convertirse en el verdugo de gigantes internacionales y la voz verdolaga de San Pedro Sula.
        </p>

        {/* Anchor pills navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 max-w-4xl mx-auto">
          {anchorLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="liquid-glass-pill px-4 py-2 text-xs sm:text-sm font-heading font-medium text-marathon-light hover:text-marathon-lime hover:border-marathon-lime/50 transition-all duration-300 rounded-full hover:scale-105"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Quick Stats Grid with GSAP stagger */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left"
        >
          {quickStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass-card p-4 sm:p-5 rounded-2xl border border-marathon-green/25 relative overflow-hidden group hover:border-marathon-lime/50 hover:shadow-xl hover:shadow-marathon-green/20 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 p-3 text-marathon-green/20 group-hover:text-marathon-lime/40 transition-colors">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <span className="text-[11px] uppercase tracking-wider text-marathon-lime font-semibold block mb-1">
                  {stat.label}
                </span>
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-marathon-light block font-heading">
                  {stat.value}
                </span>
                <span className="text-[11px] text-marathon-light/60 block mt-1">
                  {stat.highlight}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Down scroll hint */}
      <div className="mt-12 text-marathon-lime/70 flex flex-col items-center gap-1 text-xs animate-bounce">
        <span>Desliza para explorar la historia</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
