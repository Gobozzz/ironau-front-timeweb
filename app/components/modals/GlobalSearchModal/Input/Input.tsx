"use client";

import Image from "next/image";
import styles from "./Input.module.css";
import searchIcon from "@/public/icons/search.svg";

interface Props {
  className?: string;
  value: string;
  callback: (newValue: string) => void;
}

export function Input({ className = "", value, callback }: Props) {
  return (
    <div className={`${styles.inner} ${className}`}>
      <Image
        className={styles.lupa}
        src={searchIcon}
        alt="Поиск по сайту"
        aria-label="Поиск по сайту"
      />
      <input
        value={value}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          callback(e.target.value)
        }
        className={styles.input}
        type="text"
        placeholder="Гимн РСО-А"
      />
    </div>
  );
}
