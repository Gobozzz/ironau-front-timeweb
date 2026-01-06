"use client";

import Link from "next/link";
import styles from "./Tabs.module.css";
import { CENTER_LEARNING, COURSES } from "@navigate";

interface Props {
  type?: "lessons" | "courses";
}

export function Tabs({ type = "lessons" }: Props) {
  return (
    <div className={styles.tabs}>
      <Link
        className={`${styles.tab} ${type === "lessons" ? styles.active : ""}`}
        href={CENTER_LEARNING}
      >
        Уроки
      </Link>
      <Link
        className={`${styles.tab} ${type === "courses" ? styles.active : ""}`}
        href={COURSES}
      >
        Курсы
      </Link>
    </div>
  );
}
