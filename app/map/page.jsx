"use client";
import Aside from "@/app/_components/Aside/Aside";
import Tables from "@/app/_components/Tables/Tables";
import styles from "./map.module.scss";
import { useEffect, useState } from "react";
import BookingForm from "@/app/_components/BookingForm/BookingForm";
import { toKyivTime, formatOnlyDate, formatOnlyTime } from "@/helpers/date";

export default function Map() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleOpenForm() {
    setIsFormOpen((open) => !open);
  }

  function handleDateIncrease() {
    setSelectedDate((currentDate) => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + 1);
      return date;
    });
  }
  function handleDateDecrease() {
    setSelectedDate((currentDate) => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - 1);
      return date;
    });
  }

  // GET all reservations
  useEffect(() => {
    fetch("/api/reservations")
      .then((result) => result.json())
      .then(setReservations);
  }, []);

  return (
    <div className={styles.map}>
      {isFormOpen && <BookingForm handleOpenForm={handleOpenForm} />}
      <div className={styles.map__body}>
        <div className={styles.map__controls}>
          <button className={styles.map__button} onClick={handleDateDecrease}>
            &lsaquo;
          </button>
          <div className={styles.map__calendar}>
            {selectedDate.toLocaleDateString("uk", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              weekday: "short",
            })}
          </div>
          <button className={styles.map__button} onClick={handleDateIncrease}>
            &rsaquo;
          </button>
        </div>
        <div className={styles.map__content}>
          <Tables
            selectedDate={selectedDate}
            isFormOpen={isFormOpen}
            reservation={reservations}
          />
        </div>
        <div>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              <span>{reservation.firstName}&nbsp;</span>
              <span>{reservation.lastName}&nbsp;</span>
              <span>{reservation.tableId}&nbsp;</span>
              <span>{toKyivTime(reservation.startAt)}&nbsp;</span>
              <br />
              <span>{formatOnlyDate(reservation.startAt)}&nbsp;</span>
              <br />
              <span>{formatOnlyTime(reservation.startAt)}&nbsp;</span>
              <br />
            </li>
          ))}
        </div>
      </div>
      <Aside handleOpenForm={handleOpenForm} />
    </div>
  );
}
