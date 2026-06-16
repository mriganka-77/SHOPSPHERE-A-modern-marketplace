import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShopSphere — Modern Marketplace" },
      { name: "description", content: "Discover thoughtfully curated electronics, fashion, home essentials and more." },
    ],
  }),
  component: Home,
});

const slides = [
  {
    eyebrow: "Electronics Sale",
    title: "Sound that moves you",
    desc: "Up to 40% off premium audio, wearables, and cameras.",
    cta: "Shop Electronics",
    href: "/products",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    eyebrow: "Fashion Collection",
    title: "Soft tailoring, sharp lines",
    desc: "The new season collection has landed. Crafted for everyday wear.",
    cta: "Explore Fashion",
    href: "/products",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    eyebrow: "Home Essentials",
    title: "Make every room feel like home",
    desc: "Warm textures, soft lighting, considered objects.",
    cta: "Shop Home",
    href: "/products",
    category: "Home Decor",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80",
  },
];

function Home() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);
  const latest = products.slice(0, 8);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto h-[560px] max-w-7xl px-4 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-x-4 inset-y-6 overflow-hidden rounded-3xl bg-primary shadow-elegant sm:inset-x-6"
            >
              <img src={slides[i].image} alt={slides[i].title} className="absolute inset-0 h-full w-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/90 via-primary/40 to-transparent" />
              <div className="relative flex h-full max-w-2xl flex-col justify-end p-8 text-primary-foreground sm:p-14">
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-xs font-semibold uppercase tracking-[0.3em] text-accent"
                >
                  {slides[i].eyebrow}
                </motion.span>
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-3 font-display text-4xl font-bold leading-tight text-balance sm:text-6xl"
                >
                  {slides[i].title}
                </motion.h1>
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 max-w-md text-base text-primary-foreground/80"
                >
                  {slides[i].desc}
                </motion.p>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-7 flex gap-3"
                >
                  <Link to="/products" search={{ category: slides[i].category }}>
                    <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                      {slides[i].cta} <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/categories">
                    <Button size="lg" variant="outline" className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                      Browse all
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-12 right-10 z-10 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-accent" : "w-2 bg-primary-foreground/40"}`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Shop by category</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Pick your aisle</h2>
          </div>
          <Link to="/categories" className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c, idx) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Link
                to="/products"
                search={{ category: c.name }}
                className="group relative block aspect-square overflow-hidden rounded-2xl"
              >
                <img src={c.image} alt={c.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute bottom-3 left-3 text-sm font-semibold text-white">{c.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LATEST */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Just landed</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Latest products</h2>
          </div>
          <Link to="/products" className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex">
            Shop all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {latest.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="grid gap-4 rounded-3xl bg-muted/40 p-6 md:grid-cols-4 md:p-10">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders over ₹999" },
            { icon: ShieldCheck, title: "Secure Payments", desc: "100% protected checkout" },
            { icon: RotateCcw, title: "Easy Returns", desc: "30-day hassle-free returns" },
            { icon: Headphones, title: "24/7 Support", desc: "We're always here to help" },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-background text-accent">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
