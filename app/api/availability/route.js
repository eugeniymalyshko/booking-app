import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { overlaps, endWithDesired } from "@/helpers/overlap";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const restaurantId = Number(searchParams.get("restaurantId"));
  const startAt = searchParams.get("startAt");
  console.log("startAt from availibility: " + startAt);
  const durationMin = Number(searchParams.get("durationMin") || 120);

  if (!restaurantId || !startAt) {
    return NextResponse.json(
      { error: "restaurantId та startAt обов'язкові" },
      { status: 400 }
    );
  }

  try {
    const desiredMs = durationMin * 60 * 1000;
    const endAt = new Date(
      new Date(startAt).getTime() + desiredMs
    ).toISOString();

    // Fetch reservations with their table relationships
    const reservations = await prisma.reservation.findMany({
      where: {
        restaurantId: restaurantId,
      },
      include: {
        reservationTables: {
          include: {
            table: true,
          },
        },
      },
    });

    const busy = new Set();
    for (const r of reservations) {
      const rEnd = endWithDesired(r.startAt, r.endAt, desiredMs);
      if (overlaps(startAt, endAt, r.startAt, rEnd)) {
        r.reservationTables.forEach((rt) => busy.add(rt.tableId));
      }
    }

    // Fetch tables for this restaurant
    const tables = await prisma.table.findMany({
      where: {
        restaurantId: restaurantId,
      },
    });

    const free = tables
      .filter((table) => !busy.has(table.id))
      .map((table) => table.id);

    return NextResponse.json({
      startAt,
      endAt,
      busyTableIds: [...busy],
      freeTableIds: free,
    });
  } catch (error) {
    console.error("Error in availability API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
