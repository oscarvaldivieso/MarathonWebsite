"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preloaderRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Exit animation
          const exitTl = gsap.timeline({
            onComplete: () => setIsLoading(false),
          });

          exitTl.to(".preloader-content", {
            opacity: 0,
            y: -30,
            duration: 0.4,
            ease: "power2.in",
          });

          exitTl.to(
            preloaderRef.current,
            {
              yPercent: -100,
              duration: 0.8,
              ease: "power4.inOut",
            },
            0.2
          );
        },
      });

      // Logo pulse
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.5, rotation: -10 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.5)" },
        0
      );

      // Club name
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0.4
      );

      // Progress bar
      tl.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power1.inOut" },
        0.6
      );

      // Hold for a beat
      tl.to({}, { duration: 0.3 });
    }, preloaderRef);

    return () => ctx.revert();
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] bg-marathon-darkest flex items-center justify-center"
    >
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #2E9C3F 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Centered glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-marathon-green/5 rounded-full blur-[100px]" />

      <div className="preloader-content relative flex flex-col items-center gap-6">
        {/* Logo */}
        <div ref={logoRef} className="w-20 h-20 md:w-24 md:h-24">
          <img
            src="/assets/brand/escudonormal_blanco.svg"
            alt="CD Marathón"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Text */}
        <div ref={textRef} className="text-center">
          <p className="text-marathon-lime text-[10px] font-heading font-bold uppercase tracking-[0.3em]">
            Club Deportivo
          </p>
          <p className="text-marathon-light text-2xl md:text-3xl font-heading font-black tracking-wide">
            MARATHÓN
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-40 h-[2px] bg-marathon-light/10 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-marathon-green to-marathon-lime origin-left rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
