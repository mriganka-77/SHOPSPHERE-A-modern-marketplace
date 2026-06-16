import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — ShopSphere" }, { name: "description", content: "Get in touch with our team." }] }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Invalid email"),
  subject: z.string().trim().min(3, "Subject too short").max(120),
  message: z.string().trim().min(10, "Message too short").max(1000),
});
type FormVals = z.infer<typeof schema>;

function ContactPage() {
  const [form, setForm] = useState<FormVals>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormVals, string>>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = schema.safeParse(form);
    if (!res.success) {
      const errs: Partial<Record<keyof FormVals, string>> = {};
      res.error.issues.forEach((i) => { errs[i.path[0] as keyof FormVals] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setForm({ name: "", email: "", subject: "", message: "" });
    toast.success("Message sent! We'll get back to you shortly.");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Get in touch</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">We'd love to hear from you</h1>
        <p className="mt-3 text-muted-foreground">Questions, feedback, partnerships — drop us a note.</p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {[
            { icon: MapPin, label: "Address", value: "123 Market Street, Mumbai 400001" },
            { icon: Mail, label: "Email", value: "hello@shopsphere.com" },
            { icon: Phone, label: "Phone", value: "+91 98765 43210" },
          ].map((it) => (
            <div key={it.label} className="flex gap-4 rounded-2xl border border-border/60 bg-card p-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-accent text-accent-foreground">
                <it.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{it.label}</p>
                <p className="mt-1 font-medium">{it.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" className="mb-1.5 block">Name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={errors.name ? "border-destructive" : ""} />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="mb-1.5 block">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={errors.email ? "border-destructive" : ""} />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="subject" className="mb-1.5 block">Subject</Label>
              <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={errors.subject ? "border-destructive" : ""} />
              {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="message" className="mb-1.5 block">Message</Label>
              <Textarea id="message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={errors.message ? "border-destructive" : ""} />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>
          </div>
          <Button type="submit" size="lg" className="mt-6 rounded-full bg-gradient-accent text-accent-foreground hover:opacity-90">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
