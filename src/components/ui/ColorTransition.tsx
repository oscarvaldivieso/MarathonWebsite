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
 * Savage Claw Tear Transition Component.
 * Replaces the soft, aquatic waves with double-layered jagged claw-slash SVG paths.
 * Renders glowing claw-slash embers/splinters and shaking parallax background headers
 * that react to scroll velocity, evoking the raw power of the Green Monster.
 */
export default function ColorTransition({
  from,
  to,
  accentColor = "#2E9C3F", // CD Marathon Green
  text = "",
  height = "260px",
}: ColorTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tear1Ref = useRef<SVGPathElement>(null);
  const tear2Ref = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // ── JAGGED TEAR 1 PATHS (Savage accent claw tear) ────────────────
      const tear1Start = "M 0,300 L 1440,300 L 1440,300 L 0,300 Z";
      // Hand-crafted jagged, sharp, claw-ripped profile
      const tear1Mid = "M 0,280 L 120,290 L 220,110 L 380,240 L 460,90 L 590,260 L 730,70 L 860,230 L 980,120 L 1110,250 L 1240,80 L 1340,210 L 1440,160 L 1440,300 L 0,300 Z";
      const tear1End = "M 0,0 L 1440,0 L 1440,300 L 0,300 Z";

      // ── JAGGED TEAR 2 PATHS (Main target color claw tear) ─────────────
      const tear2Start = "M 0,300 L 1440,300 L 1440,300 L 0,300 Z";
      // Off-beat jagged paths to create organic claw overlap layering
      const tear2Mid = "M 0,290 L 150,260 L 280,180 L 400,270 L 520,150 L 640,280 L 760,130 L 890,240 L 1020,160 L 1150,260 L 1280,140 L 1380,230 L 1440,210 L 1440,300 L 0,300 Z";
      const tear2End = "M 0,0 L 1440,0 L 1440,300 L 0,300 Z";

      // Master Scroll-driven timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      // Tear 1 Morph
      tl.to(
        tear1Ref.current,
        {
          attr: { d: tear1Mid },
          duration: 0.5,
          ease: "power2.inOut",
        },
        0
      ).to(
        tear1Ref.current,
        {
          attr: { d: tear1End },
          duration: 0.5,
          ease: "power1.inOut",
        },
        0.5
      );

      // Tear 2 Morph (delayed to overlap)
      tl.to(
        tear2Ref.current,
        {
          attr: { d: tear2Mid },
          duration: 0.5,
          ease: "power3.inOut",
        },
        0.12
      ).to(
        tear2Ref.current,
        {
          attr: { d: tear2End },
          duration: 0.5,
          ease: "power1.inOut",
        },
        0.62
      );

      // Parallax Text Scale + Savage Shake/Tremor effect
      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { yPercent: 30, opacity: 0, scale: 0.92, rotation: -2 },
          { 
            yPercent: -30, 
            opacity: 0.15, 
            scale: 1.08, 
            rotation: 2,
            duration: 1, 
            ease: "none" 
          },
          0
        );
      }

      // Claw Scratch Splinters Flowing Upward
      if (particleContainerRef.current) {
        const splinters = particleContainerRef.current.children;
        Array.from(splinters).forEach((splinter, idx) => {
          const speed = 70 + idx * 40;
          tl.fromTo(
            splinter,
            { y: speed * 0.9, opacity: 0, rotation: gsap.utils.random(-45, 45) },
            {
              y: -speed * 1.3,
              opacity: gsap.utils.random(0.4, 0.9),
              rotation: gsap.utils.random(90, 270),
              duration: 1,
              ease: "none",
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
      {/* Background Parallax Outline Text */}
      {text && (
        <div
          ref={textRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <span
            className="text-[13vw] font-black font-elrotex tracking-wider text-white uppercase select-none opacity-0"
            style={{
              WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.15)",
              color: "transparent",
            }}
          >
            {text}
          </span>
        </div>
      )}

      {/* Floating Savage Embers/Splinters (Jagged Polygon Shapes) */}
      <div
        ref={particleContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden"
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-0"
            style={{
              width: `${10 + ((i * 7) % 15)}px`,
              height: `${4 + ((i * 3) % 5)}px`,
              backgroundColor: i % 2 === 0 ? accentColor : "#92BF4E",
              left: `${10 + i * 11}%`,
              top: `${50 + (((i * 13) % 31) - 15)}%`,
              // Styled as a sharp, jagged splinter/spark
              clipPath: "polygon(0% 50%, 100% 0%, 80% 50%, 100% 100%)",
              filter: `drop-shadow(0 0 8px ${accentColor})`,
              boxShadow: `0 0 12px ${accentColor}`,
            }}
          />
        ))}
      </div>

      {/* Savage Torn Edge Dividers */}
      <svg
        viewBox="0 0 1440 300"
        className="absolute bottom-0 left-0 w-full h-full preserve-3d"
        preserveAspectRatio="none"
      >
        {/* Layer 1: Green/Lime accent tear */}
        <path
          ref={tear1Ref}
          d="M 0,300 L 1440,300 L 1440,300 L 0,300 Z"
          fill={accentColor}
          opacity="0.8"
        />

        {/* Layer 2: Main transition target color tear */}
        <path
          ref={tear2Ref}
          d="M 0,300 L 1440,300 L 1440,300 L 0,300 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}
