"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import SpotlightLogo from "@/components/ui/SpotlightLogo";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progressText, setProgressText] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preloaderRef.current) return;

    const counterObj = { value: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Exit animation sincronizada con HeroSection
          const exitTl = gsap.timeline({
            onStart: () => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("preloaderComplete"));
              }
            },
            onComplete: () => setIsLoading(false),
          });

          exitTl.to(".preloader-content", {
            opacity: 0,
            y: -20,
            scale: 0.96,
            duration: 0.35,
            ease: "power2.in",
          });

          exitTl.to(
            preloaderRef.current,
            {
              yPercent: -100,
              duration: 0.65,
              ease: "power4.inOut",
            },
            0.15
          );
        },
      });

      // 1. Logo zoom & pulse entrada
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.7, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.4)" },
        0
      );

      // 2. Texto del club
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        0.25
      );

      // 3. Barra de progreso y contador 0% → 100%
      tl.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          ease: "power2.inOut",
        },
        0.35
      );

      tl.to(
        counterObj,
        {
          value: 100,
          duration: 0.9,
          ease: "power2.inOut",
          onUpdate: () => {
            setProgressText(Math.round(counterObj.value));
          },
        },
        0.35
      );

      // Pausa ligera de confirmación (0.15s)
      tl.to({}, { duration: 0.15 });
    }, preloaderRef);

    return () => ctx.revert();
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] bg-marathon-darkest flex items-center justify-center select-none transform-gpu will-change-transform"
    >
      {/* Patrón sutil de fondo */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #92BF4E 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Aura de resplandor ambiental adaptativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] sm:w-[400px] h-[70vw] sm:h-[400px] bg-marathon-green/10 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none transform-gpu" />

      <div className="preloader-content relative flex flex-col items-center gap-5 sm:gap-6 px-4 text-center transform-gpu">
        {/* Logo responsivo con halo */}
        <div
          ref={logoRef}
          className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-marathon-lime/10 blur-md animate-pulse" />
          <SpotlightLogo size={96} />
        </div>

        {/* Texto institucional */}
        <div ref={textRef} className="text-center">
          <p className="text-marathon-lime text-[10px] sm:text-[11px] font-heading font-bold uppercase tracking-[0.35em] mb-1">
            Club Deportivo
          </p>
          <p className="text-white text-2xl sm:text-3xl font-heading font-black tracking-widest uppercase">
            MARATHÓN
          </p>
        </div>

        {/* Contenedor de barra de progreso + contador porcentual */}
        <div className="flex flex-col items-center gap-2 mt-1">
          <div className="w-48 sm:w-60 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-marathon-green via-marathon-lime to-marathon-lime origin-left rounded-full transform-gpu"
            />
          </div>

          <span className="text-[11px] font-heading font-bold text-white/50 tracking-wider">
            {progressText}%
          </span>
        </div>
      </div>
    </div>
  );
}

