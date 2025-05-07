import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";

interface RouteParams {
  params: Promise<{ restaurantId: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const resolvedParams = await params;
    const foods = await prisma.food.findMany({
      where: { restaurantId: resolvedParams.restaurantId },
    });
    return NextResponse.json(foods);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch foods" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const { name, description, image, price, category } = body;

    if (!name || !price || !image || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newFood = await prisma.food.create({
      data: {
        name,
        description,
        image,
        price: Number(price),
        category,
        restaurantId: resolvedParams.restaurantId,
      },
    });

    return NextResponse.json(newFood, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add food" },
      { status: 500 }
    );
  }
}