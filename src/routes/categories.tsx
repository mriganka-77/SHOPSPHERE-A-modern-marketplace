import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/products";
import { motion } from "motion/react";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — ShopSphere" },
      { name: "description", content: "Browse all categories." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold sm:text-5xl">Categories</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Six curated worlds. Pick one to start exploring.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to="/products"
              search={{ category: c.name }}
              className="group block overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-accent">
                  Explore{" "}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
