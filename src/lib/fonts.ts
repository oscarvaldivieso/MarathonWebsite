import { Inter, Outfit, Antonio } from "next/font/google";
import localFont from "next/font/local";

export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const antonio = Antonio({
  subsets: ["latin"],
  variable: "--font-antonio",
  display: "swap",
  weight: ["400", "700"],
});

export const elrotex = localFont({
  src: "../../public/fonts/elrotex.ttf",
  variable: "--font-elrotex",
  display: "swap",
});

export const elrotexSwash = localFont({
  src: "../../public/fonts/elrotexswash.ttf",
  variable: "--font-elrotex-swash",
  display: "swap",
});
