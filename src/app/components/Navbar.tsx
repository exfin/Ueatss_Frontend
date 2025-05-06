"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import NavButtons from "./buttons/NavButtons"

const NavLinks = () => {
  return (
    <>
      <Link
        href="/canasta"
        className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
      >
        Canasta
      </Link>
      <Link
        href="/perfil"
        className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
      >
        Cuenta
      </Link>
    </>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1">
        <NavButtons />
      </div>

      {/* Mobile Navigation Button */}
      <div className="md:hidden">
        <button className="text-gray-700 hover:text-green-600 focus:outline-none" onClick={toggleNavbar}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 md:hidden border-t border-gray-100">
          <div className="flex flex-col space-y-3">
            <NavButtons />
          </div>
        </div>
      )}
    </>
  )
}
