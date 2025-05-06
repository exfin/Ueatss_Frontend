"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"

export default function NavButtons() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p className="text-sm text-gray-500">Checking authentication...</p>
  }

  const user = session?.user

  return (
    <>
      {!user && (
        <>
          <Link
            href="/api/auth/signin"
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors duration-200 group"
          >
            <span>Login</span>
            <span className="absolute inset-0 transform scale-x-0 origin-left bg-green-50 rounded-md -z-10 group-hover:scale-x-100 transition-transform duration-200"></span>
          </Link>
        </>
      )}

      {user && (
        <>
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
        </>
      )}
    </>
  )
}
