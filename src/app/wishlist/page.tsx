"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/shop/ProductCard";
import toast from "react-hot-toast";
import Icon from "@/components/ui/Icon";

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleMoveAllToCart = () => {
    items.forEach((product) => addItem(product));
    toast.success(`${items.length} fragrances added to cart`, { icon: <Icon name="bag" size={18} className="text-brand-gold" /> });
  };

  if (items.length === 0) {
    return (
      <div className="container-site section-padding text-center">
        <Icon name="heart" size={52} className="text-brand-gold mx-auto mb-6" />
        <h1 className="font-display text-4xl text-brand-white mb-3">Your Wishlist is Empty</h1>
        <p className="text-brand-muted font-body mb-8">Save fragrances you love by clicking the heart icon on any product</p>
        <Link href="/shop" className="btn-primary inline-flex">Explore Collection</Link>
      </div>
    );
  }

  return (
    <div className="container-site section-padding">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="section-tag">Saved Fragrances</span>
          <h1 className="font-display text-4xl mt-3 text-brand-white">My Wishlist</h1>
          <p className="text-brand-muted font-body text-sm mt-1">{items.length} saved fragrance{items.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleMoveAllToCart} className="btn-primary text-xs">
            Add All to Cart
          </button>
          <button onClick={clearWishlist} className="btn-ghost text-xs">
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
