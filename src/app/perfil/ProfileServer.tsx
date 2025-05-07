"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { UserCircle, LogOut, LogIn } from "lucide-react"

export default function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        <div className="flex flex-col items-center gap-4 p-6">
          <div className="flex items-center gap-3">
            <UserCircle size={28} className="text-green-600" />
            <span className="text-lg font-medium text-gray-800">{session.user?.name}</span>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <LogOut size={18} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex flex-col items-center gap-4 p-6">
        <p className="text-gray-600 mb-2">Not signed in</p>
        <button
          onClick={() => signIn()}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          <LogIn size={18} />
          <span>Iniciar Sesión</span>
        </button>
      </div>
    </>
  )
}
