"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-extrabold">ARISE-X1</h1>
      <p className="text-muted-foreground">Your health. Gamified. Evolved.</p>
      <Button asChild><Link href="/dashboard">Get started</Link></Button>
    </main>
  )
}
