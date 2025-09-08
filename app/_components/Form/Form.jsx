import styles from "./Form.module.scss";

export default function Form({ children, onSubmit }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.form__body}>{children}</div>
    </form>
  );
}
