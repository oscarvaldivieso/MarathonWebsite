"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Calendar, MapPin, Ruler, Scale, Footprints, Clock, Quote, Shield } from "lucide-react";
import { Player } from "@/types";
import { cn } from "@/lib/utils";

interface PlayerModalProps {
  player: Player | null;
  onClose: () => void;
}

export default function PlayerModal({ player, onClose }: PlayerModalProps) {
  const [imgError, setImgError] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!player) return null;

  // Calculate age from birthDate
  const age = () => {
    const birth = new Date(player.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Attributes list based on player category
  const isGK = player.category === "goalkeeper";
  const attributesList = isGK
    ? [
        { label: "Estirada", value: player.attributes.diving || 0 },
        { label: "Paradas", value: player.attributes.handling || 0 },
        { label: "Saque", value: player.attributes.kicking || 0 },
        { label: "Reflejos", value: player.attributes.reflexes || 0 },
        { label: "Velocidad", value: player.attributes.speed || 0 },
        { label: "Posicionamiento", value: player.attributes.positioning || 0 },
      ]
    : [
        { label: "Ritmo", value: player.attributes.pace || 0 },
        { label: "Tiro", value: player.attributes.shooting || 0 },
        { label: "Pase", value: player.attributes.passing || 0 },
        { label: "Regate", value: player.attributes.dribbling || 0 },
        { label: "Defensa", value: player.attributes.defending || 0 },
        { label: "Físico", value: player.attributes.physical || 0 },
      ];

  // Calculate overall rating
  const overallRating = Math.round(
    attributesList.reduce((acc, curr) => acc + curr.value, 0) / attributesList.length
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-marathon-darkest/90 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-4xl glass rounded-3xl border border-marathon-green/20 overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 p-2 rounded-full glass hover:bg-marathon-green/20 text-marathon-light/80 hover:text-marathon-lime transition-all"
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        {/* Left Section: Image and Name Card */}
        <div className="relative w-full md:w-2/5 min-h-[300px] md:min-h-full bg-gradient-to-t md:bg-gradient-to-r from-marathon-darkest/80 via-marathon-dark/40 to-transparent p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-marathon-green/10">
          {/* Dorsal Glow in background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none overflow-hidden">
            <span className="text-[280px] font-antonio font-bold text-marathon-lime tracking-tighter">
              {player.number}
            </span>
          </div>

          {/* Captain badge */}
          <div className="relative z-10">
            {player.isCaptain && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-heading font-black bg-marathon-lime text-marathon-darkest rounded-full tracking-wider animate-pulse-glow">
                <Shield size={12} /> CAPITÁN
              </span>
            )}
          </div>

          {/* Player Graphic (Photo or Silhouette) */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-visible">
            {!imgError && player.image ? (
              <img
                src={player.image}
                alt={player.name}
                onError={() => setImgError(true)}
                className="max-h-[260px] md:max-h-[340px] w-auto object-contain filter drop-shadow-[0_15px_25px_rgba(1,41,25,0.9)] z-10"
              />
            ) : (
              <div className="h-[220px] md:h-[280px] w-full flex items-end justify-center relative z-10 text-marathon-green/30">
                <svg viewBox="0 0 100 100" className="h-full w-auto" fill="currentColor">
                  <path d="M50 15c6.6 0 12 5.4 12 12s-5.4 12-12 12-12-5.4-12-12 5.4-12 12-12zm-25 50c0-11 9-20 20-20h10c11 0 20 9 20 20v15H25V65z" />
                </svg>
                <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25">
                  <Shield size={48} className="text-marathon-lime" />
                </div>
              </div>
            )}

            {/* FIFA-style Rating Oval Badge */}
            <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-20 flex flex-col items-center justify-center h-16 w-16 rounded-2xl glass border border-marathon-lime/30 bg-marathon-darkest/70">
              <span className="text-2xl font-antonio font-bold text-marathon-lime leading-none">
                {overallRating}
              </span>
              <span className="text-[9px] font-heading font-semibold text-marathon-light/60 tracking-wider uppercase mt-1">
                RAT
              </span>
            </div>
          </div>

          {/* Name Plate */}
          <div className="relative z-10">
            <span className="text-sm font-heading text-marathon-lime font-bold uppercase tracking-wider">
              {player.position}
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-marathon-light uppercase tracking-wide leading-tight mt-1">
              {player.name}
            </h2>
            <p className="text-xs font-body text-marathon-light/40 font-medium">
              {player.fullName}
            </p>
          </div>
        </div>

        {/* Right Section: Details, Stats, Bio, and Attributes */}
        <div className="w-full md:w-3/5 p-6 sm:p-8 overflow-y-auto flex-1 md:max-h-[90vh]">
          {/* Section: Ficha Técnica */}
          <div className="mb-6">
            <h4 className="text-xs font-heading font-black text-marathon-lime uppercase tracking-widest mb-3 border-b border-marathon-green/10 pb-1">
              Ficha Técnica
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-marathon-green shrink-0" />
                <div>
                  <p className="text-[10px] text-marathon-light/40 leading-none">Edad</p>
                  <p className="font-heading font-semibold text-marathon-light mt-0.5">{age()} años</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-marathon-green shrink-0" />
                <div>
                  <p className="text-[10px] text-marathon-light/40 leading-none">Origen</p>
                  <p className="font-heading font-semibold text-marathon-light mt-0.5 truncate max-w-[120px]" title={player.birthPlace}>
                    {player.birthPlace.split(",")[0]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Ruler size={16} className="text-marathon-green shrink-0" />
                <div>
                  <p className="text-[10px] text-marathon-light/40 leading-none">Estatura</p>
                  <p className="font-heading font-semibold text-marathon-light mt-0.5">{player.height}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Scale size={16} className="text-marathon-green shrink-0" />
                <div>
                  <p className="text-[10px] text-marathon-light/40 leading-none">Peso</p>
                  <p className="font-heading font-semibold text-marathon-light mt-0.5">{player.weight}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Footprints size={16} className="text-marathon-green shrink-0" />
                <div>
                  <p className="text-[10px] text-marathon-light/40 leading-none">Pie hábil</p>
                  <p className="font-heading font-semibold text-marathon-light mt-0.5">{player.preferredFoot}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={16} className="text-marathon-green shrink-0" />
                <div>
                  <p className="text-[10px] text-marathon-light/40 leading-none">En el Club desde</p>
                  <p className="font-heading font-semibold text-marathon-light mt-0.5">{player.joinedDate.split("-")[0]}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Attributes (FIFA style) */}
          <div className="mb-6">
            <h4 className="text-xs font-heading font-black text-marathon-lime uppercase tracking-widest mb-3 border-b border-marathon-green/10 pb-1">
              Atributos de Rendimiento
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {attributesList.map((attr, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex justify-between text-xs font-heading font-bold mb-1">
                    <span className="text-marathon-light/80">{attr.label}</span>
                    <span className="text-marathon-lime">{attr.value}</span>
                  </div>
                  {/* Progress bar container */}
                  <div className="h-2 w-full bg-marathon-darkest/80 rounded-full overflow-hidden border border-marathon-green/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${attr.value}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                      className={cn(
                        "h-full rounded-full bg-gradient-to-r",
                        attr.value >= 80 
                          ? "from-marathon-green to-marathon-lime shadow-[0_0_8px_rgba(146,191,78,0.5)]" 
                          : "from-marathon-green/80 to-marathon-green"
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Biography / Description */}
          <div className="mb-6 text-sm text-marathon-light/75 leading-relaxed">
            <h4 className="text-xs font-heading font-black text-marathon-lime uppercase tracking-widest mb-2 border-b border-marathon-green/10 pb-1">
              Perfil Deportivo
            </h4>
            <p className="font-body font-light">{player.bio}</p>
          </div>

          {/* Section: Personal Quote */}
          {player.quote && (
            <div className="relative p-5 rounded-2xl glass-card border border-marathon-lime/10 bg-marathon-dark/15 flex items-start gap-3 mt-4 overflow-hidden">
              <Quote size={28} className="text-marathon-lime/20 shrink-0 mt-1" />
              <div className="relative z-10">
                <p className="font-heading font-medium italic text-marathon-light/90 text-sm leading-snug">
                  "{player.quote}"
                </p>
              </div>
              <div className="absolute right-0 bottom-0 opacity-5 select-none pointer-events-none translate-x-2 translate-y-2">
                <Quote size={80} className="text-marathon-lime" />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
