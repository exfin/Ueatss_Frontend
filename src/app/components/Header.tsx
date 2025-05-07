import Link from "next/link"
import Navbar from "./Navbar"

export default function Header() {
  return (
<<<<<<< Updated upstream
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-green-600">UEATS</span>
=======
    <header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-500 to-teal-600 border-b border-emerald-600/30 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold text-white relative overflow-hidden">
            UEATS
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </span>
>>>>>>> Stashed changes
        </Link>
        <Navbar />
      </div>
    </header>
  )
}
