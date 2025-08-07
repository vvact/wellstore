import BrandStory from '@/components/brand-story';
import FeaturedProductsTabs from '@/components/featured-products-tabs';
import FeaturedCategories from '@/components/FeaturedCategories';
import FlashDeals from '@/components/FlashDeals';
import FloatingCTA from '@/components/floating-cta';
import Hero from '@/components/Hero';
import InstagramGallery from '@/components/instagram-gallery';
import ScrollToTop from "@/components/scroll-to-top";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Featured Categories Section */}
      <FeaturedCategories />
      {/* Flash Deals Section */}
      <FlashDeals />
      {/* Featured Products Tabs Section */}
      <FeaturedProductsTabs />
      {/* Brand Story Section */}
      <BrandStory />
      {/* Other sections can be added here */}
      {/* For example, you might want to add a Testimonials section or a Newsletter signup */}
      <InstagramGallery />
      <ScrollToTop />
      {/* Brand Story Section */}
      {/* Other sections will go below */}
      <FloatingCTA />
    </>
  );
}
