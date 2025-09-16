"use client";
import { useState } from "react";
// import { getTodayDate } from "@/helpers/getTodayDate";
import styles from "./BookingForm.module.scss";

export default function BookingForm({ handleOpenForm }) {
  const [date, setDate] = useState(getTodayDate);
  const [time, setTime] = useState("18:00");
  const [quantity, setQuantity] = useState("2");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("Чол");
  const [staff, setStaff] = useState("");
  const [text, setText] = useState("");
  const [tableId, setTableId] = useState([]);
  const [timeLimit, setTimeLimit] = useState(null);

  const restaurantId = 1;

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurantId,
        firstName,
        phone,
        //   startAt,
        //   endAt,
        tableId,
      }),
    });
  }

  return (
    <div className={styles.body}>
      <form autoComplete="on" onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form__body}>
          <div className={styles.form__column}>
            <div className={styles.form__item}>
              <div className={styles.form__content}>
                <label className={styles.form__label}>
                  Дата:
                  <input
                    type="date"
                    name="date"
                    className={styles.form__input}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </label>
                <label className={styles.form__label}>
                  Час:
                  <input
                    type="time"
                    name="time"
                    className={styles.form__input}
                    value={time}
                    step="900"
                    onChange={(e) => setTime(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className={styles.form__item}>
              <label>
                Кількість гостей:
                <input
                  type="text"
                  name="quantity"
                  placeholder="Кількість гостей"
                  value={quantity}
                  onChange={setQuantity}
                />
              </label>
            </div>
            <div className={styles.form__item}>
              <div>
                <label>
                  Телефон:
                  <input
                    type="text"
                    name="phone"
                    value={phone}
                    autoComplete="tel"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className={styles.form__item}>
              <label>
                Ім&apos;я:
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.form__item}>
              <label>
                Прізвище:
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.form__item}>
              <label>
                Номер столу:
                <input
                  type="number"
                  name="tableId"
                  value={tableId}
                  onChange={(e) => setTableId(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.form__item}>
              <div className={styles.form__content}>
                <span>Стать: </span>
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="Чол"
                    checked={sex === "Чол"}
                    onChange={(e) => setSex(e.target.value)}
                  />
                  Чол
                </label>
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="Жін"
                    checked={sex === "Жін"}
                    onChange={(e) => setSex(e.target.value)}
                  />
                  Жін
                </label>
              </div>
            </div>
            <div className={styles.form__item}>
              <label>
                Працівник:
                <input
                  type="text"
                  name="staff"
                  value={staff}
                  onChange={(e) => setStaff(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.form__item}>
              <label>
                Коментар:
                <textarea
                  name="teatarea"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </label>
            </div>
            <input type="hidden" value={tableId} name="tableId" />
          </div>
          <div className={styles.form__column}>
            <button type="button">З часовим обмеженням</button>
            <button type="button">Закриття закладу</button>
            <button type="button">+ стіл</button>
            <button type="button">обрати на карті</button>
            <button type="button">Виділити стіл</button>
            <button type="button">Тільки цей стіл</button>
          </div>
        </div>
        <button type="submit">Додати</button>
      </form>
      <button onClick={handleOpenForm}>X</button>
    </div>
  );
}
