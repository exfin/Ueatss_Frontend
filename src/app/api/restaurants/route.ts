import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: { foods: true },
    });
    return NextResponse.json(restaurants);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: 500 });
  }
}

export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { name, description, image, address } = body;
  
      const newRestaurant = await prisma.restaurant.create({
        data: { name, description, image, address },
      });
  
      return NextResponse.json(newRestaurant, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to create restaurant" }, { status: 500 });
    }
  }
  
