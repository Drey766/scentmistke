"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice, getShippingFee, KENYA_COUNTIES } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type CheckoutStep = "details" | "payment" | "confirmed";

import Icon from "@/components/ui/Icon";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [step, setStep] = useState<CheckoutStep>("details");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    county: "Nairobi",
    town: "",
    address: "",
  });

  const shippingFee = getShippingFee(form.county);
  const total = subtotal + shippingFee;

  const updateForm = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.phone || !form.county || !form.town || !form.address) {
      toast.error("Please fill in all delivery details");
      return;
    }
    setStep("payment");
  };

  const handleMpesa = () => {
    const itemLines = items.map((item) => `• ${item.product.name} × ${item.quantity} — ${formatPrice(item.product.price * item.quantity)}`).join("\n");
    const message = `Hi Perfume Plug Kenya, I'd like to place an order.\n\nCustomer: ${form.full_name}\nPhone: ${form.phone}\nEmail: ${form.email || "Not provided"}\nDelivery: ${form.town}, ${form.county}\nAddress: ${form.address}\n\nItems:\n${itemLines}\n\nSubtotal: ${formatPrice(subtotal)}\nDelivery: ${formatPrice(shippingFee)}\nTotal: ${formatPrice(total)}\n\nPlease send me the M-Pesa payment instructions.`;
    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_OWNER_WHATSAPP ?? "254700000000"}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    clearCart();
    setStep("confirmed");
    toast.success("Order details opened in WhatsApp.");
  };

  if (items.length === 0 && step !== "confirmed") {
    return (
      <div className="container-site section-padding text-center">
        <h1 className="font-display text-3xl text-brand-white mb-4">Your cart is empty</h1>
        <Link href="/shop" className="btn-primary inline-flex">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="container-site section-padding max-w-5xl">
      {/* Progress indicator */}
      <div className="flex items-center gap-3 mb-10">
        {(["details", "payment", "confirmed"] as CheckoutStep[]).map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold font-body
              ${step === s || (step === "confirmed" && i < 2) || (step === "payment" && i < 1)
                ? "bg-brand-gold text-brand-black"
                : "bg-brand-dark2 border border-brand-mid text-brand-muted"
              }`}>
              {i + 1}
            </div>
            <span className={`text-xs font-body uppercase tracking-wider hidden sm:inline
              ${step === s ? "text-brand-gold" : "text-brand-muted"}`}>
              {s === "details" ? "Delivery" : s === "payment" ? "Payment" : "Confirmed"}
            </span>
            {i < 2 && <div className="w-8 h-px bg-brand-mid" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left — form area */}
        <div className="lg:col-span-2">

          {/* ── Step 1: Delivery details ── */}
          {step === "details" && (
            <form onSubmit={handleSubmitDetails} className="space-y-5">
              <h2 className="font-display text-2xl text-brand-white mb-6">Delivery Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label">Full Name *</label>
                  <input value={form.full_name} onChange={(e) => updateForm("full_name", e.target.value)} className="input" required placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="label">Phone Number *</label>
                  <input value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} className="input" required placeholder="0712 345 678" />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} className="input" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="label">County *</label>
                  <select value={form.county} onChange={(e) => updateForm("county", e.target.value)} className="input">
                    {KENYA_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Town / Area *</label>
                  <input value={form.town} onChange={(e) => updateForm("town", e.target.value)} className="input" required placeholder="Westlands" />
                </div>
                <div>
                  <label className="label">Street Address *</label>
                  <input value={form.address} onChange={(e) => updateForm("address", e.target.value)} className="input" required placeholder="Building, Street" />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full justify-center mt-4">
                Continue to Payment →
              </button>
            </form>
          )}

          {/* ── Step 2: M-Pesa payment ── */}
          {step === "payment" && (
            <div>
              <h2 className="font-display text-2xl text-brand-white mb-6">Payment</h2>
              <div className="card p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  <div>
                    <p className="text-brand-white font-semibold font-body">WhatsApp Order</p>
                    <p className="text-brand-muted text-xs font-body">Send your order details directly to Perfume Plug</p>
                  </div>
                </div>
                <div className="bg-brand-dark2 rounded-sm p-4 text-sm font-body text-brand-muted space-y-1">
                  <p><Icon name="phone" size={14} className="inline mr-2" /> Number: <span className="text-brand-white">{form.phone}</span></p>
                  <p><Icon name="card" size={14} className="inline mr-2" /> Amount: <span className="text-brand-gold font-semibold">{formatPrice(total)}</span></p>
                </div>
                <ol className="mt-4 text-xs text-brand-muted font-body space-y-1.5 list-decimal list-inside">
                  <li>Click &ldquo;Send Order via WhatsApp&rdquo; below</li>
                  <li>Your order details will open in WhatsApp</li>
                  <li>The team will confirm the order and provide payment instructions</li>
                </ol>
              </div>
              <button onClick={handleMpesa} className="btn-primary w-full justify-center text-base py-4">
                Send Order via WhatsApp
              </button>
              <button onClick={() => setStep("details")} className="btn-ghost w-full text-xs mt-2 justify-center">
                ← Back to delivery
              </button>
            </div>
          )}

          {/* ── Step 3: Confirmation ── */}
          {step === "confirmed" && (
            <div className="text-center py-8">
              <Icon name="check" size={52} className="text-brand-gold mx-auto mb-4" />
              <h2 className="font-display text-3xl text-brand-white mb-2">Order Confirmed!</h2>
              <p className="text-brand-muted font-body text-sm mb-6">
                Complete the M-Pesa payment on your phone. You&apos;ll receive a WhatsApp confirmation once payment is verified.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/shop" className="btn-primary">Continue Shopping</Link>
                <a href={`https://wa.me/254700000000`} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  WhatsApp Us
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Right — order summary */}
        {step !== "confirmed" && (
          <div className="lg:col-span-1">
            <div className="card p-5 sticky top-24">
              <h3 className="font-heading text-base text-brand-white mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-xs font-body">
                    <span className="text-brand-muted line-clamp-1 flex-1">
                      {item.product.name.split(" ").slice(0, 4).join(" ")}
                      {item.product.volume_ml && ` (${item.product.volume_ml}ml)`} ×{item.quantity}
                    </span>
                    <span className="text-brand-white ml-2">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <hr className="border-brand-mid mb-3" />
              <div className="space-y-2 text-sm font-body">
                <div className="flex justify-between text-brand-muted">
                  <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>Shipping</span><span>{formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t border-brand-mid">
                  <span className="text-brand-white">Total</span>
                  <span className="text-brand-gold">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
