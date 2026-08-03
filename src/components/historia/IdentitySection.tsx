"use client";

import React, { useRef } from "react";
import { useGsap, gsap } from "@/hooks/useGsap";

export default function IdentitySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (!gridRef.current) return;

    gsap.from(gridRef.current.children, {
      y: 30,
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

  return (
    <section
      id="identidad"
      ref={containerRef}
      className="py-24 sm:py-36 px-4 sm:px-6 md:px-8 bg-[#FFFFFF] text-[#1d1d1f] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Apple-style Category Tag */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#2E9C3F] uppercase">
            04 &bull; IDENTIDAD & SÍMBOLOS
          </span>
          <div className="h-[1px] w-12 bg-[#2E9C3F]/30" />
          <span className="text-xs text-[#86868b] font-mono">Apodos & Mascota</span>
        </div>

        {/* Header with font-elrotex */}
        <h2 className="font-elrotex text-4xl sm:text-6xl md:text-7xl text-[#1d1d1f] tracking-tight uppercase leading-[0.95] mb-16">
          SÍMBOLOS Y <span className="text-[#2E9C3F]">APODOS LEGENDARIOS</span>
        </h2>

        {/* Apple / Mobbin Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: El Monstruo Verde (Bento 7 cols) */}
          <div className="md:col-span-7 bg-[#F5F5F7] p-8 sm:p-10 rounded-3xl border border-black/[0.05] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#2E9C3F] uppercase tracking-wider">
                  Sobrenombre Insignia &bull; 1987
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white text-[11px] font-mono font-medium text-[#1d1d1f]">
                  Marco Antonio Pinto
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#1d1d1f] mb-3">
                &ldquo;El Monstruo Verde&rdquo;
              </h3>
              <p className="text-sm sm:text-base text-[#515154] font-light leading-relaxed">
                Bautizado en la tercera vuelta del campeonato de 1987 por el reconocido periodista Marco Antonio Pinto, tras una racha implacable donde Marathón ganó 8 partidos consecutivos de forma arrolladora.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-black/[0.06] text-xs text-[#86868b] font-mono">
              Apodo principal de la institución verdolaga
            </div>
          </div>

          {/* Card 2: La Sinfonía Verde (Bento 5 cols) */}
          <div className="md:col-span-5 bg-[#F5F5F7] p-8 sm:p-10 rounded-3xl border border-black/[0.05] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#2E9C3F] uppercase tracking-wider">
                  Primer Título &bull; 1979
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#1d1d1f] mb-3">
                &ldquo;La Sinfonía Verde&rdquo;
              </h3>
              <p className="text-sm text-[#515154] font-light leading-relaxed">
                Denominación otorgada durante la conquista del primer campeonato nacional de 1979, gracias a la armonía, elegancia y virtuosismo del plantel dirigido por Ángel Ramón Rodríguez.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-black/[0.06] text-xs text-[#86868b] font-mono">
              Fútbol vistoso y armónico
            </div>
          </div>

          {/* Card 3: La Mascota Dinosaurio (Bento 4 cols) */}
          <div className="md:col-span-4 bg-[#F5F5F7] p-8 rounded-3xl border border-black/[0.05] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#2E9C3F] uppercase tracking-wider block mb-3">
                Mascota Oficial
              </span>
              <h4 className="text-xl font-bold font-heading text-[#1d1d1f] mb-2">
                El Dinosaurio
              </h4>
              <p className="text-xs text-[#515154] font-light leading-relaxed mb-6">
                Personaje emblemático inspirador del Monstruo Verde que acompaña a la afición en cada partido.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-black/[0.06] text-center">
              <span className="text-[11px] font-mono font-medium text-[#1d1d1f]">
                [ 1925 — MASCOTA DINOSAURIO ]
              </span>
            </div>
          </div>

          {/* Card 4: Bandera Tricolor (Bento 4 cols) */}
          <div className="md:col-span-4 bg-[#F5F5F7] p-8 rounded-3xl border border-black/[0.05] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#2E9C3F] uppercase tracking-wider block mb-3">
                Bandera Oficial
              </span>
              <h4 className="text-xl font-bold font-heading text-[#1d1d1f] mb-2">
                Tricolor Sagrado
              </h4>
              <p className="text-xs text-[#515154] font-light leading-relaxed mb-4">
                Tres franjas verticales simétricas de color Verde, Blanco y Rojo con el escudo al centro.
              </p>
              <div className="h-4 w-full rounded-full overflow-hidden flex my-2 border border-black/10">
                <div className="w-1/3 bg-[#2E9C3F]" />
                <div className="w-1/3 bg-white" />
                <div className="w-1/3 bg-red-600" />
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-black/[0.06] text-center">
              <span className="text-[11px] font-mono font-medium text-[#1d1d1f]">
                [ BANDERA VERDE &bull; BLANCO &bull; ROJO ]
              </span>
            </div>
          </div>

          {/* Card 5: Uniformes (Bento 4 cols) */}
          <div className="md:col-span-4 bg-[#F5F5F7] p-8 rounded-3xl border border-black/[0.05] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#2E9C3F] uppercase tracking-wider block mb-3">
                Indumentaria
              </span>
              <h4 className="text-xl font-bold font-heading text-[#1d1d1f] mb-3">
                Kits de Juego
              </h4>
              <div className="space-y-2 text-xs text-[#515154]">
                <div className="p-2.5 rounded-xl bg-white border border-black/[0.05]">
                  <strong className="text-[#2E9C3F]">Titular:</strong> Camiseta verde, pantalón blanco.
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-black/[0.05]">
                  <strong className="text-[#1d1d1f]">Alternativo:</strong> Camiseta blanca, pantalón verde.
                </div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-black/[0.06] text-center mt-4">
              <span className="text-[11px] font-mono font-medium text-[#1d1d1f]">
                [ INDUMENTARIA OFICIAL ]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
