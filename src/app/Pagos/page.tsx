"use client"

import { useState } from "react"
import { Button } from "..//components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "..//components/ui/card"
import { ShoppingCart, CreditCard } from "lucide-react"

interface CheckoutRequest {
  restaurantId: string
  title: string
  price: number
  quantity: number
}

export default function HomePage() {
  const [checkoutData] = useState<CheckoutRequest>({
    restaurantId: "rest_123",
    title: "Salchipapas",
    price: 14,
    quantity: 1,
  })

  const totalPrice = checkoutData.price * checkoutData.quantity

  const handlePayment = () => {
    // Convertir los datos a query params
    const params = new URLSearchParams({
      restaurantId: checkoutData.restaurantId,
      title: checkoutData.title,
      price: checkoutData.price.toString(),
      quantity: checkoutData.quantity.toString(),
      total: totalPrice.toString(),
    })

    window.location.href = `/payment?${params.toString()}`
  }

  return (
    <div className="min-h-screen ueats-bg p-4">
      <div className="max-w-md mx-auto pt-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold ueats-text">UEATS</CardTitle>
            <CardDescription>Completa tu compra de forma segura</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <img
                src="/placeholder.svg?height=80&width=80"
                alt={checkoutData.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{checkoutData.title}</h3>
                <p className="text-sm text-gray-600">Cantidad: {checkoutData.quantity}</p>
                <p className="text-lg font-bold text-green-600">${checkoutData.price}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>
                  ${checkoutData.price} x {checkoutData.quantity}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Envío:</span>
                <span className="text-green-600">Gratis</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-green-600">${totalPrice}</span>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              className="w-full ueats-primary hover:ueats-primary-hover text-white py-3 text-lg font-semibold"
              size="lg"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Reservar y Pagar
            </Button>

            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <ShoppingCart className="w-4 h-4" />
              <span>Compra 100% segura y protegida</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
