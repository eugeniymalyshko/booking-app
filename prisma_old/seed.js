const { PrismaClient } = require("../app/generated/prisma");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create restaurant
  const restaurant = await prisma.restaurant.create({
    data: {
      name: "Demo Resto",
      timeSlotsMinutes: 120,
    },
  });
  console.log("✅ Created restaurant:", restaurant.name);

  // Create areas
  const mainArea = await prisma.area.create({
    data: {
      name: "Основний зал",
      restaurantId: restaurant.id,
    },
  });

  const vipArea = await prisma.area.create({
    data: {
      name: "VIP зал",
      restaurantId: restaurant.id,
    },
  });
  console.log("✅ Created areas:", mainArea.name, "and", vipArea.name);

  // Create tables
  const tables = await Promise.all([
    prisma.table.create({
      data: {
        restaurantId: restaurant.id,
        areaId: mainArea.id,
        label: "C1",
        name: "Стіл 1",
        capacity: 4,
        isActive: true,
        positionX: 20,
        positionY: 30,
      },
    }),
    prisma.table.create({
      data: {
        restaurantId: restaurant.id,
        areaId: mainArea.id,
        label: "C2",
        name: "Стіл 2",
        capacity: 6,
        isActive: true,
        positionX: 50,
        positionY: 40,
      },
    }),
    prisma.table.create({
      data: {
        restaurantId: restaurant.id,
        areaId: mainArea.id,
        label: "C3",
        name: "Стіл 3",
        capacity: 2,
        isActive: true,
        positionX: 70,
        positionY: 20,
      },
    }),
    prisma.table.create({
      data: {
        restaurantId: restaurant.id,
        areaId: mainArea.id,
        label: "C4",
        name: "Стіл 4",
        capacity: 8,
        isActive: true,
        positionX: 80,
        positionY: 60,
      },
    }),
    prisma.table.create({
      data: {
        restaurantId: restaurant.id,
        areaId: mainArea.id,
        label: "C5",
        name: "Стіл 5",
        capacity: 10,
        isActive: true,
        positionX: 30,
        positionY: 80,
      },
    }),
    prisma.table.create({
      data: {
        restaurantId: restaurant.id,
        areaId: vipArea.id,
        label: "C6",
        name: "Стіл 6",
        capacity: 12,
        isActive: true,
        positionX: 60,
        positionY: 50,
      },
    }),
  ]);
  console.log("✅ Created", tables.length, "tables");

  // Create sample reservations
  const reservation1 = await prisma.reservation.create({
    data: {
      restaurantId: restaurant.id,
      name: "Іван",
      phone: "+380000000000",
      startAt: new Date("2025-08-17T18:00:00+03:00"),
      durationMin: 120,
      status: "Підтверджений",
    },
  });

  const reservation2 = await prisma.reservation.create({
    data: {
      restaurantId: restaurant.id,
      name: "Оля",
      phone: "+380000000002",
      startAt: new Date("2025-08-17T19:00:00+03:00"),
      endAt: new Date("2025-08-17T21:00:00+03:00"),
      status: "Очікує підтвердження",
    },
  });
  console.log("✅ Created sample reservations");

  // Link reservations to tables
  await prisma.reservationTable.create({
    data: {
      reservationId: reservation1.id,
      tableId: tables[0].id, // C1
    },
  });

  await prisma.reservationTable.create({
    data: {
      reservationId: reservation2.id,
      tableId: tables[1].id, // C2
    },
  });
  console.log("✅ Linked reservations to tables");

  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

