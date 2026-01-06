"use client";

import Image from "next/image";
import NewspaperImage from "@/public/images/newspaper.png";
import styles from "./Newspaper.module.css";

interface Props {
  className?: string;
}

export function Newspaper({ className }: Props) {
  return (
    <Image
      className={`${styles.image} ${className}`}
      src={NewspaperImage}
      alt="Газета Дзурут Иронау"
    />
  );
}
