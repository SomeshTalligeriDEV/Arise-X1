"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  MapPin,
  Package,
  ShoppingBag,
  Truck,
  UtensilsCrossed,
  ChefHat,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/bottom-nav"
import type { Order, OrderStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

interface OrdersPageClientProps {
  orders: Order[]
}

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; icon: typeof Clock; color: string; bgColor: string }
> = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-amber-500",
    bgColor: "bg-amber-500/15",
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle,
    color: "text-blue-500",
    bgColor: "bg-blue-500/15",
  },
  preparing: {
    label: "Preparing",
    icon: ChefHat,
    color: "text-orange-500",
    bgColor: "bg-orange-500/15",
  },
  out_for_delivery: {
    label: "Out for Delivery",
    icon: Truck,
    color: "text-purple-500",
    bgColor: "bg-purple-500/15",
  },
  delivered: {
    label: "Delivered",
    icon: Package,
    color: "text-primary",
    bgColor: "bg-primary/15",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/15",
  },
}

export function OrdersPageClient({ orders }: OrdersPageClientProps) {
  const activeOrders = orders.filter(
    (o) => !["delivered", "cancelled"].includes(o.status)
  )
  const pastOrders = orders.filter((o) =>
    ["delivered", "cancelled"].includes(o.status)
  )

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/40 glass-strong">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3">
          <Link
            href="/"
            className="flex size-10 items-center justify-center rounded-full bg-secondary/80 transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="text-lg font-bold">Your Orders</h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card/40 py-16">
            <div className="flex size-20 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="size-10 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-xl font-bold">No orders yet</h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              When you place an order, it will appear here
            </p>
            <Button asChild className="mt-6">
              <Link href="/">Start Ordering</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Active Orders */}
            {activeOrders.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-bold">Active Orders</h2>
                <div className="flex flex-col gap-4">
                  {activeOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              </section>
            )}

            {/* Past Orders */}
            {pastOrders.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-bold">Past Orders</h2>
                <div className="flex flex-col gap-4">
                  {pastOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}

function OrderCard({ order }: { order: Order }) {
  const statusConfig = STATUS_CONFIG[order.status]
  const StatusIcon = statusConfig.icon
  const orderDate = new Date(order.created_at)
  const formattedDate = orderDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
  const formattedTime = orderDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

  return (
    <article className="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative size-12 overflow-hidden rounded-lg">
            {order.restaurant?.image_url ? (
              <Image
                src={order.restaurant.image_url}
                alt={order.restaurant?.name ?? ""}
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
            <span className="font-semibold">{order.restaurant?.name}</span>
            <span className="text-xs text-muted-foreground">
              {formattedDate} at {formattedTime}
            </span>
          </div>
        </div>
        <div
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1",
            statusConfig.bgColor
          )}
        >
          <StatusIcon className={cn("size-3.5", statusConfig.color)} />
          <span className={cn("text-xs font-medium", statusConfig.color)}>
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-4 flex flex-col gap-2">
        {order.order_items?.slice(0, 3).map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {item.quantity}x {item.menu_item?.name}
            </span>
            <span>${item.subtotal.toFixed(2)}</span>
          </div>
        ))}
        {(order.order_items?.length ?? 0) > 3 && (
          <span className="text-xs text-muted-foreground">
            +{(order.order_items?.length ?? 0) - 3} more items
          </span>
        )}
      </div>

      {/* Delivery Address */}
      <div className="mt-3 flex items-start gap-2 rounded-lg bg-secondary/30 p-2 text-xs">
        <MapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
        <span className="text-muted-foreground">{order.delivery_address}</span>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Total</span>
          <span className="text-lg font-bold text-primary">
            ${order.total.toFixed(2)}
          </span>
        </div>
        {order.status === "delivered" && (
          <Button asChild variant="outline" size="sm">
            <Link href={`/restaurant/${order.restaurant_id}`}>Reorder</Link>
          </Button>
        )}
        {order.estimated_delivery && !["delivered", "cancelled"].includes(order.status) && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            Est. delivery:{" "}
            {new Date(order.estimated_delivery).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </div>
        )}
      </div>
    </article>
  )
}
