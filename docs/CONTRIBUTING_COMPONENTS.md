# Contributing Components

## Adding a New Feature Component

1. Create `components/your-component.tsx`
2. Add `"use client"` if it uses hooks or browser APIs
3. Import types from `lib/types.ts`
4. Use `cn()` from `lib/utils.ts` for conditional classes
5. Consume global state via `useUserStats()` from `lib/user-stats-context.tsx`

## Adding a New Page

1. Create `app/your-route/page.tsx`
2. Import `BottomNav` for mobile navigation
3. Wrap content in `<main>` with `className="min-h-screen bg-background"`
4. Add the route to the `BottomNav` links if it's a primary destination

## Naming Conventions

- Components: `PascalCase` (e.g. `QuestCard`)
- Files: `kebab-case` (e.g. `quest-card.tsx`)
- Hooks: `camelCase` prefixed with `use` (e.g. `useUserStats`)
- Types: `PascalCase` (e.g. `QuestStatus`)
