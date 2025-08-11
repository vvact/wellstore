"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // or use your router's params hook
import ProductCard from "./ProductCard"; // Your existing product card component

interface Product {
  id: number;
  name: string;
  slug: string;
  base_price: string;
  discount_price: string | null;
  featured_image: string | null;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategoryProductsResponse {
  category: Category;
  product_count: number;
  products: Product[];
}

export default function CategoryProductsPage() {
  const { slug } = useParams(); // Assuming your URL is like /categories/[slug]
  const [data, setData] = useState<CategoryProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/products/categories/${slug}/products/`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        const json: CategoryProductsResponse = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchProducts();
  }, [slug]);

  if (loading) return <p>Loading products for category...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!data || data.products.length === 0) return <p>No products found for this category.</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{data.category.name}</h1>
      <p className="mb-6 text-gray-600">{data.product_count} products found</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
