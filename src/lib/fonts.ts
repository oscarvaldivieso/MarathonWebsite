import { Inter, Outfit, Antonio } from "next/font/google";

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
