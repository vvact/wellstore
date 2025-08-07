'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'

// Sample product data
const popularProducts = [
  {
    id: 1,
    name: 'Wireless Earbuds Pro',
    price: 2499,
    image: '/products/earbuds.jpg',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: 'Smart Fitness Tracker',
    price: 3499,
    image: '/products/fitness-tracker.jpg',
    rating: 4.5,
    reviews: 98,
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: 1999,
    image: '/products/backpack.jpg',
    rating: 4.7,
    reviews: 87,
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    price: 2999,
    image: '/products/speaker.jpg',
    rating: 4.6,
    reviews: 112,
  },
]

const newProducts = [
  {
    id: 5,
    name: 'Smart Home Camera',
    price: 3999,
    image: '/products/camera.jpg',
    rating: 4.9,
    reviews: 32,
    isNew: true,
  },
  {
    id: 6,
    name: 'Ergonomic Office Chair',
    price: 8999,
    image: '/products/chair.jpg',
    rating: 4.7,
    reviews: 21,
    isNew: true,
  },
  {
    id: 7,
    name: 'Wireless Charging Pad',
    price: 1499,
    image: '/products/charger.jpg',
    rating: 4.4,
    reviews: 45,
    isNew: true,
  },
  {
    id: 8,
    name: 'Ultra HD Webcam',
    price: 4999,
    image: '/products/webcam.jpg',
    rating: 4.8,
    reviews: 28,
    isNew: true,
  },
]

// Product Card Component
const ProductCard = ({ product }: { product: any }) => (
  <motion.div 
    className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
  >
    <Link href={`/product/${product.id}`} className="block">
      {/* Product Image */}
      <div className="relative aspect-square w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 25vw"
        />
        
        {/* Badges */}
        <div className="absolute top-2 right-2">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 border-t">
        <h3 className="font-medium text-sm md:text-base mb-1 line-clamp-1">{product.name}</h3>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-base font-bold">KSh {product.price.toLocaleString()}</span>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <span className="text-amber-500">★</span>
            <span className="text-xs">{product.rating}</span>
            <span className="text-gray-400 text-xs">({product.reviews})</span>
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <button className="w-full bg-black hover:bg-gray-800 text-white text-sm py-2 rounded-md transition-colors">
          Add to Cart
        </button>
      </div>
    </Link>
  </motion.div>
)

export default function FeaturedProductsTabs() {
  const [activeTab, setActiveTab] = useState('popular')
  const scrollRefs = {
    popular: useRef<HTMLDivElement>(null),
    new: useRef<HTMLDivElement>(null),
  }
  const [showArrows, setShowArrows] = useState({
    popular: { left: false, right: true },
    new: { left: false, right: true },
  })

  const handleScroll = (tab: string) => {
    const container = scrollRefs[tab as keyof typeof scrollRefs].current
    if (!container) return
    
    setShowArrows(prev => ({
      ...prev,
      [tab]: {
        left: container.scrollLeft > 0,
        right: container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      }
    }))
  }

  const scroll = (tab: string, direction: 'left' | 'right') => {
    const container = scrollRefs[tab as keyof typeof scrollRefs].current
    if (!container) return
    
    const scrollAmount = container.clientWidth * 0.8
    container.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    })
  }

  return (
    <section className="w-full py-8 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full md:w-auto"
          >
            <TabsList className="grid grid-cols-2 w-full md:w-[300px] bg-gray-100">
              <TabsTrigger 
                value="popular" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Popular
              </TabsTrigger>
              <TabsTrigger 
                value="new" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                New Arrivals
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Popular Products */}
        <div className={activeTab === 'popular' ? 'block' : 'hidden'}>
          {/* Mobile Arrows */}
          <div className="relative mb-4 md:hidden">
            {showArrows.popular.left && (
              <button 
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
                onClick={() => scroll('popular', 'left')}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {showArrows.popular.right && (
              <button 
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
                onClick={() => scroll('popular', 'right')}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Products Grid */}
          <div 
            ref={scrollRefs.popular}
            onScroll={() => handleScroll('popular')}
            className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6"
          >
            {popularProducts.map((product) => (
              <div key={product.id} className="min-w-[45vw] md:min-w-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* New Arrivals Products */}
        <div className={activeTab === 'new' ? 'block' : 'hidden'}>
          {/* Mobile Arrows */}
          <div className="relative mb-4 md:hidden">
            {showArrows.new.left && (
              <button 
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
                onClick={() => scroll('new', 'left')}
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {showArrows.new.right && (
              <button 
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
                onClick={() => scroll('new', 'right')}
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Products Grid */}
          <div 
            ref={scrollRefs.new}
            onScroll={() => handleScroll('new')}
            className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6"
          >
            {newProducts.map((product) => (
              <div key={product.id} className="min-w-[45vw] md:min-w-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link 
            href={activeTab === 'popular' ? '/popular-products' : '/new-arrivals'} 
            className="inline-block bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            View All {activeTab === 'popular' ? 'Popular Products' : 'New Arrivals'}
          </Link>
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
  )
}