import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";

export type CartItem = { product: Product; quantity: number };

type CartCtx = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "shopsphere_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to load cart from localStorage:", e);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add: CartCtx["add"] = (p, qty = 1) =>
    setItems((cur) => {
      const ex = cur.find((i) => i.product.id === p.id);
      if (ex)
        return cur.map((i) => (i.product.id === p.id ? { ...i, quantity: i.quantity + qty } : i));
      return [...cur, { product: p, quantity: qty }];
    });

  const remove: CartCtx["remove"] = (id) =>
    setItems((cur) => cur.filter((i) => i.product.id !== id));

  const setQty: CartCtx["setQty"] = (id, qty) =>
    setItems((cur) =>
      cur.map((i) => (i.product.id === id ? { ...i, quantity: Math.max(1, qty) } : i)),
    );

  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.quantity * i.product.price, 0);

  return (
    <Ctx.Provider value={{ items, add, remove, setQty, clear, count, subtotal }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
};
