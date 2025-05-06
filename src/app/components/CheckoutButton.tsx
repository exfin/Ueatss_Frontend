"use client"

import { useState } from "react"
import { ShoppingCart, Loader2 } from "lucide-react"

type Props = {
  restaurantId: string
  title: string
  price: number
  quantity?: number
}

export default function CheckoutButton({ restaurantId, title, price, quantity = 1 }: Props) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurantId,
        title,
        price,
        quantity,
      }),
    })

    const data = await res.json()
    console.log("Checkout API Response:", data) // Log the response

    if (data?.url) {
      window.location.href = data.url // Redirect to MercadoPago Checkout
    } else {
      alert("Error iniciando pago.")
    }

    setLoading(false)
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md shadow-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          <span>Cargando...</span>
        </>
      ) : (
        <>
          <ShoppingCart size={20} />
          <span>Reservar y Pagar</span>
        </>
      )}
    </button>
  )
}
