"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { loadFeaturedProducts, loadNewArrivals } from "@/features/productSlice";
import ProductCard from "./ProductCard";


export default function ProductToggle() {
  const dispatch = useDispatch<AppDispatch>();

  // Local state to track which tab is active
  const [activeTab, setActiveTab] = useState<"featured" | "new">("featured");

  // Redux selectors
  const {
    featuredProducts,
    featuredLoading,
    featuredError,
    newArrivals,
    newArrivalsLoading,
    newArrivalsError,
  } = useSelector((state: RootState) => state.product);

  // Load both on mount, or you can lazy load on tab switch
  useEffect(() => {
    dispatch(loadFeaturedProducts());
    dispatch(loadNewArrivals());
  }, [dispatch]);

  // Determine what to display based on active tab
  const products = activeTab === "featured" ? featuredProducts : newArrivals;
  const loading = activeTab === "featured" ? featuredLoading : newArrivalsLoading;
  const error = activeTab === "featured" ? featuredError : newArrivalsError;

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      {/* Tab Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 font-semibold rounded ${
            activeTab === "featured" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("featured")}
        >
          Featured
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded ${
            activeTab === "new" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("new")}
        >
          New Arrivals
        </button>
      </div>

      {/* Content */}
      {loading && <p className="text-center py-8">Loading products...</p>}

      {error && <p className="text-center py-8 text-red-600 font-semibold">Error: {error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="text-center py-8 text-gray-500">No products found.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
