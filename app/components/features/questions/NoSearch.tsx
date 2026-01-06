"use client";

import Image from "next/image";
import styles from "./Questions.module.css";
import NoSearchIcon from "@/public/images/no-search-question.png";

interface Props {
  changeTab: () => void;
}

export function NoSearch({ changeTab }: Props) {
  return (
    <div className={styles.no_search}>
      <Image src={NoSearchIcon} alt="Не нашлось ответов" />
      <div className={styles.no_search_title}>не нашли ответ?</div>
      <button
        onClick={changeTab}
        type="button"
        className={styles.no_search_button}
      >
        Задайте вопрос справочному центру
      </button>
    </div>
  );
}
