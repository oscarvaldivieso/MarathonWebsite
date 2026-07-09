"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Clock, MapPin, Zap, ArrowRight } from "lucide-react";
import { CLUB, NEXT_MATCH } from "@/lib/constants";
import Image from "next/image";

function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr + "T00:00:00");
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function formatMatchDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("es-HN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

export default function HeroSection() {
  const daysUntil = getDaysUntil(NEXT_MATCH.date);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/backgrounds/Image.png"
          alt="Fondo Marathón"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-marathon-darkest/75 mix-blend-multiply" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-marathon-green/5 blur-3xl" />
        <div className="absolute -bottom-60 -left-60 w-[800px] h-[800px] rounded-full bg-marathon-lime/5 blur-3xl" />

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-marathon-lime/30 rounded-full"
            style={{
              top: `${15 + i * 15}%`,
              left: `${10 + i * 16}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        <div className="absolute inset-0 opacity-[0.02]"
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
      </div>

      {/* Main Content: Players + Outlined Text */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-end min-h-screen pt-20 pb-16">
        {/* Interactive Players and Outline Text Centerpiece */}
        <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[72vh] flex items-end justify-center select-none overflow-visible mt-auto">
          {/* Giant Outlined Text Behind Players */}
          <motion.div
            className="absolute inset-x-0 top-1/4 -translate-y-1/2 flex items-center justify-center antonio-outline font-bold text-5xl sm:text-7xl md:text-[10rem] lg:text-[15.5rem] tracking-normal select-none pointer-events-none text-[#ffffff]/[0.03] whitespace-nowrap z-0"
            style={{
              WebkitTextStroke: "2px rgba(255, 255, 255, 0.24)",
              paintOrder: "stroke fill"
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            MONSTRUO VERDE
          </motion.div>

          {/* Players Image */}
          <motion.div
            className="relative z-10 w-full h-full filter drop-shadow-[0_20px_50px_rgba(46,156,63,0.35)]"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 45, damping: 15, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src="/assets/hero/players.png"
              alt="Jugadores del CD Marathón"
              fill
              className="object-contain object-bottom"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          NEXT MATCH FLOATING CARD — Bottom Left
          Broadcast-style immersive widget
          ═══════════════════════════════════════════ */}
      <motion.div
        className="absolute bottom-20 left-4 sm:left-8 lg:left-12 z-20 hidden sm:block"
        initial={{ opacity: 0, x: -60, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      >
        <div className="match-card-glow relative w-[300px] group cursor-pointer">
          {/* Animated border gradient */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-marathon-green via-marathon-lime/30 to-marathon-green/0 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Card body */}
          <div className="relative rounded-2xl overflow-hidden">
            {/* Inner glass background */}
            <div className="absolute inset-0 bg-marathon-darkest/80 backdrop-blur-2xl" />

            {/* Diamond pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(45deg, #2E9C3F 25%, transparent 25%, transparent 75%, #2E9C3F 75%),
                  linear-gradient(45deg, #2E9C3F 25%, transparent 25%, transparent 75%, #2E9C3F 75%)`,
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 10px 10px",
              }}
            />

            {/* Content */}
            <div className="relative">
              {/* Header strip with pulsing indicator */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-marathon-green/10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-marathon-lime opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-marathon-lime" />
                  </span>
                  <span className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-marathon-lime">
                    Matchday
                  </span>
                </div>
                <span className="text-[9px] text-marathon-light/30 font-heading uppercase tracking-wider">
                  {NEXT_MATCH.competition.split(" - ")[1] || NEXT_MATCH.competition}
                </span>
              </div>

              {/* Teams confrontation */}
              <div className="px-4 py-5">
                <div className="flex items-center gap-4">
                  {/* Home team */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-marathon-green/20 to-marathon-green/5 border border-marathon-green/20 flex items-center justify-center shrink-0 group-hover:border-marathon-lime/40 transition-colors duration-300">
                      {/* Badge placeholder */}
                      <span className="text-sm font-heading font-black text-marathon-lime">M</span>
                      {NEXT_MATCH.isHome && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-marathon-green rounded-full flex items-center justify-center">
                          <span className="text-[6px] font-black text-white">🏠</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-heading font-bold text-marathon-light leading-none">
                        {NEXT_MATCH.homeTeam}
                      </p>
                      {NEXT_MATCH.isHome && (
                        <p className="text-[8px] text-marathon-lime/60 uppercase tracking-widest mt-0.5">Local</p>
                      )}
                    </div>
                  </div>

                  {/* VS pulse */}
                  <div className="relative shrink-0">
                    <div className="w-9 h-9 rounded-full border border-marathon-green/20 flex items-center justify-center bg-marathon-darkest/60">
                      <span className="text-[10px] font-heading font-black text-marathon-lime/70">VS</span>
                    </div>
                  </div>

                  {/* Away team */}
                  <div className="flex items-center gap-3 flex-1 flex-row-reverse">
                    <div className="relative w-11 h-11 rounded-xl bg-marathon-light/5 border border-marathon-light/10 flex items-center justify-center shrink-0 group-hover:border-marathon-light/20 transition-colors duration-300">
                      {/* Badge placeholder */}
                      <span className="text-sm font-heading font-black text-marathon-light/25">O</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-heading font-bold text-marathon-light leading-none">
                        {NEXT_MATCH.awayTeam}
                      </p>
                      {!NEXT_MATCH.isHome && (
                        <p className="text-[8px] text-marathon-light/30 uppercase tracking-widest mt-0.5">Local</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom info strip */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-marathon-green/10 bg-marathon-green/[0.03]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-marathon-light/40">
                    <Clock size={10} />
                    <span className="text-[10px] font-heading font-semibold">{NEXT_MATCH.time}</span>
                  </div>
                  <div className="w-px h-3 bg-marathon-green/15" />
                  <div className="flex items-center gap-1 text-marathon-light/30">
                    <MapPin size={9} />
                    <span className="text-[9px]">{NEXT_MATCH.stadium}</span>
                  </div>
                </div>

                {/* Days countdown chip */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-marathon-green/10 border border-marathon-green/15">
                  <Zap size={9} className="text-marathon-lime" />
                  <span className="text-[9px] font-heading font-bold text-marathon-lime">
                    {daysUntil > 0 ? `${daysUntil}d` : "HOY"}
                  </span>
                </div>
              </div>

              {/* Hover reveal: "Ver más" */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-marathon-darkest/60 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <span className="flex items-center gap-2 text-sm font-heading font-bold text-marathon-lime">
                  Ver detalles <ArrowRight size={16} />
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <a
          href="#stats"
          className="flex flex-col items-center gap-1 text-marathon-light/30 hover:text-marathon-lime transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-widest">Explorar</span>
          <ChevronDown size={18} className="animate-scroll-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
