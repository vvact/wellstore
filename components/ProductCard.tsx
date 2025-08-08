'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discounted_price < parseFloat(product.original_price);

  return (
    <div className="flex flex-col border rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-sm">
      <img
        src={product.main_image}
        alt={product.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{product.category.name}</p>

        {/* Breadcrumbs */}
        <nav className="text-xs text-blue-600 mb-3">
          {product.category.breadcrumbs.map((crumb, i) => (
            <span key={i}>
              <a href={crumb.path} className="hover:underline">{crumb.label}</a>
              {i < product.category.breadcrumbs.length - 1 && ' > '}
            </span>
          ))}
        </nav>

        <div className="mt-auto">
          {hasDiscount ? (
            <div className="flex items-center space-x-2">
              <span className="line-through text-muted-foreground">
                KShs {product.original_price}
              </span>
              <span className="text-red-600 font-bold">
                KShs {product.discounted_price}
              </span>
            </div>
          ) : (
            <span className="font-bold text-lg">KShs {product.price}</span>
          )}

          <p className={`mt-2 text-sm font-medium ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock_status}
          </p>
        </div>

        <Button className="mt-4" variant="outline" size="sm">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
