import type { Metadata, Viewport } from "next"
import { Orbitron } from "next/font/google"

import { UserStatsProvider } from "@/lib/user-stats-context"
import { AriaCoach } from "@/components/aria-coach"
import { RewardToast } from "@/components/reward-toast"
import "./globals.css"

/* ── Orbitron: sci-fi / gaming headings ── */
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "ARISE-X1 — Level Up Your Health",
  description:
    "ARISE-X1 is an AI-powered food & health tracker. Earn XP, track macros, battle unhealthy choices. Your behavioral health OS — gamified.",
}

export const viewport: Viewport = {
  themeColor: "#0f0a1e",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background ${orbitron.variable}`}>
      <head>
        {/* Press Start 2P + VT323 via Google Fonts (pixel art fonts) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <UserStatsProvider>
          {children}
          <RewardToast />
          <AriaCoach />
        </UserStatsProvider>
        
      </body>
    </html>
  )
}
