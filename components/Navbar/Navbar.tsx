"use client";

import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { logoutUser } from "@/features/authSlice";
import { FiUser, FiSearch, FiMenu, FiX } from "react-icons/fi";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import CategoriesMenu from "./CategoriesMenu";
import UserMenu from "./UserMenu";
import CartIcon from "./CartIcon";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = !!user;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const categories = [
    { label: "Shirts", href: "/category/shirts" },
    { label: "Shoes", href: "/category/shoes" },
    { label: "Accessories", href: "/category/accessories" },
  ];

  const cartItemCount = 3; // Replace with your dynamic count

  const handleLogout = () => {
    dispatch(logoutUser());
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <NavLinks links={navLinks.slice(0, 2)} />
          <CategoriesMenu categories={categories} />
          <NavLinks links={navLinks.slice(2)} />
        </ul>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Search"
          >
            <FiSearch size={20} />
          </button>

          {isAuthenticated && user ? (
            <UserMenu user={user} onLogout={handleLogout} />
          ) : (
            <Link href="/auth" aria-label="Login" className="text-gray-700 hover:text-gray-900">
              <FiUser size={20} />
            </Link>
          )}

          <CartIcon count={cartItemCount} />

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <ul className="flex flex-col p-4 space-y-2 text-gray-700 font-medium">
            <NavLinks links={navLinks} onLinkClick={() => setMenuOpen(false)} />

            <li className="font-semibold pt-2">Categories</li>
            {categories.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} onClick={() => setMenuOpen(false)} className="block">
                  {label}
                </Link>
              </li>
            ))}

            {isAuthenticated && user ? (
              <>
                <li className="mt-2 px-3 py-1 text-gray-900">
                  Welcome, {user.name}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/auth" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </li>
            )}

            <li>
              <Link href="/cart" onClick={() => setMenuOpen(false)}>
                Cart ({cartItemCount})
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Search bar */}
      {searchOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b shadow-md p-4 z-50">
          <form className="max-w-3xl mx-auto flex">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}
