"use client";

import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CLUB, SOCIAL_LINKS } from "@/lib/constants";
import { Send } from "lucide-react";
import Button from "@/components/ui/Button";

// Custom SVG social icons (lucide-react removed brand icons)
function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XTwitterIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ size = 24 }: { size?: number }) {
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

export default function CtaSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      id="cta"
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-marathon-darkest via-marathon-dark to-marathon-darkest" />

      {/* Centered glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-marathon-green/8 rounded-full blur-[150px] pointer-events-none" />

      <div
        ref={ref}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-marathon-light mb-4">
            Únete a la{" "}
            <span className="text-gradient">Furia Verde</span>
          </h2>
          <p className="text-lg text-marathon-light/50 font-body max-w-2xl mx-auto mb-10">
            Sé parte de la familia marathoniana. Sigue al equipo en redes sociales 
            y mantente al día con las últimas noticias, fichajes y resultados.
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex items-center justify-center gap-4 md:gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {SOCIAL_LINKS.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl glass-card text-marathon-light/60 hover:text-marathon-lime hover:border-marathon-lime/40 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              aria-label={social.name}
            >
              {socialIcons[social.icon]}
            </motion.a>
          ))}
        </motion.div>

        {/* Newsletter */}
        <motion.div
          className="glass-card rounded-2xl p-6 md:p-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-heading font-bold text-marathon-light mb-2">
            📬 Newsletter Verdolaga
          </h3>
          <p className="text-sm text-marathon-light/50 mb-4">
            Recibe las noticias del club directo en tu correo
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 bg-marathon-darkest/60 border border-marathon-green/20 rounded-xl text-marathon-light placeholder:text-marathon-light/30 text-sm focus:outline-none focus:border-marathon-lime/50 focus:ring-1 focus:ring-marathon-lime/30 transition-all duration-300"
              aria-label="Email para newsletter"
            />
            <Button variant="primary" size="md">
              <Send size={16} />
              Suscribirse
            </Button>
          </form>
        </motion.div>

        {/* Slogan */}
        <motion.p
          className="mt-12 text-2xl md:text-3xl font-heading font-bold text-marathon-lime italic"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          &ldquo;{CLUB.slogan}&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
