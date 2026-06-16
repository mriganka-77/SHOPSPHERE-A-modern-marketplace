import { Link } from "@tanstack/react-router";
import { Star, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { motion } from "motion/react";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:shadow-elegant"
    >
      <Link to="/products/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
              {product.badge}
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{product.category}</p>
        <Link to="/products/$id" params={{ id: product.id }}>
          <h3 className="mt-1 line-clamp-1 font-display text-base font-semibold leading-snug">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="font-display text-lg font-bold">{formatPrice(product.price)}</p>
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              add(product);
              toast.success(`Added ${product.name}`);
            }}
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
