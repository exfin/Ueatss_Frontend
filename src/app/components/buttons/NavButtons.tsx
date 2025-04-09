'use client';

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function NavButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-white">Checking authentication...</p>;
  }

  const user = session?.user;

  return (
    <>
      {!user && (
        <Link
          href="/api/auth/signin"
          className="relative text-white hover:text-gray-500 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
        >
          Login
        </Link>
      )}

      {user && (
        <>
          <Link
            href="/canasta"
            className="relative text-white hover:text-gray-500 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            Canasta
          </Link>
          <Link
            href="/perfil"
            className="relative text-white hover:text-gray-500 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            Cuenta
          </Link>
          <Link
            href="/api/auth/signout"
            className="relative text-white hover:text-gray-500 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            Logout
          </Link>
        </>
      )}
    </>
  );
}
