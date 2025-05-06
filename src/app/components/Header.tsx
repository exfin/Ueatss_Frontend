import Link from "next/link"
import Navbar from "./Navbar"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-green-600">UEATS</span>
        </Link>
        <Navbar />
      </div>
    </header>
  )
}
