import Link from 'next/link'

const mainLinks = [
  { name: "Home", href: "/" },
  { name: "Flash Deals", href: "/flash-deals" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Contact", href: "/contact" }
]

export default function MainLinks() {
  return (
    <nav className="hidden md:flex gap-6 text-sm font-medium">
      {mainLinks.map(link => (
        <Link
          key={link.name}
          href={link.href}
          className="hover:text-blue-600 transition-colors"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  )
}
