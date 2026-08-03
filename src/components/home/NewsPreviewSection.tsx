"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "@/hooks/useGsap";
import { ArrowRight, Calendar, Clock, ChevronLeft, ChevronRight, Newspaper, Sparkles } from "lucide-react";
import Image from "next/image";

interface NewsItem {
  id: string;
  number: string;
  category: string;
  categoryColor: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  image: string;
}

const NEWS_LIST: NewsItem[] = [
  {
    id: "news-1",
    number: "01",
    category: "PRIMER EQUIPO",
    categoryColor: "bg-[#E30613] text-white",
    title: "MARATHON PREPARA EL TEMPLO PARA EL CLASICO ANTE OLIMPIA",
    summary:
      "El plantel verdolaga afina los ultimos detalles tacticos en el Yankel Rosenthal para disputar el duelo mas importante de la jornada.",
    date: "28 JUL 2026",
    readTime: "3 MIN LECTURA",
    image: "/assets/stadium/celebration.png",
  },
  {
    id: "news-2",
    number: "02",
    category: "FICHAJES",
    categoryColor: "bg-[#92BF4E] text-[#011610]",
    title: "REFUERZOS INTERNACIONALES SE INTEGRAN A LA PRETEMPORADA",
    summary:
      "El club confirma oficialmente la llegada de nuevas incorporaciones de jerarquia para disputar la liga y el torneo internacional.",
    date: "24 JUL 2026",
    readTime: "2 MIN LECTURA",
    image: "/assets/hero/Messiniti.png",
  },
  {
    id: "news-3",
    number: "03",
    category: "CENTENARIO 1925",
    categoryColor: "bg-[#E30613] text-white",
    title: "100 ANOS DE PASION: CAMISETA CONMEMORATIVA DEL CENTENARIO",
    summary:
      "Una indumentaria historica de edicion limitada que rinde homenaje a un siglo de lucha, gloria y fidelidad incondicional verdolaga.",
    date: "20 JUL 2026",
    readTime: "4 MIN LECTURA",
    image: "/assets/fans/stadium_passion.png",
  },
];

export default function NewsPreviewSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const activeNews = NEWS_LIST[activeIdx];

  // GSAP animation when switching active news item
  useEffect(() => {
    if (!stageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        stageRef.current,
        { opacity: 0, scale: 0.98, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" }
      );
    }, stageRef);
    return () => ctx.revert();
  }, [activeIdx]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % NEWS_LIST.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + NEWS_LIST.length) % NEWS_LIST.length);
  };

  return (
    <section
      id="noticias"
      className="relative py-16 md:py-24 bg-[#01160d] text-white border-t border-[#92BF4E]/25 overflow-hidden"
    >
      {/* IMMERSIVE BACKGROUND PARALLAX IMAGE OF ACTIVE NEWS */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src={activeNews.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20 filter blur-sm scale-105 transition-all duration-700"
          aria-hidden="true"
        />
        {/* Verdolaga Dark Overlay & Red/Green Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#01160d] via-[#01160d]/85 to-[#01160d]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_rgba(146,191,78,0.2)_0%,_transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_rgba(227,6,19,0.18)_0%,_transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* SECTION HEADER IN ELROTEX FONT WITH TRICOLOR BADGE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-[#E30613]" />
              <span className="w-3 h-3 rounded-full bg-[#92BF4E]" />
              <span className="w-3 h-3 rounded-full bg-white" />
              <span
                className="text-xs font-bold uppercase tracking-[0.3em] text-[#92BF4E] ml-1"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                PRENSA & COMUNICADOS
              </span>
            </div>

            <h2
              className="font-elrotex uppercase text-white leading-none tracking-wide"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.8rem)" }}
            >
              ULTIMAS <span className="text-[#92BF4E]">NOTICIAS</span>
            </h2>
          </div>

          {/* Interactive News Index Selector Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {NEWS_LIST.map((n, i) => {
              const active = i === activeIdx;
              return (
                <button
                  key={n.id}
                  onClick={() => setActiveIdx(i)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-bold uppercase transition-all duration-300 cursor-pointer ${
                    active
                      ? "bg-[#92BF4E] text-[#011610] border-[#92BF4E] shadow-[0_0_20px_rgba(146,191,78,0.5)] scale-105"
                      : "bg-[#012818]/80 text-white/70 border-white/15 hover:border-[#92BF4E]/50 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  <span>{n.number}</span>
                  <span className="opacity-40">|</span>
                  <span className="truncate max-w-[100px]">{n.category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* HERO IMMERSIVE MAGAZINE STAGE PANEL */}
        <div ref={stageRef} className="relative w-full">
          <div className="relative w-full rounded-3xl overflow-hidden border border-[#92BF4E]/30 bg-gradient-to-b from-[#012617]/95 via-[#01160d]/98 to-[#000d07] shadow-[0_30px_80px_rgba(0,0,0,0.85)] p-6 md:p-10 lg:p-12">
            {/* BRAND PATTERN BACKGROUND OVERLAY */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
              style={{
                backgroundImage: "url('/assets/brand/pattern.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "200px auto",
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* LEFT COLUMN: HERO IMAGE FEATURE WITH OVERLAY BADGES */}
              <div className="lg:col-span-6 relative h-72 sm:h-96 md:h-[420px] w-full rounded-2xl overflow-hidden border-2 border-[#92BF4E]/40 shadow-2xl group">
                <Image
                  src={activeNews.image}
                  alt={activeNews.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#01160d] via-transparent to-transparent opacity-70" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${activeNews.categoryColor}`}
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {activeNews.category}
                  </span>
                </div>

                {/* Number Watermark */}
                <div className="absolute bottom-3 right-4 z-10 select-none">
                  <span className="font-elrotex text-5xl md:text-7xl text-white/20 leading-none">
                    {activeNews.number}
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN: EDITORIAL CONTENT & ACTION */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  {/* Metadata Row */}
                  <div className="flex items-center gap-4 text-xs text-[#92BF4E] font-semibold mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{activeNews.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{activeNews.readTime}</span>
                    </div>
                  </div>

                  {/* Headline Title */}
                  <h3 className="font-elrotex uppercase text-3xl md:text-5xl lg:text-5xl text-white tracking-wide leading-tight">
                    {activeNews.title}
                  </h3>

                  {/* Summary Text */}
                  <p
                    className="text-xs md:text-sm text-white/75 leading-relaxed mt-4"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {activeNews.summary}
                  </p>
                </div>

                {/* Bottom Control & CTA Row */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Read Article Button */}
                  <a
                    href="#cta"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-[#92BF4E] text-[#011610] font-bold text-xs md:text-sm uppercase tracking-widest transition-all duration-300 hover:bg-[#a6d85b] hover:shadow-[0_0_30px_rgba(146,191,78,0.5)] scale-100 active:scale-95"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    <span>LEER NOTICIA COMPLETA</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  {/* Previous / Next Arrow Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      aria-label="Noticia anterior"
                      className="p-3 rounded-xl bg-[#012818] border border-white/15 text-white/70 hover:text-white hover:border-[#92BF4E] transition-all cursor-pointer shadow-md"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Noticia siguiente"
                      className="p-3 rounded-xl bg-[#012818] border border-white/15 text-white/70 hover:text-white hover:border-[#92BF4E] transition-all cursor-pointer shadow-md"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
