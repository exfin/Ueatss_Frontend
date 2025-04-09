"use client";

import { useState } from "react";

type Props = {
  restaurantId: string;
  title: string;
  price: number;
  quantity?: number;
};

export default function CheckoutButton({ restaurantId, title, price, quantity = 1 }: Props) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurantId,
        title,
        price,
        quantity,
      }),
    });

    const data = await res.json();

    if (data?.url) {
      window.location.href = data.url; // redirect to MercadoPago Checkout
    } else {
      alert("Error iniciando pago.");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
    >
      {loading ? "Cargando..." : "Reservar y Pagar"}
    </button>
  );
}
