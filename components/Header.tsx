'use client'

import { useState, useEffect, useRef } from 'react'
import { ShoppingCart, Heart, User, Menu, X, Search } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showMegaMenu, setShowMegaMenu] = useState(false)
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setShowMegaMenu(false)
      }
      if (searchRef.current && showSearch && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false)
      }
      if (menuRef.current && menuOpen && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showSearch, menuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [menuOpen])

  // Close mobile categories when menu closes
  useEffect(() => {
    if (!menuOpen) setMobileCategoriesOpen(false)
  }, [menuOpen])

  // Handle All Categories click
  const handleAllCategoriesClick = () => {
    if (window.innerWidth < 768) {
      setMenuOpen(true)
      setMobileCategoriesOpen(true)
    } else {
      setShowMegaMenu(prev => !prev)
    }
  }

  // Navigation data
  const categories = [
    {
      title: "Electronics",
      items: [
        { name: "Phones", href: "/category/phones" },
        { name: "Laptops", href: "/category/laptops" },
        { name: "Audio", href: "/category/audio" },
        { name: "Accessories", href: "/category/accessories" }
      ]
    },
    {
      title: "Fashion",
      items: [
        { name: "Men", href: "/category/men" },
        { name: "Women", href: "/category/women" },
        { name: "Kids", href: "/category/kids" },
        { name: "Shoes", href: "/category/shoes" }
      ]
    },
    {
      title: "Home & Kitchen",
      items: [
        { name: "Furniture", href: "/category/furniture" },
        { name: "Appliances", href: "/category/appliances" },
        { name: "Decor", href: "/category/decor" },
        { name: "Cookware", href: "/category/cookware" }
      ]
    }
  ]

  const mainLinks = [
    { name: "Home", href: "/" },
    { name: "Flash Deals", href: "/flash-deals" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Contact", href: "/contact" }
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      {/* Top utility bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          className="p-1 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
          aria-label="Home"
        >
          <div className="flex items-center justify-center rounded-full bg-black text-white w-8 h-8 md:w-10 md:h-10 font-bold text-lg md:text-xl">
            M
          </div>
          
          <div className="hidden md:block">
            <div className="font-bold text-lg md:text-xl uppercase tracking-tight">MANWELL</div>
            <div className="text-[10px] uppercase tracking-widest opacity-75">Where street meets sleek</div>
          </div>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 mx-4 max-w-lg">
          <input
            type="search"
            placeholder="Search products..."
            className="w-full border rounded-l-md px-3 py-2 text-sm focus:outline-none"
            aria-label="Search products"
          />
          <button className="bg-black text-white px-4 rounded-r-md text-sm">
            Search
          </button>
        </div>

        {/* Icons */}
        <div className="flex gap-4 items-center">
          <button 
            className="md:hidden p-1"
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          <Link href="/wishlist" className="hidden sm:block" aria-label="Wishlist">
            <Heart size={20} />
          </Link>
          
          <Link href="/account" className="hidden sm:block" aria-label="Account">
            <User size={20} />
          </Link>
          
          <Link href="/cart" className="relative p-1" aria-label="Cart">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div ref={searchRef} className="md:hidden px-4 pb-3">
          <div className="flex">
            <input
              type="search"
              placeholder="Search products..."
              className="flex-1 border rounded-l-md px-3 py-2 text-sm focus:outline-none"
              autoFocus
              aria-label="Search products"
            />
            <button className="bg-black text-white px-4 rounded-r-md text-sm">
              Search
            </button>
          </div>
        </div>
      )}

      {/* Main navigation */}
      <nav className="bg-gray-100 border-t relative">
        <div className="px-4 py-2 flex items-center justify-between">
          <div
            ref={megaMenuRef}
            className="relative"
            onMouseEnter={() => window.innerWidth >= 768 && setShowMegaMenu(true)}
            onMouseLeave={() => window.innerWidth >= 768 && setShowMegaMenu(false)}
          >
            <button
              onClick={handleAllCategoriesClick}
              className="flex items-center gap-2 font-medium text-sm py-1"
              aria-expanded={showMegaMenu}
            >
              <Menu size={16} />
              All Categories
            </button>

            {/* Mega Menu - Desktop */}
            {showMegaMenu && (
              <div className="hidden md:block absolute left-0 top-full w-screen max-w-5xl bg-white shadow-lg border z-50 mt-0 p-5 grid grid-cols-3 gap-6 text-sm">
                {categories.map((category) => (
                  <div key={category.title}>
                    <h3 className="font-semibold mb-2">{category.title}</h3>
                    <ul className="space-y-1">
                      {category.items.map((item) => (
                        <li key={item.name}>
                          <Link 
                            href={item.href} 
                            className="hover:text-blue-600 transition-colors"
                            onClick={() => setShowMegaMenu(false)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex gap-6 text-sm font-medium">
            {mainLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      <div 
        ref={menuRef}
        className={`fixed top-0 left-0 h-full bg-white z-50 w-64 shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <div className="flex items-center justify-center rounded-full bg-black text-white w-8 h-8 font-bold text-lg">
              M
            </div>
            <span className="font-bold">MANWELL</span>
          </Link>
          <button 
            onClick={() => setMenuOpen(false)} 
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="overflow-y-auto h-[calc(100%-60px)]">
          <div className="p-4 space-y-4">
            <div>
              <button
                onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                className="flex items-center justify-between w-full py-2 font-medium"
                aria-expanded={mobileCategoriesOpen}
              >
                <span>All Categories</span>
                <span>{mobileCategoriesOpen ? '−' : '+'}</span>
              </button>
              
              {mobileCategoriesOpen && (
                <div className="pl-4 mt-2 space-y-3 text-sm">
                  {categories.map((category) => (
                    <div key={category.title}>
                      <h3 className="font-semibold mb-1">{category.title}</h3>
                      <ul className="space-y-1 pl-2">
                        {category.items.map((item) => (
                          <li key={item.name}>
                            <Link 
                              href={item.href} 
                              className="block py-1 hover:text-blue-600 transition-colors"
                              onClick={() => setMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {mainLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="block py-2 hover:text-blue-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t">
              <Link 
                href="/wishlist" 
                className="flex items-center gap-2 py-2 hover:text-blue-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <Heart size={16} />
                Wishlist
              </Link>
              <Link 
                href="/account" 
                className="flex items-center gap-2 py-2 hover:text-blue-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <User size={16} />
                Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}