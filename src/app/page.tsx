"use client"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Link from "next/link"
import { ShoppingBag, Clock, MapPin, ChevronRight } from "lucide-react"

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen">
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-5 z-0"></div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-6 animate-pulse-slow">
                ¡Pide comida fácilmente en el campus!
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-800 mb-6 relative animate-slide-in">
                ¡Bienvenido a UEats!
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></span>
              </h1>

              <p
                className="text-lg text-emerald-700 max-w-3xl mb-8 animate-slide-in"
                style={{ animationDelay: "0.2s" }}
              >
                En Ueats, hacemos que tus compras sean rápidas y sencillas. Pide en línea desde la comodidad de tu hogar
                y elige la opción que más te convenga:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 w-full max-w-3xl">
                <div
                  className="bg-white p-6 rounded-xl shadow-md border border-emerald-100 flex items-start transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 animate-slide-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-full mr-4">
                    <ShoppingBag className="text-white h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-emerald-800 mb-1">Recoge tu pedido</h3>
                    <p className="text-emerald-600 text-sm">Recoge tu pedido en el establecimiento sin esperas.</p>
                  </div>
                </div>

                <div
                  className="bg-white p-6 rounded-xl shadow-md border border-emerald-100 flex items-start transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 animate-slide-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-full mr-4">
                    <MapPin className="text-white h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-emerald-800 mb-1">Recibe tu compra</h3>
                    <p className="text-emerald-600 text-sm">
                      Recibe tu compra en la puerta de tu oficina, departamento o área dentro de la institución.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-emerald-700 mb-8 animate-slide-in" style={{ animationDelay: "0.5s" }}>
                Explora nuestro catálogo, selecciona tus productos y deja el resto en nuestras manos. ¡Compras fáciles,
                rápidas y sin complicaciones! 🚀
              </p>

              <p
                className="text-emerald-700 mb-12 flex items-center justify-center animate-slide-in"
                style={{ animationDelay: "0.6s" }}
              >
                <Clock className="mr-2 h-5 w-5 text-emerald-600" />
                Haz tu pedido ahora y disfruta de la mejor experiencia de compra.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-8 animate-slide-in">
              Dale un vistazo a los restaurantes disponibles
            </h1>
            <Link href="/restaurantes">
              <button className="group px-8 py-3 bg-white text-emerald-700 text-lg font-medium rounded-full transition-all duration-500 hover:shadow-lg hover:shadow-emerald-900/20 transform hover:-translate-y-1 flex items-center mx-auto">
                Restaurantes
                <ChevronRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2310b981' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  )
}
