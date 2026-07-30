"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/hooks/useGsap";
import { PLAYERS } from "@/lib/players-data";
import { ArrowRight, Shield, Award } from "lucide-react";
import Image from "next/image";

// Select 4 star players for homepage highlight
const STAR_PLAYER_IDS = ["cesar-samudio", "alexy-vega", "alberth-elis", "nicolas-messiniti"];

export default function FeaturedPlayersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredPlayers = PLAYERS.filter((p) => STAR_PLAYER_IDS.includes(p.id));

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".player-card",
        { opacity: 0, y: 50 },
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
      id="plantel"
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-gradient-to-b from-marathon-darkest via-[#013524] to-marathon-darkest overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-marathon-lime/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.3em] text-marathon-lime/70 mb-3 block">
              Furia Verde
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-white">
              Jugadores <span className="text-marathon-lime">Destacados</span>
            </h2>
          </div>
          <a
            href="/equipo"
            className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-marathon-lime hover:text-white transition-colors duration-300"
          >
            Ver plantel completo
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlayers.map((player) => (
            <div
              key={player.id}
              className="player-card group relative bg-marathon-darkest/70 backdrop-blur-md border border-white/10 hover:border-marathon-lime/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-marathon-lime/10 flex flex-col justify-between"
            >
              {/* Top info badge */}
              <div className="p-4 flex items-center justify-between z-10">
                <span className="text-2xl font-elrotex font-black text-marathon-lime">
                  #{player.number}
                </span>
                <span className="text-[10px] font-heading font-bold uppercase tracking-wider bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-white/70">
                  {player.position}
                </span>
              </div>

              {/* Player Image */}
              <div className="relative h-64 w-full flex items-end justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-marathon-darkest via-transparent to-transparent z-10" />
                {player.image ? (
                  <Image
                    src={player.image}
                    alt={player.name}
                    fill
                    className="object-contain object-bottom group-hover:scale-105 transition-transform duration-500 z-0"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20">
                    <Shield size={48} />
                  </div>
                )}
              </div>

              {/* Player Footer Details */}
              <div className="p-4 relative z-20 bg-marathon-darkest/90 border-t border-white/5">
                <h3 className="text-lg font-heading font-bold text-white group-hover:text-marathon-lime transition-colors duration-300">
                  {player.name}
                </h3>
                <p className="text-xs text-white/50 font-body mb-3">
                  {player.nationality} · {player.height || "1.80m"}
                </p>

                {player.stats && (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px] font-heading">
                    <div className="bg-white/5 rounded-lg p-1.5 text-center">
                      <span className="text-white/40 block text-[9px] uppercase">Partidos</span>
                      <span className="text-white font-bold">{player.stats.matchesPlayed}</span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-1.5 text-center">
                      <span className="text-white/40 block text-[9px] uppercase">
                        {player.category === "goalkeeper" ? "Vallas Cero" : "Goles"}
                      </span>
                      <span className="text-marathon-lime font-bold">
                        {player.category === "goalkeeper" ? player.stats.cleanSheets || 0 : player.stats.goals || 0}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
