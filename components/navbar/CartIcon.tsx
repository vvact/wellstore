import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

export default function CartIcon() {
  const cartCount = useSelector((state: RootState) => state.cart.items.length) // example selector

  return (
    <Link href="/cart" className="relative p-1">
      <ShoppingCart size={20} />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  )
}
