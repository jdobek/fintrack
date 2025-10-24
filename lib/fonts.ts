import { JetBrains_Mono as FontMono, Inter as FontSans, Orelega_One as FontOrelega } from "next/font/google"

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
