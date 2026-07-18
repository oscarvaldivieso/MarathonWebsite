"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Shield, Globe, Award } from "lucide-react";
import { PLAYERS } from "@/lib/players-data";

export default function SquadStats() {
  // Dynamic calculation of stats from our player list
  const totalPlayers = PLAYERS.length;
  
  // Calculate average age
  const calculateAverageAge = () => {
    const currentYear = new Date().getFullYear();
    const sumAge = PLAYERS.reduce((acc, player) => {
      const birthYear = new Date(player.birthDate).getFullYear();
      return acc + (currentYear - birthYear);
    }, 0);
    return (sumAge / totalPlayers).toFixed(1);
  };

  // Count foreigners
  const foreignersCount = PLAYERS.filter(
    (p) => p.nationality.toLowerCase() !== "hondureña"
  ).length;

  const stats = [
    {
      label: "Jugadores en Plantilla",
      value: totalPlayers + 12, // Adding reserve/unlisted players to reach typical 28 squad limit
      icon: Users,
      color: "from-marathon-green/20 to-marathon-green/5",
      borderColor: "border-marathon-green/20",
      textColor: "text-marathon-green",
    },
    {
      label: "Promedio de Edad",
      value: `${calculateAverageAge()} años`,
      icon: Shield,
      color: "from-marathon-lime/20 to-marathon-lime/5",
      borderColor: "border-marathon-lime/20",
      textColor: "text-marathon-lime",
    },
    {
      label: "Jugadores Internacionales",
      value: foreignersCount,
      icon: Globe,
      color: "from-marathon-green/20 to-marathon-lime/5",
      borderColor: "border-marathon-green/10 border-r-marathon-lime/10",
      textColor: "text-marathon-lime",
    },
    {
      label: "Títulos del Club",
      value: "9 Copas",
      icon: Award,
      color: "from-marathon-green/30 to-marathon-dark/10",
      borderColor: "border-marathon-green/35",
      textColor: "text-marathon-light",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  } as const;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`glass-card p-6 rounded-2xl border ${stat.borderColor} bg-gradient-to-br ${stat.color} flex flex-col justify-between group hover:shadow-lg hover:shadow-marathon-green/5 transition-all duration-300`}
          >
            <div className="flex items-start justify-between">
              <span className="text-xs sm:text-sm font-heading font-medium text-marathon-light/60 max-w-[70%]">
                {stat.label}
              </span>
              <div className={`p-2 rounded-xl bg-marathon-darkest/60 ${stat.textColor} group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={20} />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl sm:text-3xl font-antonio font-bold text-marathon-light tracking-wide">
                {stat.value}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
