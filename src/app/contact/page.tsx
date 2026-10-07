"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import Icon from "@/components/ui/Icon";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi, I'd like to contact Perfume Plug Kenya.\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "Not provided"}\nSubject: ${form.subject || "General enquiry"}\nMessage: ${form.message}`;
    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_OWNER_WHATSAPP ?? "254700000000"}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp with your message…");
  };

  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_OWNER_WHATSAPP ?? "254700000000"}?text=${encodeURIComponent("Hi, I'd like to ask about a perfume.")}`;

  return (
    <div className="container-site section-padding">
      {/* Header */}
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <span className="section-tag justify-center">Get in Touch</span>
        <h1 className="font-display text-5xl mt-4 text-brand-white">Contact Us</h1>
        <p className="text-brand-muted font-body text-sm mt-3 leading-relaxed">
          Have a question about a fragrance? Need help choosing the perfect scent? We&apos;re here for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">

        {/* Contact info */}
        <div className="lg:col-span-1 space-y-6">

          {/* WhatsApp — primary contact */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-5 bg-green-900/20 border border-green-700/30 rounded-sm hover:border-green-600/50 transition-colors group"
          >
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.127 1.533 5.862L0 24l6.297-1.517A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.877 9.877 0 01-5.034-1.376l-.361-.214-3.741.98.998-3.648-.235-.374A9.86 9.86 0 012.118 12C2.118 6.486 6.486 2.118 12 2.118S21.882 6.486 21.882 12 17.514 21.882 12 21.882z"/>
              </svg>
            </div>
            <div>
              <p className="text-green-300 font-semibold font-body text-sm">WhatsApp (Fastest)</p>
              <p className="text-brand-muted text-xs font-body mt-0.5">Tap to chat — usually responds within the hour</p>
            </div>
          </a>

          {/* Email */}
          <div className="flex items-start gap-4 p-5 card">
            <div className="w-10 h-10 bg-brand-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div>
              <p className="text-brand-white font-semibold font-body text-sm">Email</p>
              <a href="mailto:hello@perfumeplugkenya.com" className="text-brand-gold text-xs font-body hover:underline">
                hello@perfumeplugkenya.com
              </a>
            </div>
          </div>

          {/* Operating hours */}
          <div className="p-5 card">
            <p className="text-brand-white font-semibold font-body text-sm mb-3">Operating Hours</p>
            <div className="space-y-1.5 text-xs font-body text-brand-muted">
              <div className="flex justify-between"><span>Monday – Friday</span><span className="text-brand-light">8:00 – 20:00</span></div>
              <div className="flex justify-between"><span>Saturday</span><span className="text-brand-light">9:00 – 18:00</span></div>
              <div className="flex justify-between"><span>Sunday</span><span className="text-brand-light">11:00 – 16:00</span></div>
            </div>
          </div>

          {/* Delivery info */}
          <div className="p-5 card">
            <p className="text-brand-white font-semibold font-body text-sm mb-3">Delivery Info</p>
            <div className="space-y-2 text-xs font-body text-brand-muted">
              <p><Icon name="package" size={14} className="inline mr-2" />Nairobi — same or next day</p>
              <p><Icon name="truck" size={14} className="inline mr-2" />Nationwide — 2–4 business days</p>
              <p><Icon name="card" size={14} className="inline mr-2" />M-Pesa accepted · Authentic guaranteed</p>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="lg:col-span-2">
          <div className="card p-8">
            <h2 className="font-heading text-xl text-brand-white mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label">Name *</label>
                  <input value={form.name} onChange={(e) => update("name", e.target.value)} className="input" required placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input" placeholder="0712 345 678" />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="input" required placeholder="you@example.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Subject</label>
                  <select value={form.subject} onChange={(e) => update("subject", e.target.value)} className="input">
                    <option value="">Select a topic…</option>
                    <option>Product inquiry</option>
                    <option>Order status</option>
                    <option>Fragrance recommendation</option>
                    <option>Wholesale / bulk order</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="input min-h-[140px] resize-none"
                    required
                    placeholder="Tell us how we can help…"
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
