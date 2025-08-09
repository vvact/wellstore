'use client'

import { Menu, X } from 'lucide-react'

interface Props {
  open: boolean
  toggle: () => void
}

export default function MobileMenuToggle({ open, toggle }: Props) {
  return (
    <button
      className="p-1 md:hidden"
      onClick={toggle}
      aria-expanded={open}
      aria-label="Toggle menu"
    >
      {open ? <X size={20} /> : <Menu size={20} />}
    </button>
  )
}
