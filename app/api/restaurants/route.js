import { NextResponse } from "next/server";
import { readDb } from "@/app/lib/data/prisma";

export async function GET() {
  const { restaurants } = readDb();
  return NextResponse.json(restaurants);
}
