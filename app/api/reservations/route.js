import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const table = searchParams.get("table");
  const reservations = await prisma.reservation.findMany();

  return NextResponse.json(reservations);
}
