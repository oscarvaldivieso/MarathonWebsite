// ============================================
// Club Deportivo Marathón — Type Definitions
// ============================================

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Stat {
  value: number;
  label: string;
  suffix: string;
  isYear: boolean;
}

export interface Match {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  stadium: string;
  competition: string;
  isHome: boolean;
}

export interface FanQuote {
  text: string;
  author: string;
}

// ============================================
// Player & Staff Types
// ============================================

export interface PlayerStats {
  matchesPlayed: number;
  goals?: number; // For outfield players
  assists?: number; // For outfield players
  cleanSheets?: number; // For goalkeepers
  minutesPlayed: number;
  yellowCards: number;
  redCards: number;
}

export interface PlayerAttributes {
  pace?: number; // Ritmo
  shooting?: number; // Tiro
  passing?: number; // Pase
  dribbling?: number; // Regate
  defending?: number; // Defensa
  physical?: number; // Físico
  // For Goalkeepers:
  reflexes?: number;
  handling?: number;
  diving?: number;
  positioning?: number;
  kicking?: number;
  speed?: number;
}

export interface Player {
  id: string;
  name: string;
  fullName: string;
  number: number;
  position: "Portero" | "Defensa" | "Mediocampista" | "Delantero";
  category: "goalkeeper" | "defender" | "midfielder" | "forward";
  image?: string;
  actionImage?: string;
  birthDate: string;
  birthPlace: string;
  nationality: string;
  height: string;
  weight: string;
  preferredFoot: "Derecho" | "Izquierdo" | "Ambidiestro";
  joinedDate: string;
  isCaptain?: boolean;
  stats: PlayerStats;
  attributes: PlayerAttributes;
  bio: string;
  quote?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  nationality: string;
  joinedDate: string;
  image?: string;
  bio: string;
}

