"use client"

import { useState } from "react"
import { Loader2, CreditCard } from "lucide-react"

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
      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded-full shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1 hover:shadow-lg"
    >
      {loading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          <span>Procesando...</span>
        </>
      ) : (
        <>
          <CreditCard size={20} className="animate-pulse" />
          <span>Reservar y Pagar</span>
        </>
      )}
    </button>
  )
}
