"use client"

import { useMemo, useState } from "react"
import { ArrowUp, Sparkles, Loader2, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteNav } from "@/components/site-nav"
import { BottomNav } from "@/components/bottom-nav"
import { MoodSelector } from "@/components/mood-selector"
import { MealCard } from "@/components/meal-card"
import { BehaviorInsightCard } from "@/components/behavior-insight-card"
import { meals, currentUser, insights } from "@/lib/mock-data"
import { useUserStats } from "@/lib/user-stats-context"
import type { Diet, HealthGoal, Meal, Mood } from "@/lib/types"

const GOALS: { value: HealthGoal; label: string }[] = [
  { value: "weight_loss", label: "Weight loss" },
  { value: "muscle_gain", label: "Muscle gain" },
  { value: "energy", label: "Energy" },
  { value: "gut_health", label: "Gut health" },
  { value: "balanced", label: "Balanced" },
]

const DIETS: { value: Diet; label: string }[] = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "non_vegetarian", label: "Non-veg" },
  { value: "jain", label: "Jain" },
  { value: "keto", label: "Keto" },
]

function pickMeal(goal: HealthGoal, mood: Mood): Meal {
  if (mood === "stressed") return meals.find((m) => m.tags.includes("comfort")) ?? meals[3]
  if (goal === "muscle_gain") return meals.find((m) => m.tags.includes("high-protein")) ?? meals[2]
  if (goal === "energy") return meals[0]
  if (goal === "gut_health") return meals.find((m) => m.fiber_g >= 8) ?? meals[0]
  return meals[2]
}

export default function RecommendPage() {
  const stats = useUserStats()
  const [goal, setGoal] = useState<HealthGoal>(currentUser.healthGoal)
  const [diet, setDiet] = useState<Diet>(currentUser.dietaryPreference)
  const [mood, setMood] = useState<Mood>("neutral")
  const [loading, setLoading] = useState(false)
  const [recommendation, setRecommendation] = useState<Meal | null>(null)

  const featuredInsight = useMemo(() => insights[0], [])

  const handleGenerate = async () => {
    setLoading(true)
    setRecommendation(null)
    // Simulated Groq + RAG round-trip
    await new Promise((r) => setTimeout(r, 1200))
    setRecommendation(pickMeal(goal, mood))
    setLoading(false)
  }

  const handleAcceptMeal = (meal: Meal) => {
    // Awards XP through context, recomputes leaderboard rank, fires global toast.
    stats.logMeal(meal.id, meal.xp_reward, meal.meal_name)
  }

  const alternatives = recommendation
    ? meals.filter((m) => m.id !== recommendation.id).slice(0, 3)
    : []

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-12">
      <SiteNav />

      <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex max-w-2xl flex-col gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              ARIA · context-aware
            </span>
            <h1 className="text-balance text-3xl font-extrabold tracking-tight md:text-4xl">
              What should you eat <span className="text-primary">right now</span>?
            </h1>
            <p className="max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
              ARIA combines your goal, diet, mood, and recent meal history to ground every
              recommendation in real data &mdash; not guesswork. Logging a meal earns XP and
              moves you up the leaderboard.
            </p>
          </div>

          {/* Live rank chip */}
          <div className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/20 text-primary ring-1 ring-primary/40">
              <Trophy className="size-4" aria-hidden="true" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                Your rank
              </span>
              <span className="flex items-baseline gap-1 text-xl font-extrabold text-primary">
                #{stats.rank.rank}
                {stats.rank.delta > 0 && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/20 px-1.5 py-0.5 font-mono text-[10px]">
                    <ArrowUp className="size-3" aria-hidden="true" />
                    {stats.rank.delta}
                  </span>
                )}
              </span>
            </div>
          </div>
        </header>

        {/* Form */}
        <section
          aria-label="Recommendation inputs"
          className="flex flex-col gap-6 rounded-xl border border-border/60 bg-card p-5 md:p-6"
        >
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Health goal
            </label>
            <div className="flex flex-wrap gap-2">
              {GOALS.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGoal(g.value)}
                  className={
                    goal === g.value
                      ? "rounded-md border border-primary/50 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"
                      : "rounded-md border border-border/60 bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
                  }
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Dietary preference
            </label>
            <div className="flex flex-wrap gap-2">
              {DIETS.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDiet(d.value)}
                  className={
                    diet === d.value
                      ? "rounded-md border border-primary/50 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"
                      : "rounded-md border border-border/60 bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
                  }
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Mood right now
            </label>
            <MoodSelector value={mood} onChange={setMood} />
          </div>

          <Button
            size="lg"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full font-bold"
          >
            {loading ? (
              <>
                <Loader2 className="mr-1 size-4 animate-spin" aria-hidden="true" />
                ARIA is thinking…
              </>
            ) : (
              <>
                <Sparkles className="mr-1 size-4" aria-hidden="true" />
                Generate recommendation
              </>
            )}
          </Button>
        </section>

        {/* Insight */}
        <BehaviorInsightCard insight={featuredInsight} />

        {/* Result */}
        {loading && (
          <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-5">
            <div className="h-3 w-1/3 animate-pulse rounded bg-secondary" />
            <div className="h-6 w-2/3 animate-pulse rounded bg-secondary" />
            <div className="h-20 w-full animate-pulse rounded bg-secondary" />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-14 animate-pulse rounded bg-secondary" />
              ))}
            </div>
          </div>
        )}

        {recommendation && !loading && (
          <section className="flex flex-col gap-4">
            <MealCard
              meal={recommendation}
              onAccept={() => handleAcceptMeal(recommendation)}
              accepted={stats.loggedMealIds.has(recommendation.id)}
            />

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Alternatives
              </h3>
              <div className="grid gap-3 md:grid-cols-3">
                {alternatives.map((alt) => (
                  <article
                    key={alt.id}
                    className="flex flex-col gap-2 rounded-xl border border-border/60 bg-card p-4"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {alt.cuisine} · {alt.preparation_time_min} min
                    </span>
                    <h4 className="text-sm font-semibold leading-tight">{alt.meal_name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {alt.calories} cal · {alt.protein_g}g protein
                      </span>
                      <span className="rounded-md bg-primary/15 px-2 py-0.5 text-[11px] font-bold text-primary ring-1 ring-primary/30">
                        +{alt.xp_reward} XP
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
