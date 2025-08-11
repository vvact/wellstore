import BrandStory from '@/components/brand-story';
import FeaturedCategories from '@/components/FeaturedCategories';
import FloatingCTA from '@/components/floating-cta';
import Hero from '@/components/Hero';
import ScrollToTop from "@/components/scroll-to-top";
import InstagramGallery from '@/components/instagram-gallery';
import ProductToggle from "@/components/ProductToggle";

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  permalink: string;
}

interface Category {
  id: number;  // Make sure this matches your types definition (number)
  name: string;
  slug: string;
  image?: string;
  product_count: number;
}

export default async function HomePage() {
  let posts: InstagramPost[] = [];
  let categories: Category[] = [];

  try {
    const [postsRes, categoriesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/instagram-photos/`, {
        next: { revalidate: 300 },
      }),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/categories/`, {
        next: { revalidate: 300 },
      }),
    ]);

    if (!postsRes.ok) throw new Error("Failed to fetch Instagram posts");
    if (!categoriesRes.ok) {
      const errorText = await categoriesRes.text();
      console.error('Categories fetch failed:', categoriesRes.status, errorText);
      throw new Error(`Failed to fetch categories: ${categoriesRes.status}`);
    }

    posts = await postsRes.json();

    // Convert category IDs to numbers if they come as strings
    const rawCategories = await categoriesRes.json();
    categories = rawCategories.map((cat: any) => ({
      ...cat,
      id: Number(cat.id),
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <>
      <Hero />
      <FeaturedCategories categories={categories} />
      <ProductToggle />
      <BrandStory />
      <InstagramGallery posts={posts} />
      <ScrollToTop />
      <FloatingCTA />
    </>
  );
}
