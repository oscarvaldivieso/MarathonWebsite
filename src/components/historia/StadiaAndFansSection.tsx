"use client";

import React, { useRef } from "react";
import { useGsap, gsap } from "@/hooks/useGsap";

export default function StadiaAndFansSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (!gridRef.current) return;

    gsap.from(gridRef.current.children, {
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

  return (
    <section
      id="templo-aficion"
      ref={containerRef}
      className="py-24 sm:py-36 px-4 sm:px-6 md:px-8 bg-[#012919] text-[#F3F3F3] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Apple-style Category Tag */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#92BF4E] uppercase">
            05 &bull; INFRAESTRUCTURA & AFICIÓN
          </span>
          <div className="h-[1px] w-12 bg-[#92BF4E]/30" />
          <span className="text-xs text-[#F3F3F3]/60 font-mono">San Pedro Sula</span>
        </div>

        {/* Header with font-elrotex */}
        <h2 className="font-elrotex text-4xl sm:text-6xl md:text-7xl text-[#F3F3F3] uppercase tracking-wide leading-[0.95] mb-16">
          EL TEMPLO Y LA <span className="text-gradient">HINCHADA VERDOLAGA</span>
        </h2>

        {/* Apple 2-Column Split Grid */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Estadio Yankel Rosenthal & Sede */}
          <div className="bg-white/[0.03] p-8 sm:p-10 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E9C3F]/20 text-[#92BF4E] text-xs font-mono font-bold uppercase tracking-wider">
                Pioneros en Honduras
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#F3F3F3]">
                Estadio Yankel Rosenthal & Sede GAMA
              </h3>

              <div className="p-4 rounded-2xl bg-[#2E9C3F]/15 border border-[#92BF4E]/30 text-xs sm:text-sm text-[#92BF4E] font-medium leading-relaxed">
                El Club Deportivo Marathón es el <strong>ÚNICO equipo de Honduras</strong> en poseer su propio estadio.
              </div>

              <p className="text-sm text-[#F3F3F3]/80 font-light leading-relaxed">
                Ubicado en la colonia La Sabana / La Satélite de San Pedro Sula, el Estadio Yankel Rosenthal alberga a 9,000 aficionados verdolagas. Además, el club cuenta con su propia Sede Deportiva con múltiples canchas de entrenamiento e iluminación nocturna, fortalecida por el respaldo de GAMA (Grupo Amigos del Marathón).
              </p>
            </div>

            {/* Styled Minimalist Placeholder */}
            <div className="mt-8 p-5 rounded-2xl bg-black/40 border border-dashed border-white/20 text-center">
              <span className="text-xs font-mono text-[#92BF4E] font-medium block">
                [ ESTADIO YANKEL ROSENTHAL &amp; SEDE GAMA ]
              </span>
              <span className="text-[10px] text-[#F3F3F3]/50 block mt-0.5 font-light">
                San Pedro Sula, Honduras
              </span>
            </div>
          </div>

          {/* Card 2: La Furia Verde */}
          <div className="bg-white/[0.03] p-8 sm:p-10 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E9C3F]/20 text-[#92BF4E] text-xs font-mono font-bold uppercase tracking-wider">
                Fidelidad Incondicional
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#F3F3F3]">
                La Hinchada & La Furia Verde
              </h3>

              <p className="text-sm text-[#F3F3F3]/80 font-light leading-relaxed">
                Reconocida nacional e internacionalmente por su aliento incondicional tanto en momentos de gloria como en épocas oscuras. La barra organizada <strong className="text-[#92BF4E] font-normal">&ldquo;La Furia Verde&rdquo;</strong> inunda las graderías con mantas, banderas tricolores (verde, blanco y rojo) e instrumentos de percusión.
              </p>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/10 italic text-xs sm:text-sm text-[#F3F3F3]/90 leading-relaxed">
                &ldquo;A lo largo de los años, las nuevas generaciones se identifican masivamente con la garra y mística del Monstruo Verde.&rdquo;
              </div>
            </div>

            {/* Styled Minimalist Placeholder */}
            <div className="mt-8 p-5 rounded-2xl bg-black/40 border border-dashed border-white/20 text-center">
              <span className="text-xs font-mono text-[#92BF4E] font-medium block">
                [ HINCHADA FURIA VERDE EN GRADERÍAS ]
              </span>
              <span className="text-[10px] text-[#F3F3F3]/50 block mt-0.5 font-light">
                Apoyo incondicional verdolaga
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
