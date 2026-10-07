"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Animated CSS background ── */}
      {/* Layered radial gradients create a deep, moody atmosphere — no images needed */}
      <div className="absolute inset-0 bg-brand-black">
        {/* Deep purple bloom — top left */}
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #6B4C8A 0%, transparent 70%)" }}
        />
        {/* Gold shimmer — centre right */}
        <div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
        />
        {/* Rose bloom — bottom left */}
        <div
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #C4688A 0%, transparent 70%)" }}
        />
        {/* Darker overlay to ensure legibility */}
        <div className="absolute inset-0 bg-brand-black/60" />
      </div>

      {/* ── Floating bottle silhouettes (CSS only shapes) ── */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block opacity-20 pointer-events-none">
        <div className="w-32 h-72 bg-gradient-to-b from-brand-gold/40 to-transparent rounded-t-full rounded-b-sm animate-float" />
      </div>
      <div className="absolute right-40 top-1/3 hidden xl:block opacity-10 pointer-events-none">
        <div
          className="w-20 h-48 bg-gradient-to-b from-brand-purple/40 to-transparent rounded-t-full rounded-b-sm animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 container-site py-32">
        <div className="max-w-3xl">

          {/* Eyebrow tag */}
          <div className="animate-fade-in mb-6">
            <span className="section-tag">Arabic Fragrances · Kenya</span>
          </div>

          {/* Main headline — gold-to-purple gradient text */}
          <h1
            className="font-display font-light text-6xl sm:text-7xl lg:text-8xl leading-none tracking-tight mb-6 animate-slide-up"
          >
            <span
              className="bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-purple
                         bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer"
            >
              Discover
            </span>
            <br />
            <span className="text-brand-white">Your Signature</span>
            <br />
            <span className="text-brand-white opacity-80">Scent</span>
          </h1>

          {/* Sub-heading */}
          <p
            className="font-body text-lg sm:text-xl text-brand-muted leading-relaxed max-w-xl mb-10 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Authentic luxury perfumes for men, women and beyond. Armaf, YSL, Mousuf, Panache and more
            — delivered across Kenya.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Link href="/shop" className="btn-primary text-sm px-8 py-4">
              Shop Collection
            </Link>
            <Link href="/shop?category=womens" className="btn-outline text-sm px-8 py-4">
              Women&apos;s Picks
            </Link>
          </div>

          {/* Trust badges */}
          <div
            className="flex flex-wrap gap-6 mt-12 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { icon: "✓", label: "Authentic Fragrances" },
              { icon: "📦", label: "Nationwide Delivery" },
              { icon: "💳", label: "M-Pesa Payments" },
              { icon: "💬", label: "WhatsApp Support" },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2">
                <span className="text-brand-gold text-sm">{badge.icon}</span>
                <span className="text-xs text-brand-muted font-body uppercase tracking-wider">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
        <span className="text-xs text-brand-muted font-body uppercase tracking-widest">Scroll</span>
        <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
