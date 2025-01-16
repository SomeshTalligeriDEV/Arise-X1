"use client"
import { useState } from "react"
import Link from "next/link"
import { LoadingScreen } from "@/components/loading-screen"
import {
  ArrowRight,
  Bell,
  BarChart3,
  CalendarCheck,
  ChefHat,
  Flame,
  Heart,
  Leaf,
  MapPin,
  Sparkles,
  Target,
  Truck,
  Users,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteNav } from "@/components/site-nav"
import { FeatureMarquee } from "@/components/feature-marquee"

const STATS = [
  { value: "2.3s", label: "Avg AI response" },
  { value: "500M+", label: "Vernacular speakers" },
  { value: "0", label: "Dark patterns" },
  { value: "12+", label: "Behavioral signals" },
]

const HERO_PILLS = [
  { Icon: Leaf, title: "Personalized", sub: "Meal Plan" },
  { Icon: Flame, title: "Calorie", sub: "Tracking" },
  { Icon: BarChart3, title: "Health", sub: "Insights" },
  { Icon: Bell, title: "Smart", sub: "Reminders" },
]

const SPREAD_PILLS = [
  {
    Icon: CalendarCheck,
    title: "Flexible Subscription",
    body: "Pause, skip or cancel anytime in one tap.",
  },
  {
    Icon: ChefHat,
    title: "Expert Nutritionist Support",
    body: "1-on-1 guidance from certified nutritionists.",
  },
  {
    Icon: Truck,
    title: "Doorstep Delivery",
    body: "Freshly prepared meals to your home or office.",
  },
]

const DAY_MEALS = [
  {
    day: "Monday",
    src: "/day-mediterranean.jpg",
    title: "Mediterranean Power Bowl",
    body: "Fresh and energizing — feta, olives, chickpeas and seasonal greens.",
    tag: "VEG",
  },
  {
    day: "Tuesday",
    src: "/day-thali.jpg",
    title: "Chicken Keema Masala Set",
    body: "Hearty keema with soft palak roti and steamed seasonal veg.",
    tag: "NON-VEG",
  },
  {
    day: "Wednesday",
    src: "/day-burger.jpg",
    title: "Grilled Chicken Stack",
    body: "Smoky, satisfying and dialled-in macros for your bold midweek.",
    tag: "NON-VEG",
  },
]

const PERSONAS = [
  {
    src: "/persona-pro.jpg",
    title: "Working Professionals",
    stat: "3x",
    statLabel: "more sustained energy",
    body: "No 4pm crash. No takeout guilt. Just clean fuel between meetings.",
  },
  {
    src: "/persona-fitness.jpg",
    title: "Fitness & Performance",
    stat: "45%",
    statLabel: "greater muscle response",
    body: "Macros tuned to your training block. Recovery you can feel.",
  },
  {
    src: "/persona-community.jpg",
    title: "Friends & Families",
    stat: "1.8x",
    statLabel: "weekly habit consistency",
    body: "Streaks are better together. Sync goals with your circle.",
  },
]

const PILLARS = [
  {
    eyebrow: "Pillar 01",
    title: "Data-driven personalization",
    body: "Meal history, macro patterns, time-of-day eating, past XP actions. ARIA grounds every recommendation in your behavior — not generic advice.",
  },
  {
    eyebrow: "Pillar 02",
    title: "Contextual intelligence",
    body: "Time of day, mood, location, hours since last meal. Inputs change the output. 8pm + stressed + 5h gap → calming, low-glycemic dinner nearby.",
  },
  {
    eyebrow: "Pillar 03",
    title: "Behavioral change loops",
    body: "Tiny Habits, variable rewards, community missions. Daily XP cap and rest-day bonuses keep the loop healthy — not addictive.",
  },
]

const PRICE_TIERS = [
  {
    name: "One Month Plan",
    price: "₹300",
    unit: "/ meal",
    body: "A month of fresh, ready-to-eat chef meals. Delivered to your door. Pause or cancel anytime.",
    cta: "Start with 1 month",
    href: "/dashboard",
    popular: false,
  },
  {
    name: "Three Month Plan",
    price: "₹250",
    unit: "/ meal",
    body: "A 3-month healthy routine made easy. Lunch & dinner covered. Best price per meal.",
    cta: "Get the 3-month plan",
    href: "/dashboard",
    popular: true,
    badge: "Most popular",
  },
  {
    name: "Two Month Plan",
    price: "₹275",
    unit: "/ meal",
    body: "Commit for two months and save more. Lunch & dinner delivered fresh, every day.",
    cta: "Try 2 months",
    href: "/dashboard",
    popular: false,
  },
]

export default function LandingPage() {
  const [loaded, setLoaded] = useState(false)

  if (!loaded) {
    return <LoadingScreen onReady={() => setLoaded(true)} />
  }

  return (
    <div className="relative min-h-screen bg-background">
      <SiteNav />

      {/* ============================================================
          HERO
         ============================================================ */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-aurora" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-0 h-[640px] bg-radial-glow"
        />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-16 md:grid-cols-2 md:items-center md:gap-12 md:px-6 md:pt-24">
          {/* Copy */}
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              <Sparkles className="size-3" aria-hidden="true" />
              Behavioral health OS
            </span>

            <h1 className="text-balance text-4xl font-extrabold leading-[1.04] tracking-tight md:text-6xl lg:text-7xl">
              Your health.{" "}
              <span className="text-primary">Gamified.</span>
              <br className="hidden md:block" /> Evolved.
            </h1>

            <p className="text-pretty max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              ARIA learns your food patterns, understands your context, and guides every meal —
              in your language, on your terms. Earn XP. Walk the city. Level up.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="font-bold glow-primary">
                <Link href="/dashboard">
                  Start your journey
                  <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-semibold">
                <Link href="/quests">
                  <Target className="size-4" aria-hidden="true" />
                  See today&apos;s quests
                </Link>
              </Button>
            </div>

            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Powered by Groq · Sarvam · Firebase
            </p>
          </div>

          {/* Visual: hero image + floating glass feature pills */}
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div className="relative aspect-[4/5] w-full">
              <div
                aria-hidden="true"
                className="absolute inset-x-6 top-6 bottom-12 rounded-[40px] bg-primary/10 blur-3xl"
              />
              {/* LOAD.mp4 — replaces hero static image */}
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-contain"
                style={{ borderRadius: '24px' }}
              >
                <source src="/load.mp4" type="video/mp4" />
              </video>

              <div className="pointer-events-none absolute right-0 top-[6%] hidden flex-col gap-3 md:flex">
                {HERO_PILLS.map((pill, i) => (
                  <div
                    key={pill.title}
                    className={`pointer-events-auto flex items-center gap-3 rounded-2xl glass-strong px-4 py-3 animate-float-slow delay-${i}`}
                  >
                    <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
                      <pill.Icon className="size-4" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs font-semibold text-foreground">{pill.title}</span>
                      <span className="text-xs text-muted-foreground">{pill.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cream tooltip pills (Kenko-style) */}
              <span className="tooltip-pill absolute left-2 top-[18%] hidden md:inline-block animate-float-slow">
                Fuel Me Better
              </span>
              <span className="tooltip-pill tooltip-pill-rotate-r absolute -left-2 bottom-[10%] hidden md:inline-block animate-float-slow delay-2">
                Make Me Healthier
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 md:hidden">
              {HERO_PILLS.map((pill) => (
                <div
                  key={pill.title}
                  className="flex items-center gap-2 rounded-xl glass px-3 py-2"
                >
                  <span className="flex size-7 items-center justify-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/30">
                    <pill.Icon className="size-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold leading-tight">
                    {pill.title} {pill.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          STATS
         ============================================================ */}
      <section
        aria-label="Platform stats"
        className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden border-y border-border/60 bg-border/60 md:grid-cols-4"
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center gap-1 bg-background px-4 py-6"
          >
            <div className="text-3xl font-extrabold text-primary md:text-4xl">{stat.value}</div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* ============================================================
          BALANCED MEALS — full-width spread band (Kenko hero #6)
         ============================================================ */}
      <section
        aria-label="Balanced meals, bold flavours"
        className="relative isolate overflow-hidden"
      >
        {/* Image fills the section as a background */}
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src="/spread-balanced.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-spread-fade" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent md:hidden" />
        </div>

        {/* Content sits in normal flow on top, wrapped in a glass card so
            the headline + body copy stay legible regardless of where the
            food spread image lands behind it. */}
        <div className="relative mx-auto flex min-h-[640px] max-w-6xl items-center px-4 py-16 md:min-h-[720px] md:px-6 md:py-24">
          <div className="w-full max-w-xl rounded-3xl border border-border/60 glass-strong p-6 shadow-2xl md:p-8">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-block px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em]">
              <Heart className="size-3" aria-hidden="true" />
              Built for everyday eating
            </span>

            <h2 className="mt-5 text-balance text-3xl font-extrabold leading-[1.05] text-foreground md:text-5xl lg:text-[3.4rem]">
              <span className="bg-amber-block box-decoration-clone rounded-md px-2 py-0.5">
                Balanced meals,
              </span>
              <br />
              <span className="text-foreground">bold flavours every day</span>
            </h2>

            <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-foreground/85 md:text-base">
              Nutritious, ready-to-enjoy meals tailored to your goals, your taste, and your
              schedule &mdash; without the planning, shopping or stress.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="font-bold glow-primary">
                <Link href="/recommend">
                  Get started
                  <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border/70 bg-card/40 font-semibold backdrop-blur"
              >
                <Link href="/plans">View meal plans</Link>
              </Button>
            </div>

            {/* Feature pills */}
            <ul className="mt-7 grid gap-2">
              {SPREAD_PILLS.map((pill) => (
                <li
                  key={pill.title}
                  className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card/60 px-3 py-3 backdrop-blur"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-block">
                    <pill.Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{pill.title}</span>
                    <span className="text-xs text-muted-foreground">{pill.body}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================
          A GLIMPSE ON YOUR PLATE — day-meal showcase (Kenko #1)
         ============================================================ */}
      <section
        aria-label="A glimpse on your plate"
        className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24"
      >
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              This week on your plate
            </span>
            <h2 className="mt-3 text-balance text-3xl font-extrabold leading-[1.1] md:text-5xl">
              <span className="rounded-md bg-amber-block px-2 py-0.5">A glimpse</span> of life on
              your plate
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            Every meal is crafted to be light on gut, leaving you energetic and nutritionally
            balanced — so you look forward to eating well every day.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-3">
          {DAY_MEALS.map((meal) => (
            <article
              key={meal.day}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 glass transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={meal.src || "/placeholder.svg"}
                  alt={meal.title}
                  fill
                  sizes="(min-width: 768px) 360px, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"
                />

                {/* Day pill (forest-green like Kenko) */}
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-forest-block px-3 py-1.5 text-xs font-bold">
                  <span className="size-1.5 rounded-full bg-amber" aria-hidden="true" />
                  {meal.day}
                </span>

                {/* Veg/non-veg tag */}
                <span
                  className={`absolute right-4 top-4 rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${
                    meal.tag === "VEG"
                      ? "border-primary/40 bg-primary/15 text-primary"
                      : "border-destructive/40 bg-destructive/15 text-destructive"
                  }`}
                >
                  {meal.tag}
                </span>
              </div>

              {/* Caption block (Kenko-style chunky amber) */}
              <div className="bg-amber-block p-5">
                <h3 className="text-lg font-bold leading-tight md:text-xl">{meal.title}</h3>
                <p className="mt-1 text-sm leading-relaxed opacity-80">{meal.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============================================================
          MARQUEE
         ============================================================ */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <header className="mx-auto mb-8 flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            What ARISE-X1 does
          </span>
          <h2 className="text-balance text-2xl font-bold md:text-4xl">
            Eight systems. <span className="text-primary">One operating system for health.</span>
          </h2>
        </header>
        <FeatureMarquee />
      </section>

      {/* ============================================================
          BUILT FOR EVERYONE — persona grid (Kenko #4)
         ============================================================ */}
      <section
        aria-label="Built for everyone like you"
        className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24"
      >
        <header className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Who ARISE is built for
          </span>
          <h2 className="text-balance text-3xl font-extrabold md:text-5xl">
            Built for{" "}
            <span className="rounded-md bg-amber-block px-2 py-0.5">everyone like you</span>
          </h2>
        </header>

        <div className="grid gap-5 md:grid-cols-3">
          {PERSONAS.map((p) => (
            <article
              key={p.title}
              className="relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-border/60 glass p-3"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={p.src || "/placeholder.svg"}
                  alt={p.title}
                  fill
                  sizes="(min-width: 768px) 360px, 100vw"
                  className="object-cover"
                />
                <span className="absolute right-3 top-3 rounded-full bg-amber-block px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
                  {p.title}
                </span>
              </div>

              <div className="flex items-end justify-between gap-3 px-2 pb-3">
                <p className="max-w-[220px] text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
                <div className="flex shrink-0 flex-col items-end leading-none">
                  <span className="text-3xl font-extrabold text-primary md:text-4xl">
                    {p.stat}
                  </span>
                  <span className="mt-1 max-w-[120px] text-right font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {p.statLabel}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Wide community card */}
        <article className="relative mt-5 overflow-hidden rounded-3xl border border-border/60">
          <div className="relative aspect-[16/6] w-full">
            <Image
              src="/persona-community.jpg"
              alt="A community of people thriving together"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent"
            />
            <div className="absolute inset-0 flex items-center px-6 md:px-12">
              <div className="flex max-w-md flex-col gap-3">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-cream-block px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em]">
                  <Users className="size-3" aria-hidden="true" />
                  ARISE is for everyone
                </span>
                <h3 className="text-balance text-2xl font-extrabold md:text-4xl">
                  Health is harder alone. <span className="text-primary">Stronger together.</span>
                </h3>
                <Button asChild className="w-fit font-bold">
                  <Link href="/leaderboard">
                    Meet the community
                    <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* ============================================================
          PLANS & PRICING — preview tiers (Kenko #2)
         ============================================================ */}
      <section
        aria-label="Plans and pricing"
        className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24"
      >
        <header className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Plans &amp; pricing
          </span>
          <h2 className="text-balance text-3xl font-extrabold md:text-5xl">
            Pick a rhythm.{" "}
            <span className="rounded-md bg-amber-block px-2 py-0.5">We&apos;ll cook</span>.
          </h2>
        </header>

        <div className="grid items-stretch gap-5 md:grid-cols-3">
          {PRICE_TIERS.map((tier) => {
            const popular = tier.popular
            return (
              <article
                key={tier.name}
                className={`relative flex flex-col overflow-hidden rounded-3xl border ${
                  popular
                    ? "border-primary/60 glass-strong glow-primary"
                    : "border-border/60 glass"
                }`}
              >
                {popular && (
                  <span className="absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full bg-amber-block px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em]">
                    {tier.badge}
                  </span>
                )}

                {/* Image hero */}
                <div className="relative aspect-[5/3] w-full overflow-hidden border-b border-border/60">
                  <Image
                    src={
                      popular
                        ? "/day-thali.jpg"
                        : tier.name.startsWith("One")
                          ? "/day-burger.jpg"
                          : "/day-mediterranean.jpg"
                    }
                    alt={tier.name}
                    fill
                    sizes="(min-width: 768px) 360px, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-amber-block px-3 py-1 text-xs font-bold">
                    {tier.name}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold">{tier.price}</span>
                    <span className="text-sm text-muted-foreground">{tier.unit}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{tier.body}</p>

                  <ul className="mt-1 flex flex-col gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Zap className="size-4 text-primary" aria-hidden="true" />
                      Lunch &amp; dinner included
                    </li>
                    <li className="flex items-center gap-2">
                      <Truck className="size-4 text-primary" aria-hidden="true" />
                      Doorstep delivery
                    </li>
                    <li className="flex items-center gap-2">
                      <ChefHat className="size-4 text-primary" aria-hidden="true" />
                      Chef-prepped, never reheated
                    </li>
                  </ul>

                  <Button
                    asChild
                    className={`mt-auto font-bold ${popular ? "glow-primary" : ""}`}
                    variant={popular ? "default" : "outline"}
                  >
                    <Link href={tier.href}>
                      {tier.cta}
                      <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Button asChild variant="ghost" className="font-semibold">
            <Link href="/plans">
              See full pricing details
              <ArrowRight className="ml-1 size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ============================================================
          STORY CTA — phone + cream tooltip pills (Kenko #5)
         ============================================================ */}
      <section
        aria-label="Your plan starts with your story"
        className="mx-auto max-w-6xl px-4 pb-16 md:px-6 md:pb-24"
      >
        <div className="relative grid items-center gap-8 overflow-hidden rounded-[36px] bg-amber-block px-6 py-10 md:grid-cols-2 md:px-12 md:py-14">
          {/* Decorative blobs */}
          <div
            aria-hidden="true"
            className="absolute -left-10 -top-10 size-48 rounded-full bg-cream/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -right-10 -bottom-10 size-56 rounded-full bg-forest/30 blur-3xl"
          />

          <div className="relative flex flex-col gap-5">
            <h2 className="text-balance text-3xl font-extrabold leading-[1.05] md:text-5xl">
              Your plan starts with your story
            </h2>
            <p className="max-w-md text-pretty text-sm leading-relaxed opacity-80 md:text-base">
              Using your answers, ARIA suggests meal plans you can actually stick to — and adapts
              every day based on how you eat, move and feel.
            </p>
            <Button asChild size="lg" className="w-fit bg-forest text-forest-foreground hover:bg-forest/90 font-bold">
              <Link href="/recommend">
                Take the 2-minute questionnaire
                <ArrowRight className="ml-1 size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="relative mx-auto h-[420px] w-full max-w-sm md:h-[480px]">
            {/* LOAD.mp4 — story CTA section */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-contain"
              style={{ borderRadius: '20px' }}
            >
              <source src="/load.mp4" type="video/mp4" />
            </video>
            {/* Floating cream tooltip pills */}
            <span className="tooltip-pill absolute left-0 top-[10%] animate-float-slow">
              Transform My Meals
            </span>
            <span className="tooltip-pill tooltip-pill-rotate-r absolute right-0 top-[28%] animate-float-slow delay-1">
              Fuel Me Better
            </span>
            <span className="tooltip-pill absolute right-2 bottom-[12%] animate-float-slow delay-2">
              Make Me Healthier
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
          LIVE WALKING TEASER
         ============================================================ */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="relative grid gap-6 overflow-hidden rounded-3xl border border-border/60 glass p-6 md:grid-cols-2 md:gap-10 md:p-10">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 size-72 rounded-full bg-accent/20 blur-3xl"
          />
          <div className="relative flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              <MapPin className="size-3" aria-hidden="true" />
              New · Live walking
            </span>
            <h2 className="text-balance text-2xl font-bold md:text-4xl">
              Real movement, <span className="text-accent">real rewards.</span>
            </h2>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              Your neighborhood is the game board. Walk to farmer&apos;s markets, hydration kiosks
              and jog loops to claim XP &amp; coins — the more you move, the more ARIA knows.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="font-bold">
                <Link href="/explore">
                  Open the map
                  <ArrowRight className="ml-1 size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-semibold">
                <Link href="/quests">View quests</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[5/3] overflow-hidden rounded-2xl border border-border/60 bg-background">
              <div aria-hidden="true" className="absolute inset-0 bg-aurora opacity-80" />
              <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
              <span className="absolute left-[22%] top-[28%] -translate-x-1/2 -translate-y-1/2">
                <span className="absolute inset-0 size-10 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full bg-primary/30" />
                <span className="relative flex size-9 items-center justify-center rounded-full bg-primary/20 text-primary ring-2 ring-primary/50 glow-primary">
                  <Leaf className="size-4" aria-hidden="true" />
                </span>
              </span>
              <span className="absolute left-[68%] top-[42%] -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex size-9 items-center justify-center rounded-full bg-accent/20 text-accent ring-2 ring-accent/50 glow-accent">
                  <Flame className="size-4" aria-hidden="true" />
                </span>
              </span>
              <span className="absolute left-[42%] top-[68%] -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex size-9 items-center justify-center rounded-full bg-chart-3/20 text-chart-3 ring-2 ring-chart-3/50">
                  <BarChart3 className="size-4" aria-hidden="true" />
                </span>
              </span>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="absolute inset-0 size-8 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full bg-foreground/30" />
                <span className="relative flex size-4 items-center justify-center rounded-full bg-foreground ring-4 ring-background">
                  <span className="size-1.5 rounded-full bg-primary" />
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PILLARS
         ============================================================ */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <header className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Behavioral pillars
          </span>
          <h2 className="text-balance text-2xl font-bold md:text-4xl">
            Most apps optimize for orders.{" "}
            <span className="text-accent">We optimize for outcomes.</span>
          </h2>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {PILLARS.map((p) => (
            <article
              key={p.eyebrow}
              className="flex flex-col gap-3 rounded-xl border border-border/60 glass p-6"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                {p.eyebrow}
              </span>
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
         ============================================================ */}
      <section className="border-t border-border/60">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center md:px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Built for the hackathon · Designed for the world
          </p>
          <h2 className="text-balance text-3xl font-extrabold md:text-5xl">
            Your body is waiting for an upgrade.
          </h2>
          <p className="text-pretty max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            {"Don't eat to live. Evolve to thrive."}
          </p>
          <Button asChild size="lg" className="font-bold glow-primary">
            <Link href="/dashboard">
              Begin evolution
              <ArrowRight className="ml-1 size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border/60 px-4 py-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:px-6">
        ARISE-X1 · v0.1 demo build
      </footer>
    </div>
  )
}
