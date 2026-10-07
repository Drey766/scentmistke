"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  formatPrice,
  getScentTagClasses,
  getCategoryBadge,
  getCategoryLabel,
  parseScentNotes,
} from "@/lib/utils";
import ProductCard from "@/components/shop/ProductCard";
import Icon from "@/components/ui/Icon";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const related = product ? getRelatedProducts(product, 4) : [];
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);

  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();

  if (!product) {
    return (
      <div className="container-site section-padding text-center">
        <Icon name="search" size={40} className="text-brand-muted mx-auto mb-4" />
        <h1 className="font-display text-3xl text-brand-white">Product Not Found</h1>
      </div>
    );
  }

  const notes = parseScentNotes(product.notes ?? "");
  const isLowStock = product.stock_count !== undefined && product.stock_count > 0 && product.stock_count <= 3;
  const wishlisted = isWishlisted(product.id);

  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in ${product.name} (${formatPrice(product.price)}). Is it available?`
  );
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_OWNER_WHATSAPP ?? "254700000000"}?text=${whatsappMsg}`;

  const handleAddToCart = () => {
    addItem(product, qty);
    toast.success(`${qty}× ${product.name.split(" ").slice(0, 3).join(" ")} added to cart`, { icon: <Icon name="flower" size={18} className="text-brand-gold" /> });
  };

  return (
    <>
      <div className="container-site section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Left: Images ── */}
          <div>
            {/* Main image with float animation */}
            <div className="relative aspect-square bg-brand-dark2 rounded-sm overflow-hidden animate-float">
              {product.images?.[activeImage] ? (
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-brand-muted"><Icon name="flower" size={64} /></div>
              )}
              {/* Wishlist button overlay */}
              <button
                onClick={() => { toggleItem(product); toast(wishlisted ? "Removed from wishlist" : "Saved to wishlist", { icon: <Icon name="heart" size={18} className="text-brand-rose" /> }); }}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-brand-dark/80 backdrop-blur-sm text-brand-muted hover:text-brand-rose transition-colors"
              >
                <svg className="w-5 h-5" fill={wishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>

            {/* Thumbnail strip */}
            {product.images?.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={`thumb-${i}`}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-20 rounded-sm overflow-hidden border-2 transition-colors
                      ${i === activeImage ? "border-brand-gold" : "border-brand-mid hover:border-brand-gold/40"}`}
                  >
                    <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Product info ── */}
          <div>
            {/* Category & brand */}
            <div className="flex items-center gap-3 mb-3">
              <span className={getCategoryBadge(product.category)}>{getCategoryLabel(product.category)}</span>
              <span className="text-brand-muted text-sm font-body">{product.brand}</span>
            </div>

            {/* Name */}
            <h1 className="font-display text-3xl sm:text-4xl text-brand-white leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={`r-${i}`} className={`w-4 h-4 ${i < Math.round(product.rating) ? "text-brand-gold" : "text-brand-mid"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-brand-muted font-body">{product.rating.toFixed(1)} ({product.review_count} reviews)</span>
              </div>
            )}

            {/* Price */}
            <p className="text-3xl font-semibold text-brand-gold font-body mb-2">
              {formatPrice(product.price)}
            </p>

            {/* Meta — volume, type */}
            {(product.volume_ml || product.perfume_type) && (
              <p className="text-sm text-brand-muted font-body mb-4">
                {product.volume_ml && `${product.volume_ml}ml`}
                {product.volume_ml && product.perfume_type && " · "}
                {product.perfume_type}
              </p>
            )}

            {/* Stock status */}
            {isLowStock && (
              <p className="text-brand-rose text-sm font-body font-semibold mb-3">
                <Icon name="package" size={16} className="inline-block mr-1" /> Only {product.stock_count} left in stock — order soon!
              </p>
            )}
            {!product.in_stock && (
              <p className="text-gray-400 text-sm font-body mb-3">Currently out of stock</p>
            )}

            {/* Scent family tags */}
            {product.scent_family?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {product.scent_family.map((scent, i) => (
                  <span key={`sf-${i}`} className={`scent-tag ${getScentTagClasses(scent)}`}>{scent}</span>
                ))}
              </div>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-brand-muted font-body text-sm leading-relaxed mb-6">
                {product.description}
              </p>
            )}

            {/* Qty + Add to Cart */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-brand-mid rounded-sm">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-brand-muted hover:text-brand-white transition-colors">−</button>
                <span className="px-5 py-3 text-brand-white font-body font-semibold min-w-[3rem] text-center">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-4 py-3 text-brand-muted hover:text-brand-white transition-colors">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.in_stock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>

            {/* WhatsApp enquiry */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark w-full justify-center flex items-center gap-2 mb-6"
            >
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.127 1.533 5.862L0 24l6.297-1.517A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.877 9.877 0 01-5.034-1.376l-.361-.214-3.741.98.998-3.648-.235-.374A9.86 9.86 0 012.118 12C2.118 6.486 6.486 2.118 12 2.118S21.882 6.486 21.882 12 17.514 21.882 12 21.882z"/>
              </svg>
              Ask About This Fragrance
            </a>

            <hr className="border-brand-mid" />

            {/* ── Scent Notes Pyramid ── */}
            {(notes.top.length > 0 || notes.middle.length > 0 || notes.base.length > 0) && (
              <div className="mt-6">
                <h3 className="font-heading text-lg text-brand-white mb-5">Fragrance Notes</h3>
                <div className="flex flex-col items-center gap-0">
                  {/* TOP — narrows, evaporate quickly */}
                  {notes.top.length > 0 && (
                    <div className="w-full max-w-xs">
                      <div className="bg-brand-gold/10 border border-brand-gold/30 px-4 py-3 text-center rounded-t-sm">
                        <p className="text-[10px] text-brand-gold font-body uppercase tracking-widest mb-2">Top Notes — evaporate quickly (30 min)</p>
                        <div className="flex flex-wrap gap-1.5 justify-center">
                          {notes.top.map((n, i) => <span key={`top-${i}`} className="text-xs bg-brand-gold/20 text-brand-gold-light px-2 py-0.5 rounded-full font-body">{n}</span>)}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* MIDDLE — heart */}
                  {notes.middle.length > 0 && (
                    <div className="w-full max-w-sm">
                      <div className="bg-brand-purple/10 border-x border-b border-brand-purple/30 px-4 py-3 text-center">
                        <p className="text-[10px] text-brand-purple-light font-body uppercase tracking-widest mb-2">Middle Notes — the heart (2–4 hours)</p>
                        <div className="flex flex-wrap gap-1.5 justify-center">
                          {notes.middle.map((n, i) => <span key={`mid-${i}`} className="text-xs bg-brand-purple/20 text-brand-purple-light px-2 py-0.5 rounded-full font-body">{n}</span>)}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* BASE — widest, lasts all day */}
                  {notes.base.length > 0 && (
                    <div className="w-full">
                      <div className="bg-brand-dark2 border-x border-b border-brand-mid px-4 py-3 text-center rounded-b-sm">
                        <p className="text-[10px] text-brand-muted font-body uppercase tracking-widest mb-2">Base Notes — lasts all day (6+ hours)</p>
                        <div className="flex flex-wrap gap-1.5 justify-center">
                          {notes.base.map((n, i) => <span key={`base-${i}`} className="text-xs bg-brand-mid text-brand-light px-2 py-0.5 rounded-full font-body">{n}</span>)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="mb-8">
              <span className="section-tag">More Like This</span>
              <h2 className="font-display text-3xl mt-3 text-brand-white">You Might Also Like</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
