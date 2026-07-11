"use client";

import React, { useRef, useEffect } from "react";
import { ChevronDown, Clock, MapPin, Zap, ArrowRight } from "lucide-react";
import { CLUB, NEXT_MATCH } from "@/lib/constants";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";
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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── ENTRANCE TIMELINE ──────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Background cinematic zoom-out
      tl.fromTo(
        ".hero-bg-img",
        { scale: 1.2 },
        { scale: 1, duration: 2, ease: "power2.out" },
        0
      );

      // 2. Overlay fade
      tl.fromTo(
        ".hero-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 1.2 },
        0.1
      );

      // 3. MONSTRUO VERDE text — scale up + fade
      tl.fromTo(
        ".hero-outline-text",
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 1.4, ease: "power4.out" },
        0.3
      );

      // 4. Players — dramatic rise from below
      tl.fromTo(
        ".hero-players",
        { opacity: 0, y: 120 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" },
        0.5
      );

      // 5. Match card — stagger broadcast reveal
      tl.fromTo(
        ".hero-match-card",
        { opacity: 0, x: 50, y: 20 },
        { opacity: 1, x: 0, y: 0, duration: 0.8 },
        0.9
      );

      tl.fromTo(
        ".match-card-header, .match-card-teams, .match-card-footer",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.12 },
        1.1
      );

      // 6. Scroll indicator
      tl.fromTo(
        ".hero-scroll-indicator",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 },
        1.6
      );

      // ── SCROLL-DRIVEN PARALLAX ─────────────────────────────────
      // Background moves slower = parallax depth
      gsap.to(".hero-bg-img", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // MONSTRUO VERDE text shifts horizontally on scroll
      gsap.to(".hero-outline-text", {
        xPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Background floating Elrotex texts parallax
      gsap.to(".hero-bg-text-left", {
        yPercent: -50,
        xPercent: -10,
        rotation: -25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(".hero-bg-text-right", {
        yPercent: -35,
        xPercent: 15,
        rotation: 35,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(".hero-bg-text-center-left", {
        yPercent: -60,
        xPercent: -20,
        rotation: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(".hero-bg-text-center-right", {
        yPercent: -45,
        xPercent: 25,
        rotation: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Players image has subtle upward parallax (moves faster)
      gsap.to(".hero-players", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });



      // ── FLOATING PARTICLES ─────────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".hero-particle").forEach((particle, i) => {
        gsap.to(particle, {
          y: -30,
          opacity: 0.6,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="hero-bg-img absolute inset-0">
          <Image
            src="/assets/backgrounds/Image.png"
            alt="Fondo Marathón"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="hero-overlay absolute inset-0 bg-marathon-darkest/75 mix-blend-multiply" />
      </div>

      {/* Decorative Elements & Floating Elrotex Background Text Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-marathon-green/5 blur-3xl" />
        <div className="absolute -bottom-60 -left-60 w-[800px] h-[800px] rounded-full bg-marathon-lime/5 blur-3xl" />

        {/* Floating Elrotex background texts */}
        <div
          className="hero-bg-text-left absolute top-[15%] left-[5%] text-white/[0.02] text-6xl md:text-8xl select-none origin-center whitespace-nowrap will-change-transform"
          style={{ fontFamily: "var(--font-elrotex), sans-serif", transform: "rotate(-15deg)" }}
        >
          MARATHON
        </div>

        <div
          className="hero-bg-text-right absolute top-[25%] right-[8%] text-white/[0.015] text-5xl md:text-7xl select-none origin-center whitespace-nowrap will-change-transform"
          style={{ fontFamily: "var(--font-elrotex), sans-serif", transform: "rotate(25deg)" }}
        >
          1925
        </div>

        <div
          className="hero-bg-text-center-left absolute bottom-[35%] left-[8%] text-white/[0.02] text-7xl md:text-9xl select-none origin-center whitespace-nowrap will-change-transform"
          style={{ fontFamily: "var(--font-elrotex), sans-serif", transform: "rotate(-8deg)" }}
        >
          CD M
        </div>

        <div
          className="hero-bg-text-center-right absolute bottom-[20%] right-[5%] text-white/[0.015] text-6xl md:text-8xl select-none origin-center whitespace-nowrap will-change-transform"
          style={{ fontFamily: "var(--font-elrotex), sans-serif", transform: "rotate(12deg)" }}
        >
          FURIA VERDE
        </div>

        {/* GSAP-driven particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="hero-particle absolute w-1 h-1 bg-marathon-lime/30 rounded-full opacity-20"
            style={{
              top: `${15 + i * 15}%`,
              left: `${10 + i * 16}%`,
            }}
          />
        ))}

        {/* Diagonal lines pattern */}
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
          <div
            className="hero-outline-text absolute inset-x-0 top-1/4 -translate-y-1/2 flex items-center justify-center antonio-outline font-bold text-5xl sm:text-7xl md:text-[10rem] lg:text-[15.5rem] tracking-normal select-none pointer-events-none text-[#ffffff]/[0.03] whitespace-nowrap z-0 will-change-transform"
            style={{
              WebkitTextStroke: "2px rgba(255, 255, 255, 0.24)",
              paintOrder: "stroke fill"
            }}
          >
            MONSTRUO VERDE
          </div>

          {/* Players Image */}
          <div className="hero-players relative z-10 w-full h-full filter drop-shadow-[0_20px_50px_rgba(46,156,63,0.35)] will-change-transform">
            <Image
              src="/assets/hero/players.png"
              alt="Jugadores del CD Marathón"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          NEXT MATCH FLOATING CARD — Bottom Left
          Figma spec round card
          ═══════════════════════════════════════════ */}
      <div className="hero-match-card absolute bottom-20 right-4 sm:right-8 lg:right-12 z-20 hidden mr-24 sm:block">
        <div className="match-card-glow relative w-[320px] group cursor-pointer">
          {/* Animated border gradient */}
          <div className="absolute -inset-[1px] rounded-[1.75rem] bg-gradient-to-br from-marathon-green via-marathon-lime/30 to-marathon-green/0 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Card body */}
          <div className="relative rounded-[1.75rem] overflow-hidden bg-marathon-darkest border border-marathon-green/20">

            {/* Branding Pattern Container */}
            <div className="relative bg-gradient-to-b from-marathon-dark/85 to-marathon-darkest p-5 overflow-hidden border-b border-marathon-green/10 flex flex-col items-center min-h-[145px]">

              {/* Pattern from public/assets/brand/pattern.png */}
              <div className="absolute inset-0">
                <Image
                  src="/assets/brand/pattern.png"
                  alt="Branding Pattern"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Pulsing glow central */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[80px] bg-marathon-lime/10 rounded-full blur-[25px] pointer-events-none" />

              {/* Confrontation row */}
              <div className="match-card-teams relative z-10 w-full flex items-center justify-between gap-4 mt-2 max-w-[240px] mx-auto">
                {/* Home team shield purely floating */}
                <div className="flex justify-center flex-1">
                  <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                    <Image
                      src="/assets/brand/escudo_normal.svg"
                      alt="CD Marathón"
                      width={90}
                      height={90}
                      className="object-contain filter drop-shadow-[0_4px_12px_rgba(46,156,63,0.25)]"
                    />
                  </div>
                </div>

                {/* VS - Elrotex Font */}
                <div className="match-card-vs flex items-center justify-center shrink-0 select-none">
                  <span
                    className="text-4xl text-marathon-lime drop-shadow-[0_2px_8px_rgba(146,191,78,0.4)] tracking-wide"
                    style={{ fontFamily: "var(--font-elrotex), sans-serif" }}
                  >
                    VS
                  </span>
                </div>

                {/* Away team shield purely floating */}
                <div className="flex justify-center flex-1">
                  <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                    <Image
                      src="/assets/matchday/teams/escudo_olimpia.png"
                      alt="CD Olimpia"
                      width={90}
                      height={90}
                      className="object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* General Match Info Row below the container */}
            <div className="p-4 bg-marathon-darkest/60">
              {/* Header Details */}
              <div className="match-card-header flex items-center justify-between mb-3">
                <span className="text-[15px] font-heading font-bold uppercase  text-marathon-lime">
                  {NEXT_MATCH.competition.split(" - ")[1] || NEXT_MATCH.competition}
                </span>
                <span className="text-[13px] font-heading font-bold capitalize text-marathon-light/40">
                  {formatMatchDate(NEXT_MATCH.date)}
                </span>
              </div>

              {/* Bottom details Row */}
              <div className="match-card-footer flex items-center justify-between border-t border-marathon-green/10 pt-2.5 mt-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-marathon-light/40">
                    <span className="text-[20px] font-bold">{NEXT_MATCH.time}</span>
                  </div>
                  <div className="w-px h-2.5 bg-marathon-green/15" />
                  <div className="flex items-center gap-1 text-marathon-light/35">
                    <span className="text-[15px] font-heading font-bold">{NEXT_MATCH.stadium}</span>
                  </div>
                </div>


              </div>
            </div>

            {/* Hover reveal */}
            <div className="absolute inset-0 flex items-center justify-center bg-marathon-darkest/60 backdrop-blur-sm rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="flex items-center gap-2 text-sm font-heading font-bold text-marathon-lime">
                Ver detalles <ArrowRight size={16} />
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <a
          href="#stats"
          className="flex flex-col items-center gap-1 text-marathon-light/30 hover:text-marathon-lime transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-widest">Explorar</span>
          <ChevronDown size={18} className="animate-scroll-bounce" />
        </a>
      </div>
    </section>
  );
}
