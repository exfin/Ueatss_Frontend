import { useState } from "react";

interface FoodCardProps {
  name: string;
  image: string;
  price: number;
  description: string;
}

export default function FoodCard({ name, image, price, description }: FoodCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log(`Añadido al carrito: ${quantity} x ${name}`);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 w-64 shadow-lg flex flex-col items-center">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-md mb-3" />
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-gray-500 text-sm mb-2">{description}</p>
      <p className="text-xl font-semibold text-green-600 mb-2">${price.toFixed(2)}</p>

      
      <input
        type="number"
        value={quantity}
        min="1"
        className="border border-gray-400 rounded-md w-16 text-center mb-3"
        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
      />

     
      <button
        onClick={handleAddToCart}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
      >
        Añadir al carrito
      </button>
    </div>
  );
}
