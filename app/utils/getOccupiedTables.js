import {
  reservations,
  reservationTables,
  tables,
  restaurants,
} from "./mockData";

const ACTIVE_RESERVATION_STATUSES = [
  "Очікує підтвердження",
  "Підтверджений",
  "Сидить",
];

const minutesToMilliseconds = (minutes) => minutes * 60 * 1000;

export function getOccupiedTableIds({
  restaurantId,
  startDateTime,
  endDateTime,
}) {
  const restaurant = restaurants.find(
    (restaurant) => restaurant.id === Number(restaurantId)
  );
  const tableMapById = new Map(tables.map((table) => [table.id, table]));
  const occupiedTableIds = new Set();

  for (const reservationTable of reservationTables) {
    const reservation = reservations.find(
      (reservation) => reservation.id === reservationTable.reservationId
    );
    if (!reservation || reservation.reservationId !== restaurantId) continue;
    if (!ACTIVE_RESERVATION_STATUSES.includes(reservation.status)) continue;

    const table = tableMapById.get(reservationTable.tableId);
    console.log(table);

    if (!table || !table.isActive) continue;

    const turnoverMinutes =
      table.turnoverMinutes ?? restaurant.defaultTurnoverMinutes ?? 5;

    const effectiveStart = new Date(
      startDateTime.getTime() - minutesToMilliseconds(turnoverMinutes)
    );
    const effectiveEnd = new Date(
      endDateTime.getTime() + minutesToMilliseconds(turnoverMinutes)
    );

    const hasTimeOverlap = !(
      reservation.endsAt <= effectiveStart ||
      reservation.startsAt >= effectiveEnd
    );
    if (hasTimeOverlap) occupiedTableIds.add(reservationTable.tableId);
  }

  return new Set();
}
