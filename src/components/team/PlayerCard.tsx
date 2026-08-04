"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Player } from "@/types";
import { cn } from "@/lib/utils";
import { Shield, Sparkles } from "lucide-react";

interface PlayerCardProps {
  player: Player;
  onClick: (player: Player) => void;
}

const PlayerCard = React.memo(function PlayerCard({ player, onClick }: PlayerCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [actionImgError, setActionImgError] = useState(false);

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map coordinates range [-0.5, 0.5] to tilt angle degrees with a spring
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), { stiffness: 300, damping: 25 });

  // Reset image error states if player changes
  useEffect(() => {
    setImgError(false);
    setActionImgError(false);
  }, [player.id, player.image, player.actionImage]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const px = (e.clientX - box.left) / box.width - 0.5;
    const py = (e.clientY - box.top) / box.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      onClick={() => onClick(player)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative h-[310px] xs:h-[330px] sm:h-[380px] w-full cursor-pointer select-none overflow-visible group"
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. CARD BODY FRAME (Fondo de vidrio 3D)
          ───────────────────────────────────────────────────────────── */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl glass-card border transition-[border-color,box-shadow,transform] duration-500 z-0 overflow-hidden",
          isHovered
            ? "border-marathon-lime/60 shadow-[0_0_35px_rgba(146,191,78,0.35)] scale-[1.02]"
            : "border-marathon-green/10 shadow-md"
        )}
        style={{ transform: "translateZ(10px)" }}
      >
        {/* Ambient glow spotlight behind player on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(146,191,78,0.35)_0%,transparent_70%)] opacity-0 transition-opacity duration-500 z-0 pointer-events-none",
            isHovered && "opacity-100 animate-pulse-glow"
          )}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CARD CONTENT WRAPPER (Header y Footer Details)
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex flex-col justify-between p-3.5 sm:p-5 z-20 pointer-events-none"
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Top Header - Escudo Centenario Blanco (Superior Izquierda) + Position Pill */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* ESCUDO MARATHON CENTENARIO BLANCO (Esquina Superior Izquierda) */}
            <img
              src="/assets/brand/escudocentenario_blanco.svg"
              alt="Escudo Marathón Centenario Blanco"
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
            />
            {player.isCaptain && (
              <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded bg-marathon-lime text-marathon-darkest font-elrotex font-black tracking-widest flex items-center gap-0.5 animate-pulse-glow">
                <Sparkles size={8} /> CAPITÁN
              </span>
            )}
          </div>

          <span className="text-[11px] sm:text-[13px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-marathon-light/80 font-heading font-light">
            {player.position}
          </span>
        </div>

        {/* Bottom Details - Name (Izquierda) y Número Dorsal (Esquina Inferior Derecha) */}
        <div className="relative mt-auto flex items-end justify-between gap-1.5 sm:gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm xs:text-base sm:text-[1.3em] font-elrotex text-marathon-light tracking-wider truncate transition-colors duration-300 uppercase group-hover:text-marathon-lime">
              {player.name}
            </h3>
            <p className="text-[10px] sm:text-[11px] font-body text-marathon-light/50 tracking-wider truncate">
              {player.nationality}
            </p>
          </div>

          {/* NÚMERO EN LA ESQUINA INFERIOR DERECHA */}
          <div className="flex-shrink-0 text-right">
            <span className="text-[1.8rem] sm:text-[2.5rem] font-elrotex font-light text-marathon-lime group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(146,191,78,0.8)] transition-all duration-300 leading-none block">
              {player.number}
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. LAYER JUGADOR + GARRAS DEL MONSTRUO (Blanco con Verde)
          Efecto de iluminación doble aura blanca + verde lima neón
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-[65px] sm:bottom-[85px] h-[210px] xs:h-[230px] sm:h-[260px] flex items-end justify-center pointer-events-none transition-transform duration-500 z-30"
        style={{
          transform: `translate3d(0, ${isHovered ? "-24px" : "0px"}, ${isHovered ? "60px" : "20px"}) scale(${isHovered ? 1.08 : 1})`,
        }}
      >
        {/* LAS GARRAS DEL MONSTRUO (Gradiente Blanco con Verde + Doble Aura Luminosa) */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-500 pointer-events-none z-0 translate-y-6 sm:translate-y-8",
            isHovered ? "opacity-100 scale-125 rotate-[-5deg]" : "opacity-0 scale-75 rotate-0"
          )}
        >
          <img
            src="/assets/hero/garras.svg"
            alt="Garras del Monstruo Blancas y Verdes"
            className="w-[125%] h-[125%] object-contain filter drop-shadow-[0_0_25px_rgba(146,191,78,0.7)] drop-shadow-[0_0_12px_rgba(255,255,255,0.85)]"
          />
        </div>

        {/* Resting Image (Default state) */}
        <div
          className={cn(
            "w-full flex justify-center transition-all duration-300 absolute bottom-0 z-10",
            isHovered ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
          )}
        >
          {!imgError && player.image ? (
            <img
              src={player.image}
              alt={player.name}
              loading="lazy"
              onError={(e) => {
                console.error("Failed to load player reposo image:", player.image, e);
                setImgError(true);
              }}
              className="max-h-[190px] xs:max-h-[210px] sm:max-h-[250px] w-auto object-contain drop-shadow-lg"
            />
          ) : (
            <div className="relative h-[150px] sm:h-[190px] w-auto flex items-end justify-center">
              <svg viewBox="0 0 100 100" className="h-full w-auto text-marathon-green/30 fill-currentColor">
                <path d="M50 15c6.6 0 12 5.4 12 12s-5.4 12-12 12-12-5.4-12-12 5.4-12 12-12zm-25 50c0-11 9-20 20-20h10c11 0 20 9 20 20v15H25V65z" />
                <circle cx="50" cy="50" r="14" className="text-marathon-lime/10 fill-currentColor" />
              </svg>
              <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
                <Shield size={24} className="text-marathon-lime" />
              </div>
            </div>
          )}
        </div>

        {/* Action Image (Hover state) */}
        <div
          className={cn(
            "w-full flex justify-center transition-all duration-300 absolute bottom-0 z-10",
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          )}
        >
          {!actionImgError && player.actionImage ? (
            <img
              src={player.actionImage}
              alt={`${player.name} Pose`}
              loading="lazy"
              onError={(e) => {
                console.error("Failed to load player action image:", player.actionImage, e);
                setActionImgError(true);
              }}
              className="max-h-[200px] xs:max-h-[220px] sm:max-h-[260px] w-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            />
          ) : player.category === "goalkeeper" ? (
            <div className="relative h-[160px] sm:h-[200px] w-auto flex items-end justify-center">
              <svg viewBox="0 0 100 100" className="h-full w-auto text-marathon-lime fill-currentColor filter drop-shadow-[0_0_15px_rgba(146,191,78,0.4)]">
                <path d="M 68,22 C 70.8,22 73,19.8 73,17 C 73,14.2 70.8,12 68,12 C 63,14.2 63,17 C 63,19.8 65.2,22 68,22 Z 
                         M 88,14 C 88,12.9 87.1,12 86,12 C 81.3,15.1 76,21.5 73,26 L 62,35 C 59,37 56,38 52,38 L 40,38 C 36,38 32,40 30,43 L 15,62 C 14.1,63.1 14.2,64.7 15.3,65.6 C 16.4,66.5 18,66.4 18.9,65.3 L 33,48 L 47,48 C 50.8,48 54.4,46.5 57,44 L 84,21 C 86.8,18.6 88,16.2 88,14 Z 
                         M 48,50 L 32,75 C 31.1,76.4 31.5,78.3 32.9,79.2 C 34.3,80.1 36.2,79.7 37.1,78.3 L 53,53.5 Z 
                         M 58,48 L 48,80 C 47.4,81.8 48.4,83.7 50.2,84.3 C 52,84.9 53.9,83.9 54.5,82.1 L 64.5,50 Z" />
                <circle cx="88" cy="10" r="5" className="fill-marathon-lime animate-ping" />
              </svg>
            </div>
          ) : (
            <div className="relative h-[160px] sm:h-[200px] w-auto flex items-end justify-center">
              <svg viewBox="0 0 100 100" className="h-full w-auto text-marathon-lime fill-currentColor filter drop-shadow-[0_0_15px_rgba(146,191,78,0.4)]">
                <path d="M 45,22 C 47.8,22 50,19.8 50,17 C 50,14.2 47.8,12 45,12 C 42.2,12 40,14.2 40,17 C 40,19.8 42.2,22 45,22 Z 
                         M 58,35 C 56,33 53,30 49,30 L 40,30 C 35,30 31,34 29,38 L 18,52 C 17.1,53.1 17.2,54.7 18.3,55.6 C 19.4,56.5 21,56.4 21.9,55.3 L 31,43 L 42,43 C 45,43 47,40 48,38 L 56,50 L 72,66 C 73.1,67.1 74.7,67.2 75.6,66.3 C 76.5,65.4 76.4,63.8 75.3,62.9 L 60,48 Z 
                         M 35,46 L 25,72 C 24.1,73.4 24.5,75.3 25.9,76.2 C 27.3,77.1 29.2,76.7 30.1,75.3 L 40,49 Z" />
                <circle cx="82" cy="74" r="4.5" className="fill-marathon-lime animate-pulse" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default PlayerCard;
