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

    let canvasWidth = 0;
    let canvasHeight = 0;

    // ── DRAWING LOGIC (Object-Cover canvas scaling) ───────────
    const drawFrame = (frameIndex: number) => {
      const img = preloadedImagesRef.current[frameIndex - 1];
      if (!img) return;

      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;

      if (!canvas || !ctx || canvasWidth === 0 || canvasHeight === 0) return;
      if (imgWidth === 0 || imgHeight === 0) return;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = canvasWidth / imgRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // ── DYNAMIC RESIZING ──────────────────────────────────────
    const handleResize = () => {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      canvasWidth = rect.width;
      canvasHeight = rect.height;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

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

      // Standalone infinite animation (outside the scrubbed timeline)
      gsap.fromTo(
        ".cueva-cta-glow",
        { opacity: 0.3, scale: 1 },
        { opacity: 0.7, scale: 1.12, yoyo: true, repeat: -1, duration: 1.2, ease: "sine.inOut" }
      );
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
        @keyframes cueva-flicker {
          0%, 92%, 100% { opacity: 1; }
          93%            { opacity: 0.4; }
          95%            { opacity: 1; }
          97%            { opacity: 0.6; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* ── Scroll Container (400vh) ── */}
      <div
        ref={containerRef}
        className="relative w-full bg-black z-30"
        style={{ height: "400vh" }}
      >
        {/* ── Sticky Viewport ── */}
        <div ref={pinRef} className="sticky top-0 h-screen w-full overflow-hidden">

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-0"
            style={{ display: "block" }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />

          {/* Cinematic Vignette */}
          <div
            className="cueva-vignette absolute inset-0 pointer-events-none z-[2]"
            style={{
              background: "radial-gradient(ellipse at center, transparent 28%, rgba(0,0,0,0.88) 100%)",
              opacity: 0.4,
            }}
          />

          {/* ── Loading HUD ── */}
          {!isLoaded && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md">
              <div className="relative w-24 h-24 flex items-center justify-center mb-8">
                <div className="absolute inset-0 rounded-full border-4 border-marathon-green/10" />
                <div
                  className="absolute inset-0 rounded-full border-4 border-t-marathon-lime border-r-transparent border-b-transparent border-l-transparent"
                  style={{ animation: "spin 1s linear infinite" }}
                />
                <span className="text-sm font-heading font-black text-white">{loadingProgress}%</span>
              </div>
              <p className="text-xs uppercase tracking-[0.4em] text-marathon-lime/70 font-semibold font-heading">
                Abriendo las puertas…
              </p>
              <div className="mt-6 w-48 h-[2px] bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-marathon-lime transition-all duration-200 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────── */}
          {/* PHASE 1 — Title                                 */}
          {/* ──────────────────────────────────────────────── */}
          <div className="absolute top-[10%] inset-x-0 z-20 text-center px-4 pointer-events-none select-none">
            <p
              className="cueva-subtitle text-[11px] font-heading font-semibold text-marathon-lime/70 tracking-[0.45em] uppercase mb-4"
              style={{ opacity: 0 }}
            >
              Estadio Yankel Rosenthal · San Pedro Sula
            </p>
            <h2
              className="cueva-title font-heading font-black text-white uppercase leading-none"
              style={{
                fontSize: "clamp(2.4rem, 7.5vw, 7rem)",
                opacity: 0,
                textShadow: "0 0 80px rgba(46,156,63,0.35), 0 2px 40px rgba(0,0,0,0.9)",
                letterSpacing: "0.06em",
                animation: "cueva-flicker 8s 2s infinite",
              }}
            >
              BIENVENIDO A<br />
              <span
                style={{ WebkitTextStroke: "2px #92BF4E", color: "#92BF4E" }}
                className="font-elrotex"
              >
                LA CUEVA
              </span>
            </h2>
          </div>

          {/* Scroll Hint */}
          <div className="cueva-scroll-hint absolute bottom-8 inset-x-0 z-20 flex flex-col items-center gap-2 pointer-events-none select-none">
            <span className="text-[10px] tracking-[0.3em] text-white/35 uppercase font-heading">
              Scrollea para entrar
            </span>
            <ChevronDown size={20} className="text-marathon-lime/50 animate-bounce" />
          </div>

          {/* ──────────────────────────────────────────────── */}
          {/* PHASE 2 — Editorial Info Panels                 */}
          {/* ──────────────────────────────────────────────── */}
          <div className="reveal-badges absolute inset-0 z-20 pointer-events-none select-none">

            {/* TOP RULE — hairline with club label */}
            <div
              className="reveal-aficion absolute top-0 inset-x-0 flex items-center px-8 md:px-14 pt-[4.5rem]"
              style={{ opacity: 0 }}
            >
              <div className="flex-1 h-px bg-white/10" />
              <span className="mx-5 text-[8px] font-heading font-black tracking-[0.55em] text-white/22 uppercase whitespace-nowrap">
                Club Deportivo Marathón · Est. {CLUB.founded}
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* ── LEFT PANEL: Yankel Rosenthal ── */}
            <div
              className="reveal-structure absolute top-1/2 left-0 -translate-y-1/2 pointer-events-auto"
              style={{ opacity: 0, maxWidth: "clamp(190px, 22vw, 320px)" }}
            >
              <div className="flex">
                {/* Lime left-edge accent bar */}
                <div className="w-[3px] bg-marathon-lime self-stretch flex-shrink-0 mr-5 md:mr-6" />
                <div className="py-8 pr-5">
                  <p className="text-[8px] font-heading font-black tracking-[0.45em] text-marathon-lime/60 uppercase mb-3">
                    01 — Propiedad
                  </p>
                  <h4
                    className="font-heading font-black text-white uppercase"
                    style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.8rem)", lineHeight: 0.88 }}
                  >
                    YANKEL<br />
                    <span className="text-marathon-lime">ROSENTHAL</span>
                  </h4>
                  <div className="mt-4 h-px bg-white/15 w-[85%]" />
                  <p className="text-[11px] text-white/45 mt-3 font-body leading-relaxed max-w-[220px]">
                    El único estadio del país propiedad exclusiva de un club. Fortaleza inexpugnable desde 2010.
                  </p>
                </div>
              </div>
            </div>

            {/* ── RIGHT PANEL: Capacidad — editorial giant numeral ── */}
            <div
              className="reveal-tribunas absolute top-1/2 right-0 -translate-y-1/2 pointer-events-auto text-right"
              style={{ opacity: 0, maxWidth: "clamp(190px, 22vw, 320px)" }}
            >
              <div className="flex flex-row-reverse">
                {/* Lime right-edge accent bar */}
                <div className="w-[3px] bg-marathon-lime self-stretch flex-shrink-0 ml-5 md:ml-6" />
                <div className="py-8 pl-5">
                  <p className="text-[8px] font-heading font-black tracking-[0.45em] text-marathon-lime/60 uppercase mb-1">
                    02 — Capacidad
                  </p>
                  {/* Oversized numeral — the typographic hero */}
                  <div
                    className="font-heading font-black text-white"
                    style={{ fontSize: "clamp(3.5rem, 7.5vw, 6.5rem)", lineHeight: 0.82 }}
                  >
                    9K
                  </div>
                  <div className="mt-3 h-px bg-white/15 w-full" />
                  <p className="text-[11px] text-white/45 mt-3 font-body leading-relaxed max-w-[220px] ml-auto">
                    Nueve mil voces que rugen como una sola. La Cueva que tiembla.
                  </p>
                </div>
              </div>
            </div>

            {/* ── BOTTOM-LEFT: Superficie ── */}
            <div
              className="reveal-cancha absolute bottom-0 left-0 pointer-events-auto"
              style={{ opacity: 0, maxWidth: "clamp(170px, 21vw, 300px)" }}
            >
              <div className="border-t border-white/12 pt-4 pb-5 pl-6 pr-4">
                <p className="text-[8px] font-heading font-black tracking-[0.45em] text-marathon-lime/60 uppercase mb-2">
                  03 — Superficie
                </p>
                <h4
                  className="font-heading font-black text-white uppercase"
                  style={{ fontSize: "clamp(1.1rem, 1.9vw, 1.6rem)", lineHeight: 0.9 }}
                >
                  CÉSPED<br />NATURAL
                </h4>
                <p className="text-[10px] text-white/40 mt-2 font-body leading-relaxed">
                  Estándares deportivos internacionales de alto rendimiento.
                </p>
              </div>
            </div>

            {/* ── BOTTOM-RIGHT: Fundación ── */}
            <div
              className="reveal-luces absolute bottom-0 right-0 pointer-events-auto text-right"
              style={{ opacity: 0, maxWidth: "clamp(170px, 21vw, 300px)" }}
            >
              <div className="border-t border-white/12 pt-4 pb-5 pr-6 pl-4">
                <p className="text-[8px] font-heading font-black tracking-[0.45em] text-marathon-lime/60 uppercase mb-2">
                  04 — Fundación
                </p>
                {/* Year as outlined typographic hero */}
                <div
                  className="font-heading font-black leading-none"
                  style={{
                    fontSize: "clamp(1.9rem, 3.8vw, 3.2rem)",
                    lineHeight: 0.88,
                    color: "transparent",
                    WebkitTextStroke: "1.5px #92BF4E",
                  }}
                >
                  {CLUB.founded}
                </div>
                <p className="text-[10px] text-white/40 mt-2 font-body leading-relaxed">
                  Un siglo de historia verde en Honduras.
                </p>
              </div>
            </div>

          </div>

          {/* ──────────────────────────────────────────────── */}
          {/* PHASE 3 — Stats Scoreboard (bottom-anchored)    */}
          {/* ──────────────────────────────────────────────── */}
          <div
            className="cueva-counters absolute bottom-0 inset-x-0 z-20 pointer-events-auto select-none"
            style={{ opacity: 0 }}
          >
            {/* Hairline rule with label */}
            <div className="flex items-center px-6 md:px-10">
              <div className="flex-1 h-px bg-marathon-lime/30" />
              <span className="mx-5 text-[8px] font-heading font-black tracking-[0.55em] text-marathon-lime/55 uppercase whitespace-nowrap">
                Estadísticas del Club
              </span>
              <div className="flex-1 h-px bg-marathon-lime/30" />
            </div>

            {/* 4-cell scoreboard grid */}
            <div
              className="grid grid-cols-4 bg-black/75 backdrop-blur-xl"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              {[
                { num: `${YEARS_OF_PRIDE}`, suf: "+", label: "Años de\nOrgullo", accent: false },
                { num: `${CLUB.titles}`, suf: "×", label: "Títulos\nde Liga", accent: true },
                { num: "50K", suf: "+", label: "Seguidores\nen Redes", accent: false },
                { num: "9,000", suf: "", label: "Capacidad\nLa Cueva", accent: false },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="cueva-counter-item relative px-4 md:px-7 lg:px-10 py-5 md:py-7"
                  style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none" }}
                >
                  {/* Index number */}
                  <span className="absolute top-2.5 right-3 text-[7px] font-heading font-black text-white/15 tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Lime top accent bar on the titles column */}
                  {stat.accent && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-marathon-lime" />
                  )}

                  {/* Big number */}
                  <div className="flex items-end gap-0.5 leading-none">
                    <span
                      className="font-heading font-black text-white"
                      style={{ fontSize: "clamp(1.8rem, 3.8vw, 3.4rem)", lineHeight: 1 }}
                    >
                      {stat.num}
                    </span>
                    {stat.suf && (
                      <span
                        className="font-heading font-black text-marathon-lime pb-0.5"
                        style={{ fontSize: "clamp(1rem, 2vw, 1.8rem)", lineHeight: 1 }}
                      >
                        {stat.suf}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <p
                    className="text-white/35 font-heading font-semibold uppercase mt-1.5"
                    style={{
                      fontSize: "clamp(0.52rem, 0.85vw, 0.68rem)",
                      letterSpacing: "0.2em",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ──────────────────────────────────────────────── */}
          {/* PHASE 4 — CTA Block                             */}
          {/* ──────────────────────────────────────────────── */}
          <div
            className="cueva-cta-block absolute inset-0 z-30 flex flex-col items-center justify-end pb-[10%] pointer-events-none select-none"
            style={{ opacity: 0 }}
          >
            <div
              className="cueva-cta-glow absolute bottom-[7%] w-72 h-36 rounded-full bg-marathon-green/15 blur-[70px] pointer-events-none"
              style={{ opacity: 0.3 }}
            />

            <div className="text-center mb-8 px-4">
              <p className="text-white/40 text-xs font-heading tracking-[0.45em] uppercase mb-3">
                Más que un estadio
              </p>
              <h3
                className="font-heading font-black text-white uppercase"
                style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", lineHeight: 0.92 }}
              >
                TU CASA,{" "}
                <span
                  className="text-marathon-lime"
                  style={{ filter: "drop-shadow(0 0 18px rgba(146,191,78,0.55))" }}
                >
                  TU CUEVA
                </span>
              </h3>
              <p className="text-white/35 text-sm mt-4 max-w-sm mx-auto font-body leading-relaxed">
                Primer estadio propio de un club hondureño. Inaugurado en 2010. Fortaleza en San Pedro Sula.
              </p>
            </div>

            <div className="pointer-events-auto flex flex-col sm:flex-row gap-3 items-center">
              <Button variant="primary" size="lg" href="/estadio">
                Conoce el Yankel Rosenthal
                <ArrowRight size={18} />
              </Button>
              <Button variant="outline" size="lg" href="/historia">
                Nuestra Historia
                <Trophy size={16} />
              </Button>
            </div>
          </div>

          {/* Exit fade */}
          <div
            className="cueva-exit-fade absolute inset-0 bg-black pointer-events-none z-40"
            style={{ opacity: 0 }}
          />

        </div>
      </div>
    </>
  );
}
