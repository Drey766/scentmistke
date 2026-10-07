"use client";

import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice, getScentTagClasses, getCategoryBadge, getCategoryLabel, cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Don't navigate when clicking quick-add
    addItem(product);
    toast.success(`${product.name.split(" ").slice(0, 3).join(" ")} added to cart`, {
      icon: <Icon name="flower" size={18} className="text-brand-gold" />,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist", {
      icon: <Icon name="heart" size={18} className="text-brand-rose" />,
    });
  };

  const isLowStock = product.stock_count !== undefined && product.stock_count > 0 && product.stock_count <= 3;

  return (
    <Link href={`/shop/${product.slug}`} className={cn("group block", className)}>
      <div className="card-hover relative overflow-hidden">
        {/* ── Product image area ── */}
        <div className="relative aspect-[3/4] overflow-hidden bg-brand-dark2">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            /* Fallback placeholder */
            <div className="w-full h-full flex items-center justify-center text-brand-muted">
              <Icon name="flower" size={36} />
            </div>
          )}

          {/* Badges top-left */}
          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
            {product.is_new && <span className="badge-new">New</span>}
            {isLowStock && (
              <span className="inline-block px-2 py-0.5 rounded-full bg-brand-rose/20 text-brand-rose text-xs font-semibold font-body">
                Only {product.stock_count} left!
              </span>
            )}
            {!product.in_stock && (
              <span className="inline-block px-2 py-0.5 rounded-full bg-gray-700/60 text-gray-400 text-xs font-semibold font-body">
                Out of stock
              </span>
            )}
          </div>

          {/* Category badge top-right */}
          <div className="absolute top-2 right-2">
            <span className={getCategoryBadge(product.category)}>
              {getCategoryLabel(product.category)}
            </span>
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute bottom-2 right-2 p-2 rounded-full bg-brand-dark/80 backdrop-blur-sm
                       text-brand-muted hover:text-brand-rose transition-all duration-200
                       opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          >
            <svg className="w-4 h-4" fill={wishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>

          {/* Quick-add overlay — appears on hover */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className="w-full py-2.5 bg-brand-gold text-brand-black text-xs font-semibold uppercase tracking-widest
                         font-body rounded-sm hover:bg-brand-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.in_stock ? "Quick Add" : "Out of Stock"}
            </button>
          </div>
        </div>

        {/* ── Product info area ── */}
        <div className="p-4">
          {/* Brand */}
          <p className="text-xs text-brand-muted font-body uppercase tracking-wider mb-0.5">
            {product.brand}
          </p>

          {/* Name */}
          <h3 className="font-body text-sm text-brand-white leading-snug line-clamp-2 group-hover:text-brand-gold-light transition-colors">
            {product.name}
          </h3>

          {/* Volume & type */}
          {(product.volume_ml || product.perfume_type) && (
            <p className="text-xs text-brand-muted font-body mt-1">
              {product.volume_ml && `${product.volume_ml}ml`}
              {product.volume_ml && product.perfume_type && " · "}
              {product.perfume_type}
            </p>
          )}

          {/* Scent family tags — first 2 */}
          {product.scent_family?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.scent_family.slice(0, 2).map((scent, i) => (
                <span
                  key={`${scent}-${i}`}
                  className={`scent-tag text-[10px] px-2 py-0.5 ${getScentTagClasses(scent)}`}
                >
                  {scent}
                </span>
              ))}
            </div>
          )}

          {/* Price row */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-brand-gold font-semibold font-body">
              {formatPrice(product.price)}
            </span>
            {/* Star rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs text-brand-muted font-body">{product.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
