import styles from "./Button.module.scss";
export default function Button({
  children,
  onClick,
  size = "small",
  color = "primary",
}) {
  const sizeButton =
    (size === "big" && styles["button_big"]) ||
    (size === "medium" && styles["button_medium"]) ||
    (size === "small" && styles["button_small"]);

  const colorButton =
    (color === "primary" && styles["button_primary"]) ||
    (color === "white" && styles["button_white"]);

  return (
    <button
      className={`${styles.button} ${sizeButton} ${colorButton}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
