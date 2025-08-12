// components/navbar/CartIcon.tsx
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

interface Props {
  count: number;
}

export default function CartIcon({ count }: Props) {
  return (
    <Link href="/cart" className="relative text-gray-700 hover:text-gray-900">
      <FiShoppingCart size={20} />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
