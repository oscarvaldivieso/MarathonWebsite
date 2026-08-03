"use client";

import React, { useRef, useEffect } from "react";
import { ChevronDown, Ticket, ArrowRight } from "lucide-react";
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
  const textRef = useRef<HTMLSpanElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      let hasPlayed = false;

      const playEntranceAnimation = () => {
        if (hasPlayed) return;
        hasPlayed = true;

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        // 1. Fondo
        tl.fromTo(
          ".hero-bg",
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 1.5, ease: "power2.inOut" },
          0
        );

        // 2. Texto MARATHON
        if (textRef.current) {
          tl.fromTo(
            textRef.current,
            { opacity: 0, scale: 1.15, y: -25, letterSpacing: "0.28em" },
            { opacity: 1, scale: 1, y: 0, letterSpacing: "0.06em", duration: 1.5, ease: "power3.out" },
            0.15
          );
        }

        // 3. Tagline
        tl.fromTo(
          ".hero-tagline",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.6
        );

        // 4. Messiniti (sin transparencia)
        if (playerRef.current) {
          tl.fromTo(
            playerRef.current,
            { opacity: 1, y: 90, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power4.out" },
            0.35
          );
        }

        // 5. Banda inferior
        tl.fromTo(
          ".hero-match-card",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
          0.75
        );

        // 6. Scroll indicator
        tl.fromTo(
          ".hero-scroll",
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4 },
          1.15
        );
      };

      const handlePreloaderComplete = () => playEntranceAnimation();
      window.addEventListener("preloaderComplete", handlePreloaderComplete);
      const fallbackTimer = setTimeout(() => playEntranceAnimation(), 2300);

      // Parallax scroll
      gsap.to(".hero-cinematic-text", {
        yPercent: -22,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      gsap.to(".hero-player-container", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Mouse parallax (desktop only)
      const xTextTo = gsap.quickTo(".hero-cinematic-text", "x", { duration: 0.8, ease: "power2.out" });
      const xPlayerTo = gsap.quickTo(".hero-player-container", "x", { duration: 0.8, ease: "power2.out" });

      const handleMouseMove = (e: MouseEvent) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const xPercent = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        xTextTo(xPercent * 0.5);
        xPlayerTo(xPercent * 0.9);
      };

      const section = sectionRef.current;
      if (section) {
        section.addEventListener("mousemove", handleMouseMove, { passive: true });
      }

      return () => {
        window.removeEventListener("preloaderComplete", handlePreloaderComplete);
        clearTimeout(fallbackTimer);
        if (section) section.removeEventListener("mousemove", handleMouseMove);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen min-h-[600px] max-h-screen flex flex-col justify-between overflow-hidden bg-marathon-darkest select-none"
    >
      {/* H1 semántico para SEO */}
      <h1 className="sr-only">Club Deportivo Marathón — La Furia Verde de San Pedro Sula, Honduras</h1>

      {/* ── 1. Fondo Atmosférico ── */}
      <div className="hero-bg absolute inset-0 z-0 pointer-events-none transform-gpu">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] sm:w-[60vw] max-w-[680px] h-[85vw] sm:h-[60vw] max-h-[680px] bg-marathon-green/25 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none transform-gpu" />
        <div className="absolute inset-0 bg-marathon-darkest/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-marathon-darkest/60 via-transparent to-marathon-darkest" />
        <div className="absolute inset-0 bg-gradient-to-r from-marathon-darkest/30 via-transparent to-marathon-darkest/30" />
      </div>

      {/* ── 2. Texto "MARATHON" + Tagline ── */}
      <div className="hero-cinematic-text absolute top-[38%] sm:top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-10 pointer-events-none flex flex-col justify-center items-center px-1 sm:px-4 will-change-transform transform-gpu">
        <span
          ref={textRef}
          className="font-elrotex uppercase text-[18vw] xs:text-[16.5vw] sm:text-[16vw] lg:text-[17vw] xl:text-[18vw] leading-none text-transparent bg-clip-text bg-gradient-to-b from-marathon-lime/90 via-marathon-green/65 to-marathon-dark/30 drop-shadow-[0_0_30px_rgba(146,191,78,0.25)] text-center whitespace-nowrap inline-block [--stroke-w:0.25px] sm:[--stroke-w:1.2px]"
          style={{ WebkitTextStroke: "var(--stroke-w) rgba(245, 250, 245, 0.5)" }}
        >
          MARATHON
        </span>
        {/* Tagline visible — contexto inmediato para el visitante */}
        <p className="hero-tagline text-white/60 text-xs sm:text-sm font-heading font-medium tracking-[0.2em] uppercase mt-2 sm:mt-3">
          La Furia Verde · Desde 1925
        </p>
      </div>

      {/* ── 3. Jugador Messiniti ── */}
      <div
        ref={playerRef}
        className="hero-player-container absolute bottom-6 sm:bottom-16 md:bottom-12 lg:bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-end justify-center w-full max-w-6xl h-[74vh] xs:h-[76vh] sm:h-[70vh] md:h-[78vh] lg:h-[86vh] will-change-transform transform-gpu"
      >
        <div className="absolute bottom-1/4 w-3/4 h-3/5 bg-gradient-to-t from-marathon-green/35 via-marathon-lime/25 to-transparent rounded-full blur-[80px] -z-10 transform-gpu" />
        <Image
          src="/assets/hero/Messiniti.png"
          alt="Nicolás Messiniti - Delantero estrella del CD Marathón"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
          className="object-contain object-bottom"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-marathon-darkest via-marathon-darkest/75 to-transparent z-25 pointer-events-none" />
      </div>

      {/* ── 4. Capa de Contenido ── */}
      <div className="relative z-30 flex flex-col justify-between h-full max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-4 sm:pb-5 pointer-events-none">

        {/* Logo Centenario (solo móvil) */}
        <div className="flex sm:hidden justify-center items-center pt-2 pointer-events-auto">
          <div className="relative w-32 h-32 xs:w-44 xs:h-44 shrink-0 filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            <Image
              src="/assets/brand/centenario.png"
              alt="100 Años Centenario CD Marathón"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* ── Banda Inferior ── */}
        <div className="hero-match-card w-full mt-auto pointer-events-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 w-full">

          </div>
        </div>
      </div>



      {/* Rich Verdolaga Green Transition Gradient into UpcomingMatches */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-b from-transparent via-[#012215]/80 to-[#010f0a] pointer-events-none z-30" />
    </section>
  );
}
