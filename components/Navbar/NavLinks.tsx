// components/navbar/NavLinks.tsx
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

interface Props {
  links: NavLink[];
  onLinkClick?: () => void; // For mobile menu link click closing
}

export default function NavLinks({ links, onLinkClick }: Props) {
  return (
    <>
      {links.map(({ label, href }) => (
        <li key={href}>
          <Link href={href} onClick={onLinkClick} className="hover:text-gray-900">
            {label}
          </Link>
        </li>
      ))}
    </>
  );
}
