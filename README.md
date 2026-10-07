# Scent MIst Kenya

A Next.js storefront for Perfume Plug Kenya. The catalogue and journal are stored locally in JSON files, so the site no longer requires Supabase, authentication, a database, or server API routes.

## Data
- `src/data/products.json` — 151 perfume products
- `src/data/blogs.json` — 3 published fragrance articles

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Ordering
Cart and wishlist data are stored in the browser. Checkout prepares the complete order and opens WhatsApp for confirmation and payment instructions.

## Images
Product image URLs are preserved from the original catalogue.
