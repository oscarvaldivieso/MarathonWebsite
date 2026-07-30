"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/hooks/useGsap";
import { ArrowRight, ChevronDown, Trophy } from "lucide-react";
import Button from "@/components/ui/Button";
import { CLUB } from "@/lib/constants";

// ─── Frame Sequence Config ────────────────────────────────────────────────────
const TOTAL_FRAMES = 201;
const FRAME_PATH = (n: number) =>
  `/assets/stadium/animation/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TemploSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Stable references for frame sequence rendering
  const preloadedImagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(1);

  // ── 1. ASSET PRELOADING SEQUENCE ─────────────────────────────────────────────
  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadingProgress(progress);
        if (loadedCount === TOTAL_FRAMES) {
          preloadedImagesRef.current = images;
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        if (!isMounted) return;
        loadedCount++;
        const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadingProgress(progress);
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

  // ── 2. GSAP SCROLL ANIMATION ─────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const pin = pinRef.current;
    if (!canvas || !container || !pin) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── LOGICA DE DIBUJO CON ASPECT RATIO PERFECTO (Object-Cover) ───────────
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

      // Ajustar resolución retina DPR manteniendo coordenadas limpias
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetWidth = Math.round(cssWidth * dpr);
      const targetHeight = Math.round(cssHeight * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cálculo estricto de Object-Cover para evitar cualquier distorsión de aspecto
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

    // ── RESIZE HANDLER ──────────────────────────────────────
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    if (prefersReduced) {
      currentFrameRef.current = 1;
      drawFrame(1);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    // ── GSAP CINEMATIC SCROLL STORYTELLING ───────────────────
    const gsapCtx = gsap.context(() => {
      const frameObj = { frame: 1 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            drawFrame(currentFrameRef.current);
          },
        },
      });

      // 1. Frame scrub (1 to 201)
      tl.to(
        frameObj,
        {
          frame: TOTAL_FRAMES,
          ease: "none",
          duration: 1,
          onUpdate: () => {
            const targetFrame = Math.round(frameObj.frame);
            if (targetFrame !== currentFrameRef.current) {
              currentFrameRef.current = targetFrame;
              drawFrame(targetFrame);
            }
          },
        },
        0
      );

      // 2. PHASE 1 (0–15%): Title reveal
      tl.fromTo(
        ".cueva-title",
        { opacity: 0, y: -40, clipPath: "inset(0 0 100% 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.15, ease: "power3.out" },
        0.01
      );
      tl.fromTo(
        ".cueva-subtitle",
        { opacity: 0, letterSpacing: "0.6em" },
        { opacity: 1, letterSpacing: "0.45em", duration: 0.12, ease: "power2.out" },
        0.05
      );
      tl.to(".cueva-scroll-hint", { opacity: 0, duration: 0.05 }, 0.10);

      // 3. PHASE 2 (15–50%): Editorial panels
      tl.fromTo(".reveal-structure", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.12, ease: "power3.out" }, 0.15);
      tl.fromTo(".reveal-tribunas", { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.12, ease: "power3.out" }, 0.22);
      tl.fromTo(".reveal-cancha", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.10, ease: "power2.out" }, 0.30);
      tl.fromTo(".reveal-luces", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.10, ease: "power2.out" }, 0.35);
      tl.fromTo(".reveal-aficion", { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.40);

      // 4. PHASE 3 (50–75%): Panels clear, scoreboard rises
      tl.to(".reveal-badges", { opacity: 0, duration: 0.08 }, 0.50);
      tl.fromTo(".cueva-counters", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.14, ease: "power3.out" }, 0.54);
      tl.fromTo(".cueva-vignette", { opacity: 0.4 }, { opacity: 0.75, duration: 0.2 }, 0.50);

      // 5. PHASE 4 (75–100%): Counters clear, CTA appears
      tl.to(".cueva-counters", { opacity: 0, y: -20, duration: 0.08 }, 0.75);
      tl.fromTo(".cueva-cta-block", { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.15, ease: "back.out(1.8)" }, 0.78);
      tl.to(".cueva-title", { letterSpacing: "0.15em", duration: 0.15 }, 0.76);
      tl.fromTo(".cueva-exit-fade", { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0.95);

      // Standalone ambient animation (subtle and clean)
      gsap.to(".cueva-vignette", {
        opacity: 0.65,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => {
      gsapCtx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded]);

  const YEARS_OF_PRIDE = new Date().getFullYear() - CLUB.founded;

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* ── Scroll Container (200vh — optimizado) ── */}
      <div
        id="templo"
        ref={containerRef}
        className="relative w-full bg-marathon-darkest z-30"
        style={{ height: "200vh" }}
      >
        {/* ── Sticky Viewport ── */}
        <div ref={pinRef} className="sticky top-0 h-screen w-full overflow-hidden">

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-0"
            style={{ display: "block" }}
          />

          {/* Dark gradient overlays */}
          <div className="absolute inset-0 bg-marathon-darkest/50 z-[1] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-marathon-darkest via-transparent to-marathon-darkest/90 z-[1] pointer-events-none" />

          {/* Subtle Vignette */}
          <div
            className="cueva-vignette absolute inset-0 pointer-events-none z-[2]"
            style={{
              background: "radial-gradient(ellipse at center, transparent 35%, rgba(1, 23, 14, 0.92) 100%)",
              opacity: 0.5,
            }}
          />

          {/* ── Loading HUD ── */}
          {!isLoaded && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-marathon-darkest/95 backdrop-blur-md">
              <div className="relative w-20 h-20 flex items-center justify-center mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-marathon-green/20" />
                <div
                  className="absolute inset-0 rounded-full border-2 border-t-marathon-lime border-r-transparent border-b-transparent border-l-transparent"
                  style={{ animation: "spin 1s linear infinite" }}
                />
                <span className="text-xs font-heading font-bold text-white">{loadingProgress}%</span>
              </div>
              <p className="text-[11px] font-heading font-medium tracking-[0.25em] text-marathon-lime/80 uppercase">
                Cargando el templo verde...
              </p>
              <div className="mt-4 w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-marathon-lime transition-all duration-200 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────── */}
          {/* FASE 1 — Título Principal                        */}
          {/* ──────────────────────────────────────────────── */}
          <div className="absolute top-[12%] inset-x-0 z-20 text-center px-4 pointer-events-none select-none">
            <p
              className="cueva-subtitle text-[11px] sm:text-xs font-heading font-medium text-marathon-lime tracking-[0.3em] uppercase mb-3"
              style={{ opacity: 0 }}
            >
              Estadio Yankel Rosenthal · San Pedro Sula
            </p>
            <h2
              className="cueva-title font-elrotex tracking-wide text-white leading-tight max-w-4xl mx-auto"
              style={{
                fontSize: "clamp(2.2rem, 5.5vw, 4.8rem)",
                opacity: 0
              }}
            >
              El Templo del <span className="text-marathon-lime">Monstruo Verde</span>
            </h2>
          </div>

          {/* Scroll Hint */}
          <div className="cueva-scroll-hint absolute bottom-8 inset-x-0 z-20 flex flex-col items-center gap-2 pointer-events-none select-none">
            <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-heading">
              Desplaza hacia abajo para explorar
            </span>
            <ChevronDown size={18} className="text-marathon-lime/60 animate-bounce" />
          </div>

          {/* ──────────────────────────────────────────────── */}
          {/* FASE 2 — Tarjetas Informativas Estilo Editorial */}
          {/* ──────────────────────────────────────────────── */}
          <div className="reveal-badges absolute inset-0 z-20 pointer-events-none select-none p-4 sm:p-8 md:p-12">



            {/* ── Tarjeta 01: Propiedad (Izquierda) ── */}
            <div
              className="reveal-structure absolute top-1/2 left-4 sm:left-10 md:left-14 -translate-y-1/2 pointer-events-auto"
              style={{ opacity: 0, width: "calc(100% - 2rem)", maxWidth: "340px" }}
            >
              <div className="bg-marathon-darkest/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl transition-all duration-300 hover:border-marathon-lime/30 hover:bg-marathon-darkest/90">
                <span className="text-[0.8rem] font-heading font-bold  text-marathon-lime  block mb-2">
                  Propiedad Exclusiva
                </span>
                <h3 className="font-elrotex text-white text-xl sm:text-2xl mb-2">
                  Yankel Rosenthal
                </h3>
                <p className="text-xs text-white/60 font-outfit leading-relaxed">
                  El único estadio en Honduras de propiedad total de un club de fútbol. Fortaleza inexpugnable desde 2010.
                </p>
              </div>
            </div>

            {/* ── Tarjeta 02: Capacidad (Derecha) ── */}
            <div
              className="reveal-tribunas absolute top-1/2 right-4 sm:right-10 md:right-14 -translate-y-1/2 pointer-events-auto"
              style={{ opacity: 0, width: "calc(100% - 2rem)", maxWidth: "340px" }}
            >
              <div className="bg-marathon-darkest/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl transition-all duration-300 hover:border-marathon-lime/30 hover:bg-marathon-darkest/90 text-right sm:text-left">
                <span className="text-[10px] font-heading font-bold tracking-widest text-marathon-lime uppercase block mb-2">
                  02 / Capacidad Oficial
                </span>
                <div className="font-heading font-extrabold text-white text-3xl sm:text-4xl mb-1">
                  9,000 <span className="text-sm font-semibold text-white/50">espectadores</span>
                </div>
                <p className="text-xs text-white/60 font-body leading-relaxed mt-2">
                  Nueve mil afisionados que hacen vibrar la cueva en cada jornada de liga local e internacional.
                </p>
              </div>
            </div>

            {/* ── Tarjeta 03: Superficie (Abajo Izquierda) ── */}
            <div
              className="reveal-cancha absolute bottom-8 left-4 sm:left-10 md:left-14 pointer-events-auto hidden sm:block"
              style={{ opacity: 0, maxWidth: "280px" }}
            >
              <div className="bg-marathon-darkest/80 backdrop-blur-md border border-white/10 rounded-xl p-4 transition-all duration-300 hover:border-marathon-lime/30">
                <span className="text-[9px] font-heading font-bold tracking-widest text-marathon-lime uppercase block mb-1">
                  03 / Terreno de Juego
                </span>
                <h4 className="font-heading font-bold text-white text-sm">
                  Césped Natural de Alto Rendimiento
                </h4>
              </div>
            </div>

            {/* ── Tarjeta 04: Fundación (Abajo Derecha) ── */}
            <div
              className="reveal-luces absolute bottom-8 right-4 sm:right-10 md:right-14 pointer-events-auto hidden sm:block"
              style={{ opacity: 0, maxWidth: "280px" }}
            >
              <div className="bg-marathon-darkest/80 backdrop-blur-md border border-white/10 rounded-xl p-4 text-right transition-all duration-300 hover:border-marathon-lime/30">
                <span className="text-[9px] font-heading font-bold tracking-widest text-marathon-lime uppercase block mb-1">
                  04 / Legado
                </span>
                <h4 className="font-heading font-bold text-white text-sm">
                  Fundado en {CLUB.founded}
                </h4>
              </div>
            </div>

          </div>

          {/* ──────────────────────────────────────────────── */}
          {/* FASE 3 — Marcador de Estadísticas                */}
          {/* ──────────────────────────────────────────────── */}
          <div
            className="cueva-counters absolute bottom-6 inset-x-4 sm:inset-x-8 md:inset-x-12 z-20 pointer-events-auto select-none"
            style={{ opacity: 0 }}
          >
            <div className="max-w-5xl mx-auto bg-marathon-darkest/85 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4">
                {[
                  { num: `${YEARS_OF_PRIDE}`, suf: "+", label: "Años de Orgullo" },
                  { num: `${CLUB.titles}`, suf: "×", label: "Títulos de Liga" },
                  { num: "50K", suf: "+", label: "Comunidad Verde" },
                  { num: "9,000", suf: "", label: "Capacidad La Cueva" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="px-4 py-5 sm:py-6 text-center border-b md:border-b-0 border-r border-white/10 last:border-r-0 transition-colors duration-300 hover:bg-white/[0.03]"
                  >
                    <div className="flex items-baseline justify-center gap-1 leading-none mb-1.5">
                      <span className="font-heading font-black text-white text-2xl sm:text-4xl">
                        {stat.num}
                      </span>
                      {stat.suf && (
                        <span className="font-heading font-bold text-marathon-lime text-lg sm:text-xl">
                          {stat.suf}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] sm:text-xs font-heading font-medium text-white/50">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────── */}
          {/* FASE 4 — Bloque Final de Llamado a la Acción     */}
          {/* ──────────────────────────────────────────────── */}
          <div
            className="cueva-cta-block absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center pointer-events-none select-none"
            style={{ opacity: 0 }}
          >
            <div className="max-w-2xl mx-auto pointer-events-auto bg-marathon-darkest/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
              <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-marathon-lime block mb-3">
                Fortaleza de San Pedro Sula
              </span>
              <h3 className="font-heading font-bold text-white text-3xl sm:text-5xl tracking-tight mb-4">
                Tu casa, <span className="text-marathon-lime">tu cueva</span>
              </h3>
              <p className="text-sm sm:text-base text-white/60 font-body leading-relaxed mb-8 max-w-lg mx-auto">
                Conoce de cerca la historia del primer estadio propio en el fútbol hondureño y vive la experiencia del Monstruo Verde.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
                <a
                  href="#cta"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-marathon-lime text-marathon-darkest font-heading font-bold text-sm hover:bg-[#a4d458] transition-all duration-300 shadow-lg hover:shadow-marathon-lime/20"
                >
                  Hazte Socio
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#partidos"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-heading font-semibold text-sm transition-all duration-300"
                >
                  Ver Partidos
                  <Trophy size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Exit fade */}
          <div
            className="cueva-exit-fade absolute inset-0 bg-marathon-darkest pointer-events-none z-40"
            style={{ opacity: 0 }}
          />

        </div>
      </div>
    </>
  );
}

