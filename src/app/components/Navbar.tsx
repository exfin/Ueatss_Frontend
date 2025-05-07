"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ShoppingCart, User, Home } from "lucide-react"
import NavButtons from "./buttons/NavButtons"
import { useSelector } from "react-redux"
import type { RootCartState } from "../../../redux/store"

const NavLinks = () => {
  const cart = useSelector((state: RootCartState) => state.cart)
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      <Link
        href="/"
        className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-white hover:text-emerald-100 transition-colors duration-200 group"
      >
        <Home size={18} className="mr-1" />
        <span>Inicio</span>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </Link>
      <Link
        href="/restaurantes"
        className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-white hover:text-emerald-100 transition-colors duration-200 group"
      >
        <span>Restaurantes</span>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </Link>
      <Link
        href="/canasta"
        className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-white hover:text-emerald-100 transition-colors duration-200 group"
      >
        <ShoppingCart size={18} className="mr-1" />
        <span>Canasta</span>
        {cartItemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-emerald-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {cartItemCount}
          </span>
        )}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </Link>
      <Link
        href="/perfil"
        className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-white hover:text-emerald-100 transition-colors duration-200 group"
      >
        <User size={18} className="mr-1" />
        <span>Cuenta</span>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
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
        <NavLinks />
        <NavButtons />
      </div>

      {/* Mobile Navigation Button */}
      <div className="md:hidden">
        <button
          className="text-white hover:text-emerald-100 focus:outline-none transition-colors duration-300"
          onClick={toggleNavbar}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg p-4 md:hidden border-t border-emerald-600/30 animate-slide-in">
          <div className="flex flex-col space-y-3">
            <NavLinks />
            <div className="pt-3 border-t border-emerald-400/30">
              <NavButtons />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
