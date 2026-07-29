"use client";

import React, { useRef, useEffect } from "react";
import { ArrowRight, ChevronDown, Ticket, Users, MapPin, Trophy } from "lucide-react";
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
      // Timeline de animación de entrada
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });

      // 1. Fondo general
      tl.fromTo(
        ".hero-bg",
        { opacity: 0 },
        { opacity: 1, duration: 1.6, ease: "power2.inOut" },
        0
      );

      // 2. Texto cinematográfico "MARATHON"
      tl.fromTo(
        ".hero-cinematic-text",
        { opacity: 0, scale: 1.08, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: "power3.out" },
        0.2
      );

      // 3. Jugador Messiniti en medio
      tl.fromTo(
        ".hero-player-container",
        { opacity: 0, y: 70, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: "power4.out" },
        0.4
      );

      // 4. Header superior
      tl.fromTo(
        ".hero-top-header",
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.65
      );

      // 6. Banda inferior (Card de próximo partido y CTAs)
      tl.fromTo(
        ".hero-match-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.85
      );

      // 7. Scroll indicator
      tl.fromTo(
        ".hero-scroll",
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        1.2
      );

      // Parallax scroll
      gsap.to(".hero-cinematic-text", {
        yPercent: -22,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-player-container", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Parallax interactivo al mover el mouse
      const handleMouseMove = (e: MouseEvent) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const xPercent = ((e.clientX - rect.left) / rect.width - 0.5) * 20;

        gsap.to(".hero-cinematic-text", {
          x: xPercent * 0.5,
          duration: 1,
          ease: "power2.out",
        });

        gsap.to(".hero-player-container", {
          x: xPercent * 0.9,
          duration: 1,
          ease: "power2.out",
        });
      };

      const section = sectionRef.current;
      if (section) {
        section.addEventListener("mousemove", handleMouseMove);
      }

      return () => {
        if (section) {
          section.removeEventListener("mousemove", handleMouseMove);
        }
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
      {/* ── 1. Fondo Atmosférico ── */}
      <div className="hero-bg absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/assets/backgrounds/Image.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          aria-hidden="true"
        />
        {/* Spot light verde en el centro detrás del jugador */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] sm:w-[60vw] max-w-[680px] h-[85vw] sm:h-[60vw] max-h-[680px] bg-marathon-green/25 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none" />

        {/* Overlays de degradado para integrarlo al tema oscuro */}
        <div className="absolute inset-0 bg-marathon-darkest/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-marathon-darkest/85 via-transparent to-marathon-darkest" />
        <div className="absolute inset-0 bg-gradient-to-r from-marathon-darkest/60 via-transparent to-marathon-darkest/60" />
      </div>

      {/* ── 2. Texto "MARATHON" (Fuente Elrotex) - Elevado y Con Borde Responsivo ── */}
      <div className="hero-cinematic-text absolute top-[41%] sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-10 pointer-events-none flex justify-center items-center px-1 sm:px-4">
        <span
          className="font-elrotex uppercase text-[18vw] xs:text-[16.5vw] sm:text-[16vw] lg:text-[17vw] xl:text-[18vw] leading-none tracking-[0.06em] xs:tracking-[0.08em] sm:tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-marathon-lime/90 via-marathon-green/65 to-marathon-dark/30 drop-shadow-[0_0_40px_rgba(146,191,78,0.35)] text-center whitespace-nowrap [--stroke-w:0.25px] sm:[--stroke-w:1.2px]"
          style={{ WebkitTextStroke: "var(--stroke-w) rgba(245, 250, 245, 0.5)" }}
        >
          MARATHON
        </span>
      </div>

      {/* ── 3. Jugador Messiniti en Medio (Más Grande en Móvil) ── */}
      <div className="hero-player-container absolute bottom-6 sm:bottom-16 md:bottom-12 lg:bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-end justify-center w-full max-w-6xl h-[74vh] xs:h-[76vh] sm:h-[70vh] md:h-[78vh] lg:h-[86vh]">
        {/* Glow directo detrás de Messiniti */}
        <div className="absolute bottom-1/4 w-2/3 h-1/2 bg-marathon-lime/20 rounded-full blur-[95px] -z-10 animate-pulse-glow" />

        <Image
          src="/assets/hero/Messiniti.png"
          alt="Nicolás Messiniti - CD Marathón"
          fill
          className="object-contain object-bottom filter drop-shadow-[0_20px_50px_rgba(46,156,63,0.45)]"
          priority
        />
        {/* Difuminado suave en los pies */}
        <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-marathon-darkest via-marathon-darkest/75 to-transparent z-25 pointer-events-none" />
      </div>



      {/* ── 5. Capa de Contenido Frente ── */}
      <div className="relative z-30 flex flex-col justify-between h-full max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-4 sm:pb-5 pointer-events-none">

        {/* Logo Centenario Conmemorativo (Exclusivo para Móvil - Estático y Proporcionado) */}
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



        {/* ── Banda Inferior (CTAs + Contenedor Redondo del Partido) ── */}
        <div className="hero-match-card w-full mt-auto pointer-events-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 w-full">

            {/* CTAs Izquierda */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3.5 w-full md:w-auto">

              {/* Botón Comprar Entradas */}
              <a
                href="/entradas"
                className="hero-cta relative inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-marathon-lime via-[#a4d458] to-marathon-lime text-marathon-darkest font-heading font-black text-[11px] sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(146,191,78,0.4)] hover:shadow-[0_0_35px_rgba(146,191,78,0.7)] active:scale-[0.98] group overflow-hidden border border-white/40 text-center"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-white/35 skew-x-[-20deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out pointer-events-none" />

                <Ticket size={15} className="text-marathon-darkest shrink-0 group-hover:rotate-12 transition-transform duration-300 hidden xs:inline-block sm:inline-block" />
                <span className="whitespace-nowrap">Comprar entradas</span>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform duration-200 shrink-0 hidden sm:inline-block"
                />
              </a>

              {/* Botón Ver Plantel */}
              <a
                href="/equipo"
                className="hero-cta relative inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-marathon-lime/15 border border-white/20 hover:border-marathon-lime/60 text-white hover:text-marathon-lime font-heading font-extrabold text-[11px] sm:text-sm uppercase tracking-wider transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(146,191,78,0.2)] active:scale-[0.98] group text-center"
              >
                <Users size={15} className="text-white/70 group-hover:text-marathon-lime transition-colors duration-300 shrink-0 hidden xs:inline-block sm:inline-block" />
                <span className="whitespace-nowrap">Ver plantel</span>
              </a>
            </div>

            {/* Contenedor Redondo para la Sección del Próximo Partido */}
            <div className="relative rounded-full overflow-hidden border border-marathon-lime/45 bg-marathon-darkest/85 backdrop-blur-2xl px-4 sm:px-8 py-2.5 sm:py-3.5 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_35px_rgba(146,191,78,0.3)] flex items-center justify-between sm:justify-start gap-3 sm:gap-6 w-full md:w-auto group">

              {/* Imagen del Pattern de la carpeta brand */}
              <Image
                src="/assets/brand/pattern.png"
                alt="Marathón Pattern"
                fill
                className="object-cover opacity-60 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-marathon-darkest/70 via-marathon-dark/45 to-marathon-darkest/70 pointer-events-none" />

              {/* Escudos sueltos sin chips ni bordes */}
              <div className="relative z-10 flex items-center gap-2 sm:gap-3 shrink-0">
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                  <Image
                    src="/assets/brand/escudo_normal.svg"
                    alt="CD Marathón"
                    width={40}
                    height={40}
                    className="object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                  />
                </div>

                <span className="text-marathon-lime font-elrotex font-black text-xs sm:text-md tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  VS
                </span>

                <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                  <Image
                    src="/assets/matchday/teams/escudo_olimpia.png"
                    alt="CD Olimpia"
                    width={40}
                    height={40}
                    className="object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>

              {/* Detalle del Partido */}
              <div className="relative z-10 flex flex-col justify-center pr-1 sm:pr-3 text-right sm:text-left">
                <div className="flex items-center gap-1.5 sm:gap-2 justify-end sm:justify-start">
                  <span className="text-marathon-lime text-[11px] sm:text-[13px] font-heading font-black">
                    Próximo Partido
                  </span>
                </div>
                <span className="text-white font-heading font-black text-[11px] sm:text-sm uppercase tracking-wide whitespace-nowrap">
                  Marathón <span className="text-white/40 font-normal">vs</span> Olimpia
                </span>
                <span className="text-white/60 text-[10px] sm:text-[11px] font-body capitalize whitespace-nowrap">
                  {formatMatchDate(NEXT_MATCH.date)} · {NEXT_MATCH.time}
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* ── 6. Indicador de Scroll ── */}
      <div className="hero-scroll absolute bottom-1.5 left-1/2 -translate-x-1/2 z-40 hidden sm:block pointer-events-auto">
        <a
          href="#stats"
          aria-label="Ir a estadísticas"
          className="flex flex-col items-center gap-1 text-white/30 hover:text-marathon-lime transition-colors duration-200"
        >
          <ChevronDown size={18} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
