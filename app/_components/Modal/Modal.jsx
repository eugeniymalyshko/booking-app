import styles from "./Modal.module.scss";

export default function Modal({ children, onClose }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__overlay} onClick={onClose}></div>
      <div className={styles.modal__content}>
        <button className={styles.modal__close} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
