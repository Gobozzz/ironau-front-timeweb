"use client";

import Image from "next/image";
import styles from "./Mates.module.css";
import MatesImage from "@/public/images/mates.png";

interface Props {}

export function Mates({}: Props) {
  return (
    <a target="_blank" href="https://mates-web.ru" className={styles.inner}>
      <Image
        loading="lazy"
        className={styles.image}
        src={MatesImage}
        alt="Мейтс | Mates веб-студия во Владикавказе"
      />
      <div className={styles.title}>
        Сервис разработан <br /> в студии <span>Mates</span>
      </div>
    </a>
  );
}
