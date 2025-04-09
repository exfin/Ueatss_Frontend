"use client"
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { RootCartState } from "../../../redux/store";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../../../redux/cart.slice";
import CheckoutButton from "../components/CheckoutButton"; // Import the component

export default function page() {
    const cart = useSelector((state: RootCartState) => state.cart);
    const dispatch = useDispatch();

    const getTotalPrice = () => {
        return cart.reduce(
          (accumulator, item) => accumulator + item.quantity * item.price,
          0
        );
    };

    return (
        <div>
            <Header></Header>
            <div className="min-h-screen p-8 text-center">
                {cart.length === 0 ? (
                    <h1>Your Cart is Empty!</h1>
                ) : (
                    <>
                        <div className="mt-8 flex justify-between">
                            <div className="flex-1 text-center text-base font-bold pb-2 uppercase border-b-2 border-black mb-8">Imagen</div>
                            <div className="flex-1 text-center text-base font-bold pb-2 uppercase border-b-2 border-black mb-8">Producto</div>
                            <div className="flex-1 text-center text-base font-bold pb-2 uppercase border-b-2 border-black mb-8">Precio</div>
                            <div className="flex-1 text-center text-base font-bold pb-2 uppercase border-b-2 border-black mb-8">Cantidad</div>
                            <div className="flex-1 text-center text-base font-bold pb-2 uppercase border-b-2 border-black mb-8">Acciones</div>
                            <div className="flex-1 text-center text-base font-bold pb-2 uppercase border-b-2 border-black mb-8">Precio total</div>
                        </div>
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-center mb-4">
                                <div className="w-[100px]">
                                    <img src={item.image} alt={item.name}></img>
                                </div>
                                <p>{item.name}</p>
                                <p>$ {item.price}</p>
                                <p>{item.quantity}</p>
                                <div>
                                    <button className="w-[25px] h-[30px] bg-green-500 text-white border-none m-2 text-base" 
                                        onClick={() => dispatch(incrementQuantity(item.id))}>
                                        +
                                    </button>
                                    <button className="w-[25px] h-[30px] bg-white text-black border-none m-2 text-base" 
                                        onClick={() => dispatch(decrementQuantity(item.id))}>
                                        -
                                    </button>
                                    <button className="w-[25px] h-[30px] bg-red-600 text-white border-none m-2 text-base" 
                                        onClick={() => dispatch(removeFromCart(item.id))}>
                                        x
                                    </button>
                                </div>
                                <p>$ {item.quantity * item.price}</p>
                            </div>
                        ))}
                        <h2>Total Compra: $ {getTotalPrice()}</h2>
                        {/* Add the CheckoutButton component here */}
                        <CheckoutButton 
                            restaurantId="123" 
                            title="Order Summary" 
                            price={getTotalPrice()} 
                        />
                    </>
                )}
            </div>
            <Footer></Footer>
        </div>
    );
}
