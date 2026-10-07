"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import CartDrawer from "@/components/cart/CartDrawer";
import Icon from "@/components/ui/Icon";

export default function Navbar() {
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/shop?category=womens", label: "Women" },
    { href: "/shop?category=mens", label: "Men" },
    { href: "/shop?category=unisex", label: "Unisex" },
    { href: "/blog", label: "Journal" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-brand-black/95 backdrop-blur-md border-b border-brand-mid">
        <div className="container-site flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0"><span className="font-display text-2xl font-light tracking-[0.15em] text-brand-white">SCENT<span className="text-brand-gold">MIST</span></span><span className="block text-[9px] font-body tracking-[0.4em] text-brand-muted uppercase -mt-1">Kenya</span></Link>
          <div className="hidden lg:flex items-center gap-8">{navLinks.map((link) => <Link key={link.href} href={link.href} className="text-brand-muted hover:text-brand-white text-sm font-body tracking-wider uppercase transition-colors">{link.label}</Link>)}</div>
          <div className="flex items-center gap-3">
            <Link href="/wishlist" className="relative p-2 text-brand-muted hover:text-brand-white" aria-label="Wishlist"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>{wishlistItems.length > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-rose text-white text-[10px] flex items-center justify-center">{wishlistItems.length}</span>}</Link>
            <button onClick={() => setCartOpen(true)} className="relative p-2 text-brand-muted hover:text-brand-white" aria-label="Open cart"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" /></svg>{itemCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-gold text-brand-black text-[10px] flex items-center justify-center">{itemCount}</span>}</button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-brand-muted" aria-label="Toggle menu"><Icon name={menuOpen ? "close" : "menu"} size={20} /></button>
          </div>
        </div>
        {menuOpen && <div className="lg:hidden border-t border-brand-mid bg-brand-dark"><div className="container-site py-4 flex flex-col gap-3">{navLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-brand-light hover:text-brand-white text-sm font-body tracking-wider uppercase py-2">{link.label}</Link>)}</div></div>}
      </nav>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
