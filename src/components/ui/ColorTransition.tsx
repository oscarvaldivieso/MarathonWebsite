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
 * Liquid Curtain Transition.
 *
 * Two soft bezier waves rise smoothly (sine easing, continuous motion — no
 * held pauses, no jagged spikes, no shake) to reveal the next section's
 * color. A blurred light sweep travels across the crest, and a handful of
 * soft drifting orbs add atmosphere without noise. Everything eases with
 * sine.inOut so the motion reads as fluid rather than mechanical.
 */
export default function ColorTransition({
  from,
  to,
  accentColor = "#92BF4E",
  text = "",
  height = "80vh",
}: ColorTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveBackRef = useRef<SVGPathElement>(null);
  const waveFrontRef = useRef<SVGPathElement>(null);
  const glowSweepRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  // All path states share the same command structure (M, three C's, L, L, Z)
  // so GSAP can tween the `d` string smoothly, value by value, without a
  // morph plugin — the curves stay curves the whole way through.
  const FLAT_BOTTOM =
    "M0,320 C480,320 480,320 720,320 C960,320 960,320 1440,320 L1440,320 L0,320 Z";
  const CREST_BACK =
    "M0,320 C300,200 480,150 720,190 C960,230 1140,120 1440,170 L1440,320 L0,320 Z";
  const CREST_FRONT =
    "M0,320 C280,240 480,90 720,130 C960,170 1180,60 1440,110 L1440,320 L0,320 Z";
  const FULL_COVER =
    "M0,0 C480,0 480,0 720,0 C960,0 960,0 1440,0 L1440,320 L0,320 Z";

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Back wave — slightly delayed, softer, larger blur — reads as depth
      tl.fromTo(
        waveBackRef.current,
        { attr: { d: FLAT_BOTTOM } },
        { attr: { d: CREST_BACK }, duration: 0.5, ease: "sine.inOut" },
        0.05
      ).to(
        waveBackRef.current,
        { attr: { d: FULL_COVER }, duration: 0.5, ease: "sine.inOut" },
        0.55
      );

      // Front wave — leads slightly, crisper, no blur
      tl.fromTo(
        waveFrontRef.current,
        { attr: { d: FLAT_BOTTOM } },
        { attr: { d: CREST_FRONT }, duration: 0.5, ease: "sine.inOut" },
        0
      ).to(
        waveFrontRef.current,
        { attr: { d: FULL_COVER }, duration: 0.5, ease: "sine.inOut" },
        0.5
      );

      // Light sweep traveling across the crest, continuous, no snapping
      if (glowSweepRef.current) {
        tl.fromTo(
          glowSweepRef.current,
          { xPercent: -30, opacity: 0 },
          { xPercent: 30, opacity: 0.9, duration: 0.6, ease: "sine.inOut" },
          0.05
        ).to(
          glowSweepRef.current,
          { opacity: 0, duration: 0.3, ease: "sine.in" },
          0.65
        );
      }

      // Background text: soft depth-of-field resolve (blur -> sharp -> blur out)
      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { yPercent: 14, opacity: 0, scale: 0.96, filter: "blur(10px)" },
          {
            yPercent: -14,
            opacity: 0.14,
            scale: 1.04,
            filter: "blur(0px)",
            duration: 1,
            ease: "sine.inOut",
          },
          0
        );
      }

      // Drifting orbs — slow, minimal, continuous upward float
      if (orbsRef.current) {
        const orbs = orbsRef.current.children;
        gsap.utils.toArray(orbs).forEach((orb, i) => {
          tl.fromTo(
            orb as Element,
            { y: 40, opacity: 0 },
            {
              y: -60 - i * 12,
              opacity: 0.5,
              duration: 1,
              ease: "sine.inOut",
            },
            0
          );
        });
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
      {/* Background parallax text with cinematic depth-of-field resolve */}
      {text && (
        <div
          ref={textRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <span
            className="text-[13vw] font-black font-elrotex tracking-wider uppercase select-none opacity-0"
            style={{
              WebkitTextStroke: "1.5px rgba(255,255,255,0.15)",
              color: "transparent",
            }}
          >
            {text}
          </span>
        </div>
      )}

      {/* Soft drifting orbs — minimal, blurred, atmospheric */}
      <div ref={orbsRef} className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-0"
            style={{
              width: `${6 + i * 2}px`,
              height: `${6 + i * 2}px`,
              left: `${15 + i * 18}%`,
              bottom: `${10 + (i % 3) * 8}%`,
              backgroundColor: accentColor,
              filter: "blur(3px)",
            }}
          />
        ))}
      </div>

      {/* Light sweep across the crest */}
      <div
        ref={glowSweepRef}
        className="absolute inset-0 z-20 pointer-events-none opacity-0"
        style={{
          background: `radial-gradient(ellipse 40% 60% at 50% 35%, ${accentColor}55, transparent 70%)`,
          filter: "blur(18px)",
        }}
      />

      {/* Liquid waves */}
      <svg
        viewBox="0 0 1440 320"
        className="absolute bottom-0 left-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          ref={waveBackRef}
          d="M0,320 C480,320 480,320 720,320 C960,320 960,320 1440,320 L1440,320 L0,320 Z"
          fill={to}
          opacity="0.5"
          style={{ filter: "blur(6px)" }}
        />
        <path
          ref={waveFrontRef}
          d="M0,320 C480,320 480,320 720,320 C960,320 960,320 1440,320 L1440,320 L0,320 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}