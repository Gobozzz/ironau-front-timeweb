"use client";

import Link from "next/link";
import styles from "./Social.module.css";
import { VK } from "@components/ui/Icons/VK";
import { Insta } from "@components/ui/Icons/Insta";
import { TG } from "@components/ui/Icons/TG";
import { Youtube } from "@components/ui/Icons/Youtube";

interface Props {
  className?: string;
}

export function Social({ className = "" }: Props) {
  return (
    <div className={`${className} ${styles.wrapper}`}>
      <Link
        className={styles.link}
        href={`${process.env.NEXT_PUBLIC_TG}`}
        aria-label="Телеграм"
      >
        <TG />
      </Link>
      <Link
        className={styles.link}
        href={`${process.env.NEXT_PUBLIC_VK}`}
        aria-label="Вконтакте"
      >
        <VK />
      </Link>
    </div>
  );
}
