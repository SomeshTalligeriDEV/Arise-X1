# ARISE-X1 Architecture

## Overview

ARISE-X1 is a Next.js 16 App Router application with a client-side state model.
All data is currently mocked; the production path connects to Firebase Firestore.

## State Management

Global state lives in `lib/user-stats-context.tsx` (React Context + useReducer).
It holds: `xp`, `level`, `coins`, `streak`, `hydrationGlasses`, `mood`, `mealsLogged`.

Mutations:
- `addXp(amount)` — adds XP and auto-levels up
- `addCoins(amount)` — adds coins
- `logMeal()` — increments mealsLogged
- `drinkGlass()` — increments hydrationGlasses
- `setMood(mood)` — updates current mood

## Routing

| Route | Component | Notes |
|-------|-----------|-------|
| `/` | `app/page.tsx` | Landing, uses LoadingScreen |
| `/dashboard` | `app/dashboard/page.tsx` | Main app shell |
| `/quests` | `app/quests/page.tsx` | Quest list + claim |
| `/explore` | `app/explore/page.tsx` | Canvas map |
| `/leaderboard` | `app/leaderboard/page.tsx` | Rankings |
| `/plans` | `app/plans/page.tsx` | Pricing |
| `/recommend` | `app/recommend/page.tsx` | ARIA questionnaire |
| `/voice` | `app/voice/page.tsx` | Speech input |

## AI Integration (planned)

- **Groq** — fast LLM inference for ARIA meal recommendations
- **Sarvam** — vernacular speech-to-text for voice input
- **Firebase** — auth, Firestore for user data, Storage for meal images
