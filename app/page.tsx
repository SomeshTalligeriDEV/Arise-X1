"use client"
import { useState } from "react"
import Link from "next/link"
import { LoadingScreen } from "@/components/loading-screen"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteNav } from "@/components/site-nav"
import { FeatureMarquee } from "@/components/feature-marquee"

const STATS = [
  { value: "2.3s", label: "Avg AI response" },
  { value: "500M+", label: "Vernacular speakers" },
  { value: "0", label: "Dark patterns" },
  { value: "12+", label: "Behavioral signals" },
]

export default function LandingPage() {
  const [loaded, setLoaded] = useState(false)
  if (!loaded) return <LoadingScreen onReady={() => setLoaded(true)} />

  return (
    <div className="relative min-h-screen bg-background">
      <SiteNav />
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-aurora" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 md:pt-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            <Sparkles className="size-3" aria-hidden="true" />
            Behavioral health OS
          </span>
          <h1 className="mt-6 text-4xl font-extrabold md:text-6xl">
            Your health. <span className="text-primary">Gamified.</span> Evolved.
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            ARIA learns your food patterns and guides every meal — in your language, on your terms.
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild size="lg" className="font-bold glow-primary">
              <Link href="/dashboard">Start your journey <ArrowRight className="ml-1 size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden border-y border-border/60 bg-border/60 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center justify-center gap-1 bg-background px-4 py-6">
            <div className="text-3xl font-extrabold text-primary">{stat.value}</div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <header className="mx-auto mb-8 flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">What ARISE-X1 does</span>
          <h2 className="text-balance text-2xl font-bold md:text-4xl">
            Eight systems. <span className="text-primary">One operating system for health.</span>
          </h2>
        </header>
        <FeatureMarquee />
      </section>
    </div>
  )
}
