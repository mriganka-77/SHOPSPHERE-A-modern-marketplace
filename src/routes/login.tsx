import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — ShopSphere" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // fake login delay
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    if (!email || !password) return toast.error("Enter email and password");
    toast.success("Logged in (demo)");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 sm:p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mx-auto max-w-md"
        >
          <h1 className="font-display text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to continue to ShopSphere</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <Label htmlFor="email" className="mb-1 block">
                Email
              </Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="password" className="mb-1 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="w-full mt-2 rounded-full">
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/" className="text-accent underline">
              Continue as guest
            </Link>
          </p>
        </motion.div>

        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="pointer-events-none absolute -right-40 top-0 hidden h-full w-96 translate-x-0 transform sm:block"
        >
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -left-16 top-8 h-56 w-56 rounded-full bg-gradient-to-tr from-accent to-accent/60 opacity-30 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, 10, 0], y: [0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute left-8 bottom-12 h-40 w-40 rounded-full bg-gradient-to-br from-primary to-primary/50 opacity-25 blur-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
}
