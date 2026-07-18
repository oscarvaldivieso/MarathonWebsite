"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightLogoProps {
  className?: string;
  size?: number;
}

/**
 * SpotlightLogo — Efecto estilo X.com sobre el escudo de Marathón.
 *
 * Dado que el SVG del escudo es una imagen PNG embebida (no paths vectoriales),
 * no podemos usar `stroke` directamente. En su lugar:
 *
 * 1. Extraemos los bordes del logo con feMorphology (dilate) + feComposite (out)
 * 2. Usamos esa silueta de bordes como máscara de luminancia
 * 3. Proyectamos un radialGradient de radio grande (r=160 sobre viewBox 200)
 *    para evitar el efecto "rueda" y lograr un degradado natural y amplio
 * 4. Aplicamos un filtro de brillo gaussiano (stdDeviation=3) para que
 *    el borde parezca emitir luz real
 * 5. Añadimos un borde sutil de contraste (#222) como en el logo de X
 */
export default function SpotlightLogo({ className, size = 320 }: SpotlightLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for tracking cursor coordinates relative to SVG viewBox (0-200)
  const mouseX = useMotionValue(100);
  const mouseY = useMotionValue(100);
  const glowOpacity = useMotionValue(0);

  // Smooth springs — stiffness bajo para movimiento fluido como reflejo metálico
  const xSpring = useSpring(mouseX, { stiffness: 80, damping: 30 });
  const ySpring = useSpring(mouseY, { stiffness: 80, damping: 30 });
  const opacitySpring = useSpring(glowOpacity, { stiffness: 100, damping: 25 });

  // Efecto de "viaje" del gradiente: transformar coordenadas en strings para cx/cy
  const cxAttr = useTransform(xSpring, (v) => `${v}`);
  const cyAttr = useTransform(ySpring, (v) => `${v}`);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Relative coordinates of mouse pointer inside container
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Map the relative pixel coords to SVG viewBox coordinates (0 to 200)
    const svgX = (x / rect.width) * 200;
    const svgY = (y / rect.height) * 200;

    mouseX.set(svgX);
    mouseY.set(svgY);
  };

  const handleMouseEnter = () => {
    glowOpacity.set(1);
  };

  const handleMouseLeave = () => {
    glowOpacity.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative flex items-center justify-center overflow-hidden select-none group cursor-pointer",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* ═══════════════════════════════════════════════════════════
              GRADIENTE RADIAL DINÁMICO
              r=160 sobre viewBox 200 = equivalente a r="80%"
              Esto evita el efecto "rueda" y da un degradado amplio y natural
              ═══════════════════════════════════════════════════════════ */}
          <motion.radialGradient
            id="logo-spotlight-gradient"
            cx={cxAttr}
            cy={cyAttr}
            r="160"
            gradientUnits="userSpaceOnUse"
          >
            {/* Centro brillante blanco puro */}
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            {/* Transición suave a gris claro */}
            <stop offset="20%" stopColor="#CCCCCC" stopOpacity="0.85" />
            {/* Desvanecimiento gradual */}
            <stop offset="50%" stopColor="#888888" stopOpacity="0.4" />
            {/* Borde exterior invisible */}
            <stop offset="100%" stopColor="#333333" stopOpacity="0" />
          </motion.radialGradient>

          {/* ═══════════════════════════════════════════════════════════
              FILTRO DE BRILLO GAUSSIANO (Glow)
              stdDeviation=3 para que el borde parezca emitir luz real
              ═══════════════════════════════════════════════════════════ */}
          <filter id="edge-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* ═══════════════════════════════════════════════════════════
              FILTRO DE DETECCIÓN DE BORDES (Edge Extraction)
              Dilate + Composite(out) para extraer contorno de 2px
              ═══════════════════════════════════════════════════════════ */}
          <filter id="edge-stroke" x="-20%" y="-20%" width="140%" height="140%">
            {/* Dilatar el canal alfa por 2px */}
            <feMorphology operator="dilate" radius="2" in="SourceAlpha" result="expanded" />
            {/* Restar la silueta original de la expandida = solo bordes */}
            <feComposite in="expanded" in2="SourceAlpha" operator="out" result="edge" />
            {/* Convertir bordes a blanco para máscara de luminancia */}
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 1 0"
              in="edge"
            />
          </filter>

          {/* ═══════════════════════════════════════════════════════════
              FILTRO DE BORDE DE CONTRASTE (Subtle dark outline)
              Similar al stroke #222 del logo de X
              ═══════════════════════════════════════════════════════════ */}
          <filter id="edge-contrast" x="-20%" y="-20%" width="140%" height="140%">
            <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="expanded-thin" />
            <feComposite in="expanded-thin" in2="SourceAlpha" operator="out" result="edge-thin" />
            {/* Color oscuro #222222 para contraste */}
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.133
                      0 0 0 0 0.133
                      0 0 0 0 0.133
                      0 0 0 0.6 0"
              in="edge-thin"
            />
          </filter>

          {/* ═══════════════════════════════════════════════════════════
              MÁSCARA: Bordes extraídos del logo para el efecto spotlight
              ═══════════════════════════════════════════════════════════ */}
          <mask id="logo-edge-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <image
              href="/assets/brand/escudonormal_blanco.svg"
              x="10"
              y="10"
              width="180"
              height="180"
              preserveAspectRatio="xMidYMid meet"
              filter="url(#edge-stroke)"
            />
          </mask>

          {/* ═══════════════════════════════════════════════════════════
              MÁSCARA: Bordes finos para el contorno de contraste #222
              ═══════════════════════════════════════════════════════════ */}
          <mask id="logo-contrast-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            <image
              href="/assets/brand/escudonormal_blanco.svg"
              x="10"
              y="10"
              width="180"
              height="180"
              preserveAspectRatio="xMidYMid meet"
              filter="url(#edge-contrast)"
            />
          </mask>
        </defs>

        {/* ─────────────────────────────────────────────────────────────
            CAPA 1: Logo base en blanco sólido
            Equivalente a la "Capa de Fondo" del logo de X
            ───────────────────────────────────────────────────────────── */}
        <image
          href="/assets/brand/escudonormal_blanco.svg"
          x="10"
          y="10"
          width="180"
          height="180"
          preserveAspectRatio="xMidYMid meet"
          className="opacity-95 transition-opacity duration-500 group-hover:opacity-90"
        />

        {/* ─────────────────────────────────────────────────────────────
            CAPA 2: Borde sutil de contraste (#222)
            Equivalente al stroke="#222222" del logo de X
            Siempre visible con baja opacidad
            ───────────────────────────────────────────────────────────── */}
        <rect
          x="0"
          y="0"
          width="200"
          height="200"
          fill="#222222"
          mask="url(#logo-contrast-mask)"
          className="opacity-40 pointer-events-none"
        />

        {/* ─────────────────────────────────────────────────────────────
            CAPA 3: Efecto de iluminación dinámica (Spotlight)
            El gradiente radial de radio amplio se aplica SOLO a los bordes
            con filtro de brillo gaussiano para "emitir luz"
            Equivalente a stroke="url(#logoglow)" + filter="url(#glow)" del logo de X
            ───────────────────────────────────────────────────────────── */}
        <motion.rect
          x="0"
          y="0"
          width="200"
          height="200"
          fill="url(#logo-spotlight-gradient)"
          mask="url(#logo-edge-mask)"
          filter="url(#edge-glow)"
          className="pointer-events-none"
          style={{ opacity: opacitySpring }}
        />
      </svg>
    </div>
  );
}
