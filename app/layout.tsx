import type { Metadata, Viewport } from "next"
import { Orbitron, Inter } from "next/font/google"
import { UserStatsProvider } from "@/lib/user-stats-context"
import { AriaCoach } from "@/components/aria-coach"
import { RewardToast } from "@/components/reward-toast"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Arise-X1 | AI-Powered Health Gamification",
  description: "Level up your health with Arise-X1. Track food with AI, earn XP, and compete in fitness challenges. Your behavioral health OS.",
  keywords: ["health tracker", "AI nutrition", "fitness game", "XP fitness", "Arise-X1"],
  authors: [{ name: "Arise-X1 Team" }],
  openGraph: {
    title: "Arise-X1 | Level Up Your Health",
    description: "The world's first AI-powered health OS that feels like a game.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0f0a1e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${orbitron.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/30">
        <UserStatsProvider>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
          <RewardToast />
          <AriaCoach />
        </UserStatsProvider>
      </body>
    </html>
  )
}
