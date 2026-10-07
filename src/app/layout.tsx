import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-cormorant", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-playfair", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Scent Mist Kenya — Luxury Fragrances",
  description: "Shop authentic luxury perfumes for men, women and unisex. Fast delivery across Kenya. Armaf, YSL, Dior, Versace and more.",
  keywords: ["perfume Kenya", "fragrance Nairobi", "buy perfume online", "Armaf Kenya", "luxury perfume"],
  openGraph: { title: "Scent Mist Kenya", description: "Luxury fragrances delivered across Kenya", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${playfair.variable} ${dmSans.variable}`}>
      <body>
        <CartProvider>
          <WishlistProvider>
            <Toaster position="top-right" toastOptions={{ style: { background: "#1C1620", color: "#D4C8E0", border: "1px solid #2E2535", borderRadius: "2px", fontFamily: "var(--font-dm-sans)" }, success: { iconTheme: { primary: "#C9A84C", secondary: "#080608" } }, error: { iconTheme: { primary: "#C4688A", secondary: "#080608" } } }} />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
