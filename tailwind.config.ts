import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Brand colour palette ──────────────────────────────────────────────
      colors: {
        brand: {
          black: "#080608",       // Page background — near-black with a purple undertone
          dark: "#120E14",        // Card backgrounds
          dark2: "#1C1620",       // Slightly lighter surfaces
          mid: "#2E2535",         // Borders, dividers
          muted: "#8B7A99",       // Secondary text, labels
          light: "#D4C8E0",       // Body text on dark backgrounds
          white: "#F5F0FA",       // Off-white — headings, high contrast
          gold: "#C9A84C",        // PRIMARY ACCENT — CTAs, highlights, price text
          "gold-light": "#E8C96A", // Hover states
          "gold-dark": "#A8882A", // Active / pressed states
          purple: "#6B4C8A",      // Secondary accent — scent family tags, badges
          "purple-light": "#8B6AAA", // Purple hover states
          rose: "#C4688A",        // Women's collection accent
        },
      },
      // ─── Custom fonts ──────────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],   // Hero headlines
        heading: ["var(--font-playfair)", "Georgia", "serif"],     // Section titles
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"], // Body text
      },
      // ─── Custom animations ─────────────────────────────────────────────────
      keyframes: {
        // Horizontal scroll for scent notes marquee
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Subtle fade in
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Slide up from below
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Slide in from the right
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        // Gold shimmer sweep on hero text
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        // Subtle float — product images bob gently up and down
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",        // Scent notes ticker
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
        "slide-in-right": "slideInRight 0.5s ease forwards",
        shimmer: "shimmer 3s linear infinite",         // Gold hero shimmer
        float: "float 4s ease-in-out infinite",        // Product image float
      },
      // ─── Box shadow helpers ────────────────────────────────────────────────
      boxShadow: {
        gold: "0 0 30px rgba(201,168,76,0.15)",        // Glow on gold CTA buttons
        "gold-lg": "0 0 60px rgba(201,168,76,0.25)",
        card: "0 4px 24px rgba(0,0,0,0.4)",            // Dark card depth
      },
    },
  },
  plugins: [],
};
export default config;
