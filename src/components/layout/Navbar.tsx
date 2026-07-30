"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("/");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "py-2" : "py-4"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo - Left */}
          <motion.a
            href="/"
            className="relative z-10 flex items-center gap-3 group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src="/assets/brand/escudonormal_blanco.svg"
              alt="CD Marathón"
              className={cn(
                "transition-all duration-300",
                isScrolled ? "h-11 w-11" : "h-14 w-14"
              )}
            />
            {/* Insignia conmemorativa de Centenario (solo en desktop) */}
            <img
              src="/assets/brand/centenario.png"
              alt="Centenario CD Marathón"
              className={cn(
                "hidden lg:block transition-all duration-300 object-contain drop-shadow-sm",
                isScrolled ? "h-9 w-auto" : "h-12 w-auto"
              )}
            />
          </motion.a>

          {/* Center - Liquid Glass Pill Navigation */}
          <nav className="hidden lg:block absolute left-1/2 -translate-x-1/2">
            <motion.div
              className="liquid-glass-pill flex items-center gap-1 p-1.5 rounded-full"
              layout
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeLink === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("/") && !link.href.startsWith("/#")) {
                        setActiveLink(link.href);
                      }
                    }}
                    className={cn(
                      "relative px-4 py-2 text-[13px] font-heading font-medium rounded-full transition-all duration-300 whitespace-nowrap",
                      isActive
                        ? "text-marathon-darkest"
                        : "text-marathon-light/70 hover:text-marathon-light"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 bg-marathon-green rounded-full"
                        layoutId="activeNavPill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </motion.div>
          </nav>

          {/* Right side - CTA + Mobile Toggle */}
          <div className="flex items-center gap-3 relative z-10">
            <a
              href="#cta"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-marathon-lime text-marathon-darkest text-sm font-heading font-semibold rounded-full hover:bg-marathon-green hover:text-marathon-light transition-all duration-300 shadow-lg shadow-marathon-lime/20 hover:shadow-marathon-green/30"
            >
              Hazte Socio
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center text-marathon-light hover:text-marathon-lime transition-colors rounded-full liquid-glass-pill"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
