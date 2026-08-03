"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Milestone {
  id: string;
  year: string;
  shortYear: string;
  categoryName: string;
  title: string;
  subtitle: string;
  coach?: string;
  figures?: string[];
  description: string;
  highlightText?: string;
  imageSrc: string;
  imageCaption: string;
}

export default function TimelineSection() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const milestones: Milestone[] = [
    {
      id: "1925",
      year: "1925",
      shortYear: "'25",
      categoryName: "FUNDACIÓN",
      title: "El Origen y la Pelota de Chicago",
      subtitle: "San Pedro Sula &bull; 25 de Noviembre de 1925",
      description:
        "Una reunión entre amigos en el establecimiento de don Eloy Montes dio origen al club. Un envío equivocado desde Montgomery Ward (Chicago) trajo una pelota de fútbol americano con la marca grabada 'Marathón', bautizando para siempre al equipo verdolaga.",
      imageSrc: "/assets/history/marathon_1925.png",
      imageCaption: "Balón fundacional enviado desde Chicago en 1925",
    },
    {
      id: "1979",
      year: "1979",
      shortYear: "'79",
      categoryName: "1.ª COPA",
      title: "La Sinfonía Verde",
      subtitle: "Torneo 1979 &bull; Campeón Nacional",
      coach: "Ángel Ramón Rodríguez",
      figures: ["Roberto 'Robot' Bailey", "Arturo Bonilla", "Jorge Alberto 'Cuca' Bueso", "Jorge Phoyoú"],
      description:
        "Marathón venció a la Universidad en la final (1-0 en SPS y 0-1 en Tegucigalpa, ambos goles de Roberto Bailey). Por la armonía y belleza de su juego fue bautizado colectivamente como 'La Sinfonía Verde'.",
      highlightText: "Roberto Bailey anotó los goles del triunfo en ambos partidos de la final.",
      imageSrc: "/assets/history/marathon_1979.png",
      imageCaption: "La Sinfonía Verde celebrando el primer título de liga",
    },
    {
      id: "1985",
      year: "1985",
      shortYear: "'85",
      categoryName: "2.ª COPA",
      title: "Coronación en el Francisco Morazán",
      subtitle: "Torneo 1985 &bull; San Pedro Sula",
      coach: "Gonzalo Zelaya",
      figures: ["Leonel Machado", "Roy Padilla Bardales", "Richardson Smith", "Palic Castillo"],
      description:
        "En una disputadísima cuadrangular final, Marathón se consagró campeón derrotando 1-0 a C.D. Vida en el Estadio Francisco Morazán con un inolvidable gol del volante Roy Padilla Bardales.",
      highlightText: "Gol decisivo de Roy Padilla Bardales.",
      imageSrc: "/assets/history/equipazo.png",
      imageCaption: "Plantel campeón de 1985 en San Pedro Sula",
    },
    {
      id: "2002",
      year: "2002",
      shortYear: "'02",
      categoryName: "3.ª COPA",
      title: "El Resurgimiento de Chelato Uclés",
      subtitle: "Torneo Clausura 2002",
      coach: "José de la Paz Herrera ('Chelato Uclés')",
      figures: ["Enrique Centeno Reneau", "Nigel Zúñiga", "Óscar Vargas"],
      description:
        "Chelato Uclés armó un equipo inolvidable. Golearon 4-1 a Olimpia en la ida en el Olímpico y más de 7,000 hinchas verdolagas viajaron a la capital para acompañar la victoria histórica.",
      highlightText: "Goleada 4-1 en SPS y marcha de 7,000 aficionados a Tegucigalpa.",
      imageSrc: "/assets/history/marathon_2002.png",
      imageCaption: "Éxodo de la afición verdolaga a Tegucigalpa en 2002",
    },
    {
      id: "2003",
      year: "2003",
      shortYear: "'03",
      categoryName: "4.ª COPA",
      title: "Gol Olímpico y Récord de 35,000 Hinchas",
      subtitle: "Torneo Clausura 2003 &bull; 1 de Junio",
      coach: "Flavio Ortega",
      figures: ["Narciso Fernández", "Pompilio Cacho", "Denilson Costa", "Emil Martínez"],
      description:
        "Gol olímpico de Narciso Fernández en semis. En la final vs Motagua, el Estadio Olímpico registró la cifra récord de 35,000 aficionados pagados. Denilson Costa sentenció la cuarta copa con un doblete.",
      highlightText: "35,000 espectadores en el Olímpico y carnaval verdolaga.",
      imageSrc: "/assets/history/campeones.webp",
      imageCaption: "Carnaval en el Estadio Olímpico por la cuarta estrella",
    },
    {
      id: "2004",
      year: "2004",
      shortYear: "'04",
      categoryName: "5.ª COPA",
      title: "La Copa en Tegucigalpa",
      subtitle: "Torneo Apertura 2004 &bull; 20 de Noviembre",
      figures: ["Edgardo Simovic", "Emil Martínez", "Darwin Pacheco"],
      description:
        "En el Estadio Nacional de Tegucigalpa, Marathón derrotó 1-2 a Olimpia (3-5 global) con un Edgardo Simovic magistral, alzando su quinta corona de Liga Nacional.",
      imageSrc: "/assets/history/gloria.png",
      imageCaption: "Edgardo Simovic alzar el trofeo de campeón en 2004",
    },
    {
      id: "2008",
      year: "2008",
      shortYear: "'08",
      categoryName: "7.ª COPA",
      title: "El Tiro Libre de Berríos al Minuto 91",
      subtitle: "Torneo Apertura 2008 &bull; 13 de Diciembre",
      figures: ["Mario Berríos", "Carlos Will Mejía", "Erick Norales"],
      description:
        "Cuarta final consecutiva del club. Mario Berríos anotó un tiro libre antológico al minuto 91 en el Estadio Morazán para asegurar el 1-1 (2-1 global) frente a Real España.",
      highlightText: "Gol agónico de tiro libre de Mario Berríos al min 91.",
      imageSrc: "/assets/history/marathon_2008.png",
      imageCaption: "Mario Berríos en la emotiva celebración del gol al minuto 91",
    },
    {
      id: "2009",
      year: "2009",
      shortYear: "'09",
      categoryName: "8.ª COPA",
      title: "La Navidad Verde de Keosseian",
      subtitle: "Torneo Apertura 2009 &bull; 25 de Noviembre",
      coach: "Manuel Keosseian",
      figures: ["Guillermo 'Pando' Ramírez", "Jerry Nelson Palacios", "Mauricio Sabillón"],
      description:
        "Líderes de las vueltas regulares. En la final de vuelta en el Olímpico, Manuel Keosseian selló el triunfo 2-0 sobre Olimpia con goles de Pando Ramírez y Jerry Palacios para celebrar una inolvidable Navidad Verde.",
      imageSrc: "/assets/history/celebracion centenario.webp",
      imageCaption: "Manuel Keosseian y el plantel en la coronación de la octava copa",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % milestones.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + milestones.length) % milestones.length);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activeMilestone = milestones[currentIndex];
  const progressPercent = ((currentIndex + 1) / milestones.length) * 100;

  return (
    <section
      id="timeline"
      className="py-24 sm:py-36 px-4 sm:px-6 md:px-8 bg-[#012919] text-[#F3F3F3] relative overflow-hidden"
    >
      {/* Soft ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2E9C3F]/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Apple-style Category Tag */}
        <div className="flex items-center gap-2 mb-4 justify-center">
          <span className="text-xs font-mono font-bold tracking-widest text-[#92BF4E] uppercase">
            02 &bull; LÍNEA DE TIEMPO
          </span>
          <div className="h-[1px] w-12 bg-[#92BF4E]/30" />
          <span className="text-xs text-white/50 font-mono">1925 - 2025</span>
        </div>

        {/* Section Header with font-elrotex */}
        <div className="text-center mb-14">
          <h2 className="font-elrotex text-4xl sm:text-6xl md:text-7xl text-[#F3F3F3] uppercase tracking-wide leading-none">
            LA RUTA A LA <span className="text-gradient">GLORIA</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl mx-auto font-light">
            Un siglo de historia viva, campeonatos memorables y pasión verdolaga.
          </p>
        </div>

        {/* Segmented Tab Bar with Sliding Backdrop */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center p-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 max-w-full overflow-x-auto no-scrollbar">
            {milestones.map((m, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={m.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-mono font-bold transition-colors duration-300 rounded-full whitespace-nowrap ${
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTimelineTab"
                      className="absolute inset-0 bg-[#2E9C3F] rounded-full shadow-md shadow-[#2E9C3F]/40"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>{m.year}</span>
                    <span className="text-[10px] opacity-70 font-light hidden sm:inline">{m.shortYear}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Inspirational Hero Stage */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative"
            >
              {/* Giant Year Watermark in font-elrotex */}
              <div className="absolute -top-12 -left-4 font-elrotex text-8xl sm:text-[12rem] text-white/[0.03] font-black pointer-events-none select-none z-0">
                {activeMilestone.year}
              </div>

              {/* Left Column: Photo Frame */}
              <div className="lg:col-span-7 relative z-10">
                <div className="aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl relative">
                  <motion.img
                    key={activeMilestone.imageSrc}
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src={activeMilestone.imageSrc}
                    alt={activeMilestone.title}
                    className="w-full h-full object-cover filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#012919] via-transparent to-transparent opacity-80" />

                  {/* Caption */}
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white/90 font-mono">
                    <span className="truncate">{activeMilestone.imageCaption}</span>
                    <span className="shrink-0 text-[10px] text-[#92BF4E] font-medium tracking-wider uppercase">
                      {activeMilestone.categoryName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative */}
              <div className="lg:col-span-5 space-y-6 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#92BF4E] uppercase tracking-widest">
                    {activeMilestone.categoryName}
                  </span>
                  <div className="h-[1px] w-8 bg-[#92BF4E]/40" />
                  <span className="text-xs font-mono text-white/40">
                    {String(currentIndex + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#F3F3F3] leading-[1.05]">
                  {activeMilestone.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#92BF4E] font-mono">
                  {activeMilestone.subtitle}
                </p>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
                  {activeMilestone.description}
                </p>

                {activeMilestone.highlightText && (
                  <div className="pl-4 border-l-2 border-[#2E9C3F] text-xs sm:text-sm text-[#92BF4E] font-medium italic leading-relaxed py-1">
                    &ldquo;{activeMilestone.highlightText}&rdquo;
                  </div>
                )}

                <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-white/70">
                  {activeMilestone.coach && (
                    <div>
                      <strong className="text-[#92BF4E] font-medium">Director Técnico:</strong> {activeMilestone.coach}
                    </div>
                  )}

                  {activeMilestone.figures && (
                    <div className="flex flex-wrap gap-1.5">
                      {activeMilestone.figures.map((fig, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-full bg-white/10 text-[11px] text-white">
                          {fig}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Clean Bottom Control Bar with Circular Arrows Below */}
          <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Interactive Progress Bar */}
            <div className="w-full sm:w-1/2 flex items-center gap-4">
              <span className="text-xs font-mono font-bold text-[#92BF4E]">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>

              <div
                className="flex-1 h-1.5 rounded-full bg-white/10 relative overflow-hidden cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = clickX / rect.width;
                  const targetIdx = Math.min(
                    milestones.length - 1,
                    Math.max(0, Math.floor(ratio * milestones.length))
                  );
                  setCurrentIndex(targetIdx);
                }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-[#2E9C3F] to-[#92BF4E] rounded-full"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>

              <span className="text-xs font-mono text-white/40">
                08
              </span>
            </div>

            {/* Circular Arrow Buttons Below on the Right */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full bg-white/5 border border-white/15 text-white/80 hover:text-white hover:bg-[#2E9C3F] hover:border-[#2E9C3F] flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
                aria-label="Anterior hito"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full bg-white/5 border border-white/15 text-white/80 hover:text-white hover:bg-[#2E9C3F] hover:border-[#2E9C3F] flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
                aria-label="Siguiente hito"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
