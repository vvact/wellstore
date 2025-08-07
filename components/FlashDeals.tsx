'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const flashDeals = [
  {
    id: 1,
    name: 'Wireless Headphones',
    image: '/products/headphones.jpg',
    oldPrice: 4500,
    newPrice: 2999,
    endTime: new Date().getTime() + 2 * 60 * 60 * 1000, // 2 hours from now
    discount: 33,
    sold: 78,
    stock: 100,
  },
  {
    id: 2,
    name: 'Smartwatch Series 8',
    image: '/products/smartwatch.jpg',
    oldPrice: 8000,
    newPrice: 5999,
    endTime: new Date().getTime() + 3 * 60 * 60 * 1000, // 3 hours from now
    discount: 25,
    sold: 42,
    stock: 100,
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    image: '/products/speaker.jpg',
    oldPrice: 3500,
    newPrice: 2499,
    endTime: new Date().getTime() + 4 * 60 * 60 * 1000, // 4 hours from now
    discount: 29,
    sold: 55,
    stock: 100,
  },
  {
    id: 4,
    name: 'Fitness Tracker',
    image: '/products/fitnesstracker.jpg',
    oldPrice: 3000,
    newPrice: 1999,
    endTime: new Date().getTime() + 1 * 60 * 60 * 1000, // 1 hour from now
    discount: 33,
    sold: 90,
    stock: 100,
  },
];

function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: { hours: number, minutes: number, seconds: number } }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const newTimeLeft: { [key: number]: { hours: number, minutes: number, seconds: number } } = {};

      flashDeals.forEach((deal) => {
        const distance = deal.endTime - now;

        if (distance > 0) {
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          newTimeLeft[deal.id] = { hours, minutes, seconds };
        } else {
          newTimeLeft[deal.id] = { hours: 0, minutes: 0, seconds: 0 };
        }
      });

      setTimeLeft(newTimeLeft);
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
    
    return () => clearInterval(timer);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    
    container.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
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

  return (
    <section className="px-4 py-8 md:py-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">🔥</span> Flash Deals
          </h2>
          <Link href="/flash-deals" className="text-sm text-red-600 hover:underline font-medium">
            View All
          </Link>
        </div>

        {/* Mobile arrows */}
        <div className="relative mb-4 sm:hidden">
          {showLeftArrow && (
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {showRightArrow && (
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Deals container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 pb-4 overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 hide-scrollbar"
          onScroll={checkScrollPosition}
        >
          {flashDeals.map((deal) => (
            <motion.div
              key={deal.id}
              className="relative group border rounded-xl shadow-sm hover:shadow-md transition-all min-w-[85vw] sm:min-w-0 flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              {/* Discount badge */}
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                {deal.discount}% OFF
              </div>
              
              {/* Product image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={deal.image}
                  alt={deal.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
              </div>
              
              {/* Product info */}
              <div className="p-4">
                <h3 className="font-medium mb-2 line-clamp-1">{deal.name}</h3>
                
                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-red-600">KSh {deal.newPrice.toLocaleString()}</span>
                  <span className="text-gray-400 text-sm line-through">KSh {deal.oldPrice.toLocaleString()}</span>
                </div>
                
                {/* Countdown timer */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Ends in:</span>
                    <span className="font-medium">
                      {timeLeft[deal.id] ? 
                        `${Math.floor(timeLeft[deal.id].hours)}h ${Math.floor(timeLeft[deal.id].minutes)}m ${Math.floor(timeLeft[deal.id].seconds)}s` : 
                        'Loading...'}
                    </span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${(deal.sold / deal.stock) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{deal.sold} sold</span>
                    <span>{deal.stock - deal.sold} available</span>
                  </div>
                </div>
                
                {/* Shop button */}
                <Link
                  href={`/product/${deal.id}`}
                  className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded-lg font-medium transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
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

export default FlashDeals;