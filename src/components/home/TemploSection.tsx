"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";
import { MapPin, Users, Heart } from "lucide-react";

export default function TemploSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Initial 3D state of the stadium model (extreme tilt/rotation)
      gsap.set(modelRef.current, {
        rotationX: 72,
        rotationZ: -105,
        scale: 0.65,
        z: -150
      });

      // 2. ScrollTrigger Pinning and Phase transitions
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          pin: pinRef.current,
          anticipatePin: 1,
        },
      });

      // Fase 1: Rotation and Tilt adjustment
      tl.to(
        modelRef.current,
        {
          rotationX: 52,
          rotationZ: 25,
          scale: 0.9,
          z: 0,
          duration: 1,
          ease: "sine.inOut",
        },
        0
      );

      // Fase 2: Zoom in to pitch floor
      tl.to(
        modelRef.current,
        {
          scale: 1.68,
          rotationX: 42,
          rotationZ: 50,
          z: 180,
          yPercent: -10,
          duration: 1.2,
          ease: "power2.inOut",
        },
        0.8
      );

      // Fade out outer atmospheric glows as camera zooms
      tl.to(
        ".templo-ambient-glow",
        { opacity: 0.3, scale: 0.8, duration: 1 },
        0.6
      );

      // Fase 3: Tooltips (Hotspots) trigger fade-in sequential reveal
      tl.fromTo(
        ".hotspot-card",
        { opacity: 0, scale: 0.7, y: 15 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.15, duration: 0.5, ease: "back.out(1.8)" },
        1.4
      );

      // Title & Intro text fade out
      tl.to(
        ".templo-intro-header",
        { opacity: 0, y: -50, scale: 0.95, duration: 0.6 },
        0.2
      );

    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black text-[#F3F3F3] z-30"
      style={{ height: "260vh" }}
    >
      <div
        ref={pinRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center"
      >
        {/* Cinematic grid overlay and spotlights */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,156,63,0.08)_0%,transparent_70%)] pointer-events-none z-0" />
        <div className="templo-ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-marathon-green/5 blur-[150px] pointer-events-none z-0" />

        {/* Floating Section Title (Disappears as user zooms in) */}
        <div className="templo-intro-header w-full max-w-7xl mx-auto px-4 pt-20 text-center select-none pointer-events-none z-10 transition-all duration-300">
          <span className="block text-[8vw] md:text-[5.5rem] font-bold text-white/5 tracking-wider uppercase font-elrotex leading-none">
            EL TEMPLO
          </span>
          <span className="block text-xs md:text-sm font-sans text-marathon-lime/75 tracking-[0.4em] uppercase font-bold mt-2">
            Estadio Yankel Rosenthal • Único en su Especie
          </span>
        </div>

        {/* 3D Model Viewport wrapper */}
        <div
          className="relative w-full h-[60vh] md:h-[65vh] flex items-center justify-center overflow-visible select-none z-20"
          style={{ perspective: "1500px", perspectiveOrigin: "50% 35%" }}
        >
          {/* Hologram Stadium CSS 3D Arena */}
          <div
            ref={modelRef}
            className="relative w-[280px] h-[190px] md:w-[420px] md:h-[280px] will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* THE FIELD (Pitch floor) */}
            <div
              className="absolute inset-0 bg-[#0f3f1e] border-[2.5px] border-white/20 flex items-center justify-center rounded-[4px]"
              style={{
                transform: "translateZ(0)",
                backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02) 15px, transparent 15px, transparent 30px)"
              }}
            >
              {/* Center Circle & Lines */}
              <div className="w-[80px] h-[80px] border-[1.5px] border-white/20 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
              </div>
              <div className="absolute inset-y-0 left-1/2 w-[1.5px] bg-white/20" />
              
              {/* Penalty boxes */}
              <div className="absolute left-0 top-[20%] w-[50px] h-[60%] border-[1.5px] border-white/20" />
              <div className="absolute right-0 top-[20%] w-[50px] h-[60%] border-[1.5px] border-white/20" />
            </div>

            {/* STADIUM STANDS (OCCIDENTAL, ORIENTAL, SOL SUR, SOL NORTE) */}
            {/* Occidental Stand (Left side) */}
            <div
              className="absolute top-0 right-full h-full w-[45px] md:w-[65px] bg-[#022215]/95 border-l-4 border-y border-marathon-green/40 origin-right rounded-l-md"
              style={{
                transform: "rotateY(-30deg) translateZ(1px)",
                backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.4), transparent)"
              }}
            >
              {/* Seat Tier Mock details */}
              <div className="w-full h-full flex flex-col justify-between py-2 px-1 opacity-20">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-0.5 w-full bg-marathon-lime" />
                ))}
              </div>
            </div>

            {/* Oriental Stand (Right side) */}
            <div
              className="absolute top-0 left-full h-full w-[45px] md:w-[65px] bg-[#022215]/95 border-r-4 border-y border-marathon-green/40 origin-left rounded-r-md"
              style={{
                transform: "rotateY(30deg) translateZ(1px)",
                backgroundImage: "linear-gradient(to left, rgba(0,0,0,0.4), transparent)"
              }}
            >
              <div className="w-full h-full flex flex-col justify-between py-2 px-1 opacity-20">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-0.5 w-full bg-marathon-lime" />
                ))}
              </div>
            </div>

            {/* Sol Norte Stand (Top side) */}
            <div
              className="absolute bottom-full left-0 w-full h-[45px] md:h-[65px] bg-[#022215]/95 border-t-4 border-x border-marathon-green/40 origin-bottom rounded-t-md"
              style={{
                transform: "rotateX(30deg) translateZ(1px)",
                backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)"
              }}
            >
              <div className="w-full h-full flex flex-col justify-between py-1 px-2 opacity-20">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full h-0.5 bg-marathon-lime" />
                ))}
              </div>
            </div>

            {/* Sol Sur Stand (Bottom side) */}
            <div
              className="absolute top-full left-0 w-full h-[45px] md:h-[65px] bg-[#022215]/95 border-b-4 border-x border-marathon-green/40 origin-top rounded-b-md"
              style={{
                transform: "rotateX(-30deg) translateZ(1px)",
                backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)"
              }}
            >
              <div className="w-full h-full flex flex-col justify-between py-1 px-2 opacity-20">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full h-0.5 bg-marathon-lime" />
                ))}
              </div>
            </div>

            {/* VERTICAL FLOODLIGHT TOWERS (Standing straight up perpendicular to the pitch) */}
            {/* Top-Left Floodlight */}
            <div
              className="absolute top-[-10px] left-[-10px] w-2 h-14 bg-neutral-800 border-l border-neutral-700"
              style={{ transform: "rotateX(-90deg) translateZ(1px)" }}
            >
              <div className="absolute bottom-full -left-2 w-6 h-4 bg-black/90 border border-marathon-lime/50 rounded flex items-center justify-center shadow-[0_0_12px_#92BF4E]">
                <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                <div className="w-1 h-1 rounded-full bg-white ml-1 animate-pulse" />
              </div>
            </div>

            {/* Top-Right Floodlight */}
            <div
              className="absolute top-[-10px] right-[-10px] w-2 h-14 bg-neutral-800 border-r border-neutral-700"
              style={{ transform: "rotateX(-90deg) translateZ(1px)" }}
            >
              <div className="absolute bottom-full -right-2 w-6 h-4 bg-black/90 border border-marathon-lime/50 rounded flex items-center justify-center shadow-[0_0_12px_#92BF4E]">
                <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                <div className="w-1 h-1 rounded-full bg-white ml-1 animate-pulse" />
              </div>
            </div>

            {/* Bottom-Left Floodlight */}
            <div
              className="absolute bottom-[-10px] left-[-10px] w-2 h-14 bg-neutral-800 border-l border-neutral-700"
              style={{ transform: "rotateX(-90deg) translateZ(1px)" }}
            >
              <div className="absolute bottom-full -left-2 w-6 h-4 bg-black/90 border border-marathon-lime/50 rounded flex items-center justify-center shadow-[0_0_12px_#92BF4E]">
                <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                <div className="w-1 h-1 rounded-full bg-white ml-1 animate-pulse" />
              </div>
            </div>

            {/* Bottom-Right Floodlight */}
            <div
              className="absolute bottom-[-10px] right-[-10px] w-2 h-14 bg-neutral-800 border-r border-neutral-700"
              style={{ transform: "rotateX(-90deg) translateZ(1px)" }}
            >
              <div className="absolute bottom-full -right-2 w-6 h-4 bg-black/90 border border-marathon-lime/50 rounded flex items-center justify-center shadow-[0_0_12px_#92BF4E]">
                <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                <div className="w-1 h-1 rounded-full bg-white ml-1 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Info hotspots (Positioned around the stadium on bottom part) */}
        <div className="absolute bottom-16 w-full max-w-6xl mx-auto px-4 z-20 grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
          
          {/* Hotspot 1: Capacidad */}
          <div className="hotspot-card opacity-0 bg-neutral-900/60 border border-marathon-green/20 rounded-2xl p-5 backdrop-blur-md transition-all duration-300 hover:border-marathon-lime/40 group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-marathon-green/10 rounded-lg group-hover:bg-marathon-green/20 transition-colors">
                <Users size={18} className="text-marathon-lime" />
              </div>
              <h4 className="font-heading font-bold text-base text-white tracking-wide">
                Capacidad Sagrada
              </h4>
            </div>
            <p className="text-marathon-light/60 text-xs md:text-sm leading-relaxed">
              Hogar de <strong className="text-white">9,000 verdolagas</strong>. Un templo donde la afición y el club se unen en una sola voz incansable.
            </p>
          </div>

          {/* Hotspot 2: Pionero */}
          <div className="hotspot-card opacity-0 bg-neutral-900/60 border border-marathon-green/20 rounded-2xl p-5 backdrop-blur-md transition-all duration-300 hover:border-marathon-lime/40 group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-marathon-green/10 rounded-lg group-hover:bg-marathon-green/20 transition-colors">
                <MapPin size={18} className="text-marathon-lime" />
              </div>
              <h4 className="font-heading font-bold text-base text-white tracking-wide">
                Propiedad y Orgullo
              </h4>
            </div>
            <p className="text-marathon-light/60 text-xs md:text-sm leading-relaxed">
              Inaugurado en 2010. El <strong className="text-white">primer estadio propio</strong> de un club en la Liga Nacional de Honduras.
            </p>
          </div>

          {/* Hotspot 3: Fortín */}
          <div className="hotspot-card opacity-0 bg-neutral-900/60 border border-marathon-green/20 rounded-2xl p-5 backdrop-blur-md transition-all duration-300 hover:border-marathon-lime/40 group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-marathon-green/10 rounded-lg group-hover:bg-marathon-green/20 transition-colors">
                <Heart size={18} className="text-marathon-lime" />
              </div>
              <h4 className="font-heading font-bold text-base text-white tracking-wide">
                El Fortín Verde
              </h4>
            </div>
            <p className="text-marathon-light/60 text-xs md:text-sm leading-relaxed">
              Ubicado en SPS. Un terreno hostil para cualquier rival donde se ha forjado nuestra historia moderna de títulos.
            </p>
          </div>

        </div>

        {/* Downward indicator to guide user */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 z-10">
          <div className="w-1.5 h-1.5 bg-marathon-lime rounded-full animate-ping" />
        </div>
      </div>
    </div>
  );
}
