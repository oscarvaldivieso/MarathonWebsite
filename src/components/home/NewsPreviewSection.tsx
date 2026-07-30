"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/hooks/useGsap";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import Image from "next/image";

const LATEST_NEWS = [
  {
    id: 1,
    title: "Marathón prepara el Templo para el Clásico ante Olimpia",
    category: "Primer Equipo",
    date: "28 Jul 2026",
    summary: "El plantel verdolaga afina detalles tácticos en el Yankel Rosenthal de cara al duelo de este fin de semana.",
    image: "/assets/stadium/celebration.png",
  },
  {
    id: 2,
    title: "Refuerzos internacionales se integran a la pretemporada",
    category: "Fichajes",
    date: "24 Jul 2026",
    summary: "El club confirma las nuevas incorporaciones para afrontar el torneo local y la competencia centroamericana.",
    image: "/assets/hero/Messiniti.png",
  },
  {
    id: 3,
    title: "100 Años de Pasión: Lanzamiento de la Camiseta Conmemorativa",
    category: "Centenario",
    date: "20 Jul 2026",
    summary: "Una indumentaria especial que rinde homenaje a un siglo de gloria, lucha y fidelidad verdolaga.",
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
          duration: 0.6,
          stagger: 0.15,
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
      id="noticias"
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-marathon-darkest border-t border-white/5 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.3em] text-marathon-lime/70 mb-3 block">
              Actualidad Verdolaga
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-white">
              Últimas <span className="text-marathon-lime">Noticias</span>
            </h2>
          </div>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-marathon-lime hover:text-white transition-colors duration-300"
          >
            Ver todas las noticias
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LATEST_NEWS.map((news) => (
            <article
              key={news.id}
              className="news-card group relative bg-marathon-dark/30 hover:bg-marathon-dark/50 border border-white/8 hover:border-marathon-lime/30 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-black/40">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-marathon-darkest/90 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-marathon-darkest/80 backdrop-blur-md border border-marathon-lime/30 text-marathon-lime text-[10px] font-heading font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {news.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2 text-white/40 text-[11px] mb-2 font-body">
                    <Calendar size={12} />
                    <span>{news.date}</span>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white group-hover:text-marathon-lime transition-colors duration-300 leading-snug mb-2 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-xs text-white/60 font-body leading-relaxed line-clamp-3">
                    {news.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-marathon-lime text-xs font-heading font-semibold group-hover:translate-x-1 transition-transform duration-300">
                  <span>Leer nota completa</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
