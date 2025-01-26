# ARISE-X1

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

> Your health. Gamified. Evolved.

ARISE-X1 is an AI-powered food & health tracker built with Next.js 16. Earn XP, track macros, complete daily quests, and battle unhealthy choices — your behavioral health OS, gamified.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: Tailwind CSS v4 + Radix UI + shadcn/ui
- **AI**: Groq · Sarvam · Firebase
- **Language**: TypeScript 5.7
- **Fonts**: Orbitron · Press Start 2P · VT323

## Features

- 🧠 ARIA — AI coach that learns your food patterns
- 🎮 XP & leveling system with daily quests
- 🗺️ Live walking map (Pokémon GO–style explore)
- 📊 Behavioral insights & macro tracking
- 💧 Hydration tracker
- 🏆 Leaderboard & community challenges
- 🎙️ Voice input support
- 🌙 Dark-first design with aurora gradients

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/dashboard` | Main health dashboard |
| `/quests` | Daily & weekly quests |
| `/explore` | Live walking map |
| `/leaderboard` | Community rankings |
| `/plans` | Meal plans & pricing |
| `/recommend` | AI meal recommendations |
| `/voice` | Voice input interface |

---

Built for the hackathon. Designed for the world.

## Screenshots

| Dashboard | Quests | Explore |
|-----------|--------|---------|
| XP bar, mood selector, meal log | Daily & weekly challenges | Live walking map |

| Leaderboard | Plans | Voice |
|-------------|-------|-------|
| Community rankings | Subscription tiers | Sarvam speech input |

## Architecture

```
app/                  # Next.js App Router pages
├── dashboard/        # Main health dashboard
├── explore/          # Live walking map
├── leaderboard/      # Community rankings
├── plans/            # Meal subscription plans
├── quests/           # Daily & weekly quests
├── recommend/        # AI meal recommendations
└── voice/            # Voice input interface

components/           # Reusable React components
├── ui/               # shadcn/ui primitives
├── aria-coach.tsx    # Floating AI assistant
├── xp-bar.tsx        # Level & XP progress
└── ...

lib/                  # Shared utilities & state
├── types.ts          # TypeScript domain types
├── mock-data.ts      # Development fixtures
├── user-stats-context.tsx  # Global state
└── xp.ts             # XP math helpers
```

## Code Quality

```bash
# Lint
pnpm lint

# Format
pnpm prettier --write .

# Type check
pnpm tsc --noEmit
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Design System](docs/DESIGN_SYSTEM.md)
- [Gamification](docs/GAMIFICATION.md)
- [API Reference](docs/API.md)
- [Roadmap](docs/ROADMAP.md)
- [Contributing Components](docs/CONTRIBUTING_COMPONENTS.md)
