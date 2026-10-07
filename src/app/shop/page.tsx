"use client";

// Search uses a debounce for a smoother local JSON search experience.

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { products as allProducts } from "@/lib/data";
import { useDebounce } from "@/hooks/useDebounce";
import { Product, SCENT_FAMILIES, VOLUME_OPTIONS, PERFUME_TYPES } from "@/types";
import ProductCard from "@/components/shop/ProductCard";
import Icon from "@/components/ui/Icon";
import { getScentTagClasses, formatPrice } from "@/lib/utils";

// ─── Filter sidebar ────────────────────────────────────────────────────────
function FilterSidebar({
  selectedCategory,
  onCategory,
  selectedScents,
  onScents,
  selectedVolumes,
  onVolumes,
  selectedType,
  onType,
  minPrice,
  maxPrice,
  onMinPrice,
  onMaxPrice,
}: {
  selectedCategory: string;
  onCategory: (c: string) => void;
  selectedScents: string[];
  onScents: (s: string[]) => void;
  selectedVolumes: number[];
  onVolumes: (v: number[]) => void;
  selectedType: string;
  onType: (t: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinPrice: (v: string) => void;
  onMaxPrice: (v: string) => void;
}) {
  const categories = [
    { slug: "", label: "All" },
    { slug: "womens", label: "Women's" },
    { slug: "mens", label: "Men's" },
    { slug: "unisex", label: "Unisex" },
  ];

  const toggleScent = (scent: string) => {
    onScents(
      selectedScents.includes(scent)
        ? selectedScents.filter((s) => s !== scent)
        : [...selectedScents, scent]
    );
  };

  const toggleVolume = (vol: number) => {
    onVolumes(
      selectedVolumes.includes(vol)
        ? selectedVolumes.filter((v) => v !== vol)
        : [...selectedVolumes, vol]
    );
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
      {/* Category */}
      <div>
        <h3 className="label mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={`cat-${cat.slug}`}
              onClick={() => onCategory(cat.slug)}
              className={`px-3 py-1.5 text-xs font-body uppercase tracking-wider rounded-sm border transition-colors
                ${selectedCategory === cat.slug
                  ? "bg-brand-gold text-brand-black border-brand-gold"
                  : "border-brand-mid text-brand-muted hover:border-brand-gold/40 hover:text-brand-white"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scent family — colour-coded checkboxes */}
      <div>
        <h3 className="label mb-3">Scent Family</h3>
        <div className="flex flex-col gap-2">
          {SCENT_FAMILIES.map((scent) => {
            const isChecked = selectedScents.includes(scent);
            return (
              <label key={`scent-${scent}`} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleScent(scent)}
                  className="sr-only"
                />
                <span
                  className={`w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 transition-colors
                    ${isChecked ? "bg-brand-gold border-brand-gold" : "border-brand-mid group-hover:border-brand-gold/40"}`}
                >
                  {isChecked && (
                    <svg className="w-2.5 h-2.5 text-brand-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className={`scent-tag text-xs ${getScentTagClasses(scent)}`}>{scent}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Volume filter */}
      <div>
        <h3 className="label mb-3">Volume (ml)</h3>
        <div className="flex flex-wrap gap-2">
          {VOLUME_OPTIONS.map((vol) => (
            <button
              key={`vol-${vol}`}
              onClick={() => toggleVolume(vol)}
              className={`px-3 py-1.5 text-xs font-body rounded-sm border transition-colors
                ${selectedVolumes.includes(vol)
                  ? "bg-brand-gold/20 border-brand-gold text-brand-gold"
                  : "border-brand-mid text-brand-muted hover:border-brand-gold/40"
                }`}
            >
              {vol}ml{vol === 150 ? "+" : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Perfume type */}
      <div>
        <h3 className="label mb-3">Perfume Type</h3>
        <div className="flex flex-col gap-1.5">
          {["", ...PERFUME_TYPES].map((type) => (
            <button
              key={`type-${type || "all"}`}
              onClick={() => onType(type)}
              className={`text-left text-sm font-body px-2 py-1 rounded-sm transition-colors
                ${selectedType === type
                  ? "text-brand-gold"
                  : "text-brand-muted hover:text-brand-white"
                }`}
            >
              {type || "All Types"}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="label mb-3">Price Range (KSh)</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => onMinPrice(e.target.value)}
            placeholder="Min"
            className="input text-xs py-2"
          />
          <span className="text-brand-muted text-xs">—</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => onMaxPrice(e.target.value)}
            placeholder="Max"
            className="input text-xs py-2"
          />
        </div>
      </div>
    </aside>
  );
}

// ─── ShopContent — actual UI; needs Suspense boundary because it calls useSearchParams ──
function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // ── Filter state ──
  const [searchInput, setSearchInput] = useState(searchParams.get("q") ?? "");
  const debouncedSearch = useDebounce(searchInput, 400); // Debounce local JSON search input

  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [selectedScents, setSelectedScents] = useState<string[]>(
    searchParams.get("scent") ? [searchParams.get("scent")!] : []
  );
  const [selectedVolumes, setSelectedVolumes] = useState<number[]>([]);
  const [selectedType, setSelectedType] = useState(searchParams.get("type") ?? "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState(searchParams.get("sort") ?? "newest");
  const [filterOpen, setFilterOpen] = useState(false);

  // ── Local JSON data ──
  const PAGE_SIZE = 24;
  const [page, setPage] = useState(0);

  const filteredProducts = allProducts
    .filter((product) => !debouncedSearch || product.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .filter((product) => !category || product.category === category)
    .filter((product) => selectedScents.length === 0 || selectedScents.some((s) => product.scent_family.includes(s)))
    .filter((product) => selectedVolumes.length === 0 || (product.volume_ml !== undefined && selectedVolumes.includes(product.volume_ml)))
    .filter((product) => !selectedType || (product.perfume_type ?? "").toLowerCase().includes(selectedType.toLowerCase()))
    .filter((product) => !minPrice || product.price >= Number(minPrice))
    .filter((product) => !maxPrice || product.price <= Number(maxPrice));

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "price_asc") return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "featured") return Number(b.is_featured) - Number(a.is_featured);
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const total = sortedProducts.length;
  const paginatedProducts = sortedProducts.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const loading = false;

  useEffect(() => { setPage(0); }, [debouncedSearch, category, selectedScents, selectedVolumes, selectedType, minPrice, maxPrice, sort]);

  const clearFilters = () => {
    setSearchInput("");
    setCategory("");
    setSelectedScents([]);
    setSelectedVolumes([]);
    setSelectedType("");
    setMinPrice("");
    setMaxPrice("");
    setSort("newest");
    setPage(0);
  };

  const hasFilters = searchInput || category || selectedScents.length > 0 || selectedVolumes.length > 0 || selectedType || minPrice || maxPrice;

  return (
    <div className="container-site section-padding">
      {/* Page header */}
      <div className="mb-8">
        <span className="section-tag">All Products</span>
        <h1 className="font-display text-4xl sm:text-5xl mt-3 text-brand-white">Our Collection</h1>
        <p className="text-brand-muted font-body text-sm mt-2">{total} fragrances</p>
      </div>

      {/* Search bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {/* searchInput updates on every keystroke (instant UI feedback) */}
          {/* Debounced local JSON search */}
          <input
            type="text"
            value={searchInput}
            onChange={(e) => { setSearchInput(e.target.value); setPage(0); }}
            placeholder="Search perfumes, brands…"
            className="input pl-10 text-sm"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); setPage(0); }}
          className="input text-sm w-full sm:w-48"
        >
          <option value="newest">Newest</option>
          <option value="featured">Featured</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
        {/* Mobile filter toggle */}
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="btn-dark text-xs flex items-center gap-2 lg:hidden"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters {hasFilters && <span className="w-2 h-2 rounded-full bg-brand-gold inline-block" />}
        </button>
      </div>

      {hasFilters && (
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs text-brand-muted font-body">Active filters</span>
          <button onClick={clearFilters} className="text-xs text-brand-gold hover:text-brand-gold-light font-body underline">
            Clear all
          </button>
        </div>
      )}

      <div className="flex gap-8">
        {/* Desktop sidebar — always visible */}
        <div className="hidden lg:block">
          <FilterSidebar
            selectedCategory={category}
            onCategory={(c) => { setCategory(c); setPage(0); }}
            selectedScents={selectedScents}
            onScents={(s) => { setSelectedScents(s); setPage(0); }}
            selectedVolumes={selectedVolumes}
            onVolumes={(v) => { setSelectedVolumes(v); setPage(0); }}
            selectedType={selectedType}
            onType={(t) => { setSelectedType(t); setPage(0); }}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPrice={(v) => { setMinPrice(v); setPage(0); }}
            onMaxPrice={(v) => { setMaxPrice(v); setPage(0); }}
          />
        </div>

        {/* Mobile sidebar overlay */}
        {filterOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setFilterOpen(false)} />
            <div className="relative z-50 w-80 bg-brand-dark border-r border-brand-mid p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-lg text-brand-white">Filters</h2>
                <button onClick={() => setFilterOpen(false)} className="text-brand-muted hover:text-brand-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <FilterSidebar
                selectedCategory={category}
                onCategory={(c) => { setCategory(c); setPage(0); setFilterOpen(false); }}
                selectedScents={selectedScents}
                onScents={(s) => { setSelectedScents(s); setPage(0); }}
                selectedVolumes={selectedVolumes}
                onVolumes={(v) => { setSelectedVolumes(v); setPage(0); }}
                selectedType={selectedType}
                onType={(t) => { setSelectedType(t); setPage(0); }}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPrice={(v) => { setMinPrice(v); setPage(0); }}
                onMaxPrice={(v) => { setMaxPrice(v); setPage(0); }}
              />
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="aspect-[3/4] bg-brand-dark2 rounded-sm animate-pulse" />
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-20">
              <Icon name="search" size={40} className="text-brand-muted mx-auto mb-4" />
              <p className="text-brand-muted font-body">No products found.</p>
              <button onClick={clearFilters} className="btn-outline text-xs mt-4">Clear Filters</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {total > PAGE_SIZE && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="btn-dark px-4 py-2 text-xs disabled:opacity-40"
                  >
                    ← Prev
                  </button>
                  <span className="text-sm text-brand-muted font-body">
                    Page {page + 1} of {Math.ceil(total / PAGE_SIZE)}
                  </span>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={(page + 1) * PAGE_SIZE >= total}
                    className="btn-dark px-4 py-2 text-xs disabled:opacity-40"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Default export: Suspense wrapper (required for useSearchParams in Next.js 14) ──
export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="container-site section-padding">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={`loading-${i}`} className="aspect-[3/4] bg-brand-dark2 rounded-sm animate-pulse" />
            ))}
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
