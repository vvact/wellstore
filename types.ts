// types.ts

export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string | null;
  product_count?: number; // optional, if you want to track number of products
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  base_price: string;
  premium?: boolean;  // Add this line
  discount_price: string | null;
  featured_image: string | null;
  category?: Category; // optional nested category if needed
}
export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  permalink: string;
}

