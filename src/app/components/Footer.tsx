export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-8 border-t border-emerald-600/30">
      <div className="container mx-auto px-4">
        <p className="text-center text-white opacity-90 hover:opacity-100 transition-opacity duration-300">
          &copy; {new Date().getFullYear()} - EIA todos los derechos reservados
        </p>
      </div>
    </footer>
  )
}
