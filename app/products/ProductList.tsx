'use client';

import React, { useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import type { RootState, AppDispatch } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '@/features/productSlice';

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    console.log("Dispatching loadProducts...");
    dispatch(loadProducts());
  }, [dispatch]);

  console.log("Redux state in ProductList:", { products, loading, error });

  if (loading) return <p className="p-4">Loading products...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
  if (!products || products.length === 0) return <p className="p-4">No products found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
