// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import mercadopago from "mercadopago";
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextApiRequest, NextApiResponse } from 'next';


async function getRestaurantToken(restaurantId: string): Promise<string> {
    const token = process.env[MERCADOPAGO_ACCESS_TOKEN_${restaurantId}];
    if (!token) {
      throw new Error(No access token found for restaurantId: ${restaurantId});
    }
    return token;
  }

interface CheckoutRequest {
    restaurantId: string;
    title: string;
    price: number;
    quantity: number;
    // Add any other expected properties here
  }

  export async function POST(req: Request) {
    try {
        const body: CheckoutRequest = await req.json(); // Type assertion here
        const { restaurantId, title, price, quantity } = body;

        // Rest of your code remains the same...
        const restaurantToken = await getRestaurantToken(restaurantId);
        if (!restaurantToken) {
            return NextResponse.json({ error: "Restaurant token not found" }, { status: 404 });
        }
        const client = new MercadoPagoConfig({
            accessToken: restaurantToken
        });

        const preference = new Preference(client);
        const result = await preference.create({
            body: {
                items: [{
                    title, unit_price: price, quantity,
                    id: ""
                }],
                back_urls: {
                    success: "http://localhost:3000/success",
                    failure: "http://localhost:3000/failure",
                    pending: "http://localhost:3000/pending",
                },
                auto_return: "approved",
            }
        });

        return NextResponse.json({ url: result.init_point });
    } catch (error) {
        console.error("Error creating MercadoPago preference:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' }, 
            { status: 500 }
        );
    }
}