'use client'

import { useState } from 'react'
import Logo from './Logo'
import SearchBar from './SearchBar'
import CategoryMenu from './CategoryMenu'
import MainLinks from './MainLinks'
import UserMenu from './UserMenu'
import CartIcon from './CartIcon'
import MobileMenuToggle from './MobileMenuToggle'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="px-4 py-3 flex items-center justify-between">
        <MobileMenuToggle open={menuOpen} toggle={() => setMenuOpen(!menuOpen)} />
        <Logo />
        <SearchBar />
        <UserMenu />
        <CartIcon />
      </div>

      <nav className="bg-gray-100 border-t relative flex items-center justify-between px-4 py-2">
        <CategoryMenu />
        <MainLinks />
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t p-4 animate-fadeIn">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close menu"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Account Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Account</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/signin" 
                    className="block py-2 px-3 rounded-md hover:bg-gray-50 text-gray-900 font-medium"
                  >
                    Sign In
                  </a>
                </li>
                <li>
                  <a 
                    href="/register" 
                    className="block py-2 px-3 rounded-md hover:bg-gray-50 text-gray-900 font-medium"
                  >
                    Create Account
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Categories Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/category/electronics" 
                    className="block py-2 px-3 rounded-md hover:bg-gray-50 text-gray-900 font-medium"
                  >
                    Electronics
                  </a>
                </li>
                <li>
                  <a 
                    href="/category/furniture" 
                    className="block py-2 px-3 rounded-md hover:bg-gray-50 text-gray-900 font-medium"
                  >
                    Furniture
                  </a>
                </li>
                <li>
                  <a 
                    href="/category/clothing" 
                    className="block py-2 px-3 rounded-md hover:bg-gray-50 text-gray-900 font-medium"
                  >
                    Clothing
                  </a>
                </li>
                <li>
                  <a 
                    href="/category/books" 
                    className="block py-2 px-3 rounded-md hover:bg-gray-50 text-gray-900 font-medium"
                  >
                    Books
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Main Links Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/deals" 
                    className="block py-2 px-3 rounded-md hover:bg-gray-50 text-gray-900 font-medium"
                  >
                    Deals
                  </a>
                </li>
                <li>
                  <a 
                    href="/new-arrivals" 
                    className="block py-2 px-3 rounded-md hover:bg-gray-50 text-gray-900 font-medium"
                  >
                    What's New
                  </a>
                </li>
                <li>
                  <a 
                    href="/delivery" 
                    className="block py-2 px-3 rounded-md hover:bg-gray-50 text-gray-900 font-medium"
                  >
                    Delivery
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Cart Link */}
            <div>
              <a 
                href="/cart" 
                className="flex items-center py-2 px-3 rounded-md hover:bg-gray-50 text-gray-900 font-medium"
              >
                <span>View Cart</span>
                <span className="ml-2 bg-gray-200 rounded-full px-2 py-0.5 text-xs">3 items</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}