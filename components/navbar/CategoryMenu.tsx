'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

export default function CategoryMenu() {
  const [showMegaMenu, setShowMegaMenu] = useState(false)
  const megaMenuRef = useRef<HTMLDivElement>(null)

  const { items: categories, loading } = useSelector((state: RootState) => state.categories)

  // Close mega menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setShowMegaMenu(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div
      ref={megaMenuRef}
      className="relative"
      onMouseEnter={() => window.innerWidth >= 768 && setShowMegaMenu(true)}
      onMouseLeave={() => window.innerWidth >= 768 && setShowMegaMenu(false)}
    >
      <button
        onClick={() => setShowMegaMenu((prev) => !prev)}
        className="flex items-center gap-2 font-medium text-sm py-1"
      >
        <Menu size={16} />
        All Categories
      </button>

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
  )
}
