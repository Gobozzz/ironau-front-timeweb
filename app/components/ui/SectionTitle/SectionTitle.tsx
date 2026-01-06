"use client";

import styles from "./SectionTitle.module.css";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function SectionTitle({ className = "", children }: Props) {
  return <h1 className={`${styles.title} ${className}`}>{children}</h1>;
}
