"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { User } from "@supabase/supabase-js"
import { 
  ArrowRight, 
  Clock, 
  MapPin, 
  Search, 
  Star, 
  Sparkles,
  UtensilsCrossed,
  Bike,
  ShoppingBag,
  LogIn,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BottomNav } from "@/components/bottom-nav"
import type { Restaurant } from "@/lib/types"
import { cn } from "@/lib/utils"

const CUISINES = [
  { name: "All", icon: UtensilsCrossed },
  { name: "Japanese", icon: "🍣" },
  { name: "Italian", icon: "🍕" },
  { name: "Indian", icon: "🍛" },
  { name: "Chinese", icon: "🥡" },
  { name: "Mexican", icon: "🌮" },
  { name: "Healthy", icon: "🥗" },
  { name: "Korean", icon: "🍜" },
]

interface HomePageClientProps {
  featuredRestaurants: Restaurant[]
  allRestaurants: Restaurant[]
  user: User | null
}

export function HomePageClient({ featuredRestaurants, allRestaurants, user }: HomePageClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState("All")

  const filteredRestaurants = allRestaurants.filter((restaurant) => {
    const matchesSearch = 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine_type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCuisine = 
      selectedCuisine === "All" || 
      restaurant.cuisine_type.toLowerCase() === selectedCuisine.toLowerCase()
    return matchesSearch && matchesCuisine
  })

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/40 glass-strong">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/40">
              <UtensilsCrossed className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">ARISE Eats</span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <MapPin className="size-3" />
                Deliver to current location
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="size-7 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                </Button>
              </Link>
            ) : (
              <Link href="/auth/login">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="size-4" />
                  Sign In
                </Button>
              </Link>
            )}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="size-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-aurora" />
        <div className="relative mx-auto max-w-6xl px-4 py-8 md:py-12">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                <Sparkles className="size-3" aria-hidden="true" />
                AI-Powered Food Delivery
              </span>
              <h1 className="text-balance text-3xl font-extrabold leading-tight md:text-5xl">
                Delicious food,{" "}
                <span className="text-primary">delivered fast</span>
              </h1>
              <p className="max-w-lg text-sm text-muted-foreground md:text-base">
                Get personalized meal recommendations from ARIA, our AI food concierge. 
                Order from the best restaurants in your area.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search restaurants or cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 rounded-full border-border/60 bg-card/80 pl-12 pr-4 text-sm backdrop-blur focus:border-primary/50"
              />
            </div>

            {/* Cuisine Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {CUISINES.map((cuisine) => (
                <button
                  key={cuisine.name}
                  onClick={() => setSelectedCuisine(cuisine.name)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                    selectedCuisine === cuisine.name
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border/60 bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  {typeof cuisine.icon === "string" ? (
                    <span>{cuisine.icon}</span>
                  ) : (
                    <cuisine.icon className="size-4" />
                  )}
                  {cuisine.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      {featuredRestaurants.length > 0 && selectedCuisine === "All" && !searchQuery && (
        <section className="mx-auto max-w-6xl px-4 py-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold md:text-xl">Featured Restaurants</h2>
            <Link href="/explore" className="flex items-center gap-1 text-sm text-primary hover:underline">
              View all <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} featured />
            ))}
          </div>
        </section>
      )}

      {/* All Restaurants */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold md:text-xl">
            {searchQuery || selectedCuisine !== "All" 
              ? `${filteredRestaurants.length} Results` 
              : "All Restaurants"}
          </h2>
        </div>
        {filteredRestaurants.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/40 py-16">
            <UtensilsCrossed className="size-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-medium">No restaurants found</p>
            <p className="text-sm text-muted-foreground">Try a different search or cuisine</p>
          </div>
        )}
      </section>

      {/* Promo Banner */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 via-card to-accent/10 p-6 md:p-8">
          <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary">
                <Bike className="size-3" />
                Free Delivery
              </span>
              <h3 className="text-xl font-bold md:text-2xl">First order? Get free delivery!</h3>
              <p className="text-sm text-muted-foreground">Use code ARISEATS at checkout</p>
            </div>
            <Button asChild size="lg" className="w-fit font-bold glow-primary">
              <Link href="/explore">
                Order Now
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
          <div className="absolute -right-10 -bottom-10 size-40 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
        </div>
      </section>

      <BottomNav />
    </div>
  )
}

function RestaurantCard({ restaurant, featured = false }: { restaurant: Restaurant; featured?: boolean }) {
  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <article
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg",
          featured && "ring-1 ring-primary/20"
        )}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {restaurant.image_url ? (
            <Image
              src={restaurant.image_url}
              alt={restaurant.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <UtensilsCrossed className="size-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          
          {/* Rating Badge */}
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs font-bold backdrop-blur">
            <Star className="size-3 fill-amber-400 text-amber-400" />
            {restaurant.rating.toFixed(1)}
          </div>

          {featured && (
            <div className="absolute left-3 top-3 rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-primary-foreground">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold leading-tight group-hover:text-primary">{restaurant.name}</h3>
            <span className="shrink-0 rounded-md border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              {restaurant.cuisine_type}
            </span>
          </div>
          
          {restaurant.description && (
            <p className="line-clamp-2 text-xs text-muted-foreground">{restaurant.description}</p>
          )}

          <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {restaurant.delivery_time_min}-{restaurant.delivery_time_max} min
            </span>
            <span className="flex items-center gap-1">
              <Bike className="size-3" />
              ${restaurant.delivery_fee.toFixed(2)}
            </span>
            <span className="text-muted-foreground/60">
              Min ${restaurant.min_order.toFixed(0)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
