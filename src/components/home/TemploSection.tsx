"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";
import { ArrowRight, ChevronDown, Crosshair, MapPin, Shield, Zap } from "lucide-react";
import { CLUB } from "@/lib/constants";

const TOTAL_FRAMES = 201;
const FRAME_PATH = (n: number) =>
  `/assets/stadium/animation/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;

export default function TemploSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const preloadedImagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(1);

  // ── 1. PRELOAD FRAMES ───────────────────────────────────────────────────
  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          preloadedImagesRef.current = images;
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        if (!isMounted) return;
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          preloadedImagesRef.current = images;
          setIsLoaded(true);
        }
      };
      images.push(img);
      img.src = FRAME_PATH(i);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // ── 2. GSAP SCRUB ANIMATION ─────────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const pin = pinRef.current;
    if (!canvas || !container || !pin) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = (frameIndex: number) => {
      const img = preloadedImagesRef.current[frameIndex - 1];
      if (!img || !canvas || !ctx) return;

      const rect = canvas.getBoundingClientRect();
      const cssWidth = rect.width;
      const cssHeight = rect.height;
      if (cssWidth === 0 || cssHeight === 0) return;

      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;
      if (!imgWidth || !imgHeight) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetWidth = Math.round(cssWidth * dpr);
      const targetHeight = Math.round(cssHeight * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvas.width / canvas.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const gsapCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        pin: pin,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const prog = self.progress;
          setScrollProgress(prog);

          const targetFrame = Math.min(
            TOTAL_FRAMES,
            Math.max(1, Math.round(prog * (TOTAL_FRAMES - 1) + 1))
          );

          if (targetFrame !== currentFrameRef.current) {
            currentFrameRef.current = targetFrame;
            drawFrame(targetFrame);
          }
        },
      });
    }, containerRef);

    return () => {
      gsapCtx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded]);

  // Phase visibility thresholds (0 to 1)
  const phase1 = scrollProgress >= 0 && scrollProgress < 0.25;
  const phase2 = scrollProgress >= 0.25 && scrollProgress < 0.5;
  const phase3 = scrollProgress >= 0.5 && scrollProgress < 0.75;
  const phase4 = scrollProgress >= 0.75;

  return (
    <div
      id="templo"
      ref={containerRef}
      className="relative w-full bg-[#010906] text-white z-30 font-sans select-none"
      style={{ height: "300vh" }}
    >
      {/* Sticky Viewport */}
      <div ref={pinRef} className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 md:p-12">
        {/* Full-bleed Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0 object-cover"
        />

        {/* Ambient Dark Gradient Vignettes */}
        <div className="absolute inset-0 bg-[#010906]/40 z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010906]/85 via-transparent to-[#010906]/95 z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_#010906_95%)] z-[1] pointer-events-none" />

        {/* Loading Screen */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#010906]/95 backdrop-blur-md">
            <div className="relative w-20 h-20 flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-[#92BF4E]/20" />
              <div className="absolute inset-0 rounded-full border-2 border-t-[#92BF4E] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
              <span className="text-xs font-bold text-white" style={{ fontFamily: "var(--font-outfit)" }}>
                {loadingProgress}%
              </span>
            </div>
            <p className="text-xs font-semibold tracking-[0.3em] text-[#92BF4E] uppercase" style={{ fontFamily: "var(--font-outfit)" }}>
              CARGANDO EXPERIENCIA 3D...
            </p>
          </div>
        )}

        {/* TOP AWWWARDS TELEMETRY HEADER */}
        <header className="relative z-20 w-full flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3">
            <div className="leading-none">
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#92BF4E]" style={{ fontFamily: "var(--font-outfit)" }}>
                ESTADIO YANKEL ROSENTHAL
              </span>
            </div>
          </div>
        </header>

        {/* CENTER AWWWARDS SPATIAL TYPOGRAPHY (ZERO CARDS, PURE CINEMATIC TEXT) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto flex-1 flex items-center justify-between pointer-events-none">

          {/* PHASE 1: TITULO PRINCIPAL */}
          <div
            className={`absolute inset-x-0 transition-all duration-700 transform ${phase1 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-8 scale-95"
              }`}
          >
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#92BF4E] block mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
                BIENVENIDO AL TEMPLO
              </span>
              <h2
                className="font-elrotex uppercase text-white tracking-tight leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
                style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
              >
                EL TEMPLO DEL <br />
                <span className="text-[#92BF4E] drop-shadow-[0_0_35px_rgba(146,191,78,0.6)]">MONSTRUO VERDE</span>
              </h2>
              <p className="text-xs md:text-sm text-white/60 uppercase tracking-[0.25em] mt-4 max-w-xl mx-auto font-medium" style={{ fontFamily: "var(--font-outfit)" }}>
                Cultura · Historia · Fortaleza Inexpugnable
              </p>
            </div>
          </div>

          {/* PHASE 2: PROPIEDAD EXCLUSIVA */}
          <div
            className={`absolute left-0 md:left-12 max-w-2xl transition-all duration-700 transform ${phase2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
          >
            <div className="flex items-center gap-3 mb-2 text-[#92BF4E]">
              <Crosshair className="w-5 h-5 animate-spin-slow" />
              <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-outfit)" }}>
                01 / PROPIEDAD CLUB
              </span>
            </div>
            <h3 className="font-elrotex uppercase text-4xl md:text-6xl text-white leading-none tracking-wide">
              EL UNICO ESTADIO PROPIO DE <span className="text-[#92BF4E]">UN CLUB EN HONDURAS</span>
            </h3>
            <p className="text-xs md:text-sm text-white/70 leading-relaxed mt-4 max-w-md font-medium" style={{ fontFamily: "var(--font-outfit)" }}>
              Construido e inaugurado en 2010. Una catedral del futbol hondureño impulsada por el orgullo verdolaga.
            </p>
            <div className="flex items-baseline gap-4 mt-6">
              <span className="font-elrotex text-5xl md:text-7xl text-[#92BF4E] leading-none">2010</span>
              <span className="text-xs font-bold uppercase tracking-widest text-white/40" style={{ fontFamily: "var(--font-outfit)" }}>
                ANO DE INAUGURACION
              </span>
            </div>
          </div>

          {/* PHASE 3: CAPACIDAD & AFICION */}
          <div
            className={`absolute right-0 md:right-12 max-w-2xl text-right transition-all duration-700 transform ${phase3 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
          >
            <div className="flex items-center justify-end gap-3 mb-2 text-[#92BF4E]">
              <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-outfit)" }}>
                02 / CAPACIDAD & PASION
              </span>
              <Crosshair className="w-5 h-5 animate-spin-slow" />
            </div>
            <h3 className="font-elrotex uppercase text-4xl md:text-6xl text-white leading-none tracking-wide">
              9,000 ALMAS HACIENDO <span className="text-[#92BF4E]">VIBRAR LA CUEVA</span>
            </h3>
            <p className="text-xs md:text-sm text-white/70 leading-relaxed mt-4 max-w-md ml-auto font-medium" style={{ fontFamily: "var(--font-outfit)" }}>
              Nueve mil aficionados verdolagas llenan las gradas en cada jornada para crear una atmosfera intimidante.
            </p>
            <div className="flex items-baseline justify-end gap-4 mt-6">
              <span className="text-xs font-bold uppercase tracking-widest text-white/40" style={{ fontFamily: "var(--font-outfit)" }}>
                ESPECTADORES OFICIALES
              </span>
              <span className="font-elrotex text-5xl md:text-7xl text-[#92BF4E] leading-none">9,000</span>
            </div>
          </div>

          {/* PHASE 4: VIVE LA EXPERIENCIA */}
          <div
            className={`absolute inset-x-0 text-center transition-all duration-700 transform ${phase4 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              }`}
          >
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#92BF4E] block mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
              FORTALEZA VERDOLAGA
            </span>
            <h3 className="font-elrotex uppercase text-4xl md:text-7xl text-white leading-none tracking-tight">
              VIVE LA EXPERIENCIA EN <span className="text-[#92BF4E]">TU PROPIA CASA</span>
            </h3>
            <p className="text-xs md:text-sm text-white/70 uppercase tracking-wider mt-4 max-w-lg mx-auto font-medium" style={{ fontFamily: "var(--font-outfit)" }}>
              Asegura tu lugar en el Yankel Rosenthal para defender los colores del Club Deportivo Marathon.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4 pointer-events-auto">
              <a
                href="#boletos"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#92BF4E] text-[#011610] font-bold text-xs md:text-sm uppercase tracking-widest transition-all duration-300 hover:bg-[#a6d85b] hover:shadow-[0_0_35px_rgba(146,191,78,0.7)] scale-100 hover:scale-105 active:scale-95"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                <span>HAZTE SOCIO VERDOLAGA</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM AWWWARDS FOOTER HUD BAR */}
        <footer className="relative z-20 w-full flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-outfit)" }}>
            <ChevronDown className="w-4 h-4 text-[#92BF4E] animate-bounce" />
            <span>DESPLAZA PARA CONTINUAR EXPLORANDO</span>
          </div>

          {/* Progress Segment Indicator */}
          <div className="flex items-center gap-3">
            {[
              { id: "01", active: phase1 },
              { id: "02", active: phase2 },
              { id: "03", active: phase3 },
              { id: "04", active: phase4 },
            ].map((p) => (
              <div key={p.id} className="flex items-center gap-1.5">
                <span className={`text-[0.65rem] font-bold font-mono ${p.active ? "text-[#92BF4E]" : "text-white/30"}`}>
                  {p.id}
                </span>
                <div
                  className={`h-1 transition-all duration-500 rounded-full ${p.active ? "w-8 bg-[#92BF4E] shadow-[0_0_10px_#92BF4E]" : "w-2 bg-white/20"
                    }`}
                />
              </div>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
