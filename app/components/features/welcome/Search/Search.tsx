"use client";

import Image from "next/image";
import styles from "./Search.module.css";
import searchImage from "@/public/icons/search.svg";
import { useDispatch } from "react-redux";
import { openModal } from "@slices/searchModalSlice";

interface Props {
  className?: string;
}

export function Search({ className = "" }: Props) {
  const dispatch = useDispatch();

  return (
    <div className={`${styles.inner} ${className}`}>
      <div className={styles.title}>Ищите необходимую информацию по сайту</div>
      <button onClick={() => dispatch(openModal())} className={styles.block}>
        <Image
          src={searchImage}
          alt="Поиск по сайту"
          aria-label="Поиск по сайту"
        />
        <div className={styles.value}>Гимн РСО-А</div>
      </button>
    </div>
  );
}
