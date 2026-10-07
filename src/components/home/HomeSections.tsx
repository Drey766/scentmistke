"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import ProductCard from "@/components/shop/ProductCard";
import { getScentTagClasses } from "@/lib/utils";
import Icon, { IconName } from "@/components/ui/Icon";

// ─── Scrolling scent notes marquee ────────────────────────────────────────
const MARQUEE_NOTES = [
  "Rose", "Oud", "Sandalwood", "Bergamot", "Musk", "Jasmine", "Amber",
  "Cedarwood", "Vetiver", "Neroli", "Patchouli", "Vanilla", "Iris", "Ylang-Ylang",
];

export function MarqueeBar() {
  // Duplicate the notes so the seamless loop works
  const notes = [...MARQUEE_NOTES, ...MARQUEE_NOTES];
  return (
    <div className="bg-brand-gold/10 border-y border-brand-gold/20 py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {notes.map((note, i) => (
          <span key={`${note}-${i}`} className="flex items-center gap-4 px-4">
            <span className="text-brand-gold text-xs font-body uppercase tracking-[0.3em]">{note}</span>
            <span className="text-brand-gold/40 text-xs">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Shop by Gender cards ──────────────────────────────────────────────────
export function GenderCards() {
  const cards = [
    {
      href: "/shop?category=womens",
      label: "Women",
      icon: "flower" as IconName,
      desc: "Floral, fresh & oriental feminines",
      gradient: "from-brand-rose/30 to-brand-purple/20",
      border: "border-brand-rose/30",
    },
    {
      href: "/shop?category=mens",
      label: "Men",
      icon: "droplet" as IconName,
      desc: "Bold woodies, citrus & aquatics",
      gradient: "from-blue-800/30 to-brand-mid/20",
      border: "border-blue-700/30",
    },
    {
      href: "/shop?category=unisex",
      label: "Unisex",
      icon: "sparkle" as IconName,
      desc: "Shared masterpieces for all",
      gradient: "from-brand-purple/30 to-brand-gold/10",
      border: "border-brand-purple/30",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-site">
        <div className="text-center mb-12">
          <span className="section-tag">Collections</span>
          <h2 className="font-display text-4xl sm:text-5xl mt-4 text-brand-white">Shop by Gender</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`group relative overflow-hidden rounded-sm border ${card.border}
                          bg-gradient-to-br ${card.gradient} p-10 flex flex-col items-center text-center
                          transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/40 hover:shadow-gold`}
            >
              <span className="text-5xl mb-4 block transition-transform duration-300 group-hover:scale-110">
                <Icon name={card.icon} size={48} className="text-brand-gold" />
              </span>
              <h3 className="font-display text-3xl text-brand-white mb-2">{card.label}</h3>
              <p className="text-sm text-brand-muted font-body">{card.desc}</p>
              <span className="mt-6 text-xs text-brand-gold uppercase tracking-widest font-body
                               group-hover:tracking-[0.3em] transition-all duration-300">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Featured Products Grid ────────────────────────────────────────────────
export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="section-padding bg-brand-dark/50">
      <div className="container-site">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="section-tag">Curated Picks</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-4 text-brand-white">Featured Fragrances</h2>
          </div>
          <Link href="/shop?sort=featured" className="btn-outline text-xs hidden sm:inline-flex">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8 sm:hidden">
          <Link href="/shop" className="btn-outline text-xs">View All Products</Link>
        </div>
      </div>
    </section>
  );
}

// ─── Shop by Scent Family ──────────────────────────────────────────────────
const SCENT_FAMILIES = [
  { name: "floral", icon: "rose" as IconName, desc: "Rose, Jasmine, Peony" },
  { name: "woody", icon: "leaf" as IconName, desc: "Sandalwood, Cedar, Vetiver" },
  { name: "oriental", icon: "compass" as IconName, desc: "Oud, Amber, Vanilla" },
  { name: "citrus", icon: "droplet" as IconName, desc: "Bergamot, Lemon, Neroli" },
  { name: "aquatic", icon: "droplet" as IconName, desc: "Sea notes, Fresh, Clean" },
  { name: "musk", icon: "cloud" as IconName, desc: "Musk, Ambroxan, White woods" },
];

export function ScentFamilyGrid() {
  return (
    <section className="section-padding">
      <div className="container-site">
        <div className="text-center mb-12">
          <span className="section-tag">Discover</span>
          <h2 className="font-display text-4xl sm:text-5xl mt-4 text-brand-white">Shop by Scent Family</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SCENT_FAMILIES.map((family) => (
            <Link
              key={family.name}
              href={`/shop?scent=${family.name}`}
              className="group flex flex-col items-center text-center p-6 bg-brand-dark border border-brand-mid rounded-sm
                         hover:border-brand-gold/40 hover:-translate-y-1 hover:shadow-gold transition-all duration-300"
            >
              <span className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110">
                <Icon name={family.icon} size={32} className="text-brand-gold" />
              </span>
              <span className={`scent-tag mb-2 ${getScentTagClasses(family.name)}`}>
                {family.name}
              </span>
              <p className="text-xs text-brand-muted font-body leading-snug">{family.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Luxury Brand Marquee ──────────────────────────────────────────────────
const BRANDS = [
  "Armaf", "YSL", "Dior", "Versace", "Gucci", "Prada", "Tom Ford",
  "Burberry", "Calvin Klein", "Hugo Boss", "Montblanc", "Paco Rabanne",
  "Narciso Rodriguez", "Lattafa", "Al Haramain",
];

export function BrandStrip() {
  const brands = [...BRANDS, ...BRANDS];
  return (
    <section className="py-10 border-y border-brand-mid bg-brand-dark overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap" style={{ animationDuration: "40s" }}>
        {brands.map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="px-8 text-brand-muted font-display text-lg tracking-widest hover:text-brand-gold transition-colors cursor-default"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Amina W.", location: "Nairobi",
    quote: "I've been buying perfumes from Scent Mist for over a year. The quality is unmatched and delivery to Westlands is always next day.",
    rating: 5,
  },
  {
    name: "Brian K.", location: "Mombasa",
    quote: "Lattafa Pride is my signature scent and Scent Mist Kenya has the best price in the country. Authentic, fast shipping.",
    rating: 5,
  },
  {
    name: "Wanjiru M.", location: "Nakuru",
    quote: "Love the variety! Found my perfect floral scent after using the scent family filter. Arrived beautifully packaged.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-brand-dark/50">
      <div className="container-site">
        <div className="text-center mb-12">
          <span className="section-tag">Reviews</span>
          <h2 className="font-display text-4xl sm:text-5xl mt-4 text-brand-white">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={`testimonial-${i}`} className="glass-card p-6">
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <svg key={`star-${i}-${si}`} className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-brand-light font-body text-sm leading-relaxed mb-4 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-brand-white text-sm font-semibold font-body">{t.name}</p>
                <p className="text-brand-muted text-xs font-body">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Instagram teaser ──────────────────────────────────────────────────────
export function InstagramTeaser() {
  return (
    <section className="section-padding">
      <div className="container-site text-center">
        <span className="section-tag justify-center">Follow Along</span>
        <h2 className="font-display text-3xl sm:text-4xl mt-4 mb-3 text-brand-white">
          @scentmist_ke
        </h2>
        <p className="text-brand-muted font-body text-sm mb-8">
          Tag us in your fragrance photos for a chance to be featured
        </p>
        {/* Placeholder grid for Instagram embeds */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`ig-${i}`}
              className="aspect-square bg-brand-dark2 rounded-sm flex items-center justify-center text-3xl text-brand-muted"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Icon name="flower" size={32} className="text-brand-gold" />
            </div>
          ))}
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-xs mt-8 inline-flex"
        >
          Follow on Instagram
        </a>
      </div>
    </section>
  );
}
