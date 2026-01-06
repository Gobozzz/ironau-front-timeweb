"use client";
import Link from "next/link";
import styles from "./ArrowBack.module.css";

interface Props {
  url: string;
}

export function ArrowBack({ url }: Props) {
  return (
    <Link href={url} className={`${styles.arrow}`} aria-label="Вернуться назад">
      <img
        className="-rotate-90"
        src="/icons/arrow-up.svg"
        alt="Стрелочка наверх"
      />
    </Link>
  );
}
