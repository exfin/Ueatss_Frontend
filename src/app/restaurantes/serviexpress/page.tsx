"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import FoodCard from "../../components/FoodCard";
import Footer from "@/app/components/Footer";


type Food = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
};

export default function Page() {
  const [foods, setFoods] = useState<Food[]>([]); 

   

  useEffect(() => {
    async function fetchFoods() {
      try {
        const res = await fetch(`/api/restaurants/serviexpress`);
        const data: Food[] = await res.json(); 
        setFoods(data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    }

    fetchFoods();
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col p-6">
          <h1 className="text-2xl font-bold mb-6">Menu</h1>
          <div className="flex justify-around flex-wrap p-6 gap-4" >
            {foods.length > 0 ? (
              foods.map((food) => (
                <FoodCard key={food.id} name={food.name} description={food.description} image={food.image} price={food.price} />
              ))
            ) : (
              <p className="text-gray-500">No food items available</p>
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
