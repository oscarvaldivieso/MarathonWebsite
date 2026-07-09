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
