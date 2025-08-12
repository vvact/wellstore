"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Variant {
  id: number;
  sku: string;
  color: { id: number; name: string; hex_code?: string | null };
  size: { id: number; name: string };
  price: string;
  stock: number;
  in_stock: boolean;
  image?: { image_url: string };
}

interface Product {
  id: number;
  name: string;
  description: string;
  base_price: string;
  discount_price?: string;
  has_variants: boolean;
  stock: number;
  images: { id: number; image_url: string; alt_text: string; is_featured: boolean }[];
  variants: Variant[];
}

interface RelatedProduct {
  id: number;
  name: string;
  slug: string;
  base_price: string;
  discount_price?: string;
  featured_image: string;
}

export default function ProductDetail({
  product,
  related_products,
}: {
  product: Product;
  related_products?: RelatedProduct[];
}) {
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(
    product.images.find((img) => img.is_featured)?.image_url || ""
  );

  useEffect(() => {
    if (product.has_variants && selectedColor && selectedSize) {
      const variant = product.variants.find(
        (v) => v.color.id === selectedColor && v.size.id === selectedSize
      );
      setSelectedVariant(variant || null);
      if (variant?.image?.image_url) setMainImage(variant.image.image_url);
    } else {
      setSelectedVariant(null);
      setMainImage(product.images.find((img) => img.is_featured)?.image_url || "");
    }
  }, [selectedColor, selectedSize, product]);

  const priceToShow = selectedVariant
    ? selectedVariant.price
    : product.discount_price || product.base_price;

  const maxQuantity = selectedVariant ? selectedVariant.stock : product.stock;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Images */}
      <div className="flex-1">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full object-contain rounded"
        />
        <div className="flex mt-4 gap-2 overflow-x-auto">
          {product.images.map((img) => (
            <img
              key={img.id}
              src={img.image_url}
              alt={img.alt_text || product.name}
              onClick={() => setMainImage(img.image_url)}
              className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                mainImage === img.image_url ? "border-blue-500" : "border-transparent"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p>{product.description}</p>

        <div className="text-xl font-bold">KSh {priceToShow}</div>

        {/* Variant selectors */}
        {product.has_variants && (
          <div className="space-y-4">
            {/* Color Selector */}
            <div>
              <label className="block font-medium mb-2">Color</label>
              <div className="flex space-x-2">
                {[...new Map(product.variants.map((v) => [v.color.id, v.color])).values()].map(
                  (color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => {
                        setSelectedColor(color.id);
                        setSelectedSize(null); // reset size on color change
                      }}
                      className={`w-10 h-10 rounded-full border-2 focus:outline-none 
                      ${
                        selectedColor === color.id
                          ? "border-blue-600 ring-2 ring-blue-400"
                          : "border-gray-300"
                      }
                      flex items-center justify-center`}
                      style={{ backgroundColor: color.hex_code || undefined }}
                      aria-label={`Select color ${color.name}`}
                    >
                      {!color.hex_code && (
                        <span className="text-sm text-gray-700">{color.name[0]}</span>
                      )}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <label className="block font-medium mb-2">Size</label>
              <div className="flex space-x-2">
                {[...new Map(product.variants.map((v) => [v.size.id, v.size]))
                  .values()
                  .filter((size) =>
                    product.variants.some(
                      (v) => v.color.id === selectedColor && v.size.id === size.id
                    )
                  )].map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSize(size.id)}
                    className={`px-3 py-1 rounded border-2 focus:outline-none
                        ${
                          selectedSize === size.id
                            ? "border-blue-600 bg-blue-100"
                            : "border-gray-300 bg-white"
                        }
                      `}
                    aria-label={`Select size ${size.name}`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quantity */}
        <div>
          <label className="block font-medium">Quantity</label>
          <input
            type="number"
            min={1}
            max={maxQuantity}
            value={quantity}
            onChange={(e) => {
              const val = Math.min(maxQuantity, Math.max(1, Number(e.target.value)));
              setQuantity(val);
            }}
            className="border rounded p-2 w-24"
          />
        </div>

        {/* Add to Cart */}
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded disabled:bg-gray-400"
          disabled={product.has_variants && !selectedVariant}
          onClick={() => {
            alert(
              `Added ${quantity} of ${
                selectedVariant
                  ? `${product.name} - ${selectedVariant.color.name} / ${selectedVariant.size.name}`
                  : product.name
              } to cart!`
            );
          }}
        >
          Add to Cart
        </button>

        {/* Related Products */}
        {related_products && related_products.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related_products.map((rel) => {
                const price = rel.discount_price || rel.base_price;
                return (
                  <Link key={rel.id} href={`/products/${rel.slug}`}>
                    <a className="border rounded p-3 hover:shadow-md transition-shadow duration-200">
                      <img
                        src={rel.featured_image}
                        alt={rel.name}
                        className="w-full h-40 object-cover rounded"
                      />
                      <h3 className="mt-2 text-lg font-medium">{rel.name}</h3>
                      <p className="text-blue-600 font-semibold">KSh {price}</p>
                    </a>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
