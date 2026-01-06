'use client'

import Link from "next/link";
import styles from "./Subtitle.module.css";
import { COURSES, LITERATURE, SPRAVOCHNIK } from "@navigate";

interface Props {
  className?: string;
}

export function Subtitle({ className = "" }: Props) {
  return (
    <h2 className={`${className} ${styles.subtitle}`}>
      Комплексная платформа для изучения осетинского языка с{" "}
      <Link aria-label="Курсы" href={COURSES}>
        интерактивными курсами
      </Link>
      , <br />
      <Link aria-label="Литература" href={LITERATURE}>
        литературой
      </Link>{" "}
      и{" "}
      <Link aria-label="Справочник" href={SPRAVOCHNIK}>
        справочными материалами
      </Link>{" "}
    </h2>
  );
}
