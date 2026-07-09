"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-marathon-green text-marathon-light hover:bg-marathon-lime hover:text-marathon-darkest shadow-lg shadow-marathon-green/20",
  secondary:
    "bg-marathon-lime text-marathon-darkest hover:bg-marathon-green hover:text-marathon-light shadow-lg shadow-marathon-lime/20",
  outline:
    "border-2 border-marathon-green text-marathon-green hover:bg-marathon-green hover:text-marathon-light",
  ghost:
    "text-marathon-light hover:bg-marathon-dark/50 hover:text-marathon-lime",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-heading font-semibold",
    "transition-all duration-300 ease-out cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marathon-lime focus-visible:ring-offset-2 focus-visible:ring-offset-marathon-darkest",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
