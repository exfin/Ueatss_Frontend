import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
    try {
      const foods = await prisma.food.findMany({
        include: { restaurant: true },
      });
      return NextResponse.json(foods);
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch foods" }, { status: 500 });
    }
  }

  
export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { name, description, price, image, category, restaurantId } = body;
  
      const newFood = await prisma.food.create({
        data: { name, description, price, image, category, restaurantId },
      });
  
      return NextResponse.json(newFood, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to create food" }, { status: 500 });
    }
  }
  