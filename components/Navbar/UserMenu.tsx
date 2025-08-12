"use client";

import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/features/authSlice";
import { useRouter } from "next/navigation";

interface Props {
  user: { name: string };
  onLogout?: () => void;
}

export default function UserMenu({ user, onLogout }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    if (onLogout) onLogout();
    router.push("/auth");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        Welcome, {user.name}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
          <ul>
            <li>
              <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
