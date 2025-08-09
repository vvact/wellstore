'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;       // expect your backend to provide image URL or you can handle missing
  color?: string;       // you can assign a default color or generate dynamically
  slug: string;
}

export default function FeaturedCategories() {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // State to hold fetched categories
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 640);

      const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Fetch categories from backend API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:8000/api/categories/');
        // Adjust based on your API response shape — assuming response.data.results is array
        const data = response.data.results;

        // Optional: map to add color or default images if missing
        const categoriesWithExtras = data.map((cat: any, index: number) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description || 'Explore our collection',
          image: cat.image || '/images/categories/default.jpg',  // fallback image
          color: [
            'from-blue-500 to-indigo-600',
            'from-rose-500 to-pink-600',
            'from-emerald-500 to-teal-600',
            'from-amber-500 to-orange-500',
          ][index % 4],
        }));

        setCategories(categoriesWithExtras);
      } catch (err) {
        setError('Failed to load categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.7;

    container.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  if (loading) {
    return (
      <section className="py-8 md:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-500">Loading categories...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 md:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center text-red-500">{error}</div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-8 md:mb-10">
          <motion.h2
            className="text-2xl md:text-3xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Shop by Category
          </motion.h2>
          <motion.p
            className="mt-2 text-gray-600 max-w-2xl mx-auto text-sm md:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our curated collections for every style and need
          </motion.p>
        </div>

        {/* Mobile arrows */}
        {isMobile && (
          <div className="relative mb-4">
            {showLeftArrow && (
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
                onClick={() => scroll('left')}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4 text-gray-700" />
              </button>
            )}
            {showRightArrow && (
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
                onClick={() => scroll('right')}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4 text-gray-700" />
              </button>
            )}
          </div>
        )}

        {/* Categories grid */}
        <div
          ref={scrollContainerRef}
          className={`pb-4 ${
            isMobile
              ? 'flex gap-4 overflow-x-auto hide-scrollbar'
              : 'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'
          }`}
          onScroll={isMobile ? checkScrollPosition : undefined}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer
                ${isMobile ? 'min-w-[70vw] flex-shrink-0' : 'w-full'}`}
              onClick={() =>
                router.push(`/category/${category.slug}`)
              }
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: isMobile ? '0px' : '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: isMobile ? 0 : -5 }}
            >
              {/* Image with gradient overlay */}
              <div className="relative aspect-[3/4]">
                <Image
                  src={category.image!}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes={
                    isMobile
                      ? '(max-width: 640px) 70vw, 25vw'
                      : '(max-width: 768px) 50vw, 25vw'
                  }
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    category.color || 'from-gray-700 to-gray-900'
                  } opacity-90`}
                />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 text-white">
                <h3 className="text-lg font-bold tracking-tight mb-1">{category.name}</h3>
                <p className="text-xs sm:text-sm opacity-90 mb-2">{category.description}</p>

                {/* Shop button */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                    Shop now
                  </span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 sm:h-4 sm:w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Mobile-only badge */}
              {isMobile && (
                <div className="absolute top-2 left-2 bg-white text-black text-xs font-bold px-2 py-1 rounded-full">
                  New
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          className="mt-6 md:mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            onClick={() => router.push('/categories')}
          >
            View All Categories
          </button>
        </motion.div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
