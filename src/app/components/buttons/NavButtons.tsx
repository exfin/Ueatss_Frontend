"use client"
<<<<<<< Updated upstream

import Link from "next/link"
import { useSession } from "next-auth/react"
=======
import { signIn, signOut, useSession } from "next-auth/react"
import { LogIn, LogOut } from "lucide-react"
>>>>>>> Stashed changes

export default function NavButtons() {
  const { data: session, status } = useSession()

  if (status === "loading") {
<<<<<<< Updated upstream
    return <p className="text-sm text-gray-500">Checking authentication...</p>
=======
    return <p className="text-sm text-white/70">Verificando...</p>
>>>>>>> Stashed changes
  }

  const user = session?.user

  return (
    <>
      {!user && (
        <>
<<<<<<< Updated upstream
          <Link
            href="/api/auth/signin"
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors duration-200 group"
          >
            <span>Login</span>
            <span className="absolute inset-0 transform scale-x-0 origin-left bg-green-50 rounded-md -z-10 group-hover:scale-x-100 transition-transform duration-200"></span>
          </Link>
=======
          <button
            onClick={() => signIn()}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-600 bg-white rounded-full hover:bg-emerald-50 transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            <LogIn size={16} className="mr-1" />
            <span>Iniciar Sesión</span>
          </button>
>>>>>>> Stashed changes
        </>
      )}

      {user && (
        <>
<<<<<<< Updated upstream
          <Link
            href="/canasta"
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors duration-200 group"
          >
            <span>Canasta</span>
            <span className="absolute inset-0 transform scale-x-0 origin-left bg-green-50 rounded-md -z-10 group-hover:scale-x-100 transition-transform duration-200"></span>
          </Link>
          <Link
            href="/perfil"
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors duration-200 group"
          >
            <span>Cuenta</span>
            <span className="absolute inset-0 transform scale-x-0 origin-left bg-green-50 rounded-md -z-10 group-hover:scale-x-100 transition-transform duration-200"></span>
          </Link>
          <Link
            href="/api/auth/signout"
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors duration-200 group"
          >
            <span>Logout</span>
            <span className="absolute inset-0 transform scale-x-0 origin-left bg-green-50 rounded-md -z-10 group-hover:scale-x-100 transition-transform duration-200"></span>
          </Link>
=======
          <button
            onClick={() => signOut()}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-600 bg-white rounded-full hover:bg-emerald-50 transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            <LogOut size={16} className="mr-1" />
            <span>Cerrar Sesión</span>
          </button>
>>>>>>> Stashed changes
        </>
      )}
    </>
  )
}
