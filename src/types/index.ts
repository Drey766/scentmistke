// ─── All application TypeScript interfaces ─────────────────────────────────

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  original_price?: number;
  images: string[];
  category: "womens" | "mens" | "unisex";
  brand: string;
  perfume_type?: string;    // "Eau de Parfum" | "Eau de Toilette" | "Parfum" | "Cologne"
  volume_ml?: number;       // e.g. 50, 75, 100, 125
  scent_family: string[];   // ["woody", "floral", "musk"]
  notes?: string;           // "Top: Bergamot | Middle: Rose | Base: Sandalwood"
  in_stock: boolean;
  stock_count?: number;
  is_featured: boolean;
  is_new: boolean;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  added_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  role: "user" | "admin";
  created_at: string;
}

export interface Order {
  id: string;
  user_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  county: string;
  town: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  shipping_fee: number;
  total: number;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  payment_status: "pending" | "paid" | "failed";
  mpesa_checkout_id?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;           // Full HTML content
  cover_image: string;
  author: string;
  read_time: number;         // Minutes
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id?: string;
  reviewer_name: string;
  rating: number;            // 1–5
  comment: string;
  created_at: string;
}

// ─── Filter state for the shop page ────────────────────────────────────────
export interface ShopFilters {
  category?: "womens" | "mens" | "unisex" | "";
  scent_family: string[];
  brand?: string;
  min_price?: number;
  max_price?: number;
  volume_ml?: number[];
  perfume_type?: string;
  in_stock?: boolean;
  sort: "newest" | "price_asc" | "price_desc" | "rating" | "featured";
}

// ─── Kenya counties for checkout ───────────────────────────────────────────
export const KENYA_COUNTIES = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Kiambu", "Machakos",
  "Kajiado", "Muranga", "Nyeri", "Kirinyaga", "Nyandarua", "Laikipia",
  "Samburu", "Trans Nzoia", "Uasin Gishu", "Elgeyo-Marakwet", "Nandi",
  "Baringo", "Turkana", "West Pokot", "Siaya", "Kisumu", "Homa Bay",
  "Migori", "Kisii", "Nyamira", "Bomet", "Kericho", "Narok", "Taita Taveta",
  "Kwale", "Kilifi", "Tana River", "Lamu", "Garissa", "Wajir", "Mandera",
  "Isiolo", "Marsabit", "Meru", "Tharaka-Nithi", "Embu", "Kitui",
  "Makueni", "Vihiga", "Kakamega", "Bungoma", "Busia", "Siaya", "Nyamira",
].sort();

export const PRODUCT_CATEGORIES = [
  { slug: "womens", label: "Women's" },
  { slug: "mens",   label: "Men's" },
  { slug: "unisex", label: "Unisex" },
];

export const SCENT_FAMILIES = [
  "floral", "woody", "oriental", "oud", "citrus",
  "aquatic", "fresh", "musk", "gourmand", "fougere",
];

export const VOLUME_OPTIONS = [30, 50, 75, 100, 125, 150];

export const PERFUME_TYPES = [
  "Eau de Parfum", "Eau de Toilette", "Parfum", "Cologne",
];
