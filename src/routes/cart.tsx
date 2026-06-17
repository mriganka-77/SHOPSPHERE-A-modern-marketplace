import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — ShopSphere" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, count } = useCart();
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-muted">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything yet.</p>
        <Link to="/products">
          <Button className="mt-6 rounded-full">
            Start Shopping <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Your Cart</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {count} item{count !== 1 && "s"}
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.map((it) => (
            <motion.div
              key={it.product.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-[88px_1fr_auto] gap-4 rounded-2xl border border-border/60 bg-card p-4 sm:grid-cols-[120px_1fr_auto] sm:p-5"
            >
              <Link
                to="/products/$id"
                params={{ id: it.product.id }}
                className="overflow-hidden rounded-xl bg-muted"
              >
                <img
                  src={it.product.image}
                  alt={it.product.name}
                  className="h-full w-full object-cover"
                />
              </Link>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  {it.product.category}
                </p>
                <Link to="/products/$id" params={{ id: it.product.id }}>
                  <h3 className="mt-1 line-clamp-2 font-display text-base font-semibold sm:text-lg">
                    {it.product.name}
                  </h3>
                </Link>
                <p className="mt-2 font-bold">{formatPrice(it.product.price)}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                      onClick={() => setQty(it.product.id, it.quantity - 1)}
                      className="grid h-8 w-8 place-items-center"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{it.quantity}</span>
                    <button
                      onClick={() => setQty(it.product.id, it.quantity + 1)}
                      className="grid h-8 w-8 place-items-center"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => remove(it.product.id)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
              <div className="self-start text-right font-display text-lg font-bold">
                {formatPrice(it.product.price * it.quantity)}
              </div>
            </motion.div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-border/60 bg-card p-6 lg:sticky lg:top-24">
          <h3 className="font-display text-xl font-bold">Order Summary</h3>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tax (5%)</dt>
              <dd className="font-medium">{formatPrice(tax)}</dd>
            </div>
            <div className="my-3 h-px bg-border" />
            <div className="flex justify-between text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-display text-xl font-bold">{formatPrice(total)}</dd>
            </div>
          </dl>
          <Link to="/checkout">
            <Button
              size="lg"
              className="mt-6 w-full rounded-full bg-gradient-accent text-accent-foreground hover:opacity-90"
            >
              Proceed to Checkout <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
          <Link
            to="/products"
            className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
