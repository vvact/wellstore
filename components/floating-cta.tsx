'use client';

import { ShoppingBag } from 'lucide-react';

export default function FloatingCTA() {
  return (
    <a
      href="/products"
      className="fixed bottom-20 right-6 bg-green-600 text-white py-3 px-5 rounded-full flex items-center gap-2 hover:bg-green-700 transition z-50 shadow-lg"
    >
      <ShoppingBag size={18} />
      Shop Now
    </a>
  );
}
