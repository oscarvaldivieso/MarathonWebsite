"use client";

import React, { useRef } from "react";
import { useGsap, gsap } from "@/hooks/useGsap";

interface MatchItem {
  year: string;
  opponent: string;
  country: string;
  score: string;
  venue: string;
  description: string;
  badge: string;
  placeholderText: string;
}

export default function InternationalGlorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (!gridRef.current) return;

    gsap.from(gridRef.current.children, {
      y: 35,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });
  }, []);

  const matches: MatchItem[] = [
    {
      year: "2002",
      opponent: "River Plate",
      country: "Argentina 🇦🇷",
      score: "3 - 1",
      venue: "Estadio Olímpico Metropolitano (SPS)",
      description: "Victoria apoteósica ante uno de los clubes más laureados de Sudamérica.",
      badge: "Hazaña Conmebol",
      placeholderText: "MARATHÓN 3 - 1 RIVER PLATE (2002)",
    },
    {
      year: "1981",
      opponent: "Cruz Azul",
      country: "México 🇲🇽",
      score: "3 - 1",
      venue: "Ciudad de México",
      description: "Primer club de Honduras en derrotar a un gigante mexicano en territorio azteca.",
      badge: "Hito Histórico",
      placeholderText: "TRIUNFO 3 - 1 VS CRUZ AZUL (1981)",
    },
    {
      year: "1969",
      opponent: "Santos de Brasil (con Pelé)",
      country: "Brasil 🇧🇷",
      score: "1 - 1",
      venue: "San Pedro Sula",
      description: "Empate memorable frente al legendario Santos. Pelé jugó el segundo tiempo.",
      badge: "Duelo Legendario",
      placeholderText: "MARATHÓN VS SANTOS DE PELÉ (1969)",
    },
    {
      year: "1996",
      opponent: "Jong Colombia",
      country: "Antillas Neerlandesas 🇨🇼",
      score: "12 - 0",
      venue: "Oakland, California (CONCACAF)",
      description: "Máxima goleada en torneos CONCACAF con 7 goles del brasileño Octavio Santana.",
      badge: "Récord CONCACAF",
      placeholderText: "RÉCORD CONCACAF 12 - 0 (1996)",
    },
    {
      year: "1966",
      opponent: "Saprissa",
      country: "Costa Rica 🇨🇷",
      score: "4 - 0",
      venue: "Estadio Francisco Morazán",
      description: "Goleada categórica que forjó la reputación de Marathón como verdugo regional.",
      badge: "Dominio Regional",
      placeholderText: "GOLEADA 4 - 0 A SAPRISSA (1966)",
    },
    {
      year: "1968",
      opponent: "Cúcuta Deportivo",
      country: "Colombia 🇨🇴",
      score: "3 - 0",
      venue: "Estadio Francisco Morazán",
      description: "Primer duelo de Marathón ante un rival sudamericano en la historia.",
      badge: "Primer Duelo Suramericano",
      placeholderText: "MARATHÓN VS CÚCUTA (1968)",
    },
  ];

  return (
    <section
      id="internacional"
      ref={containerRef}
      className="py-24 sm:py-36 px-4 sm:px-6 md:px-8 bg-[#012919] text-[#F3F3F3] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Apple-style Category Tag */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#92BF4E] uppercase">
            03 &bull; PRESTIGIO INTERNACIONAL
          </span>
          <div className="h-[1px] w-12 bg-[#92BF4E]/30" />
          <span className="text-xs text-[#F3F3F3]/60 font-mono">Verdugo de Extranjeros</span>
        </div>

        {/* Header with font-elrotex */}
        <h2 className="font-elrotex text-4xl sm:text-6xl md:text-7xl text-[#F3F3F3] uppercase tracking-wide leading-[0.95] mb-16">
          EL VERDUGO DE LOS <span className="text-gradient">EQUIPOS EXTRANJEROS</span>
        </h2>

        {/* Minimalist Match Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {matches.map((m, idx) => (
            <div
              key={idx}
              className="bg-white/[0.03] p-7 rounded-3xl border border-white/10 hover:border-[#92BF4E]/40 hover:bg-white/[0.05] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#92BF4E] uppercase">
                    {m.year}
                  </span>
                  <span className="text-[11px] font-mono text-[#F3F3F3]/60">
                    {m.badge}
                  </span>
                </div>

                <div className="text-xs text-[#92BF4E] mb-1 font-medium">{m.country}</div>
                <h3 className="text-xl font-bold font-heading text-[#F3F3F3] mb-2">
                  vs {m.opponent}
                </h3>
                <div className="text-3xl font-extrabold text-gradient font-heading mb-2">
                  {m.score}
                </div>
                <div className="text-[11px] text-[#F3F3F3]/50 font-mono mb-4">
                  {m.venue}
                </div>

                <p className="text-xs text-[#F3F3F3]/80 leading-relaxed font-light mb-6">
                  {m.description}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-dashed border-white/15 text-center">
                <span className="text-[11px] font-mono text-[#92BF4E] font-medium block">
                  [ {m.placeholderText} ]
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
