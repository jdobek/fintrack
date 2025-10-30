import { JetBrains_Mono as FontMono, Inter as FontSans, Orelega_One as FontOrelega,  Inter_Tight as FontInterTight } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontOrelega = FontOrelega({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-orelega",
})

export const fontInterTight = FontInterTight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
})