import Link from 'next/link'
import { Heart, User } from 'lucide-react'

export default function UserMenu() {
  return (
    <div className="flex gap-4 items-center">
      <Link href="/wishlist" className="hidden sm:block">
        <Heart size={20} />
      </Link>
      <Link href="/account" className="hidden sm:block">
        <User size={20} />
      </Link>
    </div>
  )
}
