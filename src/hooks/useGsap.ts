"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * useGsap — Provides a scoped GSAP context with automatic cleanup.
 * Wraps gsap.context() so all animations created inside the callback
 * are automatically reverted when the component unmounts.
 *
 * @param animationFn - Function that receives the gsap context scope element.
 *                      Create your timelines/tweens inside this function.
 * @param deps - Dependency array (like useEffect)
 */
export function useGsap(
  animationFn: (ctx: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      animationFn(ctx!);
    }, scopeRef.current);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}

/**
 * useScrollTrigger — Creates a ScrollTrigger-based animation with cleanup.
 * Returns a ref to attach to the trigger element.
 *
 * @param config - ScrollTrigger.create() config object
 * @param deps - Dependency array
 */
export function useScrollTriggerRef(
  config: (el: HTMLElement) => ScrollTrigger.Vars,
  deps: React.DependencyList = []
) {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      ...config(triggerRef.current),
    });

    return () => trigger.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return triggerRef;
}

/**
 * Re-export gsap and ScrollTrigger for convenience.
 * Components can import from this single file:
 *   import { gsap, ScrollTrigger, useGsap } from "@/hooks/useGsap";
 */
export { gsap, ScrollTrigger };
