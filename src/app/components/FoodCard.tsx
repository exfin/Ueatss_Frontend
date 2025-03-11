import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cart.slice";

interface Food {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

interface FoodCardProps {
  product: Food;
}

export default function FoodCard({ product }: FoodCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert(`${product.name} ha sido añadido al carrito!`);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 w-64 shadow-lg flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-gray-500 text-sm mb-2">{product.description}</p>
      <p className="text-xl font-semibold text-green-600 mb-2">${product.price}</p>

      <button
        onClick={handleAddToCart}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
      >
        Añadir al carrito
      </button>
    </div>
  );
}
