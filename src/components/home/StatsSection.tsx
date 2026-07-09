"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { STATS } from "@/lib/constants";
import { Trophy, Calendar, Users, Clock } from "lucide-react";

const statIcons = [
  <Calendar key="cal" size={28} />,
  <Trophy key="tro" size={28} />,
  <Users key="usr" size={28} />,
  <Clock key="clk" size={28} />,
];

function AnimatedCounter({
  end,
  suffix,
  isYear,
  isInView,
}: {
  end: number;
  suffix: string;
  isYear: boolean;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (isYear) {
      setCount(end);
      return;
    }

    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, end, isYear]);

  return (
    <span>
      {isYear ? end : count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const { ref, isInView } = useScrollAnimation({ margin: "-50px" });

  return (
    <section
      id="stats"
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-marathon-dark" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #2E9C3F 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top & Bottom gradient fades */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-marathon-darkest to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-marathon-darkest to-transparent" />

      <div
        ref={ref}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 40 }
              }
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut",
              }}
            >
              <div className="glass-card rounded-2xl p-6 md:p-8 text-center group-hover:border-marathon-lime/30 transition-all duration-500">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-marathon-green/10 text-marathon-lime mb-4 group-hover:bg-marathon-green/20 transition-colors duration-300">
                  {statIcons[index]}
                </div>

                {/* Number */}
                <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-marathon-light mb-2">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    isYear={stat.isYear}
                    isInView={isInView}
                  />
                </p>

                {/* Label */}
                <p className="text-sm text-marathon-light/50 uppercase tracking-wider font-heading">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
