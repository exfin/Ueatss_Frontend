export default function Footer() {
    return (
      <footer className="bg-gray-50 border-t border-gray-100 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">
            &copy; {new Date().getFullYear()} - EIA todos los derechos reservados
          </p>
        </div>
      </footer>
    )
  }
  