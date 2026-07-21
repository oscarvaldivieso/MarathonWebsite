"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";
import { MapPin, Users, Trophy, ArrowRight, ChevronDown, Shield, Zap, Compass } from "lucide-react";
import Button from "@/components/ui/Button";

// ─── Frame Sequence Config ────────────────────────────────────────────────────
const TOTAL_FRAMES = 201;
const FRAME_PATH = (n: number) =>
  `/assets/stadium/animation/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimCounter({
  target,
  suffix = "",
  prefix = "",
  label,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (hasRun.current) return;
        hasRun.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: () => {
            if (ref.current)
              ref.current.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
          },
        });
      },
    });
    return () => st.kill();
  }, [target, suffix, prefix]);

  return (
    <div className="text-center">
      <span
        ref={ref}
        className="block text-4xl md:text-5xl font-heading font-black text-marathon-lime leading-none"
      >
        0
      </span>
      <span className="block text-xs uppercase tracking-[0.25em] text-white/50 mt-2 font-semibold">
        {label}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TemploSection() {
  console.log("TemploSection component rendering!");
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Stable references for frame sequence rendering
  const preloadedImagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(1);

  // ── 1. ASSET PRELOADING SEQUENCE (Runs strictly ONCE on mount) ────────────────
  useEffect(() => {
    console.log("TemploSection preloader mounted!");
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
          console.log("TemploSection preload complete! images count:", images.length);
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
          console.log("TemploSection preload complete with errors! images count:", images.length);
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

  // ── 2. GSAP SCROLL ANIMATION (Triggered once loading completes) ────────────────
  useEffect(() => {
    console.log("TemploSection scroll effect triggered! isLoaded:", isLoaded);
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const pin = pinRef.current;
    console.log("TemploSection scroll effect refs status:", { canvas: !!canvas, container: !!container, pin: !!pin });
    if (!canvas || !container || !pin) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let canvasWidth = 0;
    let canvasHeight = 0;

    // ── DRAWING LOGIC (Object-Cover canvas scaling) ───────────
    const drawFrame = (frameIndex: number) => {
      const img = preloadedImagesRef.current[frameIndex - 1];
      if (!img) {
        console.warn("drawFrame: Image at index is undefined:", frameIndex);
        return;
      }

      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;
      console.log("drawFrame drawing:", img.src, "imgWidth:", imgWidth, "imgHeight:", imgHeight, "frameIndex:", frameIndex);

      if (!canvas || !ctx || canvasWidth === 0 || canvasHeight === 0) {
        console.warn("drawFrame skipped. Reason:", { canvas: !!canvas, ctx: !!ctx, canvasWidth, canvasHeight });
        return;
      }

      if (imgWidth === 0 || imgHeight === 0) {
        console.warn("drawFrame skipped due to 0-size image dimensions:", img.src);
        return;
      }

      // Clear previous frames cleanly
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

    // ── DYNAMIC RESIZING (Ensures crispness on Retina) ────────
    const handleResize = () => {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      console.log("handleResize rect:", rect.width, "x", rect.height, "dpr:", dpr);

      // Guard against collapsed 0-size rects during rendering/transitions
      if (rect.width === 0 || rect.height === 0) {
        console.warn("handleResize skipped due to collapsed 0-size canvas rect");
        return;
      }

      canvasWidth = rect.width;
      canvasHeight = rect.height;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      drawFrame(currentFrameRef.current);
    };

    // Initialize layout immediately
    handleResize();

    window.addEventListener("resize", handleResize);

    // ── GSAP CINEMATIC SCROLL STORYTELLING ───────────────────
    const gsapCtx = gsap.context(() => {
      const frameObj = { frame: 1 };

      // Pin viewport and coordinate timeline scrubbing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            console.log("Templo ScrollTrigger update progress:", self.progress, "scrollY:", window.scrollY);
          },
          onRefresh: (self) => {
            console.log("Templo ScrollTrigger refreshed! start:", self.start, "end:", self.end, "scrollDistance:", self.end - self.start);
            drawFrame(currentFrameRef.current);
          },
        },
      });

      // 1. Frame Scrub animation (1 to 201)
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

      // 2. FASE 1 (0–15%): Entrada - Title reveal
      tl.fromTo(
        ".cueva-title",
        { opacity: 0, y: -40, clipPath: "inset(0 0 100% 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.15, ease: "power3.out" },
        0.01
      );
      tl.fromTo(
        ".cueva-subtitle",
        { opacity: 0, letterSpacing: "0.6em" },
        { opacity: 1, letterSpacing: "0.35em", duration: 0.12, ease: "power2.out" },
        0.05
      );
      tl.to(".cueva-scroll-hint", { opacity: 0, duration: 0.05 }, 0.10);

      // 3. FASE 2 (15–50%): Revelación Progresiva - Badges slide-in
      tl.fromTo(
        ".reveal-structure",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.1, ease: "back.out(1.5)" },
        0.15
      );
      tl.fromTo(
        ".reveal-tribunas",
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.1, ease: "back.out(1.5)" },
        0.22
      );
      tl.fromTo(
        ".reveal-cancha",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.1, ease: "back.out(1.5)" },
        0.30
      );
      tl.fromTo(
        ".reveal-luces",
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.1, ease: "back.out(2)" },
        0.38
      );
      tl.fromTo(
        ".reveal-aficion",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.1, ease: "back.out(1.5)" },
        0.46
      );

      // 4. FASE 3 (50–75%): Epicentro - Badges clear out, counters appear
      tl.to(
        ".reveal-badges",
        { opacity: 0, y: -20, duration: 0.08 },
        0.50
      );
      tl.fromTo(
        ".cueva-epicenter",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.12, ease: "back.out(1.5)" },
        0.53
      );
      tl.fromTo(
        ".cueva-counters",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
        0.56
      );
      tl.fromTo(
        ".cueva-vignette",
        { opacity: 0.4 },
        { opacity: 0.75, duration: 0.2 },
        0.50
      );
      // 5. FASE 4 (75–100%): Culminación - Exit transition & CTA
      tl.to(".cueva-counters, .cueva-epicenter", { opacity: 0, y: -20, duration: 0.08 }, 0.75);
      tl.fromTo(
        ".cueva-cta-block",
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.15, ease: "back.out(1.8)" },
        0.78
      );
      tl.to(".cueva-title", { letterSpacing: "0.15em", duration: 0.15 }, 0.76);
      tl.fromTo(
        ".cueva-exit-fade",
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.95
      );

      // Standalone infinite animations (run outside of the scroll-scrubbed timeline)
      gsap.fromTo(
        ".cueva-counter-item",
        { y: 0 },
        { y: -8, yoyo: true, repeat: -1, duration: 0.6, ease: "sine.inOut", stagger: 0.1 }
      );

      gsap.fromTo(
        ".cueva-cta-glow",
        { opacity: 0.3, scale: 1 },
        { opacity: 0.8, scale: 1.15, yoyo: true, repeat: -1, duration: 0.8, ease: "sine.inOut" }
      );

    }, containerRef);

    return () => {
      gsapCtx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded]);

  return (
    <>
      <style>{`
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px 4px rgba(46, 156, 63, 0.4); }
          50%       { box-shadow: 0 0 40px 10px rgba(146, 191, 78, 0.7); }
        }
        @keyframes cueva-flicker {
          0%, 92%, 100% { opacity: 1; }
          93% { opacity: 0.4; }
          95% { opacity: 1; }
          97% { opacity: 0.6; }
        }
      `}</style>

      {/* ── Scroll Container (400vh tracks the animation timeline) ── */}
      <div
        ref={containerRef}
        className="relative w-full bg-black z-30"
        style={{ height: "400vh" }}
      >
        {/* ── Sticky Viewport Pinned via GSAP (Double-pinned style) ── */}
        <div ref={pinRef} className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center">

          {/* ── Canvas: High Performance Frame Sequence Background ── */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ display: "block" }}
          />

          {/* ── Dark overlay for readability ── */}
          <div className="absolute inset-0 bg-black/45 z-1 pointer-events-none" />

          {/* ── Cinematic Vignette ── */}
          <div
            className="cueva-vignette absolute inset-0 pointer-events-none z-2"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.9) 100%)",
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
              <p className="text-xs uppercase tracking-[0.4em] text-marathon-lime/70 font-semibold animate-pulse font-heading">
                Abriendo las puertas…
              </p>
              {/* Loading bar */}
              <div className="mt-6 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-marathon-lime transition-all duration-200 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────── */}
          {/* ── PHASE 1 Content: Title ── */}
          <div className="absolute top-[12%] inset-x-0 z-20 text-center px-4 pointer-events-none select-none">
            <p
              className="cueva-subtitle text-[12px] font-semibold text-marathon-lime/80 mb-4"
              style={{ opacity: 0 }}
            >
              Estadio Yankel Rosenthal · San Pedro Sula
            </p>
            <h2
              className="cueva-title font-heading font-black text-white uppercase leading-none"
              style={{
                fontSize: "clamp(2.2rem, 7vw, 6.5rem)",
                opacity: 0,
                textShadow: "0 0 60px rgba(46,156,63,0.4), 0 2px 40px rgba(0,0,0,0.8)",
                letterSpacing: "0.08em",
                animation: "cueva-flicker 8s 2s infinite",
              }}
            >
              BIENVENIDO A<br />
              <span
                style={{
                  WebkitTextStroke: "2px #92BF4E",
                  color: "#92BF4E",
                }}
                className="font-elrotex"
              >
                LA CUEVA
              </span>
            </h2>
          </div>

          {/* Scroll Hint */}
          <div className="cueva-scroll-hint absolute bottom-8 inset-x-0 z-20 flex flex-col items-center gap-2 pointer-events-none select-none">
            <span className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-heading">
              Scrollea para entrar
            </span>
            <ChevronDown size={20} className="text-marathon-lime/60 animate-bounce" />
          </div>

          {/* ─────────────────────────────────────────────────────────────── */}
          {/* ── PHASE 2 Reveal Badges ── */}
          <div className="reveal-badges absolute inset-0 z-20 pointer-events-none select-none">
            {/* Card 1: La Fortaleza (Left Top) */}
            <div
              className="reveal-structure absolute top-[18%] left-[4%] md:left-[8%] max-w-[280px] p-5 rounded-2xl border border-marathon-green/30 bg-black/80 backdrop-blur-md pointer-events-auto hover:border-marathon-lime hover:shadow-[0_0_25px_rgba(146,191,78,0.2)] transition-all duration-300 group"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-marathon-green/20 text-marathon-lime group-hover:bg-marathon-lime group-hover:text-black transition-colors duration-300">
                  <Shield size={14} />
                </div>
                <span className="text-[10px] font-heading font-black text-marathon-lime tracking-[0.2em] uppercase">
                  La Fortaleza
                </span>
              </div>
              <h4 className="text-white font-heading font-black text-base uppercase tracking-wide">
                YANKEL ROSENTHAL
              </h4>
              <p className="text-white/60 text-xs mt-1.5 font-body leading-relaxed">
                El único estadio del país propiedad exclusiva de un club. Un fortín verde e inexpugnable.
              </p>
            </div>

            {/* Card 2: Iluminación Épica (Left Bottom) */}
            <div
              className="reveal-luces absolute bottom-[18%] left-[4%] md:left-[8%] max-w-[280px] p-5 rounded-2xl border border-yellow-500/20 bg-black/80 backdrop-blur-md pointer-events-auto hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(234,179,8,0.2)] transition-all duration-300 group"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-300">
                  <Zap size={14} />
                </div>
                <span className="text-[10px] font-heading font-black text-yellow-400 tracking-[0.2em] uppercase">
                  Iluminación
                </span>
              </div>
              <h4 className="text-white font-heading font-black text-base uppercase tracking-wide">
                NOCHES MÁGICAS
              </h4>
              <p className="text-white/60 text-xs mt-1.5 font-body leading-relaxed">
                Sistema de torres de iluminación LED de última generación para disputar batallas estelares bajo la luna.
              </p>
            </div>

            {/* Card 3: Cancha Sagrada (Right Top) */}
            <div
              className="reveal-cancha absolute top-[18%] right-[4%] md:right-[8%] max-w-[280px] p-5 rounded-2xl border border-marathon-green/30 bg-black/80 backdrop-blur-md pointer-events-auto hover:border-marathon-lime hover:shadow-[0_0_25px_rgba(146,191,78,0.2)] transition-all duration-300 group"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-marathon-green/20 text-marathon-lime group-hover:bg-marathon-lime group-hover:text-black transition-colors duration-300">
                  <Compass size={14} />
                </div>
                <span className="text-[10px] font-heading font-black text-marathon-lime tracking-[0.2em] uppercase">
                  Grama Natural
                </span>
              </div>
              <h4 className="text-white font-heading font-black text-base uppercase tracking-wide">
                ALFOMBRA VERDE
              </h4>
              <p className="text-white/60 text-xs mt-1.5 font-body leading-relaxed">
                Césped natural de alta resistencia, mimado bajo estándares deportivos de alto rendimiento internacional.
              </p>
            </div>

            {/* Card 4: La Hinchada (Right Bottom) */}
            <div
              className="reveal-aficion absolute bottom-[18%] right-[4%] md:right-[8%] max-w-[280px] p-5 rounded-2xl border border-marathon-green/30 bg-black/80 backdrop-blur-md pointer-events-auto hover:border-marathon-lime hover:shadow-[0_0_25px_rgba(146,191,78,0.2)] transition-all duration-300 group"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-marathon-green/20 text-marathon-lime group-hover:bg-marathon-lime group-hover:text-black transition-colors duration-300">
                  <Users size={14} />
                </div>
                <span className="text-[10px] font-heading font-black text-marathon-lime tracking-[0.2em] uppercase">
                  El Jugador 12
                </span>
              </div>
              <h4 className="text-white font-heading font-black text-base uppercase tracking-wide">
                FURIA VERDE
              </h4>
              <p className="text-white/60 text-xs mt-1.5 font-body leading-relaxed">
                Nuestra afición ruge en cada tribuna. Su aliento incondicional transforma el estadio en un verdadero hervidero.
              </p>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────── */}
          {/* ── PHASE 3 Epicenter + Counters ── */}
          <div
            className="cueva-counters absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[92%] max-w-[850px] p-6 md:p-10 rounded-2xl border border-marathon-lime/20 bg-black/85 backdrop-blur-xl pointer-events-auto select-none shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_30px_rgba(146,191,78,0.08)] flex flex-col justify-center"
            style={{ opacity: 0 }}
          >
            <div className="text-center mb-6">
              <span className="text-[10px] uppercase tracking-[0.35em] text-marathon-lime font-black px-3 py-1 rounded-full bg-marathon-lime/10 border border-marathon-lime/20">
                Estadísticas del Club
              </span>
              <h3 className="text-xl md:text-2xl font-heading font-black text-white uppercase mt-3 tracking-wider">
                NUESTRO PODER EN NÚMEROS
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
              <div className="cueva-counter-item px-4 text-center py-4 md:py-0">
                <AnimCounter target={99} suffix="+" label="Años de Orgullo" />
              </div>
              <div className="cueva-counter-item px-4 text-center py-4 md:py-0">
                <AnimCounter target={9} label="Títulos de Liga" />
              </div>
              <div className="cueva-counter-item px-4 text-center py-4 md:py-0">
                <AnimCounter target={50} suffix="K+" label="Seguidores" />
              </div>
              <div className="cueva-counter-item px-4 text-center py-4 md:py-0">
                <AnimCounter target={9000} label="Capacidad de Cueva" />
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────── */}
          {/* ── PHASE 4 CTA Block ── */}
          <div
            className="cueva-cta-block absolute inset-0 z-30 flex flex-col items-center justify-end pb-[12%] pointer-events-none select-none"
            style={{ opacity: 0 }}
          >
            {/* CTA Glow Aura */}
            <div
              className="cueva-cta-glow absolute bottom-[8%] w-64 h-32 rounded-full bg-marathon-green/20 blur-[60px] pointer-events-none"
              style={{ opacity: 0.3 }}
            />

            <div className="text-center mb-8 px-4">
              <p className="text-white/50 text-sm font-heading tracking-[0.3em] uppercase mb-2">
                Más que un estadio
              </p>
              <h3 className="text-3xl md:text-5xl font-heading font-black text-white uppercase leading-tight">
                TU CASA,{" "}
                <span className="text-marathon-lime" style={{ filter: "drop-shadow(0 0 12px #92BF4E)" }}>
                  TU CUEVA
                </span>
              </h3>
              <p className="text-white/40 text-sm mt-3 max-w-md mx-auto font-body leading-relaxed">
                Primer estadio propio de un club hondureño. Inaugurado en 2010.
                Fortaleza inexpugnable en San Pedro Sula.
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

          {/* ── Exit fade overlay (smooth transition to next section) ── */}
          <div
            className="cueva-exit-fade absolute inset-0 bg-black pointer-events-none z-40"
            style={{ opacity: 0 }}
          />
        </div>
      </div>
    </>
  );
}
