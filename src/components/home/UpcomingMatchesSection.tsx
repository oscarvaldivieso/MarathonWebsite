"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Home, Plane, Calendar, Clock, MapPin, Ticket, ChevronLeft, ChevronRight } from "lucide-react";

interface Match {
  id: string;
  tournament: string;
  tournamentLogo: string;
  home: string;
  away: string;
  homeLogo: string;
  awayLogo: string;
  rivalName: string;
  date: string;
  time: string;
  venue: string;
  isHome: boolean;
}

const UPCOMING_MATCHES: Match[] = [
  {
    id: "match-1",
    tournament: "LIGA HONDUBET",
    tournamentLogo: "/assets/matchday/liga hondubet.png",
    home: "MARATHON",
    away: "OLIMPIA",
    homeLogo: "/assets/brand/escudonormal_blanco.svg",
    awayLogo: "/assets/matchday/teams/escudo_olimpia.png",
    rivalName: "OLIMPIA",
    date: "SABADO 15 AGOSTO · 2026",
    time: "19:00 HRS",
    venue: "ESTADIO YANKEL ROSENTHAL",
    isHome: true,
  },
  {
    id: "match-2",
    tournament: "COPA CENTROAMERICANA",
    tournamentLogo: "/assets/matchday/central american cup.png",
    home: "MARATHON",
    away: "SAPRISSA",
    homeLogo: "/assets/brand/escudonormal_blanco.svg",
    awayLogo: "/assets/matchday/teams/escudo_olimpia.png",
    rivalName: "SAPRISSA",
    date: "MIERCOLES 19 AGOSTO · 2026",
    time: "20:00 HRS",
    venue: "ESTADIO YANKEL ROSENTHAL",
    isHome: true,
  },
  {
    id: "match-3",
    tournament: "LIGA HONDUBET",
    tournamentLogo: "/assets/matchday/liga hondubet.png",
    home: "REAL ESPANA",
    away: "MARATHON",
    homeLogo: "/assets/matchday/teams/escudo_realespana.png",
    awayLogo: "/assets/brand/escudonormal_blanco.svg",
    rivalName: "REAL ESPANA",
    date: "SABADO 22 AGOSTO · 2026",
    time: "15:00 HRS",
    venue: "ESTADIO MORAZAN",
    isHome: false,
  },
  {
    id: "match-4",
    tournament: "LIGA HONDUBET",
    tournamentLogo: "/assets/matchday/liga hondubet.png",
    home: "MARATHON",
    away: "MOTAGUA",
    homeLogo: "/assets/brand/escudonormal_blanco.svg",
    awayLogo: "/assets/matchday/teams/escudo_motagua.png",
    rivalName: "MOTAGUA",
    date: "SABADO 29 AGOSTO · 2026",
    time: "19:00 HRS",
    venue: "ESTADIO YANKEL ROSENTHAL",
    isHome: true,
  },
];

export default function UpcomingMatchesSection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section
      id="partidos"
      className="relative z-20 w-full bg-[#010906] text-white py-10 md:py-14 px-4 md:px-8 lg:px-12 overflow-hidden border-t border-white/10"
    >
      {/* Subtle Green Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-[radial-gradient(ellipse_at_top,_rgba(146,191,78,0.15)_0%,_transparent_70%)] pointer-events-none z-0" />

      {/* HEADER ROW WITH NAVIGATION ARROWS */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#92BF4E] animate-pulse" />
          <h2
            className="font-elrotex uppercase text-white tracking-wide text-2xl md:text-4xl leading-none"
          >
            PROXIMOS <span className="text-[#92BF4E]">PARTIDOS</span>
          </h2>
        </div>

        {/* Carousel Prev/Next Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            aria-label="Anterior partido"
            className="p-2.5 rounded-xl bg-[#011c11] border border-white/15 text-white/70 hover:text-white hover:border-[#92BF4E] transition-all cursor-pointer shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollRight}
            aria-label="Siguiente partido"
            className="p-2.5 rounded-xl bg-[#011c11] border border-white/15 text-white/70 hover:text-white hover:border-[#92BF4E] transition-all cursor-pointer shadow-md"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MATCH CAROUSEL STRIP */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div
          ref={carouselRef}
          className="flex items-center gap-5 overflow-x-auto pb-4 pt-1 scrollbar-none no-scrollbar scroll-smooth"
        >
          {UPCOMING_MATCHES.map((m) => (
            <div
              key={m.id}
              className="group relative w-[340px] md:w-[380px] flex-shrink-0 rounded-2xl border border-[#92BF4E]/30 bg-[#011a10] p-6 shadow-[0_15px_40px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-[#92BF4E] hover:shadow-[0_20px_50px_rgba(146,191,78,0.25)] overflow-hidden"
            >


              {/* CARD TOP HEADER: TOURNAMENT & LOCAL/VISITANTE BADGE */}
              <div className="relative z-10 flex items-center justify-between pb-4 mb-2">
                <div className="relative h-8 w-28 flex-shrink-0">
                  <Image
                    src={m.tournamentLogo}
                    alt={m.tournament}
                    fill
                    sizes="112px"
                    className="object-contain object-left"
                  />
                </div>

                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider ${m.isHome
                    ? "bg-[#92BF4E] text-[#011610]"
                    : "bg-amber-400 text-[#011610]"
                    }`}
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  {m.isHome ? (
                    <>
                      <Home className="w-3 h-3 stroke-[2.5]" />
                      <span>LOCAL</span>
                    </>
                  ) : (
                    <>
                      <Plane className="w-3 h-3 stroke-[2.5]" />
                      <span>VISITA</span>
                    </>
                  )}
                </div>
              </div>

              {/* TEAM CRESTS & CLASH NAMES */}
              <div className="relative z-10 rounded-xl overflow-hidden border border-[#92BF4E]/20 bg-[#010f09] px-4 py-5 my-1 shadow-inner">
                {/* Brand Pattern — only inside this clash container */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.5] "
                  style={{
                    backgroundImage: "url('/assets/brand/pattern.png')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "140px auto",
                  }}
                />
                {/* Subtle inner lime glow */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(146,191,78,0.12)_0%,_transparent_70%)]" />

                <div className="relative z-10 grid grid-cols-5 items-center gap-2 text-center">
                  {/* HOME */}
                  <div className="col-span-2 flex flex-col items-center">
                    <div className="relative w-16 h-16 mb-2 transition-transform group-hover:scale-105">
                      <Image
                        src={m.homeLogo}
                        alt={m.home}
                        fill
                        sizes="64px"
                        className="object-contain drop-shadow-md"
                      />
                    </div>
                    <span className="font-elrotex uppercase text-sm md:text-base text-white tracking-wider truncate max-w-full">
                      {m.home}
                    </span>
                  </div>

                  {/* VS BADGE */}
                  <div className="col-span-1 flex items-center justify-center">
                    <span className="font-elrotex text-3xl text-[#92BF4E] leading-none drop-shadow-[0_0_10px_rgba(146,191,78,0.6)]">
                      VS
                    </span>
                  </div>

                  {/* AWAY */}
                  <div className="col-span-2 flex flex-col items-center">
                    <div className="relative w-16 h-16 mb-2 transition-transform group-hover:scale-105">
                      <Image
                        src={m.awayLogo}
                        alt={m.away}
                        fill
                        sizes="64px"
                        className="object-contain drop-shadow-md"
                      />
                    </div>
                    <span className="font-elrotex uppercase text-sm md:text-base text-white tracking-wider truncate max-w-full">
                      {m.away}
                    </span>
                  </div>
                </div>
              </div>

              {/* METADATA FOOTER: DATE, TIME, VENUE */}
              <div className="relative z-10  pt-4 mt-4 flex flex-col gap-2 text-xs text-white/70" style={{ fontFamily: "var(--font-outfit)" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-medium text-white/90">
                    <Calendar className="w-3.5 h-3.5 text-[#92BF4E]" />
                    <span>{m.date}</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-[#92BF4E]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{m.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1.5 text-[0.7rem] text-white/50 truncate">
                    <MapPin className="w-3 h-3 text-[#92BF4E] flex-shrink-0" />
                    <span className="truncate">{m.venue}</span>
                  </div>

                  <a
                    href="#boletos"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#92BF4E] text-[#011610] font-bold text-[0.68rem] uppercase tracking-wider transition-all hover:bg-[#a6d85b] flex-shrink-0"
                  >
                    <Ticket className="w-3 h-3" />
                    <span>ENTRADAS</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
