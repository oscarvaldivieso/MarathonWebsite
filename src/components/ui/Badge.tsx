import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "lime" | "outline";
  className?: string;
}

const variantStyles = {
  default: "bg-marathon-dark/60 text-marathon-light border border-marathon-green/20",
  accent: "bg-marathon-green/20 text-marathon-lime border border-marathon-green/30",
  lime: "bg-marathon-lime/20 text-marathon-lime border border-marathon-lime/30",
  outline: "border border-marathon-lime/40 text-marathon-lime bg-transparent",
};

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-heading uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
