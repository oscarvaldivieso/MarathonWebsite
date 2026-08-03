"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/hooks/useGsap";
import { PLAYERS } from "@/lib/players-data";
import { ArrowRight, Shield, Target, Wand2, Hand, Sparkles } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Select 4 star players for homepage highlight
const STAR_PLAYER_IDS = ["cesar-samudio", "alexy-vega", "alberth-elis", "nicolas-messiniti"];

// Icon Badge Component for Positions (Portero = Guante, Defensa = Escudo, Medio = Varita Mágica, Delantero = Blanco/Target)
function PositionBadge({ category, position }: { category: string; position: string }) {
  const getPositionData = () => {
    switch (category) {
      case "goalkeeper":
        return { icon: Hand, label: "Portero", color: "text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-amber-500/20" };
      case "defender":
        return { icon: Shield, label: "Defensa", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-emerald-500/20" };
      case "midfielder":
        return { icon: Wand2, label: "Mediocampista", color: "text-violet-400 border-violet-500/30 bg-violet-500/10 shadow-violet-500/20" };
      case "forward":
        return { icon: Target, label: "Delantero", color: "text-marathon-lime border-marathon-lime/40 bg-marathon-lime/10 shadow-marathon-lime/20" };
      default:
        return { icon: Sparkles, label: position, color: "text-marathon-lime border-marathon-lime/30 bg-marathon-lime/10" };
    }
  };

  const { icon: Icon, label, color } = getPositionData();

  return (
    <div
      title={`${label} - ${position}`}
      className={cn(
        "p-2 rounded-full glass border flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md backdrop-blur-md",
        color
      )}
    >
      <Icon size={14} className="stroke-[2.5]" />
    </div>
  );
}

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
            <h2 className="text-3xl md:text-4xl font-elrotex font-black text-white">
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
              className="player-card group relative bg-marathon-darkest/70 backdrop-blur-md border border-white/10 hover:border-marathon-lime/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-marathon-lime/20 flex flex-col justify-between"
            >
              {/* Background dorsal number - Elegant scale & subtle hover zoom */}
              <div className="absolute right-2 top-0 select-none pointer-events-none transition-all duration-500 z-0 leading-none opacity-15 group-hover:opacity-35 group-hover:scale-105 text-marathon-light/30 group-hover:text-marathon-lime group-hover:drop-shadow-[0_0_20px_rgba(146,191,78,0.4)]">
                <span className="text-[135px] font-elrotex leading-none tracking-tighter block">
                  {player.number}
                </span>
              </div>

              {/* Top info badge */}
              <div className="p-4 flex items-center justify-between z-10">
                <span className="text-2xl font-elrotex font-black text-marathon-lime">
                  #{player.number}
                </span>
                
                {/* Position Minimalist Icon Badge (Guante, Escudo, Varita, Blanco) */}
                <PositionBadge category={player.category} position={player.position} />
              </div>

              {/* Player Image & Garras del Monstruo en Rojo Puro en Hover */}
              <div className="relative h-64 w-full flex items-end justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-marathon-darkest via-transparent to-transparent z-20" />

                {/* LAS GARRAS DEL MONSTRUO (garras.svg Rojo Puro en Hover detrás del jugador) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 z-0 pointer-events-none translate-y-8">
                  <img
                    src="/assets/hero/garras.svg"
                    alt="Garras del Monstruo Rojas"
                    className="w-full h-full object-contain filter drop-shadow-[0_4px_20px_rgba(237,28,36,0.5)]"
                  />
                </div>

                {player.image ? (
                  <Image
                    src={player.image}
                    alt={player.name}
                    fill
                    className="object-contain object-bottom group-hover:scale-105 transition-transform duration-500 z-10"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20 z-10">
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
