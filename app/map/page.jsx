"use client";
import Aside from "@/app/_components/Aside/Aside";
import Tables from "@/app/_components/Tables/Tables";
import styles from "./map.module.scss";
import { useState } from "react";
import BookingForm from "../_components/BookingForm/BookingForm";
import { getTodayDate } from "@/helpers/getTodayDate";

export default function Map() {
  const [selectedDate, setSelectedDate] = useState(new Date());
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
          <Tables selectedDate={selectedDate} isFormOpen={isFormOpen} />
        </div>
        <div>test</div>
      </div>
      <Aside handleOpenForm={handleOpenForm} />
    </div>
  );
}
