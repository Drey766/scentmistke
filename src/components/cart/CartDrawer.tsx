"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import Icon from "@/components/ui/Icon";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, itemCount, subtotal, removeItem, updateQty } = useCart();

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer panel — slides in from the right */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-brand-dark border-l border-brand-mid z-50
                    flex flex-col transition-transform duration-300 ease-out
                    ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-mid">
          <div>
            <h2 className="font-display text-xl text-brand-white">Your Cart</h2>
            <p className="text-xs text-brand-muted font-body mt-0.5">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-brand-muted hover:text-brand-white transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <Icon name="flower" size={48} className="text-brand-gold" />
              <p className="text-brand-muted font-body">Your cart is empty.</p>
              <button onClick={onClose} className="btn-outline text-xs">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 py-4 border-b border-brand-mid last:border-0">
                {/* Product image */}
                <div className="relative w-20 h-20 flex-shrink-0 bg-brand-dark2 rounded-sm overflow-hidden">
                  {item.product.images?.[0] ? (
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-muted"><Icon name="flower" size={28} /></div>
                  )}
                </div>

                {/* Product details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-body text-sm text-brand-white leading-snug line-clamp-2">
                    {item.product.name}
                  </h3>
                  {item.product.volume_ml && (
                    <p className="text-xs text-brand-muted font-body mt-0.5">
                      {item.product.volume_ml}ml · {item.product.perfume_type || "Fragrance"}
                    </p>
                  )}
                  <p className="text-sm text-brand-gold font-semibold font-body mt-1">
                    {formatPrice(item.product.price)}
                  </p>

                  {/* Qty controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-brand-mid rounded-sm">
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-brand-muted hover:text-brand-white text-sm transition-colors"
                      >
                        −
                      </button>
                      <span className="px-3 text-sm text-brand-white font-body">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-brand-muted hover:text-brand-white text-sm transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-xs text-brand-muted hover:text-brand-rose transition-colors font-body"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Line total */}
                <div className="text-sm text-brand-white font-semibold font-body flex-shrink-0">
                  {formatPrice(item.product.price * item.quantity)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer — subtotal & checkout */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-brand-mid space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-brand-muted font-body">Subtotal</span>
              <span className="text-lg text-brand-gold font-semibold font-body">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-brand-muted font-body">Shipping calculated at checkout</p>
            <Link href="/checkout" onClick={onClose} className="btn-primary w-full justify-center">
              Proceed to Checkout
            </Link>
            <button onClick={onClose} className="btn-ghost w-full text-xs">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
