'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/lib/store'
import { loadProductsBySearch } from '@/features/productSlice'
import ProductList from '@/app/products/ProductList'



export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''

  const dispatch = useDispatch<AppDispatch>()
  const { products, loading, error } = useSelector((state: RootState) => state.product)

  useEffect(() => {
    if (query.length > 0) {
      dispatch(loadProductsBySearch(query))
    }
  }, [dispatch, query])

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Search results for "{query}"</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && products.length === 0 && <p>No products found.</p>}

      {!loading && products.length > 0 && (
        <ProductList products={products} />
      )}
    </div>
  )
}
