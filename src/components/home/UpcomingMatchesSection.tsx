"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/hooks/useGsap";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";

const UPCOMING_MATCHES = [
  {
    home: "Marathón",
    away: "Olimpia",
    date: "15 Ago 2025",
    time: "19:00",
    venue: "Yankel Rosenthal",
    competition: "Liga Nacional — J5",
    homeLogo: "/assets/brand/escudo_normal.svg",
    awayLogo: "/assets/matchday/teams/escudo_olimpia.png",
    isHome: true,
  },
  {
    home: "Real España",
    away: "Marathón",
    date: "22 Ago 2025",
    time: "15:00",
    venue: "Morazán",
    competition: "Liga Nacional — J6",
    homeLogo: "/assets/matchday/teams/escudo_olimpia.png",
    awayLogo: "/assets/brand/escudo_normal.svg",
    isHome: false,
  },
  {
    home: "Marathón",
    away: "Motagua",
    date: "29 Ago 2025",
    time: "19:00",
    venue: "Yankel Rosenthal",
    competition: "Liga Nacional — J7",
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
        ".match-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
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
      className="relative py-16 md:py-24 bg-marathon-darkest overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-marathon-green/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.3em] text-marathon-lime/70 mb-3 block">
            Calendario
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-white">
            Próximos <span className="text-marathon-lime">Partidos</span>
          </h2>
        </div>

        {/* Match cards */}
        <div className="space-y-4">
          {UPCOMING_MATCHES.map((match, i) => (
            <div
              key={i}
              className="match-card group relative bg-marathon-dark/40 hover:bg-marathon-dark/60 border border-white/8 hover:border-marathon-lime/30 rounded-2xl p-4 sm:p-6 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Date + Competition */}
                <div className="hidden sm:flex flex-col items-center gap-1 min-w-[90px]">
                  <span className="text-marathon-lime text-xs font-heading font-bold uppercase tracking-wider">
                    {match.competition.split("—")[0]}
                  </span>
                  <span className="text-white/50 text-[10px] font-heading tracking-wider">
                    {match.competition.split("—")[1]}
                  </span>
                </div>

                {/* Teams */}
                <div className="flex items-center gap-3 sm:gap-6 flex-1 justify-center">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end">
                    <span className={`text-sm sm:text-base font-heading font-bold ${match.isHome ? "text-marathon-lime" : "text-white"} text-right`}>
                      {match.home}
                    </span>
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                      <Image src={match.homeLogo} alt={match.home} width={40} height={40} className="object-contain" />
                    </div>
                  </div>

                  <span className="text-white/30 font-heading font-black text-xs sm:text-sm tracking-widest">VS</span>

                  <div className="flex items-center gap-2 sm:gap-3 flex-1">
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                      <Image src={match.awayLogo} alt={match.away} width={40} height={40} className="object-contain" />
                    </div>
                    <span className={`text-sm sm:text-base font-heading font-bold ${!match.isHome ? "text-marathon-lime" : "text-white"}`}>
                      {match.away}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="hidden md:flex items-center gap-4 text-white/50 text-xs shrink-0">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {match.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {match.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {match.venue}
                  </span>
                </div>
              </div>

              {/* Mobile details */}
              <div className="flex sm:hidden items-center justify-center gap-3 mt-3 text-white/40 text-[10px]">
                <span className="flex items-center gap-1"><Calendar size={10} />{match.date}</span>
                <span className="flex items-center gap-1"><Clock size={10} />{match.time}</span>
                <span className="flex items-center gap-1"><MapPin size={10} />{match.venue}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 text-marathon-lime hover:text-white text-sm font-heading font-semibold transition-colors duration-300"
          >
            Ver calendario completo
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
