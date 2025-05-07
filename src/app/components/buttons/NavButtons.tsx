"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { LogIn, LogOut } from "lucide-react"

export default function NavButtons() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p className="text-sm text-white/70">Verificando...</p>
  }

  const user = session?.user

  return (
    <>
      {!user && (
        <>
          <button
            onClick={() => signIn()}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-600 bg-white rounded-full hover:bg-emerald-50 transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            <LogIn size={16} className="mr-1" />
            <span>Iniciar Sesión</span>
          </button>
        </>
      )}

      {user && (
        <>
          <button
            onClick={() => signOut()}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-600 bg-white rounded-full hover:bg-emerald-50 transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            <LogOut size={16} className="mr-1" />
            <span>Cerrar Sesión</span>
          </button>
        </>
      )}
    </>
  )
}
