"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, UserCheck, X } from "lucide-react";
import { PLAYERS } from "@/lib/players-data";
import { Player } from "@/types";
import PlayerCard from "./PlayerCard";
import PlayerModal from "./PlayerModal";
import StaffSection from "./StaffSection";

const FILTER_OPTIONS = [
  { id: "all", label: "Todos" },
  { id: "goalkeeper", label: "Porteros" },
  { id: "defender", label: "Defensas" },
  { id: "midfielder", label: "Mediocampistas" },
  { id: "forward", label: "Delanteros" },
] as const;

type FilterType = typeof FILTER_OPTIONS[number]["id"];

export default function TeamClient() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handlePlayerClick = useCallback((player: Player) => {
    setSelectedPlayer(player);
  }, []);

  // Filter players based on selected position tab and search input text
  const filteredPlayers = useMemo(() => {
    return PLAYERS.filter((player) => {
      const matchesFilter = activeFilter === "all" || player.category === activeFilter;
      const matchesSearch =
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.number.toString().includes(searchQuery);
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Find captain to highlight in hero if needed or display custom alert
  const captain = useMemo(() => PLAYERS.find((p) => p.isCaptain), []);

  // Memoize StaffSection to prevent redundant re-renders when activeFilter or searchQuery changes
  const memoizedStaff = useMemo(() => <StaffSection />, []);

  return (
    <div className="py-8 sm:py-12 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Control Bar: Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 justify-between items-stretch md:items-center mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-marathon-green/10">
        
        {/* Position Tab Filters - Mobile Touch Scrollable */}
        <div className="relative w-full md:w-auto overflow-hidden">
          <div className="liquid-glass-pill flex items-center gap-1 p-1 rounded-full overflow-x-auto w-full scrollbar-none snap-x touch-pan-x">
            {FILTER_OPTIONS.map((option) => {
              const isActive = activeFilter === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setActiveFilter(option.id)}
                  className={`relative px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-heading font-bold rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer shrink-0 snap-start ${
                    isActive
                      ? "text-marathon-darkest"
                      : "text-marathon-light/70 hover:text-marathon-light"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-marathon-lime rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {option.label}
                    {isActive && (
                      <span className="text-[10px] bg-marathon-darkest/20 text-marathon-darkest px-1.5 py-0.2 rounded-full font-extrabold">
                        {filteredPlayers.length}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Real-time search bar with Clear Button */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Buscar por nombre o dorsal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-full glass border border-marathon-green/20 text-marathon-light placeholder-marathon-light/40 text-xs sm:text-sm focus:outline-none focus:border-marathon-lime transition-colors duration-300"
          />
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-marathon-light/40 pointer-events-none">
            <Search size={16} />
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-marathon-light/40 hover:text-marathon-lime p-1 rounded-full cursor-pointer transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Visible count summary header on mobile */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 text-xs font-body text-marathon-light/50">
        <span>
          Mostrando <strong className="text-marathon-lime">{filteredPlayers.length}</strong> {filteredPlayers.length === 1 ? "jugador" : "jugadores"}
        </span>
        {activeFilter !== "all" && (
          <button
            onClick={() => {
              setActiveFilter("all");
              setSearchQuery("");
            }}
            className="text-marathon-lime hover:underline cursor-pointer font-heading font-semibold"
          >
            Ver todos
          </button>
        )}
      </div>

      {/* Grid of Players: 2 columns on mobile, 3 on md, 4 on lg */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {filteredPlayers.map((player) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <PlayerCard
                player={player}
                onClick={handlePlayerClick}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredPlayers.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 sm:py-16 glass-card rounded-2xl border border-marathon-green/10 px-4"
        >
          <div className="text-marathon-lime/40 mb-3 flex justify-center">
            <Search size={40} />
          </div>
          <h3 className="text-lg sm:text-xl font-heading font-bold text-marathon-light uppercase">
            No se encontraron jugadores
          </h3>
          <p className="text-xs sm:text-sm font-body text-marathon-light/50 mt-1 max-w-sm mx-auto">
            Prueba a buscar otro nombre, dorsal, o limpia la barra de búsqueda para ver todo el plantel.
          </p>
          <button
            onClick={() => {
              setActiveFilter("all");
              setSearchQuery("");
            }}
            className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-marathon-lime text-marathon-darkest font-heading font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors"
          >
            Restablecer búsqueda
          </button>
        </motion.div>
      )}

      {/* Featured Quote / Captain Focus Section */}
      {captain && activeFilter === "all" && searchQuery === "" && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-12 sm:mt-16 glass rounded-3xl border border-marathon-green/20 overflow-hidden relative shadow-lg"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,var(--color-marathon-green)_0%,transparent_60%)] opacity-20 pointer-events-none" />
          <div className="p-6 sm:p-12 flex flex-col md:flex-row gap-6 sm:gap-8 items-center justify-between">
            <div className="flex-1 text-center sm:text-left">
              <span className="text-xs font-heading font-black text-marathon-lime uppercase tracking-widest bg-marathon-green/20 px-3 py-1 rounded-full border border-marathon-green/30 inline-block">
                La Voz del Capitán
              </span>
              <blockquote className="mt-4 sm:mt-6 text-lg sm:text-2xl font-heading italic font-semibold text-marathon-light leading-relaxed">
                "{captain.quote}"
              </blockquote>
              <div className="mt-4 flex items-center justify-center sm:justify-start gap-3">
                <span className="h-0.5 w-8 bg-marathon-lime hidden sm:inline-block" />
                <p className="font-heading font-black text-marathon-lime text-sm sm:text-base uppercase tracking-wider">
                  {captain.name}
                </p>
                <p className="text-xs text-marathon-light/40 font-body">
                  Portero & Capitán (#23)
                </p>
              </div>
            </div>
            {/* Minimalist Graphic badge */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 rounded-full glass border border-marathon-lime/20 flex items-center justify-center relative shrink-0">
              <div className="text-marathon-lime animate-float">
                <UserCheck size={40} className="sm:hidden" />
                <UserCheck size={64} className="hidden sm:block" />
              </div>
              <div className="absolute -bottom-1 bg-marathon-lime text-marathon-darkest px-3 py-1 rounded-full font-heading font-black text-[10px] sm:text-xs tracking-wider">
                LÍDER
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Staff / Coaching Section */}
      {memoizedStaff}

      {/* Player Detail Modal */}
      <AnimatePresence>
        {selectedPlayer && (
          <PlayerModal
            player={selectedPlayer}
            onClose={() => setSelectedPlayer(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
