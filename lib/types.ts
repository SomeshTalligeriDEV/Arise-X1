/**
 * Core type definitions for ARISE-X1.
 * Shapes mirror the eventual Firestore schema described in the product brief.
 */

export type HealthGoal = "weight_loss" | "muscle_gain" | "energy" | "gut_health" | "balanced"
export type Diet = "vegetarian" | "vegan" | "non_vegetarian" | "jain" | "keto"
export type Mood = "energized" | "stressed" | "tired" | "happy" | "neutral"
export type MealType = "breakfast" | "lunch" | "dinner" | "snack"
export type Language = "en" | "hi" | "ta" | "kn" | "te"

export interface User {
  uid: string
  displayName: string
  email: string
  xp: number
  level: number
  coins: number
  streak: number
  steps: number
  stepsTarget: number
  healthGoal: HealthGoal
  dietaryPreference: Diet
  cuisinePreference: string[]
  preferredLanguage: Language
  badges: string[]
  mealsLogged: number
  hydrationGlasses: number
  hydrationTarget: number
}

export interface Meal {
  id: string
  meal_name: string
  image?: string
  calories: number
  protein_g: number
  carbs_g: number
  fat_g: number
  fiber_g: number
  health_score: number
  xp_reward: number
  reason: string
  preparation_time_min: number
  ingredients: string[]
  tags: string[]
  cuisine: string
  meal_type: MealType
}

export interface ContextSignals {
  timeOfDay: "morning" | "afternoon" | "evening" | "night"
  dayOfWeek: string
  mood: Mood
  hoursSinceLastMeal?: number
}

export interface LeaderboardEntry {
  userId: string
  displayName: string
  xp: number
  level: number
  streak: number
  rank: number
  isYou?: boolean
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
}

export interface Challenge {
  id: string
  title: string
  description: string
  type: "daily" | "weekly"
  xpReward: number
  coinReward: number
  progress: number
  target: number
  isGroupChallenge: boolean
  participants?: number
}

export interface BehaviorInsight {
  id: string
  title: string
  body: string
  severity: "info" | "warn" | "good"
}

/* ---------- New: Quests (assigned tasks → claim XP) ---------- */
export type QuestCategory = "nutrition" | "movement" | "hydration" | "mindfulness"
export type QuestDifficulty = "easy" | "medium" | "hard"
export type QuestStatus = "active" | "ready" | "claimed"

export interface Quest {
  id: string
  title: string
  description: string
  category: QuestCategory
  difficulty: QuestDifficulty
  xpReward: number
  coinReward: number
  progress: number
  target: number
  status: QuestStatus
  /** Short verb shown on the action button (e.g. "Log meal") */
  actionLabel: string
}

/* ---------- New: Live Walking / Explore (Pokémon GO–style) ---------- */
export type SpotKind = "produce" | "hydration" | "jog" | "cafe" | "yoga" | "market"

export interface WalkSpot {
  id: string
  name: string
  kind: SpotKind
  /** Stylized map coordinates 0–100 (percent of canvas) */
  x: number
  y: number
  distanceM: number
  xpReward: number
  coinReward: number
  blurb: string
  claimed: boolean
}
