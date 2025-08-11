import React from "react";
import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  premium?: boolean;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, name, slug, base_price, discount_price, featured_image, premium } = product;

  return (
    <Link
      href={`/products/${slug}`}
      className="group bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 flex flex-col h-full"
    >
      <div className="flex-grow flex items-center justify-center bg-gray-50 p-8 min-h-[300px]">
        <img
          src={featured_image ?? "https://via.placeholder.com/500x500?text=Product+Image"}
          alt={name}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      <div className="p-4 border-t border-gray-100">
        <h3 className="text-gray-900 font-medium text-lg mb-2 line-clamp-2 min-h-[3rem]">{name}</h3>
        <div className="mt-2">
          {discount_price ? (
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">KShs {discount_price}</span>
              <span className="text-sm text-gray-400 line-through">KShs {base_price}</span>
            </div>
          ) : (
            <span className="text-xl font-bold text-gray-900">KShs {base_price}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
