import Header from "./components/Header"
import Footer from "./components/Footer"
import Link from "next/link"
import { ShoppingBag, Clock, MapPin } from "lucide-react"

export default function Home() {
  return (
    <div>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">¡Bienvenido!</h1>
              <p className="text-lg text-gray-700 max-w-3xl mb-8">
                En Ueats, hacemos que tus compras sean rápidas y sencillas. Pide en línea desde la comodidad de tu hogar
                y elige la opción que más te convenga:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 w-full max-w-3xl">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <ShoppingBag className="text-green-600 h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900 mb-1">Recoge tu pedido</h3>
                    <p className="text-gray-600 text-sm">Recoge tu pedido en el establecimiento sin esperas.</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <MapPin className="text-green-600 h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900 mb-1">Recibe tu compra</h3>
                    <p className="text-gray-600 text-sm">
                      Recibe tu compra en la puerta de tu oficina, departamento o área dentro de la institución.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-8">
                Explora nuestro catálogo, selecciona tus productos y deja el resto en nuestras manos. ¡Compras fáciles,
                rápidas y sin complicaciones! 🚀
              </p>

              <p className="text-gray-700 mb-12 flex items-center justify-center">
                <Clock className="mr-2 h-5 w-5 text-green-600" />
                Haz tu pedido ahora y disfruta de la mejor experiencia de compra.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 px-4 bg-gradient-to-r from-green-50 to-green-100">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Dale un vistazo a los restaurantes disponibles
            </h1>
            <Link href="/restaurantes">
              <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-medium rounded-lg transition-colors shadow-sm">
                Restaurantes
              </button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
