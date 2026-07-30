"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/hooks/useGsap";
import { Calendar, MapPin, Ticket } from "lucide-react";
import Image from "next/image";

const UPCOMING_MATCHES = [
  {
    id: "match-1",
    home: "Marathón",
    away: "Olimpia",
    date: "Sábado 15 Ago · 2026",
    time: "7:00 PM",
    venue: "Estadio Yankel Rosenthal",
    leagueLogo: "/assets/matchday/liga hondubet.png",
    homeLogo: "/assets/brand/escudo_normal.svg",
    awayLogo: "/assets/matchday/teams/escudo_olimpia.png",
    isHome: true,
  },
  {
    id: "match-2",
    home: "Marathón",
    away: "Saprissa",
    date: "Miércoles 19 Ago · 2026",
    time: "8:00 PM",
    venue: "Estadio Yankel Rosenthal",
    leagueLogo: "/assets/matchday/central american cup.png",
    homeLogo: "/assets/brand/escudo_normal.svg",
    awayLogo: "/assets/matchday/teams/escudo_olimpia.png",
    isHome: true,
  },
  {
    id: "match-3",
    home: "Real España",
    away: "Marathón",
    date: "Sábado 22 Ago · 2026",
    time: "3:00 PM",
    venue: "Estadio Morazán",
    leagueLogo: "/assets/matchday/liga hondubet.png",
    homeLogo: "/assets/matchday/teams/escudo_olimpia.png",
    awayLogo: "/assets/brand/escudo_normal.svg",
    isHome: false,
  },
  {
    id: "match-4",
    home: "Marathón",
    away: "Motagua",
    date: "Sábado 29 Ago · 2026",
    time: "7:00 PM",
    venue: "Estadio Yankel Rosenthal",
    leagueLogo: "/assets/matchday/liga hondubet.png",
    homeLogo: "/assets/brand/escudo_normal.svg",
    awayLogo: "/assets/matchday/teams/escudo_olimpia.png",
    isHome: true,
  },
];

export default function UpcomingMatchesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".match-card-pattern",
        { opacity: 0, y: 35, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="partidos"
      ref={sectionRef}
      className="relative py-16 sm:py-24 bg-marathon-darkest border-t border-b border-white/10 overflow-hidden select-none"
    >
      {/* Resplandor verdolaga de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] h-[400px] bg-marathon-lime/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header de Sección */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-xs font-outfit font-bold uppercase tracking-[0.3em] text-marathon-lime mb-2 block">
              Matchday · El Templo Ruge
            </span>
            <h2 className="text-3xl sm:text-5xl font-elrotex tracking-wide text-white uppercase leading-none">
              Próximos <span className="text-gradient">Partidos</span>
            </h2>
          </div>
          <span className="text-xs font-outfit text-white/50 hidden sm:block">
            Desliza horizontalmente para explorar el calendario
          </span>
        </div>

        {/* Carrusel Horizontal de Cards (Scrollbar Oculta) */}
        <div className="flex items-center gap-5 sm:gap-6 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {UPCOMING_MATCHES.map((match) => (
            <div
              key={match.id}
              className="match-card-pattern snap-start shrink-0 w-[310px] xs:w-[350px] sm:w-[400px] relative rounded-[2rem] overflow-hidden bg-marathon-dark border border-white/10 hover:border-marathon-lime/60 transition-all duration-500 shadow-2xl hover:shadow-[0_20px_50px_rgba(146,191,78,0.25)] hover:-translate-y-1.5 group flex flex-col justify-between p-2 sm:p-3"
            >
              {/* ── CONTENEDOR INTERNO PEGADO AL BORDE CON PATTERN VISIBLE ── */}
              <div className="relative w-full p-5 sm:p-6 rounded-[1.5rem] overflow-hidden border border-marathon-lime/35 bg-marathon-darkest shadow-xl flex flex-col justify-between">

                {/* PATTERN OFICIAL DE FONDOS */}
                <Image
                  src="/assets/brand/pattern.png"
                  alt="Marathón Pattern"
                  fill
                  className="object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-marathon-darkest/80 via-marathon-darkest/40 to-marathon-darkest/85 pointer-events-none" />

                {/* 1. Logo del Torneo en Seco (Sin Contenedor Rectangular) + Fecha en Texto Limpio */}
                <div className="relative z-10 flex items-center justify-between mb-6 pb-3 border-b border-white/15">

                  {/* Logo del Torneo en Seco */}
                  <div className="relative h-7 w-28 sm:w-32 shrink-0 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                    <Image
                      src={match.leagueLogo}
                      alt="Torneo"
                      fill
                      className="object-contain object-left"
                    />
                  </div>

                  {/* Fecha en Texto Limpio */}
                  <span className="text-xs font-outfit text-white/90 font-medium tracking-wide flex items-center gap-1.5">
                    <Calendar size={13} className="text-marathon-lime" />
                    {match.date}
                  </span>
                </div>

                {/* 2. Duelo de Escudos Grandes + VS */}
                <div className="relative z-10 flex items-center justify-between gap-2 my-2">

                  {/* Equipo Local */}
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-300">
                      <Image src={match.homeLogo} alt={match.home} fill className="object-contain" />
                    </div>
                    <span className={`text-sm sm:text-base font-elrotex uppercase tracking-wide ${match.isHome ? "text-marathon-lime" : "text-white"}`}>
                      {match.home}
                    </span>
                  </div>

                  {/* VS Gigante Elrotex + Hora */}
                  <div className="flex flex-col items-center justify-center shrink-0 px-1">
                    <span className="font-elrotex font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-marathon-lime via-marathon-green to-white drop-shadow-[0_0_18px_rgba(146,191,78,0.6)]">
                      VS
                    </span>
                    <span className="text-[10px] font-outfit font-semibold text-white/80 uppercase tracking-widest mt-1 bg-marathon-darkest/90 px-2.5 py-0.5 rounded-full border border-white/15">
                      {match.time}
                    </span>
                  </div>

                  {/* Equipo Visitante */}
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-300">
                      <Image src={match.awayLogo} alt={match.away} fill className="object-contain" />
                    </div>
                    <span className={`text-sm sm:text-base font-elrotex uppercase tracking-wide ${!match.isHome ? "text-marathon-lime" : "text-white"}`}>
                      {match.away}
                    </span>
                  </div>

                </div>
              </div>

              {/* Footer de la Card: Estadio + Botón Comprar Entradas */}
              <div className="p-3 sm:p-4 pt-2 flex items-center justify-between gap-3">
                <span className="text-xs font-outfit text-white/80 flex items-center gap-1.5 truncate pl-1">
                  <MapPin size={14} className="text-marathon-lime shrink-0" />
                  <span className="truncate">{match.venue}</span>
                </span>

                <a
                  href="#cta"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-marathon-lime via-[#a4d458] to-marathon-lime text-marathon-darkest font-heading font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(146,191,78,0.35)] hover:shadow-[0_0_30px_rgba(146,191,78,0.6)] active:scale-95 shrink-0 group/btn"
                >
                  <Ticket size={14} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                  <span>Comprar Entradas</span>
                </a>
              </div>

              {/* Resplandor neón inferior en hover */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-marathon-lime to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
