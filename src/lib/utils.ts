// ─── Shared utility functions ──────────────────────────────────────────────

/** Merge Tailwind class names (lightweight version — no clsx dep needed) */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Format a number as Kenyan Shillings — e.g. 5000 → "KSh 5,000" */
export function formatPrice(amount: number): string {
  return `KSh ${amount.toLocaleString("en-KE")}`;
}

/** Convert a string to a URL-friendly slug */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")        // Strip diacritics
    .replace(/[^a-z0-9\s-]/g, "")           // Keep alphanumerics, spaces, hyphens
    .trim()
    .replace(/[\s_]+/g, "-")                // Spaces → hyphens
    .replace(/-+/g, "-");                   // Collapse multiple hyphens
}

/** Calculate shipping fee based on Kenyan county */
export function getShippingFee(county: string): number {
  // Nairobi CBD / Westlands — free above a threshold, else flat rate
  if (county.toLowerCase() === "nairobi") return 200;
  // Neighbouring counties — medium rate
  if (["kiambu", "machakos", "kajiado", "muranga"].includes(county.toLowerCase())) return 350;
  // Rest of Kenya
  return 500;
}

/** Parse scent-pyramid text into top/middle/base sections */
export function parseScentNotes(notes: string): {
  top: string[];
  middle: string[];
  base: string[];
} {
  const result = { top: [] as string[], middle: [] as string[], base: [] as string[] };
  if (!notes) return result;

  const topMatch = notes.match(/top notes?[:\s]+([^.|\n]+)/i);
  const midMatch = notes.match(/(?:middle|heart|mid) notes?[:\s]+([^.|\n]+)/i);
  const baseMatch = notes.match(/base notes?[:\s]+([^.|\n]+)/i);

  const splitNotes = (s: string) =>
    s.split(/,|and/)
      .map((n) => n.trim())
      .filter((n) => n.length > 0 && n.length < 40);

  if (topMatch) result.top = splitNotes(topMatch[1]);
  if (midMatch) result.middle = splitNotes(midMatch[1]);
  if (baseMatch) result.base = splitNotes(baseMatch[1]);
  return result;
}

/** Return Tailwind classes for a scent family tag */
export function getScentTagClasses(scent: string): string {
  const s = scent.toLowerCase();
  if (s.includes("floral")) return "bg-rose-500/20 text-rose-300";
  if (s.includes("woody") || s.includes("wood")) return "bg-amber-600/20 text-amber-300";
  if (s.includes("oriental") || s.includes("oud")) return "bg-purple-600/20 text-purple-300";
  if (s.includes("citrus")) return "bg-yellow-500/20 text-yellow-300";
  if (s.includes("aquatic") || s.includes("fresh")) return "bg-sky-500/20 text-sky-300";
  if (s.includes("musk")) return "bg-slate-500/20 text-slate-300";
  if (s.includes("gourmand")) return "bg-orange-500/20 text-orange-300";
  return "bg-brand-mid text-brand-muted";
}

/** Return category badge class name */
export function getCategoryBadge(category: string): string {
  if (category === "womens") return "badge-womens";
  if (category === "mens") return "badge-mens";
  return "badge-unisex";
}

/** Return category label */
export function getCategoryLabel(category: string): string {
  if (category === "womens") return "Women's";
  if (category === "mens") return "Men's";
  return "Unisex";
}

/** Truncate text to N characters */
export function truncate(text: string, length: number): string {
  if (!text || text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "…";
}

export const KENYA_COUNTIES = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Kiambu", "Machakos",
  "Kajiado", "Muranga", "Nyeri", "Kirinyaga", "Nyandarua", "Laikipia",
  "Trans Nzoia", "Uasin Gishu", "Nandi", "Baringo", "Turkana",
  "Siaya", "Homa Bay", "Migori", "Kisii", "Nyamira", "Bomet", "Kericho",
  "Narok", "Taita Taveta", "Kwale", "Kilifi", "Tana River", "Lamu",
  "Garissa", "Wajir", "Mandera", "Isiolo", "Marsabit", "Meru",
  "Tharaka-Nithi", "Embu", "Kitui", "Makueni", "Vihiga", "Kakamega",
  "Bungoma", "Busia",
].sort();
