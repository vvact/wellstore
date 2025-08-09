'use client';

import { useState } from 'react';
import React from 'react';

import { useDispatch } from 'react-redux';
import { addToCart } from '@/features/cartSlice';

export default function ProductDetail({ product }) {
  const dispatch = useDispatch();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product.has_variants && !selectedVariant) {
      alert("Please select a variant first");
      return;
    }

    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      ...(product.has_variants ? { variant: selectedVariant } : {})
    }));
  };

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      {/* Product Images */}
      <div>
        <img
          src={product.images[0]?.image}
          alt={product.images[0]?.alt_text || product.name}
          className="w-full rounded-xl"
        />
        <div className="flex gap-2 mt-2">
          {product.images.map(img => (
            <img
              key={img.id}
              src={img.image}
              alt={img.alt_text}
              className="w-20 h-20 object-cover rounded cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-lg text-gray-500">{product.description}</p>
        
        {/* Price */}
        <div className="mt-4">
          <span className="text-xl font-semibold">KES {product.price}</span>
          {product.discount_price && (
            <span className="line-through ml-2 text-gray-400">
              KES {product.base_price}
            </span>
          )}
        </div>

        {/* Variant Selectors */}
        {product.has_variants && (
          <div className="mt-4 space-y-2">
            {/* Color */}
            {product.variant_attributes?.Color && (
              <div>
                <label className="block font-medium">Color</label>
                <select
                  onChange={(e) =>
                    setSelectedVariant(
                      product.variants.find(v => v.color.name === e.target.value)
                    )
                  }
                  className="border p-2 rounded"
                >
                  <option value="">Select Color</option>
                  {product.variant_attributes.Color.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Size */}
            {product.variant_attributes?.Size && (
              <div>
                <label className="block font-medium">Size</label>
                <select
                  onChange={(e) =>
                    setSelectedVariant(
                      product.variants.find(v => v.size.name === e.target.value)
                    )
                  }
                  className="border p-2 rounded"
                >
                  <option value="">Select Size</option>
                  {product.variant_attributes.Size.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Quantity Selector */}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="px-3 py-1 border rounded"
          >-</button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="px-3 py-1 border rounded"
          >+</button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-black text-white px-6 py-3 rounded-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
