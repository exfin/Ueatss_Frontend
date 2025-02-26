import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET() {
  try {
    const foods = await prisma.food.findMany({
      where: { restaurantId: "94e97b3a-34bf-4b9a-b913-3ad464bdea39" },
    });
    return NextResponse.json(foods);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch foods" }, { status: 500 });
  }
}
