"use client"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useSelector, useDispatch } from "react-redux"
import type { RootCartState } from "../../../redux/store"
import { decrementQuantity, incrementQuantity, removeFromCart } from "../../../redux/cart.slice"
import CheckoutButton from "../components/CheckoutButton"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

export default function Page() {
    const cart = useSelector((state: RootCartState) => state.cart)
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const getTotalPrice = () => {
        return cart.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)
    }

    return (
        <div className="flex flex-col min-h-screen bg-emerald-50">
        <Header />
        <main
            className={`flex-grow container mx-auto px-4 py-8 md:py-12 transition-opacity duration-700 ease-in-out ${
            isLoaded ? "opacity-100" : "opacity-0"
            }`}
        >
            <h1 className="text-3xl font-bold text-center mb-8 text-emerald-800 relative">
            Tu Canasta
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-emerald-500 rounded-full"></span>
            </h1>

            {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-xl shadow-lg border border-emerald-100 transform transition-all duration-500 hover:scale-[1.01]">
                <div className="relative">
                <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-30"></div>
                <ShoppingCart size={64} className="text-emerald-400 relative z-10 mb-4" />
                </div>
                <h2 className="text-2xl font-semibold text-emerald-800 mb-2">¡Tu Canasta está Vacía!</h2>
                <p className="text-emerald-600 mb-6">Agrega algunos productos deliciosos para comenzar</p>
                <a
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                Explorar Restaurantes
                </a>
            </div>
            ) : (
            <div className="bg-white rounded-xl shadow-lg border border-emerald-100 p-6 transform transition-all duration-500 hover:shadow-xl">
                {/* Header de la tabla - visible solo en pantallas medianas y grandes */}
                <div className="hidden md:flex justify-between border-b border-emerald-100 pb-4 mb-6">
                <div className="w-1/6 text-center font-semibold text-emerald-700">Imagen</div>
                <div className="w-1/6 text-center font-semibold text-emerald-700">Producto</div>
                <div className="w-1/6 text-center font-semibold text-emerald-700">Precio</div>
                <div className="w-1/6 text-center font-semibold text-emerald-700">Cantidad</div>
                <div className="w-1/6 text-center font-semibold text-emerald-700">Acciones</div>
                <div className="w-1/6 text-center font-semibold text-emerald-700">Total</div>
                </div>

                {/* Items del carrito */}
                <div className="space-y-6">
                {cart.map((item, index) => (
                    <div
                    key={item.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-emerald-100 pb-6 transform transition-all duration-500 hover:bg-emerald-50 hover:rounded-lg hover:shadow-sm p-2"
                    style={{
                        animationDelay: `${index * 100}ms`,
                        animation: isLoaded ? "fadeInUp 0.5s ease-out forwards" : "none",
                    }}
                    >
                    {/* Versión móvil - diseño en columnas */}
                    <div className="md:hidden grid grid-cols-2 gap-4 mb-4 w-full">
                        <div className="col-span-1">
                        <div className="aspect-square w-full max-w-[120px] mx-auto rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105">
                            <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            />
                        </div>
                        </div>
                        <div className="col-span-1 flex flex-col justify-center">
                        <h3 className="font-medium text-emerald-800">{item.name}</h3>
                        <p className="text-emerald-600 font-semibold mt-1">${item.price}</p>
                        <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-emerald-200 rounded-full overflow-hidden">
                            <button
                                className="p-1 hover:bg-emerald-100 transition-colors duration-300"
                                onClick={() => dispatch(decrementQuantity(item.id))}
                            >
                                <Minus size={16} className="text-emerald-700" />
                            </button>
                            <span className="px-3 text-emerald-800">{item.quantity}</span>
                            <button
                                className="p-1 hover:bg-emerald-100 transition-colors duration-300"
                                onClick={() => dispatch(incrementQuantity(item.id))}
                            >
                                <Plus size={16} className="text-emerald-700" />
                            </button>
                            </div>
                            <button
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-300"
                            onClick={() => dispatch(removeFromCart(item.id))}
                            >
                            <Trash2 size={18} />
                            </button>
                        </div>
                        <p className="mt-3 text-right font-semibold text-emerald-700">
                            Total: ${item.quantity * item.price}
                        </p>
                        </div>
                    </div>

                    {/* Versión desktop - diseño en fila */}
                    <div className="hidden md:block w-1/6">
                        <div className="w-20 h-20 mx-auto rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-110">
                        <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                        </div>
                    </div>
                    <div className="hidden md:block w-1/6 text-center">
                        <p className="font-medium text-emerald-800">{item.name}</p>
                    </div>
                    <div className="hidden md:block w-1/6 text-center">
                        <p className="text-emerald-600 font-semibold">${item.price}</p>
                    </div>
                    <div className="hidden md:block w-1/6 text-center">
                        <p className="text-emerald-800">{item.quantity}</p>
                    </div>
                    <div className="hidden md:flex w-1/6 justify-center space-x-1">
                        <button
                        className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-sm transition-all duration-300 hover:shadow-md hover:scale-110"
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        >
                        <Plus size={16} />
                        </button>
                        <button
                        className="w-8 h-8 flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-full shadow-sm transition-all duration-300 hover:shadow-md hover:scale-110"
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        >
                        <Minus size={16} />
                        </button>
                        <button
                        className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full shadow-sm transition-all duration-300 hover:shadow-md hover:scale-110"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        >
                        <Trash2 size={16} />
                        </button>
                    </div>
                    <div className="hidden md:block w-1/6 text-center">
                        <p className="font-semibold text-emerald-700">${item.quantity * item.price}</p>
                    </div>
                    </div>
                ))}
                </div>

                {/* Resumen y checkout */}
                <div className="mt-8 border-t border-emerald-100 pt-6">
                <div className="flex flex-col items-end">
                    <div className="bg-emerald-50 p-6 rounded-xl shadow-sm border border-emerald-100 w-full md:w-80 transform transition-all duration-500 hover:shadow-md">
                    <h2 className="text-xl font-bold text-emerald-800 mb-4">Resumen</h2>
                    <div className="flex justify-between mb-2">
                        <span className="text-emerald-700">Subtotal:</span>
                        <span className="font-medium text-emerald-800">${getTotalPrice()}</span>
                    </div>
                    <div className="border-t border-emerald-200 my-3 pt-3">
                        <div className="flex justify-between text-lg font-bold">
                        <span className="text-emerald-800">Total:</span>
                        <span className="text-emerald-600">${getTotalPrice()}</span>
                        </div>
                    </div>
                    </div>

                    <div className="mt-6 w-full md:w-80 transform transition-all duration-500 hover:scale-105">
                    <CheckoutButton restaurantId="123" title="Finalizar Compra" price={getTotalPrice()} />
                    </div>
                </div>
                </div>
            </div>
            )}
        </main>
        <Footer />

        <style jsx global>{`
            @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
            }
        `}</style>
        </div>
    )
}
