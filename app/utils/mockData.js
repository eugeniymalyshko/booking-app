export const restaurants = [
  {
    id: 1,
    name: "Test Restaurant",
    timeZone: "Europe/Kyiv",
    defaultTurnoverMinutes: 5,
  },
];

export const areas = [
  {
    id: 1,
    restaurantId: 1,
    name: "Основний зал",
  },
  {
    id: 2,
    restaurantId: 1,
    name: "VIP зал",
  },
];

export const tables = [
  {
    id: 1,
    areaId: 1,
    label: "C1",
    capacity: 4,
    turnoverMinutes: null,
    isActive: true,
    positionX: 20,
    positionY: 30,
  },
  {
    id: 2,
    areaId: 1,
    label: "C2",
    capacity: 6,
    turnoverMinutes: null,
    isActive: true,
    positionX: 50,
    positionY: 40,
  },
  {
    id: 3,
    areaId: 1,
    label: "C3",
    capacity: 2,
    turnoverMinutes: null,
    iaActive: true,
    positionX: 70,
    positionY: 20,
  },
  {
    id: 4,
    areaId: 1,
    label: "C4",
    capacity: 8,
    turnoverMinutes: null,
    iaActive: true,
    positionX: 80,
    positionY: 60,
  },
  {
    id: 5,
    label: "C5",
    capacity: 10,
    areaId: 1,
    turnoverMinutes: null,
    isActive: true,
    positionX: 30,
    positionY: 80,
  },
  {
    id: 6,
    label: "C6",
    capacity: 12,
    areaId: 2,
    turnoverMinutes: null,
    positionX: 60,
    positionY: 50,
  },
];

export const reservations = [
  {
    id: 1,
    restaurantId: 1,
    customerId: 1,
    status: "Підтверджений",
    startsAt: new Date("2025-08-12T16:00:00Z"),
    endsAt: new Date("22025-08-12T18:00:00Z"),
    numGuests: 4,
    source: "phone",
    notes: null,
  },
  {
    id: 2,
    restaurantId: 1,
    customerId: 2,
    status: "Очікує підтвердження",
    startsAt: new Date("2025-08-12T19:00:00Z"),
    endsAt: new Date("2025-08-12T20:00:00Z"),
    numGuests: 2,
    source: "phone",
    notes: null,
  },
];
export const customers = [
  {
    id: 1,
    restaurantId: 1,
    fullName: "Іван Петренко",
    phone: "+380501234567",
  },
  {
    id: 2,
    restaurantId: 1,
    fullName: "Марія Коваль",
    phone: "+380501112244",
  },
];

export const reservationTables = [
  {
    reservationId: 1,
    tableId: 1,
  },
  {
    reservationId: 1,
    tableId: 2,
  },
  {
    reservationId: 2,
    tableId: 3,
  },
];
