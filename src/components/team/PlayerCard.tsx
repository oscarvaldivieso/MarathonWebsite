"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
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

  const displayStat = () => {
    if (player.category === "goalkeeper") {
      return { label: "Vallas Invictas", value: player.stats.cleanSheets };
    }
    return { label: "Goles", value: player.stats.goals || 0 };
  };

  const stat = displayStat();

  return (
    <motion.div
      onClick={() => onClick(player)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative h-[380px] w-full cursor-pointer select-none overflow-visible group"
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
            ? "border-marathon-lime/50 shadow-2xl shadow-marathon-green/30 scale-[1.02]"
            : "border-marathon-green/10 shadow-md"
        )}
        style={{ transform: "translateZ(10px)" }}
      >
        {/* Background dorsal number - Elegant scale & subtle hover zoom */}
        <div
          className={cn(
            "absolute right-2 top-0 select-none pointer-events-none transition-all duration-500 z-0 leading-none",
            isHovered
              ? "opacity-35 scale-105 text-marathon-lime drop-shadow-[0_0_20px_rgba(146,191,78,0.4)]"
              : "opacity-15 text-marathon-light/30 scale-100"
          )}
        >
          <span className="text-[135px] font-elrotex leading-none tracking-tighter block">
            {player.number}
          </span>
        </div>

        {/* Ambient glow spotlight behind player */}
        <div
          className={cn(
            "absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-marathon-green)_0%,transparent_70%)] opacity-0 transition-opacity duration-500 z-0 pointer-events-none",
            isHovered && "opacity-40"
          )}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CARD CONTENT WRAPPER (Header y Footer Details)
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex flex-col justify-between p-5 z-20 pointer-events-none"
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Top Header - Position and Captain Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {player.isCaptain && (
              <span className="text-[9px] px-2 py-0.5 rounded bg-marathon-lime text-marathon-darkest font-elrotex font-black tracking-widest flex items-center gap-0.5 animate-pulse-glow">
                <Sparkles size={8} /> CAPITÁN
              </span>
            )}
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full glass border border-marathon-green/20 text-marathon-light/80 font-heading tracking-wider uppercase font-semibold">
            {player.position}
          </span>
        </div>

        {/* Bottom Details - Name and quick stats */}
        <div className="relative mt-auto">
          <h3 className="text-xl font-elrotex text-marathon-light tracking-wider truncate transition-colors duration-300 uppercase group-hover:text-marathon-lime">
            {player.name}
          </h3>
          <p className="text-[11px] font-body text-marathon-light/50 tracking-wider">
            {player.nationality}
          </p>

          {/* Quick Stats Reveal on Hover */}
          <div className="h-6 mt-1.5 overflow-hidden relative">
            <AnimatePresence initial={false}>
              {!isHovered ? (
                <motion.div
                  key="matches"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[11px] font-heading font-medium text-marathon-light/60 flex items-center gap-1.5"
                >
                  <span>Partidos:</span>
                  <span className="text-marathon-lime">{player.stats.matchesPlayed}</span>
                  <span className="text-marathon-light/20">|</span>
                  <span>Minutos:</span>
                  <span className="text-marathon-green">{player.stats.minutesPlayed}</span>
                </motion.div>
              ) : (
                <motion.div
                  key="highlightStat"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[11px] font-heading font-bold text-marathon-lime flex items-center gap-1.5 uppercase tracking-wider"
                >
                  <span>{stat.label}:</span>
                  <span className="text-marathon-light bg-marathon-green/40 px-2 py-0.5 rounded-full border border-marathon-green/30 text-xs">
                    {stat.value}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. LAYER JUGADOR + GARRAS DEL MONSTRUO EN ROJO PURO
          Ubicadas más abajo (translate-y-8) sin filtros extra
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-[85px] h-[260px] flex items-end justify-center pointer-events-none transition-transform duration-500 z-30"
        style={{
          transform: `translate3d(0, ${isHovered ? "-32px" : "0px"}, ${isHovered ? "60px" : "20px"}) scale(${isHovered ? 1.1 : 1})`,
        }}
      >
        {/* LAS GARRAS DEL MONSTRUO (Rojo Puro) */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-500 pointer-events-none z-0 translate-y-8",
            isHovered ? "opacity-100 scale-125 rotate-[-5deg]" : "opacity-0 scale-75 rotate-0"
          )}
        >
          <img
            src="/assets/hero/garras.svg"
            alt="Garras del Monstruo Rojas"
            className="w-[125%] h-[125%] object-contain filter drop-shadow-[0_4px_20px_rgba(237,28,36,0.5)]"
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
              className="max-h-[250px] w-auto object-contain drop-shadow-lg"
            />
          ) : (
            <div className="relative h-[190px] w-auto flex items-end justify-center">
              <svg viewBox="0 0 100 100" className="h-full w-auto text-marathon-green/30 fill-currentColor">
                <path d="M50 15c6.6 0 12 5.4 12 12s-5.4 12-12 12-12-5.4-12-12 5.4-12 12-12zm-25 50c0-11 9-20 20-20h10c11 0 20 9 20 20v15H25V65z" />
                <circle cx="50" cy="50" r="14" className="text-marathon-lime/10 fill-currentColor" />
              </svg>
              <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
                <Shield size={28} className="text-marathon-lime" />
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
              className="max-h-[260px] w-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            />
          ) : player.category === "goalkeeper" ? (
            <div className="relative h-[200px] w-auto flex items-end justify-center">
              <svg viewBox="0 0 100 100" className="h-full w-auto text-marathon-lime fill-currentColor filter drop-shadow-[0_0_15px_rgba(146,191,78,0.4)]">
                <path d="M 68,22 C 70.8,22 73,19.8 73,17 C 73,14.2 70.8,12 68,12 C 63,14.2 63,17 C 63,19.8 65.2,22 68,22 Z 
                         M 88,14 C 88,12.9 87.1,12 86,12 C 81.3,15.1 76,21.5 73,26 L 62,35 C 59,37 56,38 52,38 L 40,38 C 36,38 32,40 30,43 L 15,62 C 14.1,63.1 14.2,64.7 15.3,65.6 C 16.4,66.5 18,66.4 18.9,65.3 L 33,48 L 47,48 C 50.8,48 54.4,46.5 57,44 L 84,21 C 86.8,18.6 88,16.2 88,14 Z 
                         M 48,50 L 32,75 C 31.1,76.4 31.5,78.3 32.9,79.2 C 34.3,80.1 36.2,79.7 37.1,78.3 L 53,53.5 Z 
                         M 58,48 L 48,80 C 47.4,81.8 48.4,83.7 50.2,84.3 C 52,84.9 53.9,83.9 54.5,82.1 L 64.5,50 Z" />
                <circle cx="88" cy="10" r="5" className="fill-marathon-lime animate-ping" />
              </svg>
            </div>
          ) : (
            <div className="relative h-[200px] w-auto flex items-end justify-center">
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
