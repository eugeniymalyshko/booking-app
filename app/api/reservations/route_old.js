import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { overlaps } from "@/helpers/overlap";

function bad(msg) {
  return NextResponse.json({ error: msg }, { status: 400 });
}
function conflict(msg) {
  return NextResponse.json({ error: msg }, { status: 409 });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const restaurantId = Number(searchParams.get("restaurantId") || 1);
  const dateISO = searchParams.get("date");

  try {
    let whereClause = {
      restaurantId: restaurantId,
    };

    if (dateISO) {
      const startOfDay = new Date(dateISO + "T00:00:00.000Z");
      const endOfDay = new Date(dateISO + "T23:59:59.999Z");

      whereClause.startAt = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    const reservations = await prisma.reservation.findMany({
      where: whereClause,
      include: {
        reservationTables: {
          include: {
            table: true,
          },
        },
      },
    });

    // Transform the data to match the expected format
    const transformedReservations = reservations.map((reservation) => ({
      ...reservation,
      tableIds: reservation.reservationTables.map((rt) => rt.tableId),
    }));

    return NextResponse.json(transformedReservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { restaurantId, name, phone, tableIds } = body;

    if (!restaurantId || !name || !phone || !tableIds) {
      return NextResponse.json(
        { error: "Заповніть всі поля" },
        { status: 400 }
      );
    }

    const newReservation = await prisma.reservation.create({
      data: {
        restaurantId,
        name,
        tableIds,
      },
    });
    console.log(newReservation);
  } catch (error) {
    return NextResponse.json({ error: "Помилка запиту" }, { status: 401 });
  }
}

// export async function POST(request) {
//   const payload = await request.json();
//   const {
//     restaurantId,
//     name,
//     phone,
//     startAt,
//     endAt,
//     tableIds = [],
//   } = payload || {};

//   if (!restaurantId) return bad("Restaurant Id обов'язковий");
//   if (!name) return bad("name обов'язкове");
//   if (!startAt) return bad("startAt обов'язковий");
//   if (endAt && new Date(endAt) <= new Date(startAt))
//     return bad("endAt має бути після startAt");

//   try {
//     // Check for conflicts
//     const existingReservations = await prisma.reservation.findMany({
//       where: {
//         restaurantId: restaurantId,
//       },
//       include: {
//         reservationTables: true,
//       },
//     });

//     for (const reservation of existingReservations) {
//       const existingTableIds = reservation.reservationTables.map(
//         (rt) => rt.tableId
//       );
//       if (existingTableIds.some((id) => tableIds.includes(id))) {
//         if (overlaps(startAt, endAt, reservation.startAt, reservation.endAt)) {
//           return conflict("Час уже зайнято для вибраних столів");
//         }
//       }
//     }

//     // Create the reservation
//     const newReservation = await prisma.reservation.create({
//       data: {
//         restaurantId,
//         name,
//         phone,
//         startAt: new Date(startAt),
//         endAt: endAt ? new Date(endAt) : null,
//         status: "Очікує підтвердження",
//         durationMin: endAt
//           ? Math.round(
//               (new Date(endAt).getTime() - new Date(startAt).getTime()) /
//                 (1000 * 60)
//             )
//           : 120,
//       },
//     });

//     // Create table relationships
//     if (tableIds.length > 0) {
//       await Promise.all(
//         tableIds.map((tableId) =>
//           prisma.reservationTable.create({
//             data: {
//               reservationId: newReservation.id,
//               tableId: tableId,
//             },
//           })
//         )
//       );
//     }

//     // Fetch the complete reservation with table relationships
//     const completeReservation = await prisma.reservation.findUnique({
//       where: { id: newReservation.id },
//       include: {
//         reservationTables: {
//           include: {
//             table: true,
//           },
//         },
//       },
//     });

//     const transformedReservation = {
//       ...completeReservation,
//       tableIds: completeReservation.reservationTables.map((rt) => rt.tableId),
//     };

//     return NextResponse.json(transformedReservation, { status: 201 });
//   } catch (error) {
//     console.error("Error creating reservation:", error);
//     return NextResponse.json(
//       { error: "Failed to create reservation" },
//       { status: 500 }
//     );
//   }
// }
