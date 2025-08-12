// components/navbar/CategoriesMenu.tsx
import Link from "next/link";

interface Category {
  label: string;
  href: string;
}

interface Props {
  categories: Category[];
  onLinkClick?: () => void; // For mobile menu link click closing
}

export default function CategoriesMenu({ categories, onLinkClick }: Props) {
  return (
    <li className="relative group">
      <button className="hover:text-gray-900">Categories</button>
      <ul className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
        {categories.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={onLinkClick}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
