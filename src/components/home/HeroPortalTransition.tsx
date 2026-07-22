"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";

// ── ULTRA-FAST HIGH PERFORMANCE GLSL NOISE DISSOLVE SHADER ───────
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec3 uColorDark;
  uniform vec3 uColorGreen;
  uniform vec3 uColorNeon;
  uniform float uSpread;
  varying vec2 vUv;

  // Fast GPU hash without heavy trigonometric ops
  float Hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(Hash(i + vec2(0.0, 0.0)), Hash(i + vec2(1.0, 0.0)), f.x),
      mix(Hash(i + vec2(0.0, 1.0)), Hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    v += noise(p * 1.5) * 0.65;
    v += noise(p * 3.0) * 0.35;
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 centeredUv = (uv - 0.5) * vec2(aspect, 1.0);

    float dissolveEdge = uv.y - uProgress * 1.35;
    float noiseValue = fbm(centeredUv * 8.0);
    float d = dissolveEdge + noiseValue * uSpread;

    float pixelSize = 1.5 / uResolution.y;
    float alpha = 1.0 - smoothstep(-pixelSize, pixelSize, d);

    // Electric emerald glowing energy rim along the dissolve edge
    float rim = smoothstep(-0.06, 0.0, d) * (1.0 - smoothstep(0.0, 0.08, d));
    
    // Clean color blending: Dark Base -> Emerald Green -> Electric Monster Neon
    vec3 baseColor = mix(uColorDark, uColorGreen, rim * 0.85);
    vec3 finalColor = mix(baseColor, uColorNeon, rim * 0.95);

    gl_FragColor = vec4(finalColor, alpha * 0.98);
  }
`;

const NARRATIVE_TEXT =
  "EN LAS SOMBRAS DE SAN PEDRO SULA, EL MONSTRUO VERDE DESPIERTA SU FURIA Y ABRE LAS PUERTAS DE LA LEYENDA";

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "").slice(0, 6);
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(clean);
  return result
    ? { r: parseInt(result[1], 16) / 255, g: parseInt(result[2], 16) / 255, b: parseInt(result[3], 16) / 255 }
    : { r: 0.18, g: 0.61, b: 0.25 };
}
export default function HeroPortalTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const words = NARRATIVE_TEXT.split(" ");

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // ── THREE.JS SCENE & WEBGL RENDERER SETUP ─────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Guard: WebGL may be unavailable (older devices, disabled GPU). If the
    // renderer can't be created, keep the section as a solid dark backdrop with
    // the narrative text still readable, instead of crashing the whole page.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      canvas.style.display = "none";
      // Reveal the narrative text statically so the section isn't empty.
      wordsRef.current.forEach((el) => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
      return;
    }

    const rgbDark = hexToRgb("#0d551fff");   // casi negro, con tinte verde — cuerpo sólido
    const rgbGreen = hexToRgb("#178C4E");  // verde esmeralda medio — transición del borde
    const rgbNeon = hexToRgb("#B8FF5C");   // lima eléctrico brillante — filo encendido

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uProgress: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(container.offsetWidth, container.offsetHeight),
        },
        uColorDark: { value: new THREE.Vector3(rgbDark.r, rgbDark.g, rgbDark.b) },
        uColorGreen: { value: new THREE.Vector3(rgbGreen.r, rgbGreen.g, rgbGreen.b) },
        uColorNeon: { value: new THREE.Vector3(rgbNeon.r, rgbNeon.g, rgbNeon.b) },
        uSpread: { value: 0.45 },
      },
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      if (!container || !renderer) return;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      material.uniforms.uResolution.value.set(width, height);
    };

    resize();
    window.addEventListener("resize", resize);

    let animationFrameId: number;
    const animate = () => {
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Reduced motion: render a settled state and reveal text without scrubbing.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      material.uniforms.uProgress.value = 0.55;
      renderer.render(scene, camera);
      wordsRef.current.forEach((el) => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", resize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    }

    // ── GSAP SCROLLTRIGGER FOR SMOOTH CINEMATIC SCROLL STORYTELLING ────
    // Aligned with Ejemplo animacion.txt scroll mapping:
    // Pinned across 180vh scroll track so scrolling is relaxed, smooth, and premium
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth inertial scrub matching Lenis physics in Ejemplo animacion.txt
        onUpdate: (self) => {
          const progress = self.progress;

          // ── FASE 1 (0 → 0.85): mientras el texto aparece y se lee,
          //    el dissolve se mantiene sutil (solo un brillo ambiental abajo) ──
          // ── FASE 2 (0.85 → 1.0): el texto sale y AHÍ es cuando el
          //    monstruo/verde toma toda la pantalla, justo al final del scroll ──
          let dissolveProgress;
          const syncPoint = 0.85; // debe coincidir con textExitStart

          if (progress < syncPoint) {
            // Sutil, casi imperceptible — solo ambientación
            dissolveProgress = (progress / syncPoint) * 0.55;
          } else {
            const t = (progress - syncPoint) / (1 - syncPoint);
            // easing para que la cobertura final se sienta con fuerza
            const eased = t * t;
            dissolveProgress = 0.55 + eased * (1.8 - 0.55);
          }

          material.uniforms.uProgress.value = dissolveProgress;

          // ── resto del código de palabras igual ──
          const textRevealStart = 0.12;
          const textRevealEnd = 0.65;
          const textExitStart = 0.85;

          const wordElements = wordsRef.current;
          const totalWords = wordElements.length;

          for (let index = 0; index < totalWords; index++) {
            const wordEl = wordElements[index];
            if (!wordEl) continue;

            const wordStart = textRevealStart + (index / totalWords) * (textRevealEnd - textRevealStart);
            const wordEnd = textRevealStart + ((index + 1) / totalWords) * (textRevealEnd - textRevealStart);

            let opacity = 0;
            let yOffset = 18;
            let scale = 0.94;

            if (progress >= textExitStart) {
              // Smooth exit fade as section transitions into Portal
              const exitProgress = (progress - textExitStart) / (1 - textExitStart);
              opacity = Math.max(0, 1 - exitProgress * 2.0);
              yOffset = -30 * exitProgress;
              scale = 1 - exitProgress * 0.08;
            } else if (progress >= wordEnd) {
              // Fully revealed & held still for comfortable reading
              opacity = 1;
              yOffset = 0;
              scale = 1;
            } else if (progress >= wordStart) {
              // Word entering
              const wordRatio = (progress - wordStart) / (wordEnd - wordStart);
              opacity = wordRatio;
              yOffset = 18 * (1 - wordRatio);
              scale = 0.94 + 0.06 * wordRatio;
            }

            // Direct inline style manipulation for buttery 60/120 FPS
            wordEl.style.opacity = `${opacity}`;
            wordEl.style.transform = `translate3d(0, ${yOffset}px, 0) scale(${scale})`;
          }
        },
      });
    }, containerRef);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      ctx.revert();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-marathon-darkest z-20 select-none"
      style={{ height: "130vh" }}
    >
      {/* WebGL Canvas for Shader Noise Dissolve */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Sticky Content Container for Word-by-Word Scroll Narrative */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-6 text-center z-20 pointer-events-none">
        <h2 className="max-w-5xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase font-elrotex tracking-wide leading-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          {words.map((word, index) => (
            <span
              key={index}
              ref={(el) => {
                wordsRef.current[index] = el;
              }}
              className="inline-block mr-[0.3em] opacity-0 will-change-transform"
            >
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
