import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — ShopSphere" }] }),
  component: CheckoutPage,
});

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Invalid email"),
  phone: z.string().trim().regex(/^[0-9+\- ]{7,15}$/, "Invalid phone number"),
  address: z.string().trim().min(5, "Address too short").max(200),
  city: z.string().trim().min(2).max(60),
  state: z.string().trim().min(2).max(60),
  pincode: z.string().trim().regex(/^[0-9]{4,8}$/, "Invalid pincode"),
});

type FormVals = z.infer<typeof schema>;

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormVals>({
    fullName: "", email: "", phone: "", address: "", city: "", state: "", pincode: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormVals, string>>>({});

  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const set = <K extends keyof FormVals>(k: K, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) { toast.error("Your cart is empty"); return; }
    const res = schema.safeParse(form);
    if (!res.success) {
      const errs: Partial<Record<keyof FormVals, string>> = {};
      res.error.issues.forEach((i) => { errs[i.path[0] as keyof FormVals] = i.message; });
      setErrors(errs);
      toast.error("Please fix the highlighted fields");
      return;
    }
    const orderNumber = "SS-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    clear();
    navigate({ to: "/order-confirmation", search: { order: orderNumber } });
  };

  const fields: Array<[keyof FormVals, string, string?]> = [
    ["fullName", "Full Name"],
    ["email", "Email", "email"],
    ["phone", "Phone Number", "tel"],
    ["address", "Address"],
    ["city", "City"],
    ["state", "State"],
    ["pincode", "Pincode"],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Checkout</h1>

      <form onSubmit={submit} className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold">Shipping Information</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {fields.map(([k, label, type]) => (
              <div key={k} className={k === "address" ? "sm:col-span-2" : ""}>
                <Label htmlFor={k} className="mb-1.5 block">{label}</Label>
                <Input
                  id={k}
                  type={type ?? "text"}
                  value={form[k]}
                  onChange={(e) => set(k, e.target.value)}
                  aria-invalid={!!errors[k]}
                  className={errors[k] ? "border-destructive" : ""}
                />
                {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
              </div>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-border/60 bg-card p-6 lg:sticky lg:top-24">
          <h3 className="font-display text-xl font-bold">Order Summary</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {items.map((it) => (
              <li key={it.product.id} className="flex gap-3">
                <img src={it.product.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 font-medium">{it.product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {it.quantity}</p>
                </div>
                <p className="font-medium">{formatPrice(it.product.price * it.quantity)}</p>
              </li>
            ))}
          </ul>
          <div className="my-5 h-px bg-border" />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Tax</dt><dd>{formatPrice(tax)}</dd></div>
            <div className="mt-3 flex justify-between border-t border-border pt-3 text-base">
              <dt className="font-semibold">Total</dt><dd className="font-display text-xl font-bold">{formatPrice(total)}</dd>
            </div>
          </dl>
          <Button type="submit" size="lg" className="mt-6 w-full rounded-full bg-gradient-accent text-accent-foreground hover:opacity-90">
            Place Order
          </Button>
        </aside>
      </form>
    </div>
  );
}
