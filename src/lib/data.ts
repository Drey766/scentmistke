import productsData from "@/data/products.json";
import blogsData from "@/data/blogs.json";
import { BlogPost, Product } from "@/types";

export const products = productsData as Product[];
export const blogPosts = blogsData as BlogPost[];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug) ?? null;
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .slice(0, limit);
}

export function getBlogBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug && post.published) ?? null;
}

export function getRelatedBlogs(slug: string, limit = 3) {
  return blogPosts.filter((post) => post.published && post.slug !== slug).slice(0, limit);
}
