"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Target, Map, Salad, Trophy } from "lucide-react"

const ITEMS = [
  { href: "/dashboard", label: "Home", Icon: LayoutDashboard },
  { href: "/quests", label: "Quests", Icon: Target },
  { href: "/explore", label: "Explore", Icon: Map },
  { href: "/recommend", label: "Meals", Icon: Salad },
  { href: "/leaderboard", label: "Ranks", Icon: Trophy },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/40 glass-strong md:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-1.5">
        {ITEMS.map(({ href, label, Icon }) => {
          const active = pathname === href
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 rounded-md px-2 py-1.5 text-[11px] transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="size-5" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
