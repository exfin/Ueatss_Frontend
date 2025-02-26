import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET() {
  try {
    const foods = await prisma.food.findMany({
      where: { restaurantId: "a9ae83a5-c3dd-49f0-a6d9-70ae812e414a" },
    });
    return NextResponse.json(foods);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch foods" }, { status: 500 });
  }
}
