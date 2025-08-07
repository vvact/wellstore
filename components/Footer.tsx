// components/Footer.tsx
'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-12 border-t">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and description */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Ecomerec</h2>
          <p className="text-sm">
            Your trusted destination for school shopping and more. Browse curated collections by school and grade.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Popular Categories */}
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/flash-deals">Flash Deals</Link></li>
            <li><Link href="/new-arrivals">New Arrivals</Link></li>
            <li><Link href="/collections">Collections</Link></li>
            <li><Link href="/uniforms">School Uniforms</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +254 712 345678
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> support@ecomerec.co.ke
            </li>
            <li className="flex items-center gap-3 mt-4">
              <Link href="#"><Facebook className="w-5 h-5 hover:text-blue-600" /></Link>
              <Link href="#"><Twitter className="w-5 h-5 hover:text-blue-500" /></Link>
              <Link href="#"><Instagram className="w-5 h-5 hover:text-pink-500" /></Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="text-center text-sm py-4 border-t bg-white">
        © {new Date().getFullYear()} Ecomerec. All rights reserved.
      </div>
    </footer>
  )
}
