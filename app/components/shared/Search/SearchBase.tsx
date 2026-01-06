"use client";

import Image from "next/image";
import styles from "./SearchBase.module.css";
import SearchIcon from "@/public/icons/search.svg";

interface Props {
  className?: string;
  value: string;
  callback: (value: string) => void;
  placeholder?: string;
}

export function SearchBase({
  className = "",
  value,
  callback,
  placeholder = "Поиск",
}: Props) {
  return (
    <div className={`${styles.inner} ${className}`}>
      <Image className={styles.icon} src={SearchIcon} alt="Поиск" />
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => callback(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
