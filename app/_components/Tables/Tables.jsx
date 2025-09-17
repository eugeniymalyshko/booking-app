"use client";
import React, { useEffect, useState } from "react";
import { useLongPress } from "@/app/lib/hooks/useLongPress";
import { getTodayDate } from "@/helpers/getTodayDate";
import { overlaps, endWithDesired } from "@/helpers/overlap";
import Modal from "@/app/_components/Modal/Modal";
import Form from "@/app/_components/Form/Form";
import styles from "./Tables.module.scss";
import BookingForm from "../BookingForm/BookingForm";

export default function Tables({
  selectedDate,
  startAt: initialStartAt,
  durationMin = 120,
  reservations,
}) {
  const [tables, setTables] = useState([]);

  const [openId, setOpenId] = useState(null);
  const [busy, setBusy] = useState(new Set());
  // Set default startAt to current date/time if not provided
  const [startAt, setStartAt] = useState(() => {
    if (initialStartAt) return initialStartAt;
    // Default to current date/time rounded to nearest hour
    const now = new Date();
    now.setMinutes(0, 0, 0);
    return now.toISOString();
  });

  // GET all tables
  useEffect(() => {
    fetch(`/api/tables`)
      .then((result) => result.json())
      .then(setTables);
  }, []);
  // GET busy tables based on startAt and durationMin
  useEffect(() => {
    if (!startAt) return;

    const query = new URLSearchParams({ startAt, durationMin });

    fetch(`/api/availability?${query}`)
      .then((req) => req.json())
      .then((data) => setBusy(new Set(data.busyTableIds)))
      .catch((error) => {
        console.error("Error fetching availability:", error);
        setBusy(new Set());
      });
  }, [startAt, durationMin]);

  // Keep the selectedDate in sync with the datetime picker (date part only)
  //   useEffect(() => {
  //     if (startAt) setSelectedDate(startAt.slice(0, 10));
  //   }, [startAt]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(`/api/reservations?date=${selectedDate}`);
  //         if (response.ok) {
  //           const data = await response.json();
  //           setReservations(data);
  //         } else {
  //           setReservations([]);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching reservations:", error);
  //         setReservations([]);
  //       } finally {
  //         // loader logic here
  //       }
  //     };

  //     fetchData();
  //   }, [selectedDate]);

  const handleDateTimeChange = (e) => {
    setStartAt(e.target.value);
    setSelectedDate(e.target.value.slice(0, 10)); // Sync date with datetime picker
  };

  const bindLongPress = useLongPress(600);

  const getCurrentReservationForTable = (tableId) => {
    if (!startAt || !Array.isArray(reservations) || reservations.length === 0)
      return null;
    const desiredMs = durationMin * 60 * 1000;
    const desiredEnd = new Date(
      new Date(startAt).getTime() + desiredMs
    ).toISOString();
    for (const r of reservations) {
      if (!Array.isArray(r.tableIds) || !r.tableIds.includes(tableId)) continue;
      const rEnd = endWithDesired(r.startAt, r.endAt, desiredMs);
      if (overlaps(startAt, desiredEnd, r.startAt, rEnd)) return r;
    }
    return null;
  };

  const formatTime = (iso) =>
    new Date(iso).toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className={styles.tables} onClick={() => setOpenId(null)}>
      {/* Date/Time Picker */}
      <div className={styles.tables__datetime}>
        <input type="datetime-local" />
        <label htmlFor="datetime">Перевірити доступність на:</label>
        <input
          type="datetime-local"
          id="datetime"
          value={startAt.slice(0, 16)}
          onChange={handleDateTimeChange}
          className={styles.tables__datetime_input}
        />
      </div>

      {tables.map((table) => {
        const handlers = bindLongPress(
          () => setOpenId((id) => (id === table.id ? null : table.id))
          // () => тут буде логіка для довгого натискання
        );

        const left = `${table.positionX}%`;
        const top = `${table.positionY}%`;
        const isSelected = openId === table.id;
        const currentReservation = getCurrentReservationForTable(table.id);

        //   const isTableDisabled = !table.isActive;
        return (
          <div
            key={table.id}
            {...handlers}
            style={{ top, left }}
            className={`${styles.tables__table} ${
              busy.has(table.id) ? styles["tables__table_booked"] : ""
            }
				`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span>{table.label}</span>
            <span> — {busy.has(table.id) ? " (зайнято)" : " (вільно)"}</span>
            {isSelected && currentReservation && (
              <div
                className={`${styles.tables__notiffication} ${styles["_active"]}`}
              >
                <span className={styles.table_number}>{table.label}</span>
                <span>Ім&apos;я гостя: {currentReservation.name}</span>
                <span>Телефон: {currentReservation.phone || "—"}</span>
                <span>
                  Час: {formatTime(currentReservation.startAt)}
                  {currentReservation.endAt
                    ? `–${formatTime(currentReservation.endAt)}`
                    : ""}
                </span>
              </div>
            )}
            {isSelected && !currentReservation && (
              <Modal>
                <Form>form</Form>
              </Modal>
            )}
          </div>
        );
      })}
    </div>
  );
}
