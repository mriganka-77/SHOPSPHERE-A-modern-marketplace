import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Minus, Plus, ShoppingBag, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { getProduct, getRelated, formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { motion } from "motion/react";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — ShopSphere` },
          { name: "description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-bold">Product not found</h1>
      <Link to="/products" className="mt-4 inline-block text-accent underline">Back to products</Link>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const related = getRelated(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="aspect-square overflow-hidden rounded-3xl bg-muted">
            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              src={product.images[active]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`aspect-square overflow-hidden rounded-xl border-2 transition ${
                  i === active ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{product.category}</p>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
          </div>
          <p className="mt-6 font-display text-4xl font-bold">{formatPrice(product.price)}</p>
          <p className="mt-6 text-muted-foreground">{product.description}</p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center"><Minus className="h-4 w-4" /></button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-11 w-11 place-items-center"><Plus className="h-4 w-4" /></button>
            </div>
            <Button
              size="lg"
              className="flex-1 rounded-full bg-gradient-accent text-accent-foreground hover:opacity-90"
              onClick={() => { add(product, qty); toast.success(`Added ${qty} × ${product.name}`); }}
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> Add to cart
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6 text-xs">
            {[
              { icon: Truck, label: "Free shipping" },
              { icon: ShieldCheck, label: "Secure payment" },
              { icon: RotateCcw, label: "Easy returns" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2 text-muted-foreground">
                <f.icon className="h-4 w-4 text-accent" />
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">You might also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
