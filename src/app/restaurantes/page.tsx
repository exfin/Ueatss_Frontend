"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RestaurantCard from "../components/RestaurantCard";

interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  address: string;
}


export default function page() {

    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        async function fetchRestaurants() {
        try {
            const res = await fetch("/api/restaurants");
            const data: Restaurant[] = await res.json();
            setRestaurants(data);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
        }

        fetchRestaurants();
    }, []);

    return (
        <div >
        <Header></Header>

        <div className="min-h-screen flex items-center justify-between ">
                   
        <div className="flex-1 flex flex-col md:flex-row justify-center items-center gap-y-10 md:gap-x-16">
        
        <div className="flex-1 flex flex-col md:flex-row justify-center items-center gap-10">


            {restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))
            ) : (
                <p className="text-gray-500">No restaurants available</p>
            )}
            
        </div>

        </div>




        </div>
        <Footer></Footer>
        </div>
    );
  }
  