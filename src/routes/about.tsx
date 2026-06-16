import { createFileRoute } from "@tanstack/react-router";
import { Truck, ShieldCheck, Award, Heart } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — ShopSphere" }, { name: "description", content: "Our story and values." }] }),
  component: AboutPage,
});

const features = [
  { icon: Truck, title: "Fast Delivery", desc: "Most orders ship within 24 hours." },
  { icon: ShieldCheck, title: "Secure Payments", desc: "Bank-grade encryption on every checkout." },
  { icon: Award, title: "Premium Products", desc: "Hand-picked from trusted makers." },
  { icon: Heart, title: "Customer Satisfaction", desc: "98% of customers shop with us again." },
];

const testimonials = [
  { name: "Aarav Mehta", role: "Loyal Customer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    quote: "ShopSphere has completely changed how I shop online. Quality and service are unmatched." },
  { name: "Priya Sharma", role: "Verified Buyer", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    quote: "Beautifully packaged, delivered fast, exactly as described. I'm a customer for life." },
  { name: "Rohan Verma", role: "Repeat Customer", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    quote: "The product range is incredible. Found everything I needed in one place." },
];

function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Our Story</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-6xl text-balance">
          Built around the things people actually love
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          ShopSphere started in 2021 as a small team obsessed with finding objects that feel good to live with.
          Today we work with hundreds of makers across the world, bringing carefully chosen pieces to over a million customers.
          We believe shopping should feel calm, considered and a little bit joyful.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border/60 bg-card p-6"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-accent text-accent-foreground"><f.icon className="h-5 w-5" /></div>
              <h3 className="mt-5 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Testimonials</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Loved by our customers</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border/60 bg-card p-6"
            >
              <blockquote className="text-balance text-base leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img src={t.img} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>
    </div>
  );
}
