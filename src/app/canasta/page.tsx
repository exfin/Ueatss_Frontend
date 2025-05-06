"use client"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useSelector, useDispatch } from "react-redux"
import type { RootCartState } from "../../../redux/store"
import { decrementQuantity, incrementQuantity, removeFromCart } from "../../../redux/cart.slice"
import CheckoutButton from "../components/CheckoutButton"
import { ShoppingCart, Plus, Minus, X } from "lucide-react"

export default function Page() {
    const cart = useSelector((state: RootCartState) => state.cart)
    const dispatch = useDispatch()

    const getTotalPrice = () => {
        return cart.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
            <h1 className="text-3xl font-bold text-center mb-8">Tu Canasta</h1>

            {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-lg shadow-sm">
                <ShoppingCart size={64} className="text-gray-300 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">¡Tu Canasta está Vacía!</h2>
                <p className="text-gray-500 mb-6">Agrega algunos productos deliciosos para comenzar</p>
                <a href="/" className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                Explorar Restaurantes
                </a>
            </div>
            ) : (
            <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Header de la tabla - visible solo en pantallas medianas y grandes */}
                <div className="hidden md:flex justify-between border-b border-gray-200 pb-4 mb-6">
                <div className="w-1/6 text-center font-semibold text-gray-600">Imagen</div>
                <div className="w-1/6 text-center font-semibold text-gray-600">Producto</div>
                <div className="w-1/6 text-center font-semibold text-gray-600">Precio</div>
                <div className="w-1/6 text-center font-semibold text-gray-600">Cantidad</div>
                <div className="w-1/6 text-center font-semibold text-gray-600">Acciones</div>
                <div className="w-1/6 text-center font-semibold text-gray-600">Total</div>
                </div>

                {/* Items del carrito */}
                <div className="space-y-6">
                {cart.map((item) => (
                    <div
                    key={item.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-6"
                    >
                    {/* Versión móvil - diseño en columnas */}
                    <div className="md:hidden grid grid-cols-2 gap-4 mb-4 w-full">
                        <div className="col-span-1">
                        <div className="aspect-square w-full max-w-[120px] mx-auto rounded-lg overflow-hidden">
                            <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            />
                        </div>
                        </div>
                        <div className="col-span-1 flex flex-col justify-center">
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-green-600 font-semibold mt-1">${item.price}</p>
                        <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border rounded-md">
                            <button
                                className="p-1 hover:bg-gray-100 rounded-l-md"
                                onClick={() => dispatch(decrementQuantity(item.id))}
                            >
                                <Minus size={16} />
                            </button>
                            <span className="px-3">{item.quantity}</span>
                            <button
                                className="p-1 hover:bg-gray-100 rounded-r-md"
                                onClick={() => dispatch(incrementQuantity(item.id))}
                            >
                                <Plus size={16} />
                            </button>
                            </div>
                            <button
                            className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                            onClick={() => dispatch(removeFromCart(item.id))}
                            >
                            <X size={18} />
                            </button>
                        </div>
                        <p className="mt-3 text-right font-semibold">Total: ${item.quantity * item.price}</p>
                        </div>
                    </div>

                    {/* Versión desktop - diseño en fila */}
                    <div className="hidden md:block w-1/6">
                        <div className="w-20 h-20 mx-auto rounded-lg overflow-hidden">
                        <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                        </div>
                    </div>
                    <div className="hidden md:block w-1/6 text-center">
                        <p className="font-medium text-gray-800">{item.name}</p>
                    </div>
                    <div className="hidden md:block w-1/6 text-center">
                        <p className="text-green-600 font-semibold">${item.price}</p>
                    </div>
                    <div className="hidden md:block w-1/6 text-center">
                        <p>{item.quantity}</p>
                    </div>
                    <div className="hidden md:flex w-1/6 justify-center space-x-1">
                        <button
                        className="w-8 h-8 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        >
                        <Plus size={16} />
                        </button>
                        <button
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        >
                        <Minus size={16} />
                        </button>
                        <button
                        className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        >
                        <X size={16} />
                        </button>
                    </div>
                    <div className="hidden md:block w-1/6 text-center">
                        <p className="font-semibold">${item.quantity * item.price}</p>
                    </div>
                    </div>
                ))}
                </div>

                {/* Resumen y checkout */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex flex-col items-end">
                    <div className="bg-gray-50 p-4 rounded-lg w-full md:w-72">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Resumen</h2>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">${getTotalPrice()}</span>
                    </div>
                    <div className="border-t border-gray-200 my-2 pt-2">
                        <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-green-600">${getTotalPrice()}</span>
                        </div>
                    </div>
                    </div>

                    <div className="mt-6 w-full md:w-72">
                    <CheckoutButton restaurantId="123" title="Finalizar Compra" price={getTotalPrice()} />
                    </div>
                </div>
                </div>
            </div>
            )}
        </main>
        <Footer />
        </div>
    )
}
