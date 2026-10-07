"use client";


import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogBySlug, getRelatedBlogs } from "@/lib/data";
import { BlogPost } from "@/types";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getBlogBySlug(slug);
  const related = getRelatedBlogs(slug, 3);

  if (!post) return (
    <div className="container-site section-padding text-center">
      <h1 className="font-display text-3xl text-brand-white">Post not found</h1>
    </div>
  );

  return (
    <div className="container-site section-padding">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-gold text-sm font-body mb-8 transition-colors">
          ← Back to Journal
        </Link>

        {/* Cover image */}
        {post.cover_image && (
          <div className="relative aspect-video bg-brand-dark2 rounded-sm overflow-hidden mb-8">
            <Image src={post.cover_image} alt={post.title} fill className="object-cover" sizes="100vw" priority />
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-brand-muted font-body mb-4">
          <span className="badge-new">Journal</span>
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.read_time} min read</span>
          <span>·</span>
          <span>{new Date(post.created_at).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" })}</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl text-brand-white leading-tight mb-8">
          {post.title}
        </h1>

        {/* Content */}
        <div className="prose-article" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Shop CTA */}
        <div className="mt-12 p-8 bg-brand-dark border border-brand-mid rounded-sm text-center">
          <p className="text-brand-muted font-body text-sm mb-2">Ready to find your perfect scent?</p>
          <h3 className="font-display text-2xl text-brand-white mb-4">Shop Our Collection</h3>
          <Link href="/shop" className="btn-primary inline-flex">Browse Fragrances</Link>
        </div>

        {/* Share */}
        <div className="mt-8 flex items-center gap-3">
          <span className="text-xs text-brand-muted font-body uppercase tracking-wider">Share:</span>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — https://perfumeplugkenya.com/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark text-xs px-4 py-2"
          >
            WhatsApp
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://perfumeplugkenya.com/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark text-xs px-4 py-2"
          >
            Twitter/X
          </a>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="font-heading text-xl text-brand-white mb-6">More from the Journal</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link key={r.id} href={`/blog/${r.slug}`} className="group card-hover block">
                <div className="relative aspect-video bg-brand-dark2 overflow-hidden">
                  {r.cover_image && (
                    <Image src={r.cover_image} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="33vw" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-body text-sm text-brand-white group-hover:text-brand-gold-light transition-colors line-clamp-2">{r.title}</h3>
                  <p className="text-xs text-brand-muted font-body mt-1">{r.read_time} min read</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
