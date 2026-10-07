import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/data";
import Icon from "@/components/ui/Icon";

export default function BlogPage() {
  const posts = blogPosts.filter((post) => post.published);
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="container-site section-padding">
      <div className="mb-12">
        <span className="section-tag">Fragrance Journal</span>
        <h1 className="font-display text-5xl mt-4 text-brand-white">Stories & Guides</h1>
        <p className="text-brand-muted font-body text-sm mt-2">Fragrance tips, scent guides, and luxury living for Kenya</p>
      </div>
      {featured && (
        <Link href={`/blog/${featured.slug}`} className="group block mb-12">
          <div className="card-hover overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-video md:aspect-auto bg-brand-dark2">
              {featured.cover_image ? <Image src={featured.cover_image} alt={featured.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" /> : <div className="w-full h-full flex items-center justify-center text-brand-muted"><Icon name="flower" size={52} /></div>}
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="badge-new mb-4">Featured</span>
              <h2 className="font-display text-3xl text-brand-white mb-3 group-hover:text-brand-gold-light transition-colors">{featured.title}</h2>
              <p className="text-brand-muted font-body text-sm leading-relaxed mb-4">{featured.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-brand-muted font-body"><span>{featured.author}</span><span>·</span><span>{featured.read_time} min read</span></div>
            </div>
          </div>
        </Link>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <div className="card-hover h-full flex flex-col">
              <div className="relative aspect-video bg-brand-dark2 overflow-hidden">
                {post.cover_image ? <Image src={post.cover_image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" /> : <div className="w-full h-full flex items-center justify-center text-brand-muted"><Icon name="flower" size={44} /></div>}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading text-lg text-brand-white mb-2 group-hover:text-brand-gold-light transition-colors leading-snug">{post.title}</h3>
                <p className="text-brand-muted font-body text-sm line-clamp-3 flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-brand-muted font-body mt-4 pt-4 border-t border-brand-mid"><span>{post.read_time} min read</span><span>·</span><span>{new Date(post.created_at).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}</span></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
