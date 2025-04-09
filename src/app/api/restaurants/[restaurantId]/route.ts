import { NextResponse } from "next/server";
import {prisma} from "../../../../../lib/prisma";

export async function GET(req: Request, { params }: { params: { restaurantId: string } }) {
  try {
    const foods = await prisma.food.findMany({
      where: { restaurantId: params.restaurantId },
    });
    return NextResponse.json(foods);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch foods" }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { restaurantId: string } }) {
    try {
      const body = await req.json();
      const { name, description, image, price, category } = body; // Añadir category
  
      if (!name || !price || !image || !category) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
  
      const newFood = await prisma.food.create({
        data: {
          name,
          description,
          image,
          price,
          category, // Agregamos la categoría
          restaurantId: params.restaurantId,
        },
      });
  
      return NextResponse.json(newFood, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to add food" }, { status: 500 });
    }
  }
  