"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";

export default function PassionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Prepare SVG paths for drawing (Calculate lengths dynamically)
      const drawPaths = section.querySelectorAll(".draw-path");
      drawPaths.forEach((path) => {
        const length = (path as SVGPathElement).getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 1
        });
      });

      // 2. Main Scroll-driven timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      // Draw vector lines sequentially
      tl.to(
        drawPaths,
        {
          strokeDashoffset: 0,
          stagger: 0.12,
          ease: "power1.inOut",
        },
        0
      );

      // Smoothly fill color blocks at 45% scroll progress
      tl.to(
        ".fill-shape",
        {
          opacity: 0.18,
          scale: 1.02,
          stagger: 0.08,
          duration: 0.5,
          ease: "power2.out",
        },
        0.4
      );

      // Fade-in flag crest centerpiece
      tl.fromTo(
        ".passion-crest",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 0.25, duration: 0.6, ease: "back.out(1.5)" },
        0.5
      );

      // Line-by-line reveal for typography (Split Text simulation)
      tl.fromTo(
        ".split-line",
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out" },
        0.3
      );

      // Scale down background watermark text
      tl.fromTo(
        ".passion-watermark",
        { xPercent: 10, opacity: 0 },
        { xPercent: -5, opacity: 0.02, duration: 1.2, ease: "none" },
        0
      );

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[140vh] w-full bg-marathon-dark py-32 overflow-hidden flex flex-col justify-between z-20"
      style={{ contentVisibility: "auto" }}
    >
      {/* Absolute watermark text */}
      <div className="passion-watermark absolute right-0 top-1/4 text-[25vw] font-bold text-white select-none pointer-events-none tracking-tighter whitespace-nowrap opacity-0 font-elrotex will-change-transform z-0">
        PASION
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full relative z-10 flex flex-col justify-between flex-1">
        {/* Asymmetric massive header row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <h2 className="text-[12vw] tracking-[0.10em] sm:text-[8vw] lg:text-[7.5rem] text-white leading-none font-elrotex select-none uppercase">
              <span className="block text-marathon-lime">BANDERA DE</span>
              <span className="block text-white/90">NUESTRA PASION</span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pt-12 text-right">
            <span className="inline-block text-[15px] font-heading font-bold text-marathon-lime tracking-[0.3em] uppercase border-r-2 border-marathon-lime pr-4 mb-2">
              DESDE 1925
            </span>
            <p className="text-marathon-light/50 text-xs tracking-widest uppercase">
              San Pedro Sula • Honduras
            </p>
          </div>
        </div>

        {/* Dynamic Vector Canvas & Text Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-16">
          {/* Left: Interactive SVGs (Waving Banner representation) */}
          <div className="lg:col-span-7 flex justify-center items-center relative min-h-[400px]">
            {/* Ambient glows behind vectors */}
            <div className="absolute inset-0 bg-marathon-green/10 rounded-full blur-[80px] opacity-40 pointer-events-none scale-75 animate-pulse" />

            <svg
              ref={svgRef}
              viewBox="0 0 800 500"
              className="w-full max-w-[650px] aspect-[8/5] overflow-visible waving-flag select-none pointer-events-none will-change-transform"
              style={{
                transformStyle: "preserve-3d"
              }}
            >
              {/* Group applying waves to colored shapes */}
              <g>
                {/* FLAG SHAPE 1 (Green Top Block) */}
                <path
                  className="fill-shape transition-transform duration-700"
                  d="M 50,100 C 200,60 300,140 450,100 C 600,60 700,120 750,110 L 750,210 C 700,220 600,160 450,200 C 300,240 200,160 50,200 Z"
                  fill="#2E9C3F"
                  opacity="0"
                  style={{ transformOrigin: "center" }}
                />

                {/* FLAG SHAPE 2 (White Middle Block) */}
                <path
                  className="fill-shape transition-transform duration-700"
                  d="M 50,200 C 200,160 300,240 450,200 C 600,160 700,220 750,210 L 750,310 C 700,320 600,260 450,300 C 300,340 200,260 50,300 Z"
                  fill="#F3F3F3"
                  opacity="0"
                  style={{ transformOrigin: "center" }}
                />

                {/* FLAG SHAPE 3 (Lime Bottom Block) */}
                <path
                  className="fill-shape transition-transform duration-700"
                  d="M 50,300 C 200,260 300,340 450,300 C 600,260 700,320 750,310 L 750,410 C 700,420 600,360 450,400 C 300,440 200,360 50,400 Z"
                  fill="#92BF4E"
                  opacity="0"
                  style={{ transformOrigin: "center" }}
                />

                {/* DRAWN OUTLINE VECTORS */}
                {/* Top Contour Line */}
                <path
                  className="draw-path"
                  d="M 50,100 C 200,60 300,140 450,100 C 600,60 700,120 750,110"
                  fill="none"
                  stroke="#92BF4E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0"
                />

                {/* Stripe 1 Splitter */}
                <path
                  className="draw-path"
                  d="M 50,200 C 200,160 300,240 450,200 C 600,160 700,220 750,210"
                  fill="none"
                  stroke="#F3F3F3"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0"
                />

                {/* Stripe 2 Splitter */}
                <path
                  className="draw-path"
                  d="M 50,300 C 200,260 300,340 450,300 C 600,260 700,320 750,310"
                  fill="none"
                  stroke="#2E9C3F"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0"
                />

                {/* Bottom Contour Line */}
                <path
                  className="draw-path"
                  d="M 50,400 C 200,360 300,440 450,400 C 600,360 700,420 750,410"
                  fill="none"
                  stroke="#92BF4E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0"
                />

                {/* Flag Staff Pole */}
                <path
                  className="draw-path"
                  d="M 50,60 L 50,460"
                  fill="none"
                  stroke="#F3F3F3"
                  strokeWidth="6"
                  strokeLinecap="round"
                  opacity="0"
                />
              </g>

              {/* Club Emblem Overlay in Center of flag */}
              <image
                className="passion-crest opacity-0"
                href="/assets/brand/escudo_normal.svg"
                x="330"
                y="180"
                width="140"
                height="140"
                style={{
                  transformOrigin: "400px 250px"
                }}
              />
            </svg>
          </div>

          {/* Right: Narrative Poppins Text Blocks */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 lg:pl-6">
            <div className="space-y-4">
              <div className="overflow-hidden">
                <h4 className="split-line text-xs font-bold tracking-[0.25em] text-marathon-lime uppercase block">
                  Identidad Inquebrantable
                </h4>
              </div>
              <div className="overflow-hidden">
                <h3 className="split-line text-2xl md:text-3xl font-heading font-bold text-white block leading-tight">
                  Trazados de Gloria sobre el Lienzo Verde
                </h3>
              </div>
            </div>

            <div className="space-y-6 text-marathon-light/75 text-sm md:text-base leading-relaxed font-sans font-normal">
              <div className="overflow-hidden">
                <p className="split-line block">
                  El verde no es solo un color en nuestro escudo, es la representación viva de la costa norte, de la furia de nuestra gente y de la historia de los pioneros de 1925.
                </p>
              </div>
              <div className="overflow-hidden">
                <p className="split-line block">
                  A través de las décadas, cada hilo de nuestra bandera ha ondeado con el rugido de la afición más apasionada de Honduras. Un sentimiento inmortal que nace en San Pedro Sula y se expande por todo el territorio nacional.
                </p>
              </div>
            </div>

            {/* Micro details stats row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-marathon-green/20">
              <div>
                <span className="block text-2xl font-heading font-bold text-white">99+</span>
                <span className="block text-[10px] text-marathon-light/40 uppercase tracking-wider">Años de Lucha</span>
              </div>
              <div>
                <span className="block text-2xl font-heading font-bold text-marathon-lime">9</span>
                <span className="block text-[10px] text-marathon-light/40 uppercase tracking-wider">Títulos Liga</span>
              </div>
              <div>
                <span className="block text-2xl font-heading font-bold text-white">1</span>
                <span className="block text-[10px] text-marathon-light/40 uppercase tracking-wider">Único Monstruo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styled Inline waving flag animation */}
      <style jsx global>{`
        @keyframes flag-wave {
          0% {
            transform: translateY(0) scaleY(1);
          }
          50% {
            transform: translateY(-6px) scaleY(1.02) skewX(1deg);
          }
          100% {
            transform: translateY(0) scaleY(1);
          }
        }
        .waving-flag {
          animation: flag-wave 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
