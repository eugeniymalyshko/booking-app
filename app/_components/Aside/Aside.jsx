import { useRouter } from "next/navigation";
import Button from "@/app/_components/Button/Button";
import styles from "./Aside.module.scss";

export default function Aside({ handleOpenForm }) {
  const router = useRouter();

  return (
    <aside className={styles.aside}>
      <div className={styles.aside__body}>
        <Button size="big" color="secondary" onClick={handleOpenForm}>
          Додати резерв
        </Button>
        <Button
          size="medium"
          color="primary"
          onClick={() => router.push("/reservations")}
        >
          Резерви
        </Button>
      </div>
    </aside>
  );
}
