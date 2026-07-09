"use client";

import { useRef } from "react";
import { useInView, type UseInViewOptions } from "framer-motion";

interface ScrollAnimationOptions {
  /** Threshold for triggering the animation (default: triggered once) */
  once?: boolean;
  /** Margin around the element before triggering (default: "-100px") */
  margin?: UseInViewOptions["margin"];
  /** Amount of element visible before triggering (default: "some") */
  amount?: "some" | "all" | number;
}

/**
 * Custom hook for scroll-triggered animations using Framer Motion's useInView.
 * Returns a ref to attach to the element and a boolean indicating if it's in view.
 */
export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const { once = true, margin = "-100px", amount = "some" } = options;
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin, amount });

  return { ref, isInView };
}
