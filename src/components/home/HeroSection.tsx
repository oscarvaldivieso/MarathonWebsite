"use client";

import React, { useRef, useEffect } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { NEXT_MATCH } from "@/lib/constants";
import { gsap } from "@/hooks/useGsap";
import Image from "next/image";

function formatMatchDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("es-HN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animación de entrada — una sola timeline orquestada, sin ruido
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.2,
      });

      // 1. Fondo — fade suave desde negro
      tl.fromTo(
        ".hero-bg",
        { opacity: 0 },
        { opacity: 1, duration: 1.8, ease: "power2.inOut" },
        0
      );

      // 2. Eyebrow — línea de categoría
      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.6
      );

      // 3. Titular principal — stagger por línea
      tl.fromTo(
        ".hero-title-line",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 },
        0.85
      );

      // 4. Subtítulo
      tl.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.2
      );

      // 5. CTAs
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        1.45
      );

      // 6. Jugadores — emerge desde abajo, el protagonismo visual
      tl.fromTo(
        ".hero-players",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power4.out" },
        0.9
      );

      // 7. Card de partido
      tl.fromTo(
        ".hero-match-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.5
      );

      // 8. Scroll indicator
      tl.fromTo(
        ".hero-scroll",
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        1.9
      );

      // Parallax mínimo — solo el fondo, sutil
      gsap.to(".hero-bg", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Jugadores — parallax ligeramente más lento que el scroll
      gsap.to(".hero-players", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-marathon-darkest"
    >
      {/* ── Fondo ── */}
      <div className="hero-bg absolute inset-0 z-0">
        <Image
          src="/assets/backgrounds/Image.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          aria-hidden="true"
        />
        {/* Overlay en dos capas: oscuridad base + gradiente hacia abajo */}
        <div className="absolute inset-0 bg-marathon-darkest/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-marathon-darkest/60 via-transparent to-marathon-darkest" />
      </div>

      {/* ── Layout principal ── */}
      <div className="relative z-10 flex flex-col min-h-screen max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 pt-28 pb-10">

        {/* Contenido superior — copy y jugadores en una grilla */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">

          {/* Columna izquierda — texto */}
          <div className="flex flex-col justify-end pb-8 lg:pb-16 space-y-5">

            {/* Eyebrow */}
            <div className="hero-eyebrow flex items-center gap-3">
              <span className="block w-8 h-px bg-marathon-lime" />
              <span className="text-marathon-lime text-xs font-heading font-black tracking-[0.2em] uppercase">
                San Pedro Sula · Desde 1925
              </span>
            </div>

            {/* Titular */}
            <h1 className="space-y-1">
              <span className="hero-title-line block text-5xl sm:text-6xl lg:text-7xl font-heading font-black text-white uppercase leading-[0.92] tracking-tight">
                Este equipo
              </span>
              <span className="hero-title-line block text-5xl sm:text-6xl lg:text-7xl font-heading font-black text-white uppercase leading-[0.92] tracking-tight">
                también es
              </span>
              <span className="hero-title-line block text-5xl sm:text-6xl lg:text-7xl font-elrotex text-marathon-lime uppercase leading-[0.92] tracking-tight drop-shadow-[0_0_30px_rgba(146,191,78,0.35)]">
                tuyo.
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="hero-subtitle text-white/55 text-base sm:text-lg max-w-md leading-relaxed font-body">
              Nueve títulos, cien años de historia, y una hinchada que nunca
              abandona. Bienvenido a la Furia Verde.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="/entradas"
                className="hero-cta inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-marathon-lime text-marathon-darkest font-heading font-black text-sm uppercase tracking-wider hover:bg-white transition-colors duration-200 group"
              >
                Comprar entradas
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </a>
              <a
                href="/equipo"
                className="hero-cta inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 text-white/80 font-heading font-bold text-sm uppercase tracking-wider hover:border-marathon-lime/40 hover:text-marathon-lime transition-colors duration-200"
              >
                Ver plantel
              </a>
            </div>
          </div>

          {/* Columna derecha — jugadores */}
          <div className="hero-players relative h-[50vh] sm:h-[58vh] lg:h-[72vh] flex items-end justify-center lg:justify-end will-change-transform">
            <Image
              src="/assets/hero/players.png"
              alt="Jugadores del CD Marathón"
              fill
              className="object-contain object-bottom filter drop-shadow-[0_20px_50px_rgba(46,156,63,0.3)]"
              priority
            />
          </div>
        </div>

        {/* ── Banda inferior — partido + stats ── */}
        <div className="relative z-10 border-t border-white/8 pt-5 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center">

          {/* Próximo partido */}
          <div className="hero-match-card sm:col-span-2 lg:col-span-2">
            <p className="text-white/35 text-[10px] font-heading font-black tracking-[0.2em] uppercase mb-2">
              Próximo partido
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              {/* Escudos */}
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 shrink-0">
                  <Image
                    src="/assets/brand/escudo_normal.svg"
                    alt="CD Marathón"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <span className="text-white/30 text-xs font-heading font-black tracking-widest">
                  VS
                </span>
                <div className="relative w-9 h-9 shrink-0">
                  <Image
                    src="/assets/matchday/teams/escudo_olimpia.png"
                    alt="CD Olimpia"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Info partido */}
              <div className="flex flex-col gap-0.5">
                <span className="text-white font-heading font-black text-sm uppercase tracking-wide">
                  Marathón{" "}
                  <span className="text-white/30 font-normal">vs</span> Olimpia
                </span>
                <div className="flex items-center gap-2 text-white/40 text-xs font-body capitalize">
                  <span>{formatMatchDate(NEXT_MATCH.date)}</span>
                  <span className="text-white/20">·</span>
                  <span>{NEXT_MATCH.time}</span>
                  <span className="text-white/20">·</span>
                  <span>{NEXT_MATCH.stadium}</span>
                </div>
              </div>

              {/* CTA entradas */}
              <a
                href="/entradas"
                className="ml-auto shrink-0 px-4 py-2 rounded-lg bg-marathon-lime/10 border border-marathon-lime/20 text-marathon-lime text-xs font-heading font-black uppercase tracking-wider hover:bg-marathon-lime/20 transition-colors duration-200"
              >
                Entradas
              </a>
            </div>
          </div>

          {/* Stat destacado — solo uno, sin ruido */}
          <div className="hidden lg:flex flex-col items-end gap-1">
            <span className="text-marathon-lime font-elrotex text-4xl leading-none">
              9×
            </span>
            <span className="text-white/35 text-xs font-heading font-black tracking-[0.15em] uppercase text-right">
              Campeón de la Liga Nacional
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <a
          href="#stats"
          aria-label="Ir a estadísticas"
          className="flex flex-col items-center gap-1.5 text-white/25 hover:text-marathon-lime transition-colors duration-200"
        >
          <ChevronDown size={16} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}