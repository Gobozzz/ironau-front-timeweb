"use client";
import styles from "./PageTitle.module.css";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function PageTitle({ className = "", children }: Props) {
  return <h1 className={`${styles.title} ${className}`}>{children}</h1>;
}
