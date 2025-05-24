import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: { foods: true },
    });
    return NextResponse.json(restaurants);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, image, address } = body;

    if (!name || !address) {
      return NextResponse.json(
        { error: "Name and address are required" },
        { status: 400 }
      );
    }

    const newRestaurant = await prisma.restaurant.create({
      data: { name, description, image, address },
    });

    return NextResponse.json(newRestaurant, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create restaurant" },
      { status: 500 }
    );
  }
}