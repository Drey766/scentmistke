"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice, getShippingFee } from "@/lib/utils";
import { KENYA_COUNTIES } from "@/lib/utils";
import toast from "react-hot-toast";
import Icon from "@/components/ui/Icon";

export default function CartPage() {
  const { items, itemCount, subtotal, removeItem, updateQty, clearCart } = useCart();
  const [county, setCounty] = useState("Nairobi");
  const [promoCode, setPromoCode] = useState("");
  const shippingFee = getShippingFee(county);
  const total = subtotal + shippingFee;

  const handlePromo = () => {
    toast("Promo codes coming soon!", { icon: <Icon name="gift" size={18} className="text-brand-gold" /> });
  };

  if (itemCount === 0) {
    return (
      <div className="container-site section-padding text-center">
        <Icon name="bag" size={52} className="text-brand-gold mx-auto mb-6" />
        <h1 className="font-display text-4xl text-brand-white mb-3">Your Cart is Empty</h1>
        <p className="text-brand-muted font-body mb-8">Discover our luxury fragrance collection</p>
        <Link href="/shop" className="btn-primary inline-flex">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="container-site section-padding">
      <div className="mb-8">
        <span className="section-tag">Review Order</span>
        <h1 className="font-display text-4xl mt-3 text-brand-white">Your Cart</h1>
        <p className="text-brand-muted font-body text-sm mt-1">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Line items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="card flex gap-4 p-4">
              <div className="relative w-24 h-24 flex-shrink-0 bg-brand-dark2 rounded-sm overflow-hidden">
                {item.product.images?.[0] ? (
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="96px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-muted"><Icon name="flower" size={28} /></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <Link href={`/shop/${item.product.slug}`} className="font-body text-sm text-brand-white hover:text-brand-gold transition-colors line-clamp-2">
                  {item.product.name}
                </Link>
                {(item.product.volume_ml || item.product.perfume_type) && (
                  <p className="text-xs text-brand-muted font-body mt-0.5">
                    {item.product.volume_ml}ml{item.product.perfume_type && ` · ${item.product.perfume_type}`}
                  </p>
                )}
                <p className="text-brand-gold font-semibold font-body text-sm mt-1">{formatPrice(item.product.price)}</p>

                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center border border-brand-mid rounded-sm">
                    <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="px-3 py-1 text-brand-muted hover:text-brand-white text-sm">−</button>
                    <span className="px-3 text-sm text-brand-white font-body">{item.quantity}</span>
                    <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="px-3 py-1 text-brand-muted hover:text-brand-white text-sm">+</button>
                  </div>
                  <button onClick={() => removeItem(item.product.id)} className="text-xs text-brand-muted hover:text-brand-rose font-body transition-colors">Remove</button>
                </div>
              </div>

              <div className="text-sm font-semibold text-brand-white font-body flex-shrink-0">
                {formatPrice(item.product.price * item.quantity)}
              </div>
            </div>
          ))}

          <button onClick={clearCart} className="text-xs text-brand-muted hover:text-brand-rose font-body transition-colors">
            Clear cart
          </button>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="font-heading text-lg text-brand-white mb-5">Order Summary</h2>

            {/* Estimate shipping by county */}
            <div className="mb-4">
              <label className="label">Estimate shipping</label>
              <select value={county} onChange={(e) => setCounty(e.target.value)} className="input text-sm">
                {KENYA_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-3 text-sm font-body mb-5">
              <div className="flex justify-between text-brand-muted">
                <span>Subtotal</span>
                <span className="text-brand-light">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-brand-muted">
                <span>Shipping ({county})</span>
                <span className="text-brand-light">{formatPrice(shippingFee)}</span>
              </div>
              <hr className="border-brand-mid" />
              <div className="flex justify-between font-semibold text-base">
                <span className="text-brand-white">Total</span>
                <span className="text-brand-gold">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Promo code */}
            <div className="flex gap-2 mb-5">
              <input value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Promo code" className="input text-sm flex-1 py-2" />
              <button onClick={handlePromo} className="btn-dark text-xs px-4">Apply</button>
            </div>

            <Link href="/checkout" className="btn-primary w-full justify-center">
              Proceed to Checkout
            </Link>
            <Link href="/shop" className="btn-ghost w-full text-xs mt-2 justify-center">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
