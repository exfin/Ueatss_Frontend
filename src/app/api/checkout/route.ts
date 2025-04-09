// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import mercadopago from "mercadopago";

// Define the function to fetch the restaurant's token
async function getRestaurantToken(restaurantId: string): Promise<string> {
    const tokens = {
        "123": "YOUR_MERCADOPAGO_ACCESS_TOKEN_FOR_RESTAURANT_123",
        "456": "YOUR_MERCADOPAGO_ACCESS_TOKEN_FOR_RESTAURANT_456",
    };

    const token = tokens[restaurantId];
    if (!token) {
        throw new Error(`No access token found for restaurantId: ${restaurantId}`);
    }

    return token;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { restaurantId, title, price, quantity } = body;

        // Fetch the restaurant's MercadoPago access token
        const restaurantToken = await getRestaurantToken(restaurantId);

        // Configure the MercadoPago SDK
        mercadopago.configure({
            access_token: restaurantToken,
        });

        // Create a preference for the payment
        const preference = {
            items: [
                {
                    title,
                    unit_price: price,
                    quantity,
                },
            ],
            back_urls: {
                success: "http://localhost:3000/success",
                failure: "http://localhost:3000/failure",
                pending: "http://localhost:3000/pending",
            },
            auto_return: "approved",
        };

        const response = await mercadopago.preferences.create(preference);

        return NextResponse.json({ url: response.body.init_point });
    } catch (error) {
        console.error("Error creating MercadoPago preference:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
