"use client";

import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
  className,
}: SectionTitleProps) {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Decorative line */}
      <div
        className={cn(
          "flex items-center gap-3 mb-4",
          align === "center" && "justify-center"
        )}
      >
        <span className="block w-8 h-0.5 bg-marathon-green rounded-full" />
        <span className="block w-2 h-2 bg-marathon-lime rounded-full" />
        <span className="block w-8 h-0.5 bg-marathon-green rounded-full" />
      </div>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-marathon-light">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-lg md:text-xl text-marathon-light/60 max-w-2xl mx-auto font-body">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
