"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { STAFF } from "@/lib/players-data";
import { Shield, Sparkles, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StaffSection() {
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  // Separating DT (Director Técnico) from the rest of the staff for editorial layout
  const headCoach = STAFF.find((s) => s.role === "Director Técnico");
  const otherStaff = STAFF.filter((s) => s.role !== "Director Técnico");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  } as const;

  const handleImgError = (id: string) => {
    setImgError((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="mt-20">
      {/* Title */}
      <div className="text-center mb-12">
        <span className="text-xs font-heading font-black text-marathon-lime uppercase tracking-widest bg-marathon-green/10 px-3 py-1 rounded-full border border-marathon-green/20">
          Cuerpo Técnico
        </span>
        <h2 className="text-3xl sm:text-4xl font-heading font-black text-marathon-light uppercase tracking-wide mt-3">
          El Cerebro Verdolaga
        </h2>
        <p className="text-sm font-body text-marathon-light/60 max-w-xl mx-auto mt-2">
          La mente táctica detrás de la Furia Verde. Líderes experimentados guiando al plantel rumbo a la gloria.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
      >
        {/* Head Coach - Featured Card (Lefthand/Spanning 5 columns) */}
        {headCoach && (
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 glass rounded-3xl border border-marathon-lime/30 overflow-hidden flex flex-col justify-between shadow-xl shadow-marathon-darkest/40 group hover:border-marathon-lime/50 transition-colors duration-300"
          >
            <div className="p-6 sm:p-8 flex flex-col justify-between h-full relative">
              {/* Decorative shield background icon */}
              <div className="absolute right-4 top-4 text-marathon-lime/5 select-none pointer-events-none group-hover:scale-110 transition-transform duration-500">
                <Shield size={160} />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-marathon-lime text-marathon-darkest font-heading font-extrabold tracking-wider uppercase flex items-center gap-1">
                    <UserCheck size={10} /> {headCoach.role}
                  </span>
                  <span className="text-xs text-marathon-light/50 font-medium">
                    {headCoach.nationality}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-black text-marathon-light uppercase tracking-wide leading-tight group-hover:text-marathon-lime transition-colors duration-300">
                  {headCoach.name}
                </h3>
                <p className="text-xs text-marathon-light/40 mt-1 font-body">
                  En el club desde: {headCoach.joinedDate.split("-")[0]}
                </p>

                <p className="text-sm text-marathon-light/70 font-body font-light leading-relaxed mt-6 relative z-10">
                  {headCoach.bio}
                </p>
              </div>

              {/* Graphic (Avatar Fallback or image) */}
              <div className="mt-8 flex items-end justify-center relative border-t border-marathon-green/10 pt-6">
                {!imgError[headCoach.id] && headCoach.image ? (
                  <img
                    src={headCoach.image}
                    alt={headCoach.name}
                    onError={() => handleImgError(headCoach.id)}
                    className="max-h-[220px] w-auto object-contain rounded-xl filter drop-shadow-[0_8px_16px_rgba(1,41,25,0.7)]"
                  />
                ) : (
                  <div className="h-[180px] w-full flex items-center justify-center relative text-marathon-green/30">
                    <svg viewBox="0 0 100 100" className="h-full w-auto" fill="currentColor">
                      <path d="M50 15c6.6 0 12 5.4 12 12s-5.4 12-12 12-12-5.4-12-12 5.4-12 12-12zm-25 50c0-11 9-20 20-20h10c11 0 20 9 20 20v15H25V65z" />
                    </svg>
                    <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25">
                      <Sparkles size={36} className="text-marathon-lime" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Staff Members (Righthand/Spanning 7 columns) */}
        <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
          {otherStaff.map((staff, idx) => (
            <motion.div
              key={staff.id}
              variants={itemVariants}
              className="glass-card rounded-2xl border border-marathon-green/10 hover:border-marathon-lime/20 p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between group hover:shadow-lg transition-all duration-300 flex-1"
            >
              {/* Photo or SVG Fallback */}
              <div className="w-20 h-20 rounded-xl overflow-hidden glass border border-marathon-green/10 flex items-center justify-center shrink-0">
                {!imgError[staff.id] && staff.image ? (
                  <img
                    src={staff.image}
                    alt={staff.name}
                    onError={() => handleImgError(staff.id)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg viewBox="0 0 100 100" className="w-12 h-12 text-marathon-green/40" fill="currentColor">
                    <path d="M50 15c6.6 0 12 5.4 12 12s-5.4 12-12 12-12-5.4-12-12 5.4-12 12-12zm-25 50c0-11 9-20 20-20h10c11 0 20 9 20 20v15H25V65z" />
                  </svg>
                )}
              </div>

              {/* Text info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-marathon-green/20 text-marathon-lime border border-marathon-green/30 font-heading font-bold uppercase tracking-wider">
                    {staff.role}
                  </span>
                  <span className="text-xs text-marathon-light/40 font-medium">
                    {staff.nationality}
                  </span>
                </div>
                <h4 className="text-xl font-heading font-black text-marathon-light uppercase tracking-wide mt-2 group-hover:text-marathon-lime transition-colors">
                  {staff.name}
                </h4>
                <p className="text-xs font-body text-marathon-light/60 leading-relaxed mt-2">
                  {staff.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
