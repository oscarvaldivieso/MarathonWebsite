"use client";

import React from "react";
import { motion } from "framer-motion";
import { NAV_LINKS, CLUB, SOCIAL_LINKS } from "@/lib/constants";

interface MobileMenuProps {
  onClose: () => void;
}

// Custom SVG social icons (lucide-react removed brand icons)
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XTwitterIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const socialIcons: Record<string, React.ReactNode> = {
  instagram: <InstagramIcon />,
  facebook: <FacebookIcon />,
  twitter: <XTwitterIcon />,
  youtube: <YoutubeIcon />,
};

const menuVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  exit: { opacity: 0, x: 30, transition: { duration: 0.2 } },
};

export default function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <motion.div
      className="fixed inset-0 z-40 bg-marathon-darkest/98 backdrop-blur-xl flex flex-col justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.nav
        className="flex flex-col items-center gap-2"
        variants={menuVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {NAV_LINKS.map((link) => (
          <motion.a
            key={link.href}
            href={link.href}
            className="text-3xl sm:text-4xl font-heading font-bold text-marathon-light hover:text-marathon-lime transition-colors duration-300 py-2"
            variants={itemVariants}
            onClick={onClose}
          >
            {link.label}
          </motion.a>
        ))}

        <motion.div variants={itemVariants} className="mt-6">
          <a
            href="#cta"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-8 py-3 bg-marathon-lime text-marathon-darkest font-heading font-bold rounded-xl text-lg hover:bg-marathon-green hover:text-marathon-light transition-all duration-300"
          >
            Hazte Socio
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 mt-8"
        >
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-marathon-green/30 text-marathon-light/60 hover:text-marathon-lime hover:border-marathon-lime/50 transition-all duration-300"
              aria-label={social.name}
            >
              {socialIcons[social.icon]}
            </a>
          ))}
        </motion.div>

        {/* Slogan */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-sm text-marathon-light/30 italic font-body"
        >
          &ldquo;{CLUB.slogan}&rdquo;
        </motion.p>
      </motion.nav>
    </motion.div>
  );
}
