'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { ShoppingCart, Heart, User, Menu, X, Search } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'  // <-- import router

export default function Header() {
  const router = useRouter()  // <-- initialize router

  const [menuOpen, setMenuOpen] = useState(false)
  const [showMegaMenu, setShowMegaMenu] = useState(false)
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const megaMenuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const { items: categories, loading } = useSelector(
    (state: RootState) => state.categories
  )

  const productLoading = useSelector(
    (state: RootState) => state.product.loading
  )

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) setMobileCategoriesOpen(false)
  }, [menuOpen])

  const handleAllCategoriesClick = () => {
    if (window.innerWidth < 768) {
      setMenuOpen(true)
      setMobileCategoriesOpen(true)
    } else {
      setShowMegaMenu(prev => !prev)
    }
  }

  // Updated search submit to navigate instead of dispatching here
  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim().length > 0) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`)
      setShowMegaMenu(false)
      setShowSearch(false)
      setMenuOpen(false)
      setSearchQuery('')  // clear input after submit
    }
  }

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
        <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <div className="flex items-center justify-center rounded-full bg-black text-white w-8 h-8 md:w-10 md:h-10 font-bold text-lg md:text-xl">
            M
          </div>
          <div className="hidden md:block">
            <div className="font-bold text-lg md:text-xl uppercase tracking-tight">MANWELL</div>
            <div className="text-[10px] uppercase tracking-widest opacity-75">Where street meets sleek</div>
          </div>
        </Link>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-4 max-w-lg">
          <input
            type="search"
            placeholder="Search products..."
            className="w-full border rounded-l-md px-3 py-2 text-sm focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-black text-white px-4 rounded-r-md text-sm"
            disabled={productLoading}
          >
            Search
          </button>
        </form>

        {/* Icons */}
        <div className="flex gap-4 items-center">
          <button
            className="md:hidden p-1"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search size={20} />
          </button>
          <Link href="/wishlist" className="hidden sm:block">
            <Heart size={20} />
          </Link>
          <Link href="/account" className="hidden sm:block">
            <User size={20} />
          </Link>
          <Link href="/cart" className="relative p-1">
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </div>

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
            >
              <Menu size={16} />
              All Categories
            </button>

            {/* Mega Menu */}
            {showMegaMenu && (
              <div className="hidden md:block absolute left-0 top-full w-screen max-w-5xl bg-white shadow-lg border z-50 mt-0 p-5 grid grid-cols-3 gap-6 text-sm">
                {loading ? (
                  <p>Loading...</p>
                ) : categories.length > 0 ? (
                  categories.map((cat) => (
                    <div key={cat.id}>
                      <h3 className="font-semibold mb-2">{cat.name}</h3>
                      <ul className="space-y-1">
                        {cat.children?.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              href={`/category/${sub.slug}`}
                              className="hover:text-blue-600 transition-colors"
                              onClick={() => setShowMegaMenu(false)}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p>No categories found</p>
                )}
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

      {/* Mobile Search */}
      {showSearch && (
        <div ref={searchRef} className="md:hidden px-4 py-2">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="search"
              placeholder="Search products..."
              className="w-full border rounded-l-md px-3 py-2 text-sm focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-black text-white px-4 rounded-r-md text-sm"
              disabled={productLoading}
            >
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  )
}
