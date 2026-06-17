import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";

const schema = z.object({ q: fallback(z.string().optional(), undefined) });

export const Route = createFileRoute("/search")({
  validateSearch: zodValidator(schema),
  head: () => ({ meta: [{ title: "Search — ShopSphere" }] }),
  component: SearchPage,
});

function SearchPage() {
  const { q: initial } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [q, setQ] = useState(initial ?? "");

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(t) ||
        p.category.toLowerCase().includes(t) ||
        p.description.toLowerCase().includes(t),
    );
  }, [q]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold sm:text-5xl">Search</h1>
      <div className="relative mt-6 max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          autoFocus
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            navigate({ search: { q: e.target.value || undefined }, replace: true });
          }}
          placeholder="Search across all products..."
          className="h-14 rounded-full pl-12 text-base"
        />
      </div>

      {!q.trim() ? (
        <p className="mt-10 text-muted-foreground">Start typing to search products.</p>
      ) : results.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border py-20 text-center">
          <p className="text-lg font-semibold">No results for "{q}"</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different keyword or browse all products.
          </p>
        </div>
      ) : (
        <>
          <p className="mt-8 text-sm text-muted-foreground">
            {results.length} result{results.length !== 1 && "s"} for "{q}"
          </p>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
