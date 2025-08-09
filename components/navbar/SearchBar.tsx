'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-1 max-w-lg mx-4 hidden md:flex">
      <input
        type="search"
        placeholder="Search products..."
        className="w-full border rounded-l-md px-3 py-2 text-sm focus:outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" className="bg-black text-white px-4 rounded-r-md text-sm">
        Search
      </button>
    </form>
  )
}
