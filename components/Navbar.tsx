"use client";

import { useState } from "react";
import Link from "next/link";
import { FiUser, FiShoppingCart, FiMenu, FiX, FiSearch } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartItemCount = 3; // example count, replace with dynamic data

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          BoutiqueMen
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li>
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
          </li>
          <li>
            <Link href="/shop" className="hover:text-gray-900">
              Shop
            </Link>
          </li>
          <li className="relative group">
            <button className="hover:text-gray-900">Categories</button>
            {/* Dropdown on hover */}
            <ul className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
              <li>
                <Link
                  href="/category/shirts"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Shirts
                </Link>
              </li>
              <li>
                <Link
                  href="/category/shoes"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/category/accessories"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-900">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-900">
              Contact
            </Link>
          </li>
        </ul>

        {/* Right icons */}
        <div className="flex items-center space-x-4">
          {/* Search icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Search"
          >
            <FiSearch size={20} />
          </button>

          {/* User icon */}
          <Link href="/login" className="text-gray-700 hover:text-gray-900">
            <FiUser size={20} />
          </Link>

          {/* Cart icon with badge */}
          <Link href="/cart" className="relative text-gray-700 hover:text-gray-900">
            <FiShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <ul className="flex flex-col p-4 space-y-2 text-gray-700 font-medium">
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" onClick={() => setMenuOpen(false)}>
                Shop
              </Link>
            </li>
            <li>
              <Link href="/category/shirts" onClick={() => setMenuOpen(false)}>
                Shirts
              </Link>
            </li>
            <li>
              <Link href="/category/shoes" onClick={() => setMenuOpen(false)}>
                Shoes
              </Link>
            </li>
            <li>
              <Link
                href="/category/accessories"
                onClick={() => setMenuOpen(false)}
              >
                Accessories
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </li>
            <li>
              <Link href="/cart" onClick={() => setMenuOpen(false)}>
                Cart ({cartItemCount})
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Search bar */}
      {searchOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b shadow-md p-4 z-50">
          <form className="max-w-3xl mx-auto flex">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}
