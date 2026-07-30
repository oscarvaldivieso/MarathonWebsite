"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";

interface ColorTransitionProps {
  from: string;
  to: string;
  accentColor?: string;
  text?: string;
  height?: string;
}

/**
 * Monster Scale Reveal Transition (Transición de Escamas del Monstruo Verde)
 *
 * Reemplaza las olas líquidas genéricas por un borde orgánico dentado de escamas de cocodrilo
 * con un trazo neón verde (#92BF4E) y texto en fuente Elrotex con brillo de garra.
 */
export default function ColorTransition({
  from,
  to,
  accentColor = "#92BF4E",
  text = "",
  height = "220px",
}: ColorTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scalesBackRef = useRef<SVGPathElement>(null);
  const scalesFrontRef = useRef<SVGPathElement>(null);
  const strokeGlowRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const glowSweepRef = useRef<HTMLDivElement>(null);

  // Silueta dentada de escamas de cocodrilo / monstruo verde
  // Misma estructura de comandos SVG para interpolación suave en GSAP
  const FLAT_BOTTOM =
    "M0,320 L0,320 L240,320 L480,320 L720,320 L960,320 L1200,320 L1440,320 L1440,320 L0,320 Z";
  
  const SCALES_CREST_BACK =
    "M0,320 L0,220 L180,170 L360,250 L540,160 L720,230 L900,150 L1080,240 L1260,180 L1440,210 L1440,320 L0,320 Z";

  const SCALES_CREST_FRONT =
    "M0,320 L0,180 L160,110 L320,190 L500,90 L680,170 L860,80 L1040,160 L1220,100 L1440,140 L1440,320 L0,320 Z";

  const FULL_COVER =
    "M0,0 L0,0 L160,0 L320,0 L500,0 L680,0 L860,0 L1040,0 L1220,0 L1440,0 L1440,320 L0,320 Z";

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Escamas traseras (sombra de profundidad)
      tl.fromTo(
        scalesBackRef.current,
        { attr: { d: FLAT_BOTTOM } },
        { attr: { d: SCALES_CREST_BACK }, duration: 0.5, ease: "power2.inOut" },
        0.05
      ).to(
        scalesBackRef.current,
        { attr: { d: FULL_COVER }, duration: 0.5, ease: "power2.inOut" },
        0.55
      );

      // Escamas delanteras principales (borde afilado del Monstruo)
      tl.fromTo(
        scalesFrontRef.current,
        { attr: { d: FLAT_BOTTOM } },
        { attr: { d: SCALES_CREST_FRONT }, duration: 0.5, ease: "power2.inOut" },
        0
      ).to(
        scalesFrontRef.current,
        { attr: { d: FULL_COVER }, duration: 0.5, ease: "power2.inOut" },
        0.5
      );

      // Borde neón verde en la punta de las escamas
      if (strokeGlowRef.current) {
        tl.fromTo(
          strokeGlowRef.current,
          { attr: { d: FLAT_BOTTOM }, opacity: 0 },
          { attr: { d: SCALES_CREST_FRONT }, opacity: 1, duration: 0.5, ease: "power2.inOut" },
          0
        ).to(
          strokeGlowRef.current,
          { attr: { d: FULL_COVER }, opacity: 0, duration: 0.5, ease: "power2.inOut" },
          0.5
        );
      }

      // Destello verde de garra/ojo de Monstruo que cruza de izquierda a derecha
      if (glowSweepRef.current) {
        tl.fromTo(
          glowSweepRef.current,
          { xPercent: -50, opacity: 0 },
          { xPercent: 50, opacity: 0.8, duration: 0.6, ease: "sine.inOut" },
          0.1
        ).to(
          glowSweepRef.current,
          { opacity: 0, duration: 0.3 },
          0.65
        );
      }

      // Texto de fondo con resolución cinematográfica
      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { yPercent: 18, opacity: 0, scale: 0.94, filter: "blur(8px)" },
          {
            yPercent: -18,
            opacity: 0.2,
            scale: 1.05,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
          },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden z-10 select-none pointer-events-none"
      style={{ height, backgroundColor: from }}
    >
      {/* Texto de fondo en fuente Elrotex (identidad verdolaga) */}
      {text && (
        <div
          ref={textRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <span
            className="text-[12vw] font-black font-elrotex tracking-wider uppercase select-none opacity-0 drop-shadow-[0_0_20px_rgba(146,191,78,0.3)]"
            style={{
              WebkitTextStroke: `1.5px ${accentColor}`,
              color: "transparent",
            }}
          >
            {text}
          </span>
        </div>
      )}

      {/* Glow neón de garra que cruza el área */}
      <div
        ref={glowSweepRef}
        className="absolute inset-0 z-10 pointer-events-none opacity-0"
        style={{
          background: `radial-gradient(ellipse 50% 70% at 50% 40%, ${accentColor}60, transparent 75%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Silueta dentada de escamas de cocodrilo del Monstruo Verde */}
      <svg
        viewBox="0 0 1440 320"
        className="absolute bottom-0 left-0 w-full h-full z-20 pointer-events-none"
        preserveAspectRatio="none"
      >
        {/* Capa de profundidad de escamas */}
        <path
          ref={scalesBackRef}
          d={FLAT_BOTTOM}
          fill={to}
          opacity="0.6"
          style={{ filter: "blur(4px)" }}
        />

        {/* Capa frontal afilada */}
        <path
          ref={scalesFrontRef}
          d={FLAT_BOTTOM}
          fill={to}
        />

        {/* Borde neón brillante sobre las crestas de las escamas */}
        <path
          ref={strokeGlowRef}
          d={FLAT_BOTTOM}
          fill="none"
          stroke={accentColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="filter drop-shadow-[0_0_10px_#92BF4E]"
        />
      </svg>
    </div>
  );
}