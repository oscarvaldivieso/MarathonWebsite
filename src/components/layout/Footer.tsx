import React from "react";
import { CLUB, NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { Heart } from "lucide-react";

// Custom SVG social icons (lucide-react removed brand icons)
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XTwitterIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-marathon-darkest border-t border-marathon-green/10">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-marathon-green/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-marathon-green rounded-lg rotate-45" />
                <span className="relative text-marathon-light font-heading font-black text-lg z-10">
                  M
                </span>
              </div>
              <div>
                <p className="font-heading font-bold text-marathon-light text-sm">
                  {CLUB.shortName}
                </p>
                <p className="text-marathon-lime text-[10px] font-semibold uppercase tracking-widest">
                  {CLUB.nickname}
                </p>
              </div>
            </div>
            <p className="text-marathon-light/50 text-sm leading-relaxed mb-4 font-body">
              {CLUB.name}. {CLUB.city}, {CLUB.country}. Fundado en{" "}
              {CLUB.founded}. {CLUB.titles} veces campeón de la{" "}
              {CLUB.league}.
            </p>
            <p className="text-marathon-lime italic text-sm font-heading">
              &ldquo;{CLUB.slogan}&rdquo;
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-marathon-light text-sm uppercase tracking-wider mb-4">
              Navegación
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-marathon-light/50 text-sm hover:text-marathon-lime transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Club Info */}
          <div>
            <h3 className="font-heading font-bold text-marathon-light text-sm uppercase tracking-wider mb-4">
              El Club
            </h3>
            <ul className="space-y-2 text-sm text-marathon-light/50">
              <li>📍 {CLUB.city}, {CLUB.country}</li>
              <li>🏟️ Estadio {CLUB.stadium}</li>
              <li>⚽ {CLUB.league}</li>
              <li>🏆 {CLUB.titles}x Campeón</li>
              <li>🦖 {CLUB.mascot}</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-heading font-bold text-marathon-light text-sm uppercase tracking-wider mb-4">
              Síguenos
            </h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-marathon-dark/50 border border-marathon-green/20 text-marathon-light/60 hover:text-marathon-lime hover:border-marathon-lime/40 hover:bg-marathon-dark transition-all duration-300"
                  aria-label={social.name}
                >
                  {socialIcons[social.icon]}
                </a>
              ))}
            </div>
            <p className="text-xs text-marathon-light/30">
              +{CLUB.instagramFollowers} seguidores en Instagram
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-marathon-green/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-marathon-light/30 font-body">
            © {currentYear} {CLUB.name}. Fundado en {CLUB.founded}. Todos los
            derechos reservados.
          </p>
          <p className="text-xs text-marathon-light/30 font-body flex items-center gap-1">
            Hecho con <Heart size={12} className="text-marathon-green fill-marathon-green" /> por un verdolaga
          </p>
        </div>
      </div>
    </footer>
  );
}
