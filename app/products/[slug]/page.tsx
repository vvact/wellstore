// app/products/[slug]/page.tsx

'use client';

import Image from 'next/image';

export default function ProductDetailPage() {
  // Dummy product data
  const product = {
    id: 1,
    title: 'Premium School Backpack',
    description:
      'This backpack is designed for durability and style, perfect for students of all ages.',
    price: 3200,
    image:
      'https://images.unsplash.com/photo-1598032893280-f9b9cf62d543?auto=format&fit=crop&w=600&q=80',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Product Image */}
      <div className="w-full">
        <Image
          src={product.image}
          alt={product.title}
          width={600}
          height={600}
          className="rounded-lg object-cover w-full"
        />
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-700 mb-6">{product.description}</p>
        <p className="text-2xl font-semibold text-green-600 mb-6">
          KSh {product.price.toLocaleString()}
        </p>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
