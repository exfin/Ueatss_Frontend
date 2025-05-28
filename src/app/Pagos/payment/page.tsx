"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { CreditCard, Shield, Lock, ArrowLeft, CheckCircle } from "lucide-react"

interface CheckoutRequest {
  restaurantId: string
  title: string
  price: number
  quantity: number
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const [checkoutData, setCheckoutData] = useState<CheckoutRequest>({
    restaurantId: "",
    title: "",
    price: 0,
    quantity: 1,
  })
  const [total, setTotal] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState("mercadopago")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const restaurantId = searchParams.get("restaurantId") || ""
    const title = searchParams.get("title") || ""
    const price = Number.parseFloat(searchParams.get("price") || "0")
    const quantity = Number.parseInt(searchParams.get("quantity") || "1")
    const totalParam = Number.parseFloat(searchParams.get("total") || "0")

    setCheckoutData({
      restaurantId,
      title,
      price,
      quantity,
    })
    setTotal(totalParam)
  }, [searchParams])

  const handleMercadoPagoPayment = async () => {
    setIsProcessing(true)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      })

      const data = await response.json()

      if (data.url) {
        // Redirigir a MercadoPago
        window.location.href = data.url
      } else {
        throw new Error("No se pudo crear la preferencia de pago")
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error)
      alert("Error al procesar el pago. Intenta nuevamente.")
      setIsProcessing(false)
    }
  }

  const handleCreditCardPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simular procesamiento de pago con tarjeta
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 3000)
  }

  const goBack = () => {
    window.history.back()
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen ueats-bg p-4 flex items-center justify-center">
        <Card className="max-w-md w-full shadow-lg">
          <CardContent className="text-center p-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Pago Exitoso!</h2>
            <p className="text-gray-600 mb-4">Tu pago de ${total} ha sido procesado correctamente.</p>
            <p className="text-sm text-gray-500 mb-2">Pedido: {checkoutData.title}</p>
            <p className="text-sm text-gray-500 mb-6">Restaurante ID: {checkoutData.restaurantId}</p>
            <Button onClick={() => (window.location.href = "/")} className="w-full">
              Volver al inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen ueats-bg p-4">
      <div className="max-w-2xl mx-auto pt-4">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={goBack} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-2xl font-bold ueats-text">Pago Seguro</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Formulario de Pago */}
          <div className="md:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-green-600" />
                  Selecciona tu método de pago
                </CardTitle>
                <CardDescription>Elige cómo quieres pagar tu pedido</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Método de Pago */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Método de Pago</Label>

                  {/* MercadoPago */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                      <input
                        type="radio"
                        id="mercadopago"
                        name="paymentMethod"
                        value="mercadopago"
                        checked={paymentMethod === "mercadopago"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-green-600"
                      />
                      <Label htmlFor="mercadopago" className="flex items-center cursor-pointer flex-1">
                        <div className="w-8 h-8 bg-blue-500 rounded mr-3 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">MP</span>
                        </div>
                        <div>
                          <div className="font-medium">MercadoPago</div>
                          <div className="text-sm text-gray-500">Tarjetas, efectivo, transferencias</div>
                        </div>
                      </Label>
                    </div>

                    {paymentMethod === "mercadopago" && (
                      <div className="ml-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-3">
                          Serás redirigido a MercadoPago para completar tu pago de forma segura.
                        </p>
                        <Button
                          onClick={handleMercadoPagoPayment}
                          className="w-full ueats-primary hover:ueats-primary-hover text-white"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Procesando...
                            </>
                          ) : (
                            <>Pagar con MercadoPago - ${total}</>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Tarjeta de Crédito */}
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                    <input
                      type="radio"
                      id="credit"
                      name="paymentMethod"
                      value="credit"
                      checked={paymentMethod === "credit"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-green-600"
                    />
                    <Label htmlFor="credit" className="flex items-center cursor-pointer">
                      <CreditCard className="w-8 h-8 mr-3 text-gray-600" />
                      <div>
                        <div className="font-medium">Tarjeta de Crédito/Débito</div>
                        <div className="text-sm text-gray-500">Visa, Mastercard, American Express</div>
                      </div>
                    </Label>
                  </div>
                </div>

                {/* Formulario de Tarjeta */}
                {paymentMethod === "credit" && (
                  <form onSubmit={handleCreditCardPayment} className="space-y-4 ml-6 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required className="mt-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Vencimiento</Label>
                        <Input id="expiry" placeholder="MM/AA" required className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required className="mt-1" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                      <Input id="cardName" placeholder="Juan Pérez" required className="mt-1" />
                    </div>

                    <Button
                      type="submit"
                      className="w-full ueats-primary hover:ueats-primary-hover text-white"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Procesando...
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5 mr-2" />
                          Pagar ${total}
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Resumen de Compra */}
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Resumen de Compra</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800">{checkoutData.title}</h4>
                  <p className="text-sm text-gray-600">Cantidad: {checkoutData.quantity}</p>
                  <p className="text-sm text-gray-600">Precio unitario: ${checkoutData.price}</p>
                  <p className="text-2xl font-bold text-green-600">${total}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>
                      ${checkoutData.price} x {checkoutData.quantity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comisión:</span>
                    <span>$0.00</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-green-600">${total}</span>
                  </div>
                </div>

                <div className="p-2 bg-blue-50 rounded text-xs">
                  <p>
                    <strong>Restaurante ID:</strong> {checkoutData.restaurantId}
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mt-4">
                  <Shield className="w-4 h-4" />
                  <span>Pago 100% seguro</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
