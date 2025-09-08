import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <div>Logo</div>
        <div>Пошук</div>
        <div>Button Сторінка резервів</div>
        <div>Button Схема залу</div>
      </div>
      <div className={styles.header__bottom}>
        <span>button left</span>
        <span>button show and date</span>
        <span>button right</span>
      </div>
    </header>
  );
}
