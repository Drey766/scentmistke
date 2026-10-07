"use client"; // Required — contains newsletter <form onSubmit={...}>

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Icon from "@/components/ui/Icon";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const subscribers = JSON.parse(localStorage.getItem("perfume_subscribers") || "[]") as string[];
    if (subscribers.includes(email.toLowerCase())) {
      toast("You're already subscribed!", { icon: <Icon name="heart" size={18} className="text-brand-gold" /> });
      return;
    }
    localStorage.setItem("perfume_subscribers", JSON.stringify([...subscribers, email.toLowerCase()]));
    toast.success("Subscribed! Welcome to the Perfume Plug family.");
    setEmail("");
  };

  const shopLinks = [
    { href: "/shop?category=womens", label: "Women's Fragrances" },
    { href: "/shop?category=mens", label: "Men's Fragrances" },
    { href: "/shop?category=unisex", label: "Unisex Collection" },
    { href: "/shop?sort=featured", label: "Featured Picks" },
    { href: "/shop?sort=newest", label: "New Arrivals" },
  ];

  const helpLinks = [
    { href: "/contact", label: "Contact Us" },
    { href: "/blog", label: "Fragrance Journal" },
    { href: "/checkout", label: "Order & Delivery" },
    { href: "/cart", label: "My Cart" },
    { href: "/wishlist", label: "My Wishlist" },
  ];

  return (
    <footer className="bg-brand-dark border-t border-brand-mid mt-auto">
      {/* Main footer grid */}
      <div className="container-site py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand column */}
        <div className="lg:col-span-1">
          <Link href="/">
            <span className="font-display text-3xl font-light tracking-[0.15em] text-brand-white">
              SCENT<span className="text-brand-gold">MIST</span>
            </span>
            <span className="block text-[9px] font-body tracking-[0.4em] text-brand-muted uppercase mt-1">
              Kenya
            </span>
          </Link>
          <p className="mt-4 text-sm text-brand-muted font-body leading-relaxed">
            Authentic luxury fragrances delivered across Kenya. Discover your signature scent.
          </p>
          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/254726433862"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-brand-gold hover:text-brand-gold-light font-body transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.127 1.533 5.862L0 24l6.297-1.517A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.877 9.877 0 01-5.034-1.376l-.361-.214-3.741.98.998-3.648-.235-.374A9.86 9.86 0 012.118 12C2.118 6.486 6.486 2.118 12 2.118S21.882 6.486 21.882 12 17.514 21.882 12 21.882z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* Shop links */}
        <div>
          <h4 className="font-heading text-sm uppercase tracking-widest text-brand-muted mb-4">Shop</h4>
          <ul className="space-y-2.5">
            {shopLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-brand-muted hover:text-brand-gold font-body transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help links */}
        <div>
          <h4 className="font-heading text-sm uppercase tracking-widest text-brand-muted mb-4">Help</h4>
          <ul className="space-y-2.5">
            {helpLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-brand-muted hover:text-brand-gold font-body transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-heading text-sm uppercase tracking-widest text-brand-muted mb-4">
            Stay in the Know
          </h4>
          <p className="text-sm text-brand-muted font-body mb-4">
            New arrivals, fragrance tips, and exclusive offers — straight to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="input text-sm"
            />
            <button type="submit" className="btn-primary py-2.5 text-xs">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-mid">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-brand-muted font-body">
            © {new Date().getFullYear()} Scent Mist Kenya. All rights reserved.
          </p>
          <p className="text-xs text-brand-muted font-body">
            Payments via{" "}
            <span className="text-brand-gold">M-Pesa</span>
            {" "}· Authentic fragrances guaranteed
          </p>
        </div>
      </div>
    </footer>
  );
}
