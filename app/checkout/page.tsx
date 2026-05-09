"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { ArrowLeft, CheckCircle, Loader2, ShoppingBag, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { startCartCheckoutSession, getCheckoutSessionStatus } from "@/app/actions/stripe"
import { createClient } from "@/lib/supabase/client"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const router = useRouter()
  const { items, restaurant, subtotal, deliveryFee, total, clearCart } = useCart()
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [status, setStatus] = useState<"loading" | "checkout" | "success" | "error">("loading")
  const [error, setError] = useState<string | null>(null)

  const deliveryAddress = typeof window !== "undefined" 
    ? sessionStorage.getItem("deliveryAddress") || ""
    : ""
  const specialInstructions = typeof window !== "undefined"
    ? sessionStorage.getItem("specialInstructions") || ""
    : ""

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && status !== "success") {
      router.push("/cart")
    }
  }, [items.length, router, status])

  const fetchClientSecret = useCallback(async () => {
    if (items.length === 0 || !restaurant) {
      throw new Error("Cart is empty")
    }

    const checkoutItems = items.map((item) => ({
      name: item.menu_item?.name || "Item",
      description: item.menu_item?.description || undefined,
      price: item.menu_item?.price || 0,
      quantity: item.quantity,
    }))

    const result = await startCartCheckoutSession({
      items: checkoutItems,
      deliveryFee,
      restaurantName: restaurant.name,
      deliveryAddress,
    })

    setSessionId(result.sessionId)
    setStatus("checkout")
    return result.clientSecret
  }, [items, restaurant, deliveryFee, deliveryAddress])

  // Poll for payment status after checkout
  useEffect(() => {
    if (!sessionId || status !== "checkout") return

    const checkStatus = async () => {
      try {
        const result = await getCheckoutSessionStatus(sessionId)
        if (result.status === "complete" && result.paymentStatus === "paid") {
          // Create order in database
          await createOrder()
          setStatus("success")
          clearCart()
          // Clear session storage
          sessionStorage.removeItem("deliveryAddress")
          sessionStorage.removeItem("specialInstructions")
        }
      } catch (err) {
        console.error("Error checking status:", err)
      }
    }

    const interval = setInterval(checkStatus, 2000)
    return () => clearInterval(interval)
  }, [sessionId, status])

  const createOrder = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user || !restaurant) return

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        restaurant_id: restaurant.id,
        status: "confirmed",
        subtotal,
        delivery_fee: deliveryFee,
        total,
        delivery_address: deliveryAddress,
        special_instructions: specialInstructions || null,
        stripe_session_id: sessionId,
        estimated_delivery: new Date(
          Date.now() + (restaurant.delivery_time_max * 60 * 1000)
        ).toISOString(),
      })
      .select()
      .single()

    if (orderError || !order) {
      console.error("Error creating order:", orderError)
      return
    }

    // Create order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      menu_item_id: item.menu_item_id,
      quantity: item.quantity,
      unit_price: item.menu_item?.price || 0,
      subtotal: (item.menu_item?.price || 0) * item.quantity,
      special_instructions: item.special_instructions,
    }))

    await supabase.from("order_items").insert(orderItems)
  }

  if (status === "loading" && items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <div className="flex max-w-md flex-col items-center gap-6 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/20">
            <CheckCircle className="size-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your order. Your food is being prepared and will be delivered soon.
          </p>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link href="/orders">View Orders</Link>
            </Button>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <div className="flex max-w-md flex-col items-center gap-6 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-destructive/20">
            <XCircle className="size-10 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold">Payment Failed</h1>
          <p className="text-muted-foreground">
            {error || "Something went wrong with your payment. Please try again."}
          </p>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link href="/cart">Back to Cart</Link>
            </Button>
            <Button onClick={() => setStatus("loading")}>Try Again</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/40 glass-strong">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3">
          <Link
            href="/cart"
            className="flex size-10 items-center justify-center rounded-full bg-secondary/80 transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="text-lg font-bold">Checkout</h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        {/* Order Summary */}
        <div className="mb-6 rounded-xl border border-border/60 bg-card/60 p-4">
          <h2 className="mb-3 font-semibold">Order Summary</h2>
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {items.reduce((sum, item) => sum + item.quantity, 0)} items from {restaurant?.name}
              </span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Stripe Checkout */}
        <div className="rounded-xl border border-border/60 bg-white p-4">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </main>
    </div>
  )
}
