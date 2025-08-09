// components/Navbar.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Package, 
  User, 
  Menu, 
  X 
} from 'react-feather';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
      {/* Mobile top bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button onClick={toggleMenu} className="text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/" className="text-xl font-bold text-gray-900">
              Logo
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button onClick={toggleSearch} className="text-gray-700">
              <Search size={20} />
            </button>
            <Link href="/shop" className="text-gray-700">
              <ShoppingBag size={20} />
            </Link>
          </div>
        </div>
        
        {/* Mobile search bar */}
        {isSearchOpen && (
          <div className="px-4 pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Desktop navbar */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Logo
            </Link>
            
            {/* Search bar */}
            <div className="mx-4 flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
                />
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            {/* Navigation links */}
            <nav className="flex items-center space-x-6">
              <Link href="/shop" className="flex flex-col items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <ShoppingBag size={20} className="mb-1" />
                <span>Shop</span>
              </Link>
              <Link href="/wishlist" className="flex flex-col items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <Heart size={20} className="mb-1" />
                <span>Wishlist</span>
              </Link>
              <Link href="/orders" className="flex flex-col items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <Package size={20} className="mb-1" />
                <span>Orders</span>
              </Link>
              <Link href="/login" className="flex flex-col items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <User size={20} className="mb-1" />
                <span>Login</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col py-4">
            <Link 
              href="/shop" 
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <ShoppingBag size={18} className="mr-3" />
              <span>Shop</span>
            </Link>
            <Link 
              href="/wishlist" 
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <Heart size={18} className="mr-3" />
              <span>Wishlist</span>
            </Link>
            <Link 
              href="/orders" 
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <Package size={18} className="mr-3" />
              <span>Orders</span>
            </Link>
            <Link 
              href="/login" 
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <User size={18} className="mr-3" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;