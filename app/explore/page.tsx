"use client"

import { useMemo, useState } from "react"
import {
  Apple,
  Coffee,
  Coins,
  Droplets,
  Footprints,
  MapPin,
  ShoppingBasket,
  Sparkles,
  Sun,
  Trophy,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteNav } from "@/components/site-nav"
import { BottomNav } from "@/components/bottom-nav"
import { ExploreMap } from "@/components/explore-map"
import { walkSpots as initialSpots, currentUser } from "@/lib/mock-data"
import { useUserStats } from "@/lib/user-stats-context"
import type { SpotKind, WalkSpot } from "@/lib/types"
import { cn } from "@/lib/utils"

const KIND_ICON: Record<SpotKind, LucideIcon> = {
  produce: Apple,
  hydration: Droplets,
  jog: Footprints,
  cafe: Coffee,
  yoga: Sun,
  market: ShoppingBasket,
}

export default function ExplorePage() {
  const stats = useUserStats()
  const [spots, setSpots] = useState<WalkSpot[]>(initialSpots)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [userPos, setUserPos] = useState({ x: 50, y: 50 })
  const [walking, setWalking] = useState(false)

  // Mirror context-claimed spots into local UI state.
  const visibleSpots = useMemo(
    () =>
      spots.map((s) =>
        stats.claimedSpotIds.has(s.id) ? { ...s, claimed: true } : s,
      ),
    [spots, stats.claimedSpotIds],
  )

  const activeSpot = useMemo(
    () => visibleSpots.find((s) => s.id === activeId) ?? null,
    [activeId, visibleSpots],
  )

  const distanceToActive = useMemo(() => {
    if (!activeSpot) return null
    const dx = activeSpot.x - userPos.x
    const dy = activeSpot.y - userPos.y
    return Math.sqrt(dx * dx + dy * dy)
  }, [activeSpot, userPos])

  const arrived = distanceToActive !== null && distanceToActive < 6

  function selectSpot(id: string) {
    const s = visibleSpots.find((sp) => sp.id === id)
    if (!s || s.claimed) return
    setActiveId(id)
  }

  function walkToActive() {
    if (!activeSpot || walking) return
    setWalking(true)
    // Animate user dot toward spot in a few small ticks (position + steps).
    const ticks = 6
    const startX = userPos.x
    const startY = userPos.y
    const stepsPerTick = Math.max(1, Math.round(activeSpot.distanceM / ticks / 0.7))
    let i = 0
    const tick = () => {
      i += 1
      const t = i / ticks
      setUserPos({
        x: startX + (activeSpot.x - startX) * t,
        y: startY + (activeSpot.y - startY) * t,
      })
      stats.addSteps(stepsPerTick)
      if (i < ticks) {
        setTimeout(tick, 220)
      } else {
        setWalking(false)
      }
    }
    setTimeout(tick, 100)
  }

  function claimActive() {
    if (!activeSpot || !arrived) return
    setSpots((prev) =>
      prev.map((s) => (s.id === activeSpot.id ? { ...s, claimed: true } : s)),
    )
    // Awards XP + coins through context, recomputes leaderboard rank,
    // and fires the global reward toast.
    stats.claimSpot(
      activeSpot.id,
      activeSpot.xpReward,
      activeSpot.coinReward,
      0,
      activeSpot.name,
    )
    setActiveId(null)
  }

  const stepsPct = Math.min(
    100,
    Math.round((stats.steps / currentUser.stepsTarget) * 100),
  )
  const remainingSpots = visibleSpots.filter((s) => !s.claimed).length

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-12">
      <SiteNav />

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-6 md:py-10">
        {/* Header */}
        <header className="flex flex-col gap-2">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
            <MapPin className="size-3" aria-hidden="true" />
            Live walking · Bengaluru
          </span>
          <h1 className="text-balance text-3xl font-extrabold tracking-tight md:text-4xl">
            Your neighborhood is the <span className="text-primary">game board.</span>
          </h1>
          <p className="text-pretty max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Walk to nearby pickups to claim XP &amp; coins. Every meter counts toward your daily
            quest.
          </p>
        </header>

        {/* Stats strip */}
        <section
          aria-label="Live walking stats"
          className="grid grid-cols-2 gap-3 md:grid-cols-4"
        >
          <StatCard
            Icon={Footprints}
            label="Steps today"
            value={stats.steps.toLocaleString()}
            sub={`Goal ${currentUser.stepsTarget.toLocaleString()}`}
            progress={stepsPct}
            tone="primary"
          />
          <StatCard
            Icon={MapPin}
            label="Pickups nearby"
            value={`${remainingSpots}`}
            sub={`${visibleSpots.length - remainingSpots} claimed`}
            tone="accent"
          />
          <StatCard
            Icon={Sparkles}
            label="Earned today"
            value={`+${stats.earnedToday.xp} XP`}
            sub={`+${stats.earnedToday.coins} coins`}
            tone="primary"
          />
          <StatCard
            Icon={Trophy}
            label="Rank"
            value={`#${stats.rank.rank}`}
            sub={`${stats.xp.toLocaleString()} XP · L${stats.level}`}
            tone="accent"
          />
        </section>

        {/* Map + active spot panel */}
        <section className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ExploreMap
              spots={visibleSpots}
              activeSpotId={activeId}
              userPos={userPos}
              onSelectSpot={selectSpot}
            />
          </div>

          <aside
            aria-label="Active pickup"
            className="flex flex-col gap-4 rounded-2xl border border-border/60 glass-strong p-5"
          >
            {activeSpot ? (
              <>
                <header className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30 glow-primary">
                      {(() => {
                        const Icon = KIND_ICON[activeSpot.kind]
                        return <Icon className="size-5" aria-hidden="true" />
                      })()}
                    </span>
                    <div className="flex flex-col leading-tight">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {activeSpot.kind}
                      </span>
                      <h2 className="text-base font-bold">{activeSpot.name}</h2>
                    </div>
                  </div>
                </header>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {activeSpot.blurb}
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <Stat label="Distance" value={`${activeSpot.distanceM} m`} />
                  <Stat label="Reward" value={`+${activeSpot.xpReward} XP`} />
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  {!arrived ? (
                    <Button
                      onClick={walkToActive}
                      disabled={walking}
                      className="font-semibold"
                    >
                      {walking ? "Walking…" : "Walk here"}
                    </Button>
                  ) : (
                    <Button
                      onClick={claimActive}
                      className="font-bold glow-primary"
                    >
                      <Coins className="size-4" aria-hidden="true" />
                      Claim +{activeSpot.xpReward} XP
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => setActiveId(null)}
                    className="font-semibold"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-start gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-foreground ring-1 ring-border">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <h2 className="text-base font-bold">Tap a pickup on the map</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Or pick from the list below. Walk close enough to claim its reward.
                </p>
              </div>
            )}
          </aside>
        </section>

        {/* Spot list */}
        <section aria-label="All pickups" className="flex flex-col gap-3">
          <header className="flex items-end justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              All pickups
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {remainingSpots} remaining
            </span>
          </header>

          <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {visibleSpots.map((spot) => {
              const Icon = KIND_ICON[spot.kind]
              const isActive = spot.id === activeId
              return (
                <li key={spot.id}>
                  <button
                    type="button"
                    onClick={() => selectSpot(spot.id)}
                    disabled={spot.claimed}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                      spot.claimed
                        ? "cursor-not-allowed border-border/40 bg-card/40 opacity-60"
                        : "border-border/60 glass hover:border-primary/40",
                      isActive && !spot.claimed && "border-primary/50 glow-primary",
                    )}
                    aria-pressed={isActive}
                  >
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-lg ring-1",
                        spot.claimed
                          ? "bg-secondary text-muted-foreground ring-border"
                          : "bg-primary/15 text-primary ring-primary/30",
                      )}
                      aria-hidden="true"
                    >
                      <Icon className="size-5" />
                    </span>
                    <div className="flex flex-1 flex-col leading-tight">
                      <span className="text-sm font-semibold">{spot.name}</span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                        {spot.distanceM} m · +{spot.xpReward} XP
                      </span>
                    </div>
                    {spot.claimed ? (
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        Claimed
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary group-hover:underline">
                        Open
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

function StatCard({
  Icon,
  label,
  value,
  sub,
  progress,
  tone,
}: {
  Icon: LucideIcon
  label: string
  value: string
  sub?: string
  progress?: number
  tone: "primary" | "accent"
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/60 glass p-4">
      <div className="flex items-center gap-3">
        <span
          className={
            tone === "primary"
              ? "flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30"
              : "flex size-9 items-center justify-center rounded-lg bg-accent/15 text-accent ring-1 ring-accent/40"
          }
          aria-hidden="true"
        >
          <Icon className="size-4" />
        </span>
        <div className="flex flex-col leading-tight">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {label}
          </span>
          <span className="text-lg font-bold">{value}</span>
        </div>
      </div>
      {progress !== undefined ? (
        <div className="flex flex-col gap-1.5">
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
          {sub && (
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {sub}
            </span>
          )}
        </div>
      ) : (
        sub && (
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {sub}
          </span>
        )
      )}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-md border border-border/60 bg-secondary/40 px-2.5 py-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-bold">{value}</span>
    </div>
  )
}
