import React from "react";
import type { Metadata } from "next";
import TeamClient from "@/components/team/TeamClient";

export const metadata: Metadata = {
  title: "El Plantel — Furia Verde",
  description:
    "Conoce a cada uno de los jugadores y cuerpo técnico del Club Deportivo Marathón. El plantel oficial, estadísticas, posiciones y ficha técnica de la Furia Verde de San Pedro Sula.",
  keywords: [
    "Plantel Marathón",
    "Jugadores Marathón",
    "Cuerpo Técnico Marathón",
    "Furia Verde",
    "César Samudio",
    "Alexy Vega",
    "San Pedro Sula",
  ],
  openGraph: {
    title: "El Plantel Oficial — Club Deportivo Marathón",
    description:
      "Explora las fichas técnicas, estadísticas y atributos del plantel oficial de la Furia Verde para esta temporada.",
    type: "website",
  },
};

export default function TeamPage() {
  return (
    <div className="relative min-h-screen bg-marathon-darkest pt-24 sm:pt-28 overflow-hidden">
      {/* Background Graphic Patterns & Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Glow circles */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-marathon-green/5 blur-3xl" />
        <div className="absolute -bottom-60 -left-60 w-[800px] h-[800px] rounded-full bg-marathon-lime/5 blur-3xl" />

        {/* Diagonal lines pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 30px,
              #0e721dff 30px,
              #1ab631ff 31px
            )`,
          }}
        />

        {/* Large Floating Background Words */}
        <div
          className="absolute top-[10%] left-[8%] text-white/[0.01] text-7xl md:text-9xl select-none origin-center whitespace-nowrap"
          style={{ fontFamily: "var(--font-elrotex), sans-serif", transform: "rotate(-10deg)" }}
        >
          MONSTRUO VERDE
        </div>
        <div
          className="absolute top-[28%] right-[10%] text-white/[0.008] text-6xl md:text-8xl select-none origin-center whitespace-nowrap"
          style={{ fontFamily: "var(--font-elrotex), sans-serif", transform: "rotate(15deg)" }}
        >
          YANKEL ROSENTHAL
        </div>
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10">
        {/* Editorial Page Header */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-4">
          <div className="relative inline-block mb-3">
            {/* Giant Translucent Outlined text behind header */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 antonio-outline font-bold text-6xl sm:text-8xl md:text-[9rem] tracking-wider select-none pointer-events-none text-[#ffffff]/[0.02] whitespace-nowrap z-0 uppercase"
              style={{
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.08)",
                paintOrder: "stroke fill"
              }}
            >
              Furia Verde
            </div>
            
            <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-heading font-black text-marathon-light tracking-wide uppercase leading-none">
              NUESTRO <span className="text-gradient">PLANTEL</span>
            </h1>
          </div>
          
          <p className="text-sm sm:text-base font-body text-marathon-light/60 max-w-2xl mx-auto mt-2">
            La plantilla oficial del Club Deportivo Marathón. Conoce las estadísticas, habilidades e historias de los guerreros que defienden nuestros colores.
          </p>
        </header>

        {/* Team Grid & Filters Client Component wrapper */}
        <TeamClient />
      </div>
    </div>
  );
}
