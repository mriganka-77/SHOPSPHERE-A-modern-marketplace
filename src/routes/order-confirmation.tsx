import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const schema = z.object({ order: fallback(z.string(), "SS-XXXXXX").default("SS-XXXXXX") });

export const Route = createFileRoute("/order-confirmation")({
  validateSearch: zodValidator(schema),
  head: () => ({ meta: [{ title: "Order Confirmed — ShopSphere" }] }),
  component: OrderConfirmation,
});

function OrderConfirmation() {
  const { order } = Route.useSearch();
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-accent text-accent-foreground shadow-glow"
      >
        <CheckCircle2 className="h-12 w-12" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 font-display text-4xl font-bold"
      >
        Order Confirmed!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-3 text-muted-foreground"
      >
        Thanks for shopping with ShopSphere. We'll send you a confirmation email shortly.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 rounded-2xl border border-border/60 bg-card p-6"
      >
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Order Number</p>
        <p className="mt-1 font-display text-2xl font-bold">{order}</p>
        <p className="mt-4 text-sm">
          Status: <span className="font-semibold text-accent">Confirmed</span>
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 flex flex-wrap justify-center gap-3"
      >
        <Link to="/products">
          <Button size="lg" className="rounded-full">
            Continue Shopping
          </Button>
        </Link>
        <Link to="/">
          <Button size="lg" variant="outline" className="rounded-full">
            View Products
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
