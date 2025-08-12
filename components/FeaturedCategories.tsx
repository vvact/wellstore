"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Category } from "@/types";

type FeaturedCategoriesProps = {
  categories: Category[];
};

export default function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  if (!categories || categories.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">No categories available at the moment.</p>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-sans">
            Featured Collections
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated product categories
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="sm:hidden -mx-4 px-4 py-2 overflow-x-auto no-scrollbar">
          <div className="flex space-x-5 w-max min-w-full pb-6">
            {categories.map((cat) => (
              <MobileCategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CategoryCard = ({ category: cat }: { category: Category }) => (
  <Link
    href={`/category/${cat.slug}`}
    className="group block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
    aria-label={`View products in ${cat.name} category`}
    tabIndex={0}
  >
    <motion.div 
      whileHover={{ y: -8 }} 
      className="h-full flex flex-col"
    >
      <div className="relative h-52 overflow-hidden">
        {cat.image ? (
          <img
            src={cat.image}
            alt={cat.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-indigo-50 to-purple-50 flex flex-col items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-indigo-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" 
              />
            </svg>
            <span className="text-sm text-indigo-500 mt-2">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1 font-sans tracking-tight">{cat.name}</h3>
        <div className="inline-flex items-center mt-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">
          {cat.product_count} {cat.product_count === 1 ? "item" : "items"}
        </div>
      </div>
    </motion.div>
  </Link>
);

const MobileCategoryCard = ({ category: cat }: { category: Category }) => (
  <Link
    href={`/category/${cat.slug}`}
    className="flex-shrink-0 w-72 block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
    aria-label={`View products in ${cat.name} category`}
    tabIndex={0}
  >
    <motion.div whileTap={{ scale: 0.96 }}>
      <div className="relative h-40">
        {cat.image ? (
          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-indigo-50 to-purple-50 flex flex-col items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-indigo-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" 
              />
            </svg>
            <span className="text-xs text-indigo-500 mt-1">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-lg mb-1">{cat.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full">
            {cat.product_count} {cat.product_count === 1 ? "product" : "products"}
          </span>
        </div>
      </div>
    </motion.div>
  </Link>
);