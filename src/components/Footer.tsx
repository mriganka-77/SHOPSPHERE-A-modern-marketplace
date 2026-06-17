import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-accent text-accent-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-display text-xl font-semibold">ShopSphere</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            A modern marketplace bringing thoughtfully curated products to your doorstep.
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Twitter, Youtube].map((I, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full bg-background text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-foreground">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-foreground">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Categories</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {["Electronics", "Fashion", "Shoes", "Accessories", "Home Decor", "Books"].map((c) => (
              <li key={c}>
                <Link to="/products" search={{ category: c }} className="hover:text-foreground">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Get in Touch</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>123 Market Street</li>
            <li>Mumbai, India 400001</li>
            <li>hello@shopsphere.com</li>
            <li>+91 98765 43210</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} ShopSphere. Crafted with care.
        </p>
      </div>
    </footer>
  );
}
