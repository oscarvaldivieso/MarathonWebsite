"use client";

import React, { useEffect, useRef, useState } from "react";
import { CLUB, SOCIAL_LINKS } from "@/lib/constants";
import { Heart, Volume2, VolumeX, Sparkles } from "lucide-react";
import { gsap, ScrollTrigger } from "@/hooks/useGsap";

// Custom SVG social icons (larger size default)
function InstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XTwitterIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function TikTokIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.82V7.63a6.34 6.34 0 0 0-5.11 6.2 6.33 6.33 0 0 0 10.82 4.47 6.3 6.3 0 0 0 1.94-4.52V8.9a8.18 8.18 0 0 0 4.76 1.51v-3.72a4.84 4.84 0 0 1-2.3-.7z" />
    </svg>
  );
}

const socialIcons: Record<string, React.ReactNode> = {
  instagram: <InstagramIcon size={22} />,
  facebook: <FacebookIcon size={22} />,
  twitter: <XTwitterIcon size={20} />,
  youtube: <YoutubeIcon size={22} />,
  tiktok: <TikTokIcon size={22} />,
};

const ALL_SOCIALS = [
  ...SOCIAL_LINKS,
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@cdmarathon",
    icon: "tiktok",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const logoBoxRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Ultra-smooth 3D Mouse Tilt for Giant Centenario Logo
  const handleLogoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!logoBoxRef.current) return;
    const rect = logoBoxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(".footer-logo-img", {
      rotateY: x * 0.12,
      rotateX: -y * 0.12,
      duration: 0.4,
      ease: "power1.out",
    });
  };

  const handleLogoMouseLeave = () => {
    gsap.to(".footer-logo-img", {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Ultra-smooth scrub entrance for the floating footer card
      gsap.fromTo(
        footerRef.current,
        { opacity: 0.6, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Continuous float animation on logo
      gsap.to(".footer-logo-img", {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 3. Ultra-fluid staggered reveal for "SOY DEL VERDE, SOY FELIZ" words
      gsap.fromTo(
        ".footer-chant-word",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-row2-container",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // 4. Staggered reveal for Social Media Buttons in the bottom corner
      gsap.fromTo(
        ".footer-social-btn",
        { opacity: 0, scale: 0.6, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ".footer-bottom-bar",
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Contenedor blanco exterior (crea el marco blanquito alrededor de la card flotante)
    <div className="w-full bg-white p-3.5 sm:p-6 lg:p-8 pt-8 sm:pt-12 pb-6 sm:pb-8 overflow-hidden select-none">

      {/* ── CARD FLOTANTE PRINCIPAL DEL FOOTER ───────────────────────── */}
      <footer
        ref={footerRef}
        className="relative bg-marathon-darkest rounded-[2.2rem] sm:rounded-[3.2rem] lg:rounded-[4.2rem] overflow-hidden border border-marathon-lime/30 shadow-[0_20px_70px_rgba(1,41,25,0.3)] z-30 text-white flex flex-col transform-gpu"
      >

        {/* Top Animated Sheen Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-marathon-lime to-transparent opacity-80 z-40" />

        {/* ═════════════════════════════════════════════════════════════
            FILA 1: VIDEO DE FONDO BORDE A BORDE (MAS ALTO Y VISIBLE)
            ═════════════════════════════════════════════════════════════ */}
        <div className="relative w-full min-h-[280px] sm:min-h-[380px] lg:min-h-[460px] flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden group">

          {/* Edge-to-Edge Video Element */}
          <div className="footer-row1-video-bg absolute inset-0 w-full h-full z-0 overflow-hidden">
            <video
              ref={videoRef}
              src="/assets/backgrounds/goal.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 filter brightness-95 contrast-105"
            />
            {/* Dark Cinematic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-marathon-darkest via-marathon-darkest/40 to-marathon-darkest/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-marathon-darkest/80 via-transparent to-marathon-darkest/80 pointer-events-none" />
          </div>

          {/* Top Bar inside Row 1: Sound Toggle Button */}
          <div className="relative z-10 flex items-center justify-end">
            <button
              onClick={toggleMute}
              className="p-3 sm:p-3.5 rounded-full glass border border-white/25 text-white/90 hover:text-marathon-lime hover:border-marathon-lime backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-110"
              aria-label={isMuted ? "Activar sonido" : "Silenciar video"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="text-marathon-lime" />}
            </button>
          </div>


        </div>

        {/* ═════════════════════════════════════════════════════════════
            FILA 2: ESCUDO DE DERECHA A IZQUIERDA CON CÁNTICO "SOY DEL VERDE, SOY FELIZ" EQUILIBRADO Y ELEGANTE
            ═════════════════════════════════════════════════════════════ */}
        <div className="footer-row2-container relative p-6 sm:p-10 lg:p-14 bg-gradient-to-b from-transparent via-marathon-darkest to-marathon-darkest w-full">

          {/* Background Radial Neon Atmosphere */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1200px] h-[400px] bg-marathon-lime/10 rounded-full blur-[170px] pointer-events-none z-0" />

          <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">

            {/* IZQUIERDA: Escudo Centenario a Color Destacado */}
            <div
              ref={logoBoxRef}
              onMouseMove={handleLogoMouseMove}
              onMouseLeave={handleLogoMouseLeave}
              className="footer-logo-box shrink-0 flex flex-col items-center md:items-start cursor-pointer"
              style={{ perspective: 1000 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-marathon-lime/25 rounded-full blur-[50px] pointer-events-none animate-pulse-glow" />
                <img
                  src="/assets/brand/escudocentenario_color.svg"
                  alt="Escudo Marathón Centenario"
                  className="footer-logo-img relative z-10 w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain filter drop-shadow-[0_12px_40px_rgba(146,191,78,0.45)] transform-gpu"
                />
              </div>
            </div>

            {/* DERECHA: Cántico "SOY DEL VERDE, SOY FELIZ" Monumental pero Equilibrado */}
            <div className="footer-chant-container flex-1 flex flex-col items-center md:items-start text-center md:text-left w-full">
              <div className="absolute inset-0 bg-marathon-lime/15 rounded-full blur-[90px] pointer-events-none w-[90%] h-[140px]" />

              <h2
                className="relative z-10 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] tracking-wider text-marathon-lime uppercase leading-[0.9] drop-shadow-[0_6px_30px_rgba(146,191,78,0.4)] flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1"
                style={{ fontFamily: "var(--font-elrotex), sans-serif" }}
              >
                <span className="footer-chant-word inline-block transform-gpu">SOY</span>
                <span className="footer-chant-word inline-block transform-gpu">DEL</span>
                <span className="footer-chant-word inline-block text-white transform-gpu">VERDE,</span>
                <span className="footer-chant-word inline-block transform-gpu">SOY</span>
                <span className="footer-chant-word inline-block text-white transform-gpu">FELIZ</span>
              </h2>

              <p className="text-xs sm:text-sm font-outfit text-white/40 tracking-[0.3em] uppercase mt-4">
                San Pedro Sula • Honduras · Desde 1925
              </p>
            </div>

          </div>

          {/* ═════════════════════════════════════════════════════════════
              ESQUINA INFERIOR DEL FOOTER: COPYRIGHT & ICONOS DE REDES SOCIALES
              ═════════════════════════════════════════════════════════════ */}
          <div className="footer-bottom-bar relative z-10 max-w-7xl mx-auto border-t border-white/10 pt-8 mt-10 flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Copyright Notice */}
            <div className="text-xs font-body text-white/40 text-center md:text-left">
              <p>
                © {currentYear} {CLUB.name}. Fundado el 25 de Noviembre de {CLUB.founded}. Todos los derechos reservados.
              </p>
              <p className="flex items-center justify-center md:justify-start gap-1.5 font-heading font-semibold text-white/60 mt-1">
                Hecho con <Heart size={14} className="text-marathon-lime fill-marathon-lime animate-pulse" /> por la Hinchada Verdolaga
              </p>
            </div>

            {/* ESQUINA INFERIOR DERECHA: BOTONES DE REDES SOCIALES EN LIMA Y VERDE OSCURO */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {ALL_SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn group/btn flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-marathon-lime text-marathon-darkest shadow-[0_0_18px_rgba(146,191,78,0.45)] hover:bg-white hover:text-marathon-darkest hover:scale-110 hover:shadow-[0_0_28px_rgba(255,255,255,0.85)] transition-all duration-300 cursor-pointer transform-gpu"
                  aria-label={social.name}
                  title={social.name}
                >
                  <span className="transition-transform duration-300 group-hover/btn:scale-110">
                    {socialIcons[social.icon]}
                  </span>
                </a>
              ))}
            </div>

          </div>

        </div>

      </footer>
    </div>
  );
}
