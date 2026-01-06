"use client";
import Link from "next/link";
import styles from "./ArrowBackFlow.module.css";
import { CENTER_LEARNING } from "@navigate";

export function ArrowBackFlow() {
  return (
    <Link
      href={CENTER_LEARNING}
      className={`${styles.arrow}`}
      aria-label="Вернуться назад"
    >
      <img
        className="-rotate-90"
        src="/icons/arrow-up.svg"
        alt="Стрелочка наверх"
      />
    </Link>
  );
}
