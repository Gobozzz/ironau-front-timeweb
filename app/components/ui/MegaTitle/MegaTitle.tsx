"use client";
import styles from "./MegaTitle.module.css";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function MegaTitle({ className = "", children }: Props) {
  return <h1 className={`${styles.title} ${className}`}>{children}</h1>;
}
