'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'

export default function CategoryPage() {
  const { slug } = useParams()
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/?category=${slug}`)
        setProducts(res.data.results)
      } catch (err) {
        console.error(err)
      }
    }
    if (slug) {
      fetchProducts()
    }
  }, [slug])

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4 capitalize">{slug}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img src={product.main_image} alt={product.name} className="w-full h-48 object-cover mb-2" />
            <h2 className="font-semibold">{product.name}</h2>
            <p>KSh {product.discounted_price ?? product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
