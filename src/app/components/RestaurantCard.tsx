import Link from "next/link";

interface Restaurant {
    id: string;
    name: string;
    description: string;
    image: string;
    address: string;
}

interface RestaurantCardProps{
    restaurant: Restaurant;
}



export default function RestaurantCard({restaurant}: RestaurantCardProps){
    return(

        <div className="w-2/3 md:w-2/5 h-[400] aspect-square bg-gray-100 flex flex-col items-center justify-between p-4 border-2 border-black rounded-lg shadow-lg">
            <img src={restaurant.image} 
            alt={restaurant.name} className="w-2/3 h-auto rounded-md" />
            <h2 className="text-lg font-semibold">{restaurant.name}</h2>
            <Link href={`/restaurantes/${restaurant.id}`}>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                Menu
            </button>
            </Link>
        </div>


    );
}