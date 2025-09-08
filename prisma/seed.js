import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.reservation.deleteMany();
  await prisma.table.deleteMany();

  await prisma.reservation.createMany({
    data: [
      {
        firstName: "Олєг",
        lastName: "Скрипка",
        tableId: 10,
        startAt: "2025-09-04T14:30:00+03:00",
      },
      {
        firstName: "Олєг",
        lastName: "Нескрипка",
        tableId: 9,
        startAt: "2025-09-04T21:30:00+03:00",
      },
      {
        firstName: "Олєг",
        lastName: "Колоскрипка",
        tableId: 8,
        startAt: "2025-09-04T21:30:00+03:00",
      },
      {
        firstName: "Олєг",
        lastName: "Біляскрипка",
        tableId: 7,
        startAt: "2025-09-04T18:30:00+03:00",
      },
      {
        firstName: "Олєг",
        lastName: "Навколоскрипка",
        tableId: 6,
        startAt: "2025-09-04T19:30:00+03:00",
      },
      {
        firstName: "Олєг",
        lastName: "Псевдоскрипка",
        tableId: 5,
        startAt: "2025-09-04T09:30:00+03:00",
      },
    ],
  });

  await prisma.table.createMany({
    data: [
      { label: "C1", capacity: 2, positionX: 20, positionY: 30 },
      { label: "C2", capacity: 4, positionX: 70, positionY: 20 },
      { label: "C3", capacity: 6, positionX: 30, positionY: 80 },
      { label: "C4", capacity: 8, positionX: 50, positionY: 40 },
      { label: "C5", capacity: 10, positionX: 80, positionY: 60 },
      { label: "C6", capacity: 12, positionX: 60, positionY: 50 },
    ],
  });
}

seed()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
