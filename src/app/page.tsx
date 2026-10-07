import { products } from "@/lib/data";
import HeroSection from "@/components/home/HeroSection";
import { MarqueeBar, GenderCards, FeaturedProducts, ScentFamilyGrid, BrandStrip, Testimonials, InstagramTeaser } from "@/components/home/HomeSections";

export default function HomePage() {
  const featuredProducts = products
    .filter((product) => product.is_featured && product.in_stock)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 8);

  return (
    <>
      <HeroSection />
      <MarqueeBar />
      <GenderCards />
      <FeaturedProducts products={featuredProducts} />
      <ScentFamilyGrid />
      <BrandStrip />
      <Testimonials />
      <InstagramTeaser />
    </>
  );
}
