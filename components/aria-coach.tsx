"use client"

/**
 * ARIA Coach — floating glass chat widget that lives globally.
 *
 * Uses dummy rule-based replies so the demo works with no API keys,
 * but pulls live numbers (XP, rank, streak, hydration, steps) from
 * UserStatsContext so its answers feel real and current.
 *
 * Architecture seam: the `generateAriaReply` function below is the
 * single place to swap in a real AI SDK call later.
 */

import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowUp,
  Bot,
  Loader2,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUserStats } from "@/lib/user-stats-context"
import { cn } from "@/lib/utils"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  text: string
  ts: number
}

const SUGGESTIONS = [
  "What should I eat right now?",
  "How do I climb the leaderboard?",
  "Plan my week",
  "How's my streak?",
  "Tips for low-energy days",
] as const

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export function AriaCoach() {
  const stats = useUserStats()
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const [draft, setDraft] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: uid(),
      role: "assistant",
      ts: Date.now(),
      text: `Hi, I'm ARIA — your nutrition coach. You're at ${stats.xp.toLocaleString()} XP, rank #${stats.rank.rank}, with a ${stats.streak}-day streak. Ask me anything, or pick a suggestion below.`,
    },
  ])
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Live snapshot for replies + greeting refresh when panel opens
  const live = useMemo(
    () => ({
      xp: stats.xp,
      rank: stats.rank.rank,
      total: stats.rank.total,
      ahead: stats.rank.ahead?.displayName ?? null,
      streak: stats.streak,
      steps: stats.steps,
      hydration: stats.hydrationGlasses,
      meals: stats.mealsLogged,
      level: stats.level,
    }),
    [stats],
  )

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (!open) return
    const el = scrollerRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages, open, pending])

  // Focus input when panel opens
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || pending) return

    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      text: trimmed,
      ts: Date.now(),
    }
    setMessages((m) => [...m, userMsg])
    setDraft("")
    setPending(true)

    // Simulated streaming round-trip
    window.setTimeout(() => {
      const reply = generateAriaReply(trimmed, live)
      setMessages((m) => [
        ...m,
        { id: uid(), role: "assistant", text: reply, ts: Date.now() },
      ])
      setPending(false)
    }, 700)
  }

  return (
    <>
      {/* Floating action button */}
      <button
        type="button"
        aria-label={open ? "Close ARIA coach" : "Open ARIA coach"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "fixed z-[60] flex items-center gap-2 rounded-full font-bold text-primary-foreground shadow-2xl transition-all",
          "right-4 bottom-24 md:right-6 md:bottom-6",
          "bg-primary px-4 py-3 hover:scale-[1.03] active:scale-95",
          "glow-primary",
        )}
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <>
            <Sparkles className="size-5" aria-hidden="true" />
            <span className="hidden sm:inline text-sm">Ask ARIA</span>
            <span className="ml-1 inline-flex size-5 items-center justify-center rounded-full bg-primary-foreground/15 font-mono text-[10px]">
              AI
            </span>
          </>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="ARIA chat"
          className={cn(
            "fixed z-[59] flex flex-col overflow-hidden rounded-3xl border border-border/60 shadow-2xl",
            "glass-strong",
            // Mobile: nearly full-width, anchored bottom-right above bottom nav.
            "right-3 bottom-40 left-3 max-h-[70vh]",
            // Desktop: pinned to right side as a 380×560 panel.
            "md:left-auto md:bottom-24 md:right-6 md:w-[380px] md:max-h-[560px]",
          )}
        >
          {/* Header */}
          <header className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
            <span
              aria-hidden="true"
              className="relative flex size-9 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/40"
            >
              <Bot className="size-5" />
              <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full bg-primary ring-2 ring-card animate-pulse" />
            </span>
            <div className="flex flex-1 flex-col leading-tight">
              <span className="text-sm font-bold">ARIA</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Your AI coach · online
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </header>

          {/* Messages */}
          <div
            ref={scrollerRef}
            className="flex-1 overflow-y-auto px-4 py-4"
            role="log"
            aria-live="polite"
          >
            <ul className="flex flex-col gap-3">
              {messages.map((m) => (
                <li
                  key={m.id}
                  className={cn(
                    "flex max-w-[88%] flex-col gap-1",
                    m.role === "user" ? "ml-auto items-end" : "mr-auto items-start",
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "border border-border/60 bg-card/70 text-foreground",
                    )}
                  >
                    {m.text}
                  </div>
                </li>
              ))}
              {pending && (
                <li className="mr-auto flex items-center gap-2 rounded-2xl border border-border/60 bg-card/70 px-3 py-2 text-xs text-muted-foreground">
                  <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                  ARIA is thinking…
                </li>
              )}
            </ul>
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-2">
              {SUGGESTIONS.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border/60 bg-card/60 px-3 py-1 text-[11px] font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(draft)
            }}
            className="flex items-center gap-2 border-t border-border/60 px-3 py-3"
          >
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              type="text"
              autoComplete="off"
              placeholder="Ask ARIA about meals, streaks, or your rank…"
              aria-label="Message ARIA"
              className="flex-1 rounded-full border border-border/60 bg-secondary/50 px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
            />
            <Button
              type="submit"
              size="icon"
              disabled={pending || !draft.trim()}
              aria-label="Send message"
              className="rounded-full"
            >
              {pending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="size-4" aria-hidden="true" />
              )}
            </Button>
          </form>

          {/* Footer micro-help */}
          <div className="flex items-center justify-between border-t border-border/60 px-4 py-2">
            <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <MessageCircle className="size-3" aria-hidden="true" />
              Demo · dummy data
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              Rank #{live.rank} · {live.xp.toLocaleString()} XP
            </span>
          </div>
        </div>
      )}
    </>
  )
}

/* -------------------------------------------------------------- */
/*  Dummy reply engine                                            */
/* -------------------------------------------------------------- */

interface LiveSnapshot {
  xp: number
  rank: number
  total: number
  ahead: string | null
  streak: number
  steps: number
  hydration: number
  meals: number
  level: number
}

function generateAriaReply(input: string, live: LiveSnapshot): string {
  const q = input.toLowerCase()

  // Rank / leaderboard
  if (/(rank|leaderboard|position|climb)/.test(q)) {
    const aheadLine = live.ahead
      ? ` Next target: pass ${live.ahead} above you.`
      : " You're at the top — defend your spot."
    return `You're currently #${live.rank} of ${live.total} with ${live.xp.toLocaleString()} XP.${aheadLine} Claim today's quests on the Quests page — each one bumps you up by 25–120 XP.`
  }

  // Streak
  if (/(streak|consistency|days)/.test(q)) {
    return `${live.streak}-day streak — top 8% for consistency this month. Don't break it tonight: a logged dinner is enough to keep it alive.`
  }

  // Hydration / water
  if (/(water|hydrat|drink|glass)/.test(q)) {
    const remaining = Math.max(0, 8 - live.hydration)
    return `You've had ${live.hydration} of 8 glasses today. ${remaining > 0 ? `Down ${remaining} more before 9pm — your 3pm focus window will thank you.` : "Hydration goal hit — nice work."}`
  }

  // Steps / walking
  if (/(step|walk|move|cardio|run)/.test(q)) {
    const remaining = Math.max(0, 8000 - live.steps)
    return `${live.steps.toLocaleString()} steps so far. ${remaining > 0 ? `${remaining.toLocaleString()} to your daily goal — open Explore to find pickups within 600m.` : "Daily goal cleared. Bonus XP unlocked."}`
  }

  // Stress / low energy / tired
  if (/(stress|tired|low|energy|sleep|sad|anxious)/.test(q)) {
    return `For a low-energy evening I'd queue moong dal khichdi (calming, low-glycemic, ~380 kcal) and a 5-minute breathing quest. That combo earns you +85 XP.`
  }

  // Plan / week
  if (/(plan|week|schedule|prep)/.test(q)) {
    return `Try a 3-day rolling plan: oats + paneer-quinoa bowl + idli-sambar. It hits 25g+ protein at every lunch and stays vegetarian. Tap "View meal plans" on the home page to see the full month.`
  }

  // Eat / meal / breakfast / lunch / dinner / recommend
  if (/(eat|meal|breakfast|lunch|dinner|snack|food|recommend|hungry)/.test(q)) {
    return `Right now I'd suggest a paneer & quinoa power bowl — 28g protein, ready in 18 min, and it directly closes your Tuesday protein gap. Open Recommend to log it for +45 XP.`
  }

  // Calories / protein / macros
  if (/(calor|protein|macro|carb|fat|fiber)/.test(q)) {
    return `Aim for ~25g protein per main meal. You're averaging 18g at lunch this week — closing that gap once a day is the single fastest move for your goal.`
  }

  // Quest / xp / reward / coin
  if (/(quest|xp|coin|reward|points)/.test(q)) {
    return `Two quests are ready to claim and worth +145 XP combined. Claiming both lifts you ~2 spots on the leaderboard. Head to the Quests page.`
  }

  // Greeting / small talk
  if (/^(hi|hello|hey|namaste|yo)\b/.test(q)) {
    return `Hey — good to see you. You're at level ${live.level}, rank #${live.rank}. What can I help you do today: meal, plan, or quest?`
  }

  // Fallback
  return `I'd lean toward keeping it simple: log your next meal, tick one quest, and walk to one nearby pickup. That's roughly +110 XP — usually enough to climb a spot on the board.`
}
