import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "motion/react";

const cats = ["Electronics", "Fashion", "Shoes", "Accessories", "Home Decor", "Books"];

const schema = z.object({
  category: fallback(z.string().optional(), undefined),
  q: fallback(z.string().optional(), undefined),
});

export const Route = createFileRoute("/products")({
  validateSearch: zodValidator(schema),
  head: () => ({ meta: [{ title: "Products — ShopSphere" }, { name: "description", content: "Browse our full product catalog with smart filters." }] }),
  component: ProductsPage,
});

function ProductsPage() {
  const { category, q: qParam } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [selected, setSelected] = useState<string[]>(category ? [category] : []);
  const [range, setRange] = useState<[number, number]>([0, 50000]);
  const [q, setQ] = useState(qParam ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selected.length && !selected.includes(p.category)) return false;
      if (p.price < range[0] || p.price > range[1]) return false;
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [selected, range, q]);

  const toggle = (c: string) => {
    const next = selected.includes(c) ? selected.filter((x) => x !== c) : [...selected, c];
    setSelected(next);
    navigate({ search: { category: next[0], q: q || undefined }, replace: true });
  };

  const clear = () => {
    setSelected([]);
    setRange([0, 50000]);
    setQ("");
    navigate({ search: {}, replace: true });
  };

  const Filters = (
    <div className="space-y-7">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Filters</h3>
          <button onClick={clear} className="text-xs text-muted-foreground hover:text-foreground">Clear all</button>
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Search</h4>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" className="pl-9" />
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</h4>
        <div className="space-y-2.5">
          {cats.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <Checkbox checked={selected.includes(c)} onCheckedChange={() => toggle(c)} />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price Range</h4>
        <Slider value={range} onValueChange={(v) => setRange([v[0], v[1]] as [number, number])} max={50000} step={500} />
        <div className="mt-3 flex justify-between text-xs text-muted-foreground">
          <span>{formatPrice(range[0])}</span>
          <span>{formatPrice(range[1])}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">All Products</h1>
          <p className="mt-2 text-sm text-muted-foreground">{filtered.length} products found</p>
        </div>
        <Button variant="outline" className="lg:hidden" onClick={() => setMobileOpen(true)}>
          <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border/60 bg-card p-6">{Filters}</div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border py-20 text-center">
              <p className="text-lg font-semibold">No products match your filters</p>
              <p className="mt-1 text-sm text-muted-foreground">Try adjusting the price range or category.</p>
              <Button onClick={clear} variant="outline" className="mt-4">Reset filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween" }}
              className="h-full w-[85%] max-w-sm overflow-y-auto bg-background p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-xl font-bold">Filters</h3>
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}><X className="h-5 w-5" /></Button>
              </div>
              {Filters}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
