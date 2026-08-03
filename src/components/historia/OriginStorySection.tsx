"use client";

import React, { useRef } from "react";
import { useGsap, gsap } from "@/hooks/useGsap";
import { ArrowUpRight } from "lucide-react";

export default function OriginStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (!contentRef.current) return;

    gsap.from(contentRef.current.children, {
      y: 35,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });
  }, []);

  const founders = [
    "Eloy Montes",
    "Chris Sabillón",
    "Kevin Sánchez",
    "Gerardo Fonseca",
    "Rubén Cerrato",
    "Carlos Miranda",
    "Eduardo Norris",
    "Pepe Améndola",
    "Abrahán Miselem",
  ];

  return (
    <section
      id="origen"
      ref={containerRef}
      className="py-24 sm:py-36 px-4 sm:px-6 md:px-8 bg-[#F5F5F7] text-[#1d1d1f] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Apple-style Category Tag */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#2E9C3F] uppercase">
            01 &bull; EL ORIGEN
          </span>
          <div className="h-[1px] w-12 bg-[#2E9C3F]/30" />
          <span className="text-xs text-[#86868b] font-mono">25.11.1925</span>
        </div>

        {/* Header with font-elrotex */}
        <h2 className="font-elrotex text-4xl sm:text-6xl md:text-7xl text-[#1d1d1f] tracking-tight uppercase leading-[0.95] mb-8">
          EL NACIMIENTO DEL MITO Y LA <span className="text-[#2E9C3F]">PELOTA DE CHICAGO</span>
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl text-[#515154] font-light max-w-3xl leading-relaxed mb-16">
          Una fortuita confusión idiomática en un pedido comercial importado desde Estados Unidos terminó bautizando a la institución más verde de Honduras.
        </p>

        {/* Content Container (Apple / Awwwards Editorial Layout) */}
        <div ref={contentRef} className="space-y-12">
          {/* Main Hero Bento Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F5F7] text-[#2E9C3F] text-xs font-semibold tracking-wide">
                San Pedro Sula, Honduras
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#1d1d1f] tracking-tight">
                La Asamblea de Don Eloy Montes
              </h3>

              <p className="text-base text-[#515154] font-light leading-relaxed">
                En la noche del <strong className="text-[#1d1d1f] font-medium">25 de noviembre de 1925</strong>, un grupo de amigos se reunió en el establecimiento comercial de don Eloy Montes para oficializar la fundación de un nuevo club de fútbol.
              </p>

              {/* Story Quote Block */}
              <div className="pl-5 border-l-2 border-[#2E9C3F] space-y-2 py-1">
                <p className="text-sm sm:text-base text-[#1d1d1f] font-normal italic leading-relaxed">
                  &ldquo;Don Eloy había solicitado por su cuenta un balón a la firma Montgomery Ward de Chicago (EE. UU.). Por una confusión idiomática, en lugar de recibir un balón de fútbol tradicional recibieron uno de fútbol americano con la marca grabada <span className="font-bold underline decoration-[#2E9C3F]">‘MARATHÓN’</span>, la cual inspiró el nombre eterno del club.&rdquo;
                </p>
                <span className="text-xs text-[#86868b] block font-mono">
                  — Crónica histórica de 1972
                </span>
              </div>
            </div>

            {/* Right: Minimalist Placeholder Art Frame */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="aspect-[4/3] rounded-2xl bg-[#F5F5F7] border border-black/[0.08] p-6 flex flex-col items-center justify-center text-center relative group">
                <div className="w-16 h-16 rounded-full bg-white border border-black/[0.08] flex items-center justify-center text-[#2E9C3F] mb-4 shadow-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 0v20m-7-3.5 14-13m0 13-14-13" />
                  </svg>
                </div>
                <span className="text-xs font-mono font-medium text-[#1d1d1f] tracking-wide">
                  [ 1925 — BALÓN MONTGOMERY WARD ]
                </span>
                <span className="text-[11px] text-[#86868b] mt-1 font-light">
                  Elemento gráfico histórico
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Founders Grid */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/[0.06]">
              <div>
                <h4 className="text-base font-semibold text-[#1d1d1f] font-heading">
                  Socios Fundadores y Directiva Provisional
                </h4>
                <p className="text-xs text-[#86868b] mt-0.5">
                  Los visionarios que iniciaron el sueño verdolaga en 1925
                </p>
              </div>
              <span className="text-xs font-mono text-[#2E9C3F] font-semibold">9 Miembros</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {founders.map((name, idx) => (
                <div
                  key={idx}
                  className="px-4 py-3 rounded-xl bg-[#F5F5F7] border border-black/[0.04] text-xs font-medium text-[#1d1d1f] text-center hover:bg-[#E8E8ED] transition-colors"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
