"use client"

import Link from "next/link"
import {
  ArrowRight,
  ArrowUp,
  Coins,
  Footprints,
  Map,
  Mic,
  Salad,
  Target,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteNav } from "@/components/site-nav"
import { BottomNav } from "@/components/bottom-nav"
import { XPBar } from "@/components/xp-bar"
import { StreakCounter } from "@/components/streak-counter"
import { StatTile } from "@/components/stat-tile"
import { HydrationTracker } from "@/components/hydration-tracker"
import { BehaviorInsightCard } from "@/components/behavior-insight-card"
import { MealCard } from "@/components/meal-card"
import { useUserStats } from "@/lib/user-stats-context"
import { currentUser, insights, meals, quests } from "@/lib/mock-data"

const QUICK_ACTIONS = [
  { href: "/recommend", label: "Get a meal", Icon: Salad, tone: "primary" as const },
  { href: "/quests", label: "Today's quests", Icon: Target, tone: "primary" as const },
  { href: "/explore", label: "Live walking", Icon: Map, tone: "accent" as const },
  { href: "/voice", label: "Ask ARIA", Icon: Mic, tone: "accent" as const },
  { href: "/leaderboard", label: "Leaderboard", Icon: Trophy, tone: "neutral" as const },
]

export default function DashboardPage() {
  const stats = useUserStats()

  const featured = meals[2] // paneer bowl — fits the Tuesday-protein insight
  const top3 = stats.leaderboard.slice(0, 3)
  const previewQuests = quests
    .filter((q) => q.status !== "claimed" && !stats.completedQuestIds.has(q.id))
    .slice(0, 3)
  const stepsPct = Math.min(
    100,
    Math.round((stats.steps / currentUser.stepsTarget) * 100),
  )
  const rankUp = stats.rank.delta > 0

  return (
    <div className="relative min-h-screen bg-background pb-24 md:pb-12">
      <SiteNav />

      {/* Soft background wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-aurora opacity-60"
      />

      <main className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
        {/* Header with live rank chip */}
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Good evening
            </span>
            <h1 className="text-balance text-3xl font-extrabold tracking-tight md:text-4xl">
              Welcome back, <span className="text-primary">{currentUser.displayName}</span>.
            </h1>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/40">
              <Trophy className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                Your rank
              </span>
              <span className="flex items-baseline gap-1.5 text-2xl font-extrabold text-primary">
                #{stats.rank.rank}
                {rankUp && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/20 px-1.5 py-0.5 font-mono text-[10px]">
                    <ArrowUp className="size-3" aria-hidden="true" />
                    {stats.rank.delta}
                  </span>
                )}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                of {stats.rank.total}
              </span>
            </div>
          </div>
        </header>

        {/* Top stats */}
        <section
          aria-label="Your stats"
          className="grid gap-3 md:grid-cols-2 lg:grid-cols-4"
        >
          <div className="rounded-xl border border-border/60 glass p-4 lg:col-span-2">
            <XPBar totalXP={stats.xp} level={stats.level} />
          </div>
          <StreakCounter streak={stats.streak} />
          <StatTile
            Icon={Coins}
            label="Coins"
            value={stats.coins}
            hint={`${stats.mealsLogged} meals logged`}
            tone="accent"
          />
        </section>

        {/* Quick actions */}
        <section
          aria-label="Quick actions"
          className="grid grid-cols-2 gap-3 md:grid-cols-5"
        >
          {QUICK_ACTIONS.map(({ href, label, Icon, tone }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col items-start gap-3 rounded-xl border border-border/60 glass p-4 transition-colors hover:border-primary/40"
            >
              <span
                className={
                  tone === "primary"
                    ? "flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30"
                    : tone === "accent"
                      ? "flex size-10 items-center justify-center rounded-lg bg-accent/15 text-accent ring-1 ring-accent/40"
                      : "flex size-10 items-center justify-center rounded-lg bg-secondary text-foreground ring-1 ring-border"
                }
                aria-hidden="true"
              >
                <Icon className="size-5" />
              </span>
              <span className="text-sm font-semibold">{label}</span>
            </Link>
          ))}
        </section>

        {/* Today's quests preview + Live walking tile */}
        <section className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 flex flex-col gap-3">
            <header className="flex items-end justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Today&apos;s quests
              </h2>
              <Button asChild variant="ghost" size="sm" className="text-xs">
                <Link href="/quests">
                  All quests
                  <ArrowRight className="ml-1 size-3" aria-hidden="true" />
                </Link>
              </Button>
            </header>
            <ul className="flex flex-col gap-2">
              {previewQuests.map((q) => {
                const pct = Math.round((q.progress / q.target) * 100)
                const ready = q.status === "ready"
                return (
                  <li key={q.id}>
                    <Link
                      href="/quests"
                      className={`group flex items-center gap-4 rounded-xl border p-4 transition-colors ${
                        ready
                          ? "border-primary/40 glass glow-primary"
                          : "border-border/60 glass hover:border-primary/30"
                      }`}
                    >
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                          ready
                            ? "bg-primary/20 text-primary ring-1 ring-primary/40"
                            : "bg-secondary text-foreground ring-1 ring-border"
                        }`}
                        aria-hidden="true"
                      >
                        <Target className="size-5" />
                      </span>
                      <div className="flex flex-1 flex-col gap-1.5">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold leading-tight">
                            {q.title}
                          </span>
                          <span className="font-mono text-[11px] font-bold text-primary">
                            +{q.xpReward} XP
                          </span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          {ready ? "Ready to claim" : `${q.progress} / ${q.target}`}
                        </span>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Live walking compact card */}
          <Link
            href="/explore"
            className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border/60 glass p-5 transition-colors hover:border-accent/40"
          >
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-12 size-40 rounded-full bg-accent/20 blur-3xl"
            />
            <div className="relative flex items-start justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/40 glow-accent">
                <Footprints className="size-5" aria-hidden="true" />
              </span>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                Live
              </span>
            </div>
            <div className="relative flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Steps today
              </span>
              <span className="text-3xl font-extrabold leading-none">
                {stats.steps.toLocaleString()}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Goal {currentUser.stepsTarget.toLocaleString()}
              </span>
            </div>
            <div className="relative h-1.5 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${stepsPct}%` }}
              />
            </div>
            <p className="relative text-xs leading-relaxed text-muted-foreground">
              {stats.rank.ahead
                ? `${stats.rank.ahead.displayName} is ${(stats.rank.ahead.xp - stats.xp).toLocaleString()} XP above you. Walk one pickup.`
                : "You're #1 — defend your spot with a walk."}
            </p>
          </Link>
        </section>

        {/* Recommended meal + hydration */}
        <section className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <header className="mb-3 flex items-end justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Today&apos;s recommendation
              </h2>
              <Button asChild variant="ghost" size="sm" className="text-xs">
                <Link href="/recommend">
                  More options
                  <ArrowRight className="ml-1 size-3" aria-hidden="true" />
                </Link>
              </Button>
            </header>
            <MealCard meal={featured} />
          </div>

          <HydrationTracker
            initial={stats.hydrationGlasses}
            target={currentUser.hydrationTarget}
          />
        </section>

        {/* Insights */}
        <section aria-label="Behavior insights" className="flex flex-col gap-3">
          <header className="flex items-end justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Behavior insights
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Last 14 days
            </span>
          </header>
          <div className="grid gap-3 md:grid-cols-3">
            {insights.map((insight) => (
              <BehaviorInsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </section>

        {/* Mini leaderboard (live from context) */}
        <section aria-label="Leaderboard preview" className="flex flex-col gap-3">
          <header className="flex items-end justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              This week&apos;s top movers
            </h2>
            <Button asChild variant="ghost" size="sm" className="text-xs">
              <Link href="/leaderboard">
                View all
                <ArrowRight className="ml-1 size-3" aria-hidden="true" />
              </Link>
            </Button>
          </header>
          <ol className="flex flex-col gap-2">
            {top3.map((entry) => (
              <li
                key={entry.userId}
                className={
                  entry.isYou
                    ? "flex items-center gap-4 rounded-xl border border-primary/40 glass glow-primary px-4 py-3"
                    : "flex items-center gap-4 rounded-xl border border-border/60 glass px-4 py-3"
                }
              >
                <span
                  className={
                    entry.rank === 1
                      ? "flex size-8 items-center justify-center rounded-md bg-primary/15 font-mono text-sm font-bold text-primary ring-1 ring-primary/30"
                      : "flex size-8 items-center justify-center rounded-md bg-secondary font-mono text-sm font-bold text-foreground ring-1 ring-border"
                  }
                >
                  {entry.rank}
                </span>
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-semibold">
                    {entry.displayName}
                    {entry.isYou && (
                      <span className="ml-2 rounded-sm bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                        You
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    Level {entry.level} · {entry.streak}d streak
                  </span>
                </div>
                <span className="font-mono text-sm font-bold text-primary">
                  {entry.xp.toLocaleString()} XP
                </span>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
