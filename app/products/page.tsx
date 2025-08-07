// app/(shop)/shop/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { FilterSidebar } from '@/components/filter-sidebar';
import { SortSelect } from '@/components/sort-select';
import { X, Filter, Grid, List, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock product data - replace with your API call
const mockProducts = [
  {
    id: 1,
    name: 'Premium Leather Backpack',
    price: 4500,
    category: 'Bags',
    rating: 4.8,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1598032893280-f9b9cf62d543?auto=format&fit=crop&w=600&q=80',
    isNew: true,
    discount: 15,
  },
  {
    id: 2,
    name: 'Wireless Bluetooth Headphones',
    price: 3200,
    category: 'Electronics',
    rating: 4.6,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    isNew: false,
    discount: 0,
  },
  {
    id: 3,
    name: 'Minimalist Wrist Watch',
    price: 2800,
    category: 'Accessories',
    rating: 4.9,
    reviewCount: 204,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    isNew: false,
    discount: 10,
  },
  {
    id: 4,
    name: 'Organic Cotton T-Shirt',
    price: 1500,
    category: 'Clothing',
    rating: 4.5,
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    isNew: true,
    discount: 0,
  },
  {
    id: 5,
    name: 'Stainless Steel Water Bottle',
    price: 1200,
    category: 'Accessories',
    rating: 4.7,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    isNew: false,
    discount: 5,
  },
  {
    id: 6,
    name: 'Running Shoes - Black Edition',
    price: 5200,
    category: 'Footwear',
    rating: 4.9,
    reviewCount: 231,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    isNew: false,
    discount: 20,
  },
  {
    id: 7,
    name: 'Smart Fitness Tracker',
    price: 3800,
    category: 'Electronics',
    rating: 4.4,
    reviewCount: 56,
    image: 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&w=600&q=80',
    isNew: true,
    discount: 0,
  },
  {
    id: 8,
    name: 'Designer Sunglasses',
    price: 2800,
    category: 'Accessories',
    rating: 4.7,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=600&q=80',
    isNew: false,
    discount: 0,
  },
];

// Product Card Component
const ProductCard = ({ product }: { product: any }) => {
  return (
    <motion.div 
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {product.isNew && (
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          NEW
        </div>
      )}
      
      {product.discount > 0 && (
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          -{product.discount}%
        </div>
      )}
      
      <div className="relative aspect-square overflow-hidden">
        <div className="bg-gray-100 border-2 border-dashed rounded-xl w-full h-full" />
      </div>
      
      <div className="p-4">
        <div className="text-gray-500 text-sm mb-1">{product.category}</div>
        <h3 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              KSh {product.price.toLocaleString()}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through ml-2">
                KSh {Math.round(product.price * 100 / (100 - product.discount)).toLocaleString()}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-gray-900">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
        </div>
        
        <button className="mt-4 w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('popular');
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([500, 10000]);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProducts(mockProducts);
    }, 500);
  }, []);

  const toggleCategory = (category: string) => {
    setActiveCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter(product => {
    // Filter by category
    if (activeCategories.length > 0 && !activeCategories.includes(product.category)) {
      return false;
    }
    
    // Filter by price
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    return true;
  });

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.isNew ? 1 : -1;
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Premium Products</h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-300">
              Curated collection of high-quality items designed for modern living
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="md:hidden sticky top-0 z-20 bg-white border-b">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 text-gray-700"
          >
            <Filter size={18} />
            <span className="font-medium">Filters</span>
          </button>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filters */}
          <aside className="w-full md:w-64 lg:w-72 hidden md:block">
            <div className="sticky top-24 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                <button 
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => {
                    setActiveCategories([]);
                    setPriceRange([500, 10000]);
                  }}
                >
                  Reset
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {['Bags', 'Electronics', 'Accessories', 'Clothing', 'Footwear'].map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`cat-${category}`}
                        checked={activeCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`cat-${category}`} className="ml-2 text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>KSh {priceRange[0].toLocaleString()}</span>
                    <span>KSh {priceRange[1].toLocaleString()}</span>
                  </div>
                  <div className="relative pt-1">
                    <input 
                      type="range" 
                      min="500" 
                      max="10000" 
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="absolute w-full h-1 bg-gray-300 rounded appearance-none pointer-events-none"
                    />
                    <input 
                      type="range" 
                      min="500" 
                      max="10000" 
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="absolute w-full h-1 bg-gray-300 rounded appearance-none pointer-events-none"
                    />
                    <div className="relative h-1">
                      <div 
                        className="absolute h-1 bg-blue-600 rounded"
                        style={{
                          left: `${((priceRange[0] - 500) / (10000 - 500)) * 100}%`,
                          right: `${100 - ((priceRange[1] - 500) / (10000 - 500)) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Brand</h3>
                <div className="space-y-2">
                  {['Nike', 'Adidas', 'Apple', 'Samsung', 'Sony'].map(brand => (
                    <div key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`brand-${brand}`}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`brand-${brand}`} className="ml-2 text-gray-700">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header with controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
                <p className="text-gray-600 mt-1">
                  Showing {sortedProducts.length} of {products.length} products
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-100' : 'text-gray-500'}`}
                  >
                    <Grid size={20} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-100' : 'text-gray-500'}`}
                  >
                    <List size={20} />
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">Sort by:</span>
                  <div className="relative">
                    <select 
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    >
                      <option value="popular">Popular</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                      <option value="newest">Newest Arrivals</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <div className="text-gray-400 mb-4">No products match your filters</div>
                <button 
                  className="text-blue-600 font-medium hover:text-blue-800"
                  onClick={() => {
                    setActiveCategories([]);
                    setPriceRange([500, 10000]);
                  }}
                >
                  Reset all filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {sortedProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex">
                    <div className="w-1/3 relative">
                      <div className="bg-gray-100 border-2 border-dashed rounded-xl w-full h-full" />
                      {product.isNew && (
                        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          NEW
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 p-6">
                      <div className="flex justify-between">
                        <div>
                          <div className="text-gray-500 text-sm mb-1">{product.category}</div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                          
                          <div className="flex items-center gap-1 mb-3">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm text-gray-900">{product.rating}</span>
                            <span className="text-xs text-gray-500">({product.reviewCount})</span>
                          </div>
                          
                          <div className="mt-2">
                            <span className="text-lg font-bold text-gray-900">
                              KSh {product.price.toLocaleString()}
                            </span>
                            {product.discount > 0 && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                KSh {Math.round(product.price * 100 / (100 - product.discount)).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <button className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                      
                      <p className="mt-4 text-gray-600 text-sm">
                        This premium product features high-quality materials and exceptional craftsmanship. Designed for durability and style.
                      </p>
                      
                      <button className="mt-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2 px-6 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-1">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <ChevronUp size={16} className="transform rotate-90" />
                </button>
                
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-medium">
                  1
                </button>
                
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                  2
                </button>
                
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                  3
                </button>
                
                <span className="px-2 text-gray-500">...</span>
                
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                  8
                </button>
                
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <ChevronDown size={16} className="transform rotate-90" />
                </button>
              </nav>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
            />
            
            <motion.div 
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white z-40 overflow-y-auto"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', ease: 'easeInOut' }}
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-4">
                <div className="mb-8">
                  <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {['Bags', 'Electronics', 'Accessories', 'Clothing', 'Footwear'].map(category => (
                      <div key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`mob-cat-${category}`}
                          checked={activeCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`mob-cat-${category}`} className="ml-2 text-gray-700">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>KSh {priceRange[0].toLocaleString()}</span>
                      <span>KSh {priceRange[1].toLocaleString()}</span>
                    </div>
                    <div className="relative pt-1">
                      <input 
                        type="range" 
                        min="500" 
                        max="10000" 
                        step="100"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="absolute w-full h-1 bg-gray-300 rounded appearance-none pointer-events-none"
                      />
                      <input 
                        type="range" 
                        min="500" 
                        max="10000" 
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="absolute w-full h-1 bg-gray-300 rounded appearance-none pointer-events-none"
                      />
                      <div className="relative h-1">
                        <div 
                          className="absolute h-1 bg-blue-600 rounded"
                          style={{
                            left: `${((priceRange[0] - 500) / (10000 - 500)) * 100}%`,
                            right: `${100 - ((priceRange[1] - 500) / (10000 - 500)) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Brand</h3>
                  <div className="space-y-2">
                    {['Nike', 'Adidas', 'Apple', 'Samsung', 'Sony'].map(brand => (
                      <div key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`mob-brand-${brand}`}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`mob-brand-${brand}`} className="ml-2 text-gray-700">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8">
                  <button 
                    className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 rounded-lg font-medium"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}