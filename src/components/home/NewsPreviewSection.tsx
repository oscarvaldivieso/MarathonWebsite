"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/hooks/useGsap";
import { ArrowRight, ArrowUpRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";

interface NewsItem {
  id: string;
  number: string;
  category: string;
  categoryBg: string;    // raw hex for bg
  categoryText: string;  // raw hex for text
  title: string;
  summary: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const NEWS_LIST: NewsItem[] = [
  {
    id: "news-1",
    number: "01",
    category: "PRIMER EQUIPO",
    categoryBg: "#E30613",
    categoryText: "#ffffff",
    title: "Marathon prepara el Templo para el Clásico ante Olimpia",
    summary:
      "El plantel verdolaga afina los últimos detalles tácticos en el Yankel Rosenthal para disputar el duelo más importante de la jornada ante el eterno rival.",
    date: "28 Jul 2026",
    readTime: "3 min",
    image: "/assets/stadium/celebration.png",
    featured: true,
  },
  {
    id: "news-2",
    number: "02",
    category: "FICHAJES",
    categoryBg: "#92BF4E",
    categoryText: "#012919",
    title: "Refuerzos internacionales se integran a la pretemporada",
    summary:
      "El club confirma oficialmente la llegada de nuevas incorporaciones de jerarquía para disputar la liga y el torneo internacional.",
    date: "24 Jul 2026",
    readTime: "2 min",
    image: "/assets/hero/Messiniti.png",
  },
  {
    id: "news-3",
    number: "03",
    category: "CENTENARIO",
    categoryBg: "#01402E",
    categoryText: "#92BF4E",
    title: "100 años de pasión: la camiseta conmemorativa del Centenario",
    summary:
      "Una indumentaria histórica de edición limitada que rinde homenaje a un siglo de lucha, gloria y fidelidad verdolaga.",
    date: "20 Jul 2026",
    readTime: "4 min",
    image: "/assets/fans/stadium_passion.png",
  },
];

export default function NewsPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".news-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".news-header",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const featured = NEWS_LIST.find((n) => n.featured)!;
  const secondary = NEWS_LIST.filter((n) => !n.featured);

  return (
    <section
      id="noticias"
      ref={sectionRef}
      /* Fondo blanco-roto de identidad del club, con banda superior en verde oscuro */
      className="bg-marathon-light text-marathon-darkest py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* ── SECTION HEADER ── */}
        <div className="news-header flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-14 border-b-2 border-marathon-darkest/10 pb-8">
          <div>
            {/* Eyebrow con tricolor */}
            <span
              className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.35em] text-marathon-green mb-3"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {/* Tricolor dots — identidad Marathon */}
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-marathon-darkest inline-block" />
                <span className="w-2 h-2 rounded-full bg-marathon-lime inline-block" />
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#E30613" }} />
              </span>
              Prensa &amp; Comunicados
            </span>

            <h2
              className="font-elrotex uppercase text-marathon-darkest leading-none tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              Últimas{" "}
              <span className="relative inline-block">
                Noticias
                {/* Acento lima — color de identidad */}
                <span className="absolute -bottom-1 left-0 w-full h-[4px] bg-marathon-lime rounded-full" />
              </span>
            </h2>
          </div>

          <a
            href="/noticias"
            className="group inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-widest text-marathon-darkest hover:text-marathon-green transition-colors"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Ver todas las noticias
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* ── EDITORIAL GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 md:gap-8">

          {/* ── FEATURED CARD (large) ── */}
          <a
            href="#"
            className="news-card group relative flex flex-col rounded-2xl overflow-hidden bg-white shadow-[0_4px_20px_rgba(1,41,25,0.08)] hover:shadow-[0_16px_48px_rgba(1,41,25,0.15)] transition-shadow duration-500 border border-marathon-darkest/8"
          >
            {/* Imagen principal */}
            <div className="relative h-[260px] sm:h-[360px] md:h-[420px] w-full overflow-hidden flex-shrink-0">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {/* Scrim verde oscuro */}
              <div className="absolute inset-0 bg-gradient-to-t from-marathon-darkest/70 via-marathon-darkest/10 to-transparent" />

              {/* Category pill con colores de identidad */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: featured.categoryBg,
                    color: featured.categoryText,
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  {featured.category}
                </span>
              </div>

              {/* Número watermark en Elrotex */}
              <span className="absolute bottom-3 right-4 font-elrotex text-6xl md:text-8xl text-white/15 leading-none select-none pointer-events-none">
                {featured.number}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 md:p-8 bg-white">
              {/* Meta */}
              <div
                className="flex items-center gap-3 text-[0.68rem] text-marathon-green font-semibold mb-4"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                <span className="flex items-center gap-1.5">
                  <Calendar size={11} />
                  {featured.date}
                </span>
                <span className="text-marathon-darkest/20">·</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={11} />
                  {featured.readTime} lectura
                </span>
              </div>

              {/* Titular en Elrotex */}
              <h3 className="font-elrotex uppercase text-marathon-darkest text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight mb-3 group-hover:text-marathon-dark transition-colors">
                {featured.title}
              </h3>

              {/* Summary */}
              <p
                className="text-marathon-darkest/60 text-sm leading-relaxed flex-1"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {featured.summary}
              </p>

              {/* CTA footer */}
              <div className="mt-6 pt-5 border-t border-marathon-darkest/8 flex items-center justify-between">
                <span
                  className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-widest text-marathon-darkest group-hover:gap-3 transition-all"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Leer noticia completa
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
                {/* Dot acento — lima de identidad */}
                <span className="w-2.5 h-2.5 rounded-full bg-marathon-lime group-hover:scale-125 transition-transform" />
              </div>
            </div>
          </a>

          {/* ── SECONDARY CARDS COLUMN ── */}
          <div className="flex flex-col gap-5">
            {secondary.map((item) => (
              <a
                key={item.id}
                href="#"
                className="news-card group relative flex gap-4 rounded-2xl overflow-hidden bg-white shadow-[0_4px_14px_rgba(1,41,25,0.07)] hover:shadow-[0_10px_30px_rgba(1,41,25,0.13)] transition-shadow duration-500 border border-marathon-darkest/8 p-4 sm:p-5 items-start"
              >
                {/* Thumbnail */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="112px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Dot de categoría sobre imagen */}
                  <span
                    className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full shadow-sm"
                    style={{ backgroundColor: item.categoryBg }}
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col flex-1 min-w-0">
                  {/* Category label */}
                  <span
                    className="text-[0.6rem] font-bold uppercase tracking-widest text-marathon-green mb-1.5"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {item.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-elrotex uppercase text-marathon-darkest text-base sm:text-lg leading-tight tracking-tight mb-2 group-hover:text-marathon-dark transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Meta */}
                  <div
                    className="flex items-center gap-2.5 text-[0.65rem] text-marathon-darkest/40"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    <span>{item.date}</span>
                    <span>·</span>
                    <span>{item.readTime} lectura</span>
                  </div>

                  {/* Arrow hint */}
                  <div className="mt-auto pt-3">
                    <span
                      className="inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-wider text-marathon-darkest/25 group-hover:text-marathon-green transition-colors"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      Leer más
                      <ArrowUpRight size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </a>
            ))}

            {/* ── VER TODAS — CTA dashed ── */}
            <a
              href="/noticias"
              className="news-card group relative flex items-center justify-between rounded-2xl border-2 border-dashed border-marathon-darkest/15 hover:border-marathon-lime p-5 sm:p-6 transition-all duration-300 hover:bg-marathon-lime/5"
            >
              <div>
                <span
                  className="text-[0.65rem] uppercase tracking-widest font-bold text-marathon-green group-hover:text-marathon-dark transition-colors block mb-1"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Sala de prensa
                </span>
                <p className="font-elrotex uppercase text-lg text-marathon-darkest leading-tight">
                  Ver todas las noticias
                </p>
              </div>
              <div className="w-11 h-11 rounded-full bg-marathon-darkest/8 group-hover:bg-marathon-lime flex items-center justify-center transition-colors flex-shrink-0">
                <ArrowRight
                  size={18}
                  className="text-marathon-darkest/50 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
