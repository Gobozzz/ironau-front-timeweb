"use client";

import Image from "next/image";
import styles from "./Questions.module.css";
import CountIcon from "@/public/icons/count_questions.svg";
import { Loader } from "../../ui/Loader/Loader";

interface Props {
  count: number | null;
  loading: boolean;
}

function getCurrentDateFormatted(): string {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const today = new Date();
  const day = today.getDate();
  const monthIndex = today.getMonth(); // 0 — январь, 11 — декабрь
  const year = today.getFullYear();

  const monthName = months[monthIndex];

  return `${day} ${monthName} ${year}`;
}

export function CountQuestions({ count, loading }: Props) {
  return (
    <div className={styles.count_questions}>
      <Image src={CountIcon} alt="Количество вопросов" />
      <div className={styles.count_questios_number}>
        {loading && <Loader size="base" />}
        {!loading && count !== null && count}
        {!loading && count === null && "?"}
      </div>
      <div className={styles.count_questios_subtitle}>
        Количество ответов <br /> на {getCurrentDateFormatted()}
      </div>
    </div>
  );
}
