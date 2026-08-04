// ============================================
// Club Deportivo Marathón — Constantes del Club
// ============================================

export const CLUB = {
  name: "Club Deportivo Marathon",
  shortName: "Marathon",
  nickname: "Furia Verde",
  slogan: "Soy del verde, soy feliz",
  historicName: "El equipo de Paz Barahona",
  founded: 1925,
  city: "San Pedro Sula",
  country: "Honduras",
  league: "Liga Nacional de Honduras",
  division: "Primera División Profesional",
  stadium: "Yankel Rosenthal",
  mascot: "Monstruo Verde",
  titles: 9,
  instagramFollowers: "50K+",
} as const;

export const STATS = [
  {
    value: 1925,
    label: "Año de Fundación",
    suffix: "",
    isYear: true,
  },
  {
    value: 9,
    label: "Títulos de Liga",
    suffix: "",
    isYear: false,
  },
  {
    value: 50,
    label: "Seguidores en Redes",
    suffix: "K+",
    isYear: false,
  },
  {
    value: 100,
    label: "Años de Historia",
    suffix: "+",
    isYear: false,
  },
] as const;

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Equipo", href: "/equipo" },
  { label: "Historia", href: "/historia" },
  { label: "Noticias", href: "/noticias" },
  { label: "Estadio", href: "/estadio" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/cdaborigenmarathon/",
    icon: "instagram",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/CDMarathon/",
    icon: "facebook",
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/cdmarathon",
    icon: "twitter",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@ClubDeportivoMarathon",
    icon: "youtube",
  },
] as const;

// Datos placeholder para el próximo partido
export const NEXT_MATCH = {
  homeTeam: "Marathón",
  awayTeam: "Olimpia",
  date: "2025-08-15",
  time: "19:00",
  stadium: "Yankel Rosenthal",
  competition: "Liga Nacional - Jornada 5",
  isHome: true,
} as const;

export const FAN_QUOTES = [
  {
    text: "Los aficionados son apasionados, fieles, sufren pero están ahí.",
    author: "Hincha verdolaga",
  },
  {
    text: "El verde no es un color, es un sentimiento que se lleva en el corazón.",
    author: "Aficionado marathoniano",
  },
  {
    text: "De la cuna al cajón, siempre con el Marathón.",
    author: "Barra Ultra Fiel Verde",
  },
] as const;
