import { NextResponse } from "next/server"
import { MercadoPagoConfig, Preference } from "mercadopago"

async function getRestaurantToken(restaurantId: string): Promise<string> {
  const token = process.env[`MERCADOPAGO_ACCESS_TOKEN_${restaurantId}`]
  if (!token) {
    throw new Error(`No access token found for restaurantId: ${restaurantId}`)
  }
  return token
}

interface CheckoutRequest {
  restaurantId: string
  title: string
  price: number
  quantity: number
}

export async function POST(req: Request) {
  try {
    const body: CheckoutRequest = await req.json()
    const { restaurantId, title, price, quantity } = body

    const restaurantToken = await getRestaurantToken(restaurantId)
    if (!restaurantToken) {
      return NextResponse.json({ error: "Restaurant token not found" }, { status: 404 })
    }

    const client = new MercadoPagoConfig({
      accessToken: restaurantToken,
    })

    const preference = new Preference(client)
    const result = await preference.create({
      body: {
        items: [
          {
            title,
            unit_price: price,
            quantity,
            id: `${restaurantId}_${Date.now()}`,
          },
        ],
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/success`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/failure`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/pending`,
        },
        auto_return: "approved",
      },
    })

    return NextResponse.json({
      url: result.init_point,
      preference_id: result.id,
    })
  } catch (error) {
    console.error("Error creating MercadoPago preference:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
