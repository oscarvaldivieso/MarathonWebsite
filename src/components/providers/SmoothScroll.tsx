"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll — Initializes Lenis smooth scrolling and syncs it with GSAP ScrollTrigger.
 * Renders nothing — just sets up the scroll behavior globally.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Respect users who prefer reduced motion — skip smooth scroll hijacking.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Resize Lenis when GSAP ScrollTrigger refreshes (preventing height mismatch scroll locks)
    const resizeHandler = () => {
      lenis.resize();
    };
    ScrollTrigger.addEventListener("refresh", resizeHandler);

    const updatePhysics = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updatePhysics);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updatePhysics);
      ScrollTrigger.removeEventListener("refresh", resizeHandler);
    };
  }, []);

  return null;
}
