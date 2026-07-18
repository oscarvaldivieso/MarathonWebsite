"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, UserCheck } from "lucide-react";
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

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* Control Bar: Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10 pb-6 border-b border-marathon-green/10">
        {/* Position Tab Filters */}
        <div className="liquid-glass-pill flex items-center gap-1 p-1 rounded-full overflow-x-auto w-full md:w-auto scrollbar-none">
          {FILTER_OPTIONS.map((option) => {
            const isActive = activeFilter === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={`relative px-4 py-2 text-xs sm:text-sm font-heading font-medium rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer ${isActive
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
                <span className="relative z-10">{option.label}</span>
              </button>
            );
          })}
        </div>

        {/* Real-time search bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Buscar jugador por nombre o dorsal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full glass border border-marathon-green/20 text-marathon-light placeholder-marathon-light/40 text-sm focus:outline-none focus:border-marathon-lime transition-colors duration-300"
          />
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-marathon-light/40">
            <Search size={18} />
          </div>
        </div>
      </div>

      {/* Grid of Players with Framer Motion layout transitions */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredPlayers.map((player) => (
            <motion.div
              key={player.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <PlayerCard
                player={player}
                onClick={() => setSelectedPlayer(player)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredPlayers.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 glass-card rounded-2xl border border-marathon-green/10"
        >
          <div className="text-marathon-lime/40 mb-3 flex justify-center">
            <Search size={48} />
          </div>
          <h3 className="text-xl font-heading font-bold text-marathon-light uppercase">
            No se encontraron jugadores
          </h3>
          <p className="text-sm font-body text-marathon-light/50 mt-1 max-w-sm mx-auto">
            Prueba a buscar otro nombre, dorsal, o limpia la barra de búsqueda para ver todo el plantel.
          </p>
        </motion.div>
      )}

      {/* Featured Quote / Captain Focus Section */}
      {captain && activeFilter === "all" && searchQuery === "" && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-16 glass rounded-3xl border border-marathon-green/20 overflow-hidden relative shadow-lg"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,var(--color-marathon-green)_0%,transparent_60%)] opacity-20 pointer-events-none" />
          <div className="p-8 sm:p-12 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex-1">
              <span className="text-xs font-heading font-black text-marathon-lime uppercase tracking-widest bg-marathon-green/20 px-3 py-1 rounded-full border border-marathon-green/30">
                La Voz del Capitán
              </span>
              <blockquote className="mt-6 text-xl sm:text-2xl font-heading italic font-semibold text-marathon-light leading-relaxed">
                "{captain.quote}"
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-marathon-lime" />
                <p className="font-heading font-black text-marathon-lime text-base uppercase tracking-wider">
                  {captain.name}
                </p>
                <p className="text-xs text-marathon-light/40 font-body">
                  Portero & Capitán (#23)
                </p>
              </div>
            </div>
            {/* Minimalist Graphic badge */}
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full glass border border-marathon-lime/20 flex items-center justify-center relative shrink-0">
              <div className="text-marathon-lime animate-float">
                <UserCheck size={64} />
              </div>
              <div className="absolute -bottom-1 bg-marathon-lime text-marathon-darkest px-3 py-1 rounded-full font-heading font-black text-xs tracking-wider">
                LÍDER
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Staff / Coaching Section */}
      <StaffSection />

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
