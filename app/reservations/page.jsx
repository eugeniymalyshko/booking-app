"use client";
import { useState, useEffect } from "react";
import styles from "./reservations.module.scss";
import Link from "next/link";
import { getTodayDate } from "@/helpers/getTodayDate";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getTodayDate);
  const [loading, setLoading] = useState(false);

  // Simple useEffect that runs when component mounts and when date changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/reservations?date=${selectedDate}`);
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
        } else {
          setReservations([]);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setReservations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "Не вказано";
    const date = new Date(timeString);
    return date.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={styles.reservations}>
      <div className={styles.reservations__header}>
        <h1>Резерви</h1>
        <div className={styles.reservations__datePicker}>
          <label htmlFor="date">Оберіть дату:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            className={styles.reservations__dateInput}
          />
        </div>
        <Link href="/map" className={styles.reservations__backLink}>
          ← Назад до карти
        </Link>
      </div>

      <div className={styles.reservations__content}>
        {loading ? (
          <div className={styles.reservations__loading}>
            Завантаження резервів...
          </div>
        ) : reservations.length === 0 ? (
          <div className={styles.reservations__empty}>
            <p>На {formatDate(selectedDate)} резервів не знайдено</p>
          </div>
        ) : (
          <div className={styles.reservations__list}>
            {reservations.map((reservation) => (
              <div key={reservation.id} className={styles.reservations__item}>
                <div className={styles.reservations__itemHeader}>
                  <h3>Резерв #{reservation.id}</h3>
                  <span
                    className={`${styles.reservations__status} ${
                      styles[
                        `reservations__status_${reservation.status
                          .toLowerCase()
                          .replace(/\s+/g, "_")}`
                      ]
                    }`}
                  >
                    {reservation.status}
                  </span>
                </div>

                <div className={styles.reservations__itemDetails}>
                  <div className={styles.reservations__detail}>
                    <strong>Ім&apos;я:</strong> {reservation.name}
                  </div>
                  <div className={styles.reservations__detail}>
                    <strong>Телефон:</strong> {reservation.phone}
                  </div>
                  <div className={styles.reservations__detail}>
                    <strong>Час початку:</strong>{" "}
                    {formatTime(reservation.startAt)}
                  </div>
                  {reservation.endAt && (
                    <div className={styles.reservations__detail}>
                      <strong>Час закінчення:</strong>{" "}
                      {formatTime(reservation.endAt)}
                    </div>
                  )}
                  {reservation.durationMin && (
                    <div className={styles.reservations__detail}>
                      <strong>Тривалість:</strong> {reservation.durationMin} хв
                    </div>
                  )}
                  {reservation.tableIds && reservation.tableIds.length > 0 && (
                    <div className={styles.reservations__detail}>
                      <strong>Столи:</strong> {reservation.tableIds.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
