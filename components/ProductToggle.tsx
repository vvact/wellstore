"use client";

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { loadFeaturedProducts, loadNewArrivals } from "@/features/productSlice";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function ProductToggle() {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<"featured" | "new">("featured");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const [showRightIndicator, setShowRightIndicator] = useState(true);

  const {
    featuredProducts,
    featuredLoading,
    featuredError,
    newArrivals,
    newArrivalsLoading,
    newArrivalsError,
  } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(loadFeaturedProducts());
    dispatch(loadNewArrivals());
  }, [dispatch]);

  // Check scroll position to show/hide indicators
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftIndicator(scrollLeft > 0);
      setShowRightIndicator(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll horizontally
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "right" ? 300 : -300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
      
      // Check new position after a delay
      setTimeout(checkScrollPosition, 300);
    }
  };

  const products = activeTab === "featured" ? featuredProducts : newArrivals;
  const loading = activeTab === "featured" ? featuredLoading : newArrivalsLoading;
  const error = activeTab === "featured" ? featuredError : newArrivalsError;

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 font-sans sm:text-4xl">
          Discover Our Products
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our handpicked selection of premium items
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-gray-100 p-1 rounded-xl" role="group">
          <button
            className={`px-6 py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 ${
              activeTab === "featured"
                ? "bg-white shadow-md text-indigo-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("featured")}
          >
            <motion.span
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <StarIcon className="h-4 w-4" />
              Featured Products
            </motion.span>
          </button>
          <button
            className={`px-6 py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 ${
              activeTab === "new"
                ? "bg-white shadow-md text-indigo-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("new")}
          >
            <motion.span
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <NewspaperIcon className="h-4 w-4" />
              New Arrivals
            </motion.span>
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {loading && (
            <>
              {/* Mobile Skeleton Loading */}
              <div className="md:hidden relative -mx-4 px-4">
                <div className="overflow-x-auto no-scrollbar py-2">
                  <div 
                    ref={scrollContainerRef}
                    className="flex gap-4 w-max min-w-full pb-6"
                    onScroll={checkScrollPosition}
                  >
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-64 flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-sm">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-52 animate-pulse" />
                        <div className="p-4 space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                          <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Scroll indicators for mobile loading */}
                {showLeftIndicator && (
                  <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
                    <button 
                      onClick={() => scroll("left")}
                      className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Scroll left"
                    >
                      <ChevronLeftIcon className="h-6 w-6 text-indigo-600" />
                    </button>
                  </div>
                )}
                {showRightIndicator && (
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10">
                    <button 
                      onClick={() => scroll("right")}
                      className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Scroll right"
                    >
                      <ChevronRightIcon className="h-6 w-6 text-indigo-600" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Desktop Skeleton Loading */}
              <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-52 animate-pulse" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {error && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center rounded-full bg-red-100 p-4 mb-4">
                <ExclamationCircleIcon className="h-12 w-12 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Products</h3>
              <p className="text-gray-600 max-w-md mx-auto">{error}</p>
              <button
                className="mt-6 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={() => activeTab === "featured" 
                  ? dispatch(loadFeaturedProducts()) 
                  : dispatch(loadNewArrivals())
                }
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center rounded-full bg-indigo-100 p-4 mb-4">
                <InboxIcon className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No {activeTab === "featured" ? "Featured" : "New"} Products
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Check back soon for our latest offerings
              </p>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <>
              {/* Mobile Horizontal Scroll */}
              <div className="md:hidden relative -mx-4 px-4">
                {/* Scroll arrows */}
                {showLeftIndicator && (
                  <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
                    <button 
                      onClick={() => scroll("left")}
                      className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Scroll left"
                    >
                      <ChevronLeftIcon className="h-6 w-6 text-indigo-600" />
                    </button>
                  </div>
                )}
                {showRightIndicator && (
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10">
                    <button 
                      onClick={() => scroll("right")}
                      className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Scroll right"
                    >
                      <ChevronRightIcon className="h-6 w-6 text-indigo-600" />
                    </button>
                  </div>
                )}
                
                {/* Scroll hint text */}
                <div className="text-center mb-2 text-sm text-gray-500 flex items-center justify-center">
                  <ChevronLeftIcon className="h-4 w-4 mr-1 animate-pulse" />
                  <span>Scroll to see more</span>
                  <ChevronRightIcon className="h-4 w-4 ml-1 animate-pulse" />
                </div>
                
                <div 
                  ref={scrollContainerRef}
                  className="overflow-x-auto no-scrollbar py-2"
                  onScroll={checkScrollPosition}
                >
                  <div className="flex gap-4 w-max min-w-full pb-6">
                    {products.map((product) => (
                      <div key={product.id} className="w-64 flex-shrink-0">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// SVG Icons
const StarIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const NewspaperIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
    />
  </svg>
);

const ExclamationCircleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const InboxIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
    />
  </svg>
);