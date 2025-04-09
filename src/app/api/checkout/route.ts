// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import mercadopago from "mercadopago";

export async function POST(req: Request) {
  const { restaurantId, title, price, quantity } = await req.json();

  // Fetch restaurant’s MercadoPago access token from your DB
  const restaurantToken = await getRestaurantToken(restaurantId); // <- implement this

  // Configure SDK with the restaurant’s token
  mercadopago.configure({
    access_token: restaurantToken,
  });

  const preference = {
    items: [
      {
        title,
        unit_price: price,
        quantity,
      },
    ],
    back_urls: {
      success: `${process.env.NEXT_PUBLIC_URL}/success`,
      failure: `${process.env.NEXT_PUBLIC_URL}/failure`,
      pending: `${process.env.NEXT_PUBLIC_URL}/pending`,
    },
    auto_return: "approved",
    // Optional: take a commission
    marketplace_fee: 500, // COP or local currency
  };

  const response = await mercadopago.preferences.create(preference);

  return NextResponse.json({ url: response.body.init_point });
}
