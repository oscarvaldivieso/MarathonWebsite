"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "featured" | "match";
  className?: string;
  hover?: boolean;
}

const variantStyles = {
  default: "glass-card rounded-2xl",
  featured:
    "glass-card rounded-2xl border-marathon-green/30 shadow-lg shadow-marathon-green/10",
  match:
    "glass rounded-2xl border-marathon-lime/20 shadow-xl shadow-marathon-darkest/50",
};

export default function Card({
  children,
  variant = "default",
  className,
  hover = true,
}: CardProps) {
  return (
    <motion.div
      className={cn("p-6", variantStyles[variant], className)}
      whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : undefined}
    >
      {children}
    </motion.div>
  );
}
