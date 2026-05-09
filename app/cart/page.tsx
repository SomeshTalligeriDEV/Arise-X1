"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  UtensilsCrossed,
  MapPin,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BottomNav } from "@/components/bottom-nav"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"

export default function CartPage() {
  const router = useRouter()
  const {
    items,
    restaurant,
    subtotal,
    deliveryFee,
    total,
    itemCount,
    updateQuantity,
    removeFromCart,
    clearCart,
    isLoading,
  } = useCart()

  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [specialInstructions, setSpecialInstructions] = useState("")

  const handleProceedToCheckout = () => {
    if (!deliveryAddress.trim()) {
      alert("Please enter a delivery address")
      return
    }
    // Store address in session storage for checkout
    sessionStorage.setItem("deliveryAddress", deliveryAddress)
    sessionStorage.setItem("specialInstructions", specialInstructions)
    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-background pb-20">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border/40 glass-strong">
          <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3">
            <Link
              href="/"
              className="flex size-10 items-center justify-center rounded-full bg-secondary/80 transition-colors hover:bg-secondary"
            >
              <ArrowLeft className="size-5" />
            </Link>
            <h1 className="text-lg font-bold">Your Cart</h1>
          </div>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center px-4">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="size-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold">Your cart is empty</h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Looks like you haven&apos;t added anything to your cart yet. Start exploring delicious options!
            </p>
            <Button asChild className="mt-4">
              <Link href="/">Browse Restaurants</Link>
            </Button>
          </div>
        </main>

        <BottomNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-40 md:pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/40 glass-strong">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex size-10 items-center justify-center rounded-full bg-secondary/80 transition-colors hover:bg-secondary"
            >
              <ArrowLeft className="size-5" />
            </Link>
            <h1 className="text-lg font-bold">Your Cart</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => clearCart()}
            className="text-destructive hover:text-destructive"
            disabled={isLoading}
          >
            <Trash2 className="mr-1 size-4" />
            Clear
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Restaurant Info */}
            {restaurant && (
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-border/60 bg-card/60 p-3">
                <div className="relative size-12 overflow-hidden rounded-lg">
                  {restaurant.image_url ? (
                    <Image
                      src={restaurant.image_url}
                      alt={restaurant.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <UtensilsCrossed className="size-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{restaurant.name}</span>
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="size-3" />
                    {restaurant.delivery_time_min}-{restaurant.delivery_time_max} min
                  </span>
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-xl border border-border/60 bg-card/60 p-3"
                >
                  {/* Image */}
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-lg">
                    {item.menu_item?.image_url ? (
                      <Image
                        src={item.menu_item.image_url}
                        alt={item.menu_item?.name ?? ""}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <UtensilsCrossed className="size-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold leading-tight">
                        {item.menu_item?.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-muted-foreground hover:text-destructive"
                        disabled={isLoading}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      ${((item.menu_item?.price ?? 0) * item.quantity).toFixed(2)}
                    </span>

                    {/* Quantity Controls */}
                    <div className="mt-auto flex items-center gap-2 pt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex size-8 items-center justify-center rounded-full border border-border/60 bg-secondary/50 hover:bg-secondary disabled:opacity-50"
                        disabled={isLoading}
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex size-8 items-center justify-center rounded-full border border-border/60 bg-secondary/50 hover:bg-secondary disabled:opacity-50"
                        disabled={isLoading}
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Address */}
            <div className="mt-6">
              <h3 className="mb-3 flex items-center gap-2 font-semibold">
                <MapPin className="size-4 text-primary" />
                Delivery Address
              </h3>
              <Input
                placeholder="Enter your delivery address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="bg-card/60"
              />
            </div>

            {/* Special Instructions */}
            <div className="mt-4">
              <h3 className="mb-3 font-semibold">Special Instructions (Optional)</h3>
              <Textarea
                placeholder="Any special requests for your order..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="bg-card/60"
                rows={2}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur">
              <h3 className="mb-4 text-lg font-bold">Order Summary</h3>

              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({itemCount} item{itemCount !== 1 && "s"})
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="my-2 border-t border-border/60" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {restaurant && restaurant.min_order > subtotal && (
                <p className="mt-4 rounded-lg bg-destructive/10 p-3 text-xs text-destructive">
                  Minimum order is ${restaurant.min_order.toFixed(2)}. Add $
                  {(restaurant.min_order - subtotal).toFixed(2)} more to checkout.
                </p>
              )}

              <Button
                onClick={handleProceedToCheckout}
                disabled={
                  isLoading ||
                  !deliveryAddress.trim() ||
                  (restaurant ? subtotal < restaurant.min_order : false)
                }
                className="mt-4 w-full font-bold glow-primary"
                size="lg"
              >
                Proceed to Checkout
              </Button>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Secure payment powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
