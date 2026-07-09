"use client";

import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { NEXT_MATCH, CLUB } from "@/lib/constants";
import { Calendar, Clock, MapPin, Swords } from "lucide-react";
import Badge from "@/components/ui/Badge";
import SectionTitle from "@/components/ui/SectionTitle";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("es-HN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function MatchdaySection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      id="matchday"
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-marathon-dark" />
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(45deg, #2E9C3F 25%, transparent 25%, transparent 75%, #2E9C3F 75%),
            linear-gradient(45deg, #2E9C3F 25%, transparent 25%, transparent 75%, #2E9C3F 75%)`,
          backgroundSize: "60px 60px",
          backgroundPosition: "0 0, 30px 30px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Próximo Partido"
          subtitle="No te pierdas la acción de la Furia Verde"
        />

        <motion.div
          ref={ref}
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Match Card — Ticket Style */}
          <div className="glass rounded-3xl overflow-hidden border-marathon-green/20">
            {/* Top bar */}
            <div className="bg-marathon-green/10 px-6 py-3 flex items-center justify-between border-b border-marathon-green/10">
              <Badge variant="lime">{NEXT_MATCH.competition}</Badge>
              <div className="flex items-center gap-4 text-xs text-marathon-light/50">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {formatDate(NEXT_MATCH.date)}
                </span>
              </div>
            </div>

            {/* Match Content */}
            <div className="px-6 md:px-12 py-10 md:py-14">
              <div className="grid grid-cols-3 items-center gap-4">
                {/* Home Team */}
                <div className="text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-2xl bg-marathon-green/10 flex items-center justify-center mb-3 border border-marathon-green/20">
                    <span className="text-3xl md:text-4xl font-heading font-black text-marathon-lime">
                      M
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-heading font-bold text-marathon-light">
                    {NEXT_MATCH.homeTeam}
                  </h3>
                  {NEXT_MATCH.isHome && (
                    <span className="text-[10px] text-marathon-lime uppercase tracking-widest">
                      Local
                    </span>
                  )}
                </div>

                {/* VS */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-marathon-darkest border-2 border-marathon-green/30 mb-3">
                    <Swords
                      size={28}
                      className="text-marathon-lime"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-2 text-marathon-light/60">
                    <Clock size={14} />
                    <span className="text-lg font-heading font-bold">
                      {NEXT_MATCH.time}
                    </span>
                  </div>
                </div>

                {/* Away Team */}
                <div className="text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-2xl bg-marathon-light/5 flex items-center justify-center mb-3 border border-marathon-light/10">
                    <span className="text-3xl md:text-4xl font-heading font-black text-marathon-light/40">
                      O
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-heading font-bold text-marathon-light">
                    {NEXT_MATCH.awayTeam}
                  </h3>
                  {!NEXT_MATCH.isHome && (
                    <span className="text-[10px] text-marathon-light/40 uppercase tracking-widest">
                      Local
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom bar — Dashed separator like a ticket */}
            <div className="relative">
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-marathon-darkest rounded-full" />
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-marathon-darkest rounded-full" />
              <div className="border-t-2 border-dashed border-marathon-green/20 mx-8" />
            </div>

            <div className="px-6 md:px-12 py-4 flex items-center justify-center gap-2 text-sm text-marathon-light/40">
              <MapPin size={14} />
              <span>
                Estadio {NEXT_MATCH.stadium} • {CLUB.city}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
