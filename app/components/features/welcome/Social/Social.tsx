"use client";

import Link from "next/link";
import styles from "./Social.module.css";
import { VK } from "@components/ui/Icons/VK";
import { TG } from "@components/ui/Icons/TG";
import { TG_LINK, VK_LINK } from "@/app/constants";

interface Props {
  className?: string;
}

export function Social({ className = "" }: Props) {
  return (
    <div className={`${className} ${styles.wrapper}`}>
      <Link className={styles.link} href={`${TG_LINK}`} aria-label="Телеграм">
        <TG />
      </Link>
      <Link className={styles.link} href={`${VK_LINK}`} aria-label="Вконтакте">
        <VK />
      </Link>
    </div>
  );
}
