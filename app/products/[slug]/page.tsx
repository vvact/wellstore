import React from "react";
import ProductDetail from "@/components/ProductDetail";

interface Product {
  id: number;
  name: string;
  description: string;
  base_price: string;
  discount_price?: string;
  has_variants: boolean;
  stock: number;
  images: { id: number; image_url: string; alt_text: string; is_featured: boolean }[];
  variants: Variant[];
}

interface Variant {
  id: number;
  sku: string;
  color: { id: number; name: string };
  size: { id: number; name: string };
  price: string;
  stock: number;
  in_stock: boolean;
  image?: { image_url: string };
}

async function getProduct(slug: string): Promise<Product> {
  const res = await fetch(`http://localhost:8000/api/products/${slug}/`);
  if (!res.ok) throw new Error("Failed to fetch product");
  const data = await res.json();
  return data.product;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params; // Await the params object

  const product = await getProduct(resolvedParams.slug);

  return <ProductDetail product={product} />;
}
