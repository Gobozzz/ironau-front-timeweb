'use client'

import styles from "./Title.module.css";

interface Props {
  className?: string;
}

export function Title({ className = "" }: Props) {
  return <div className={`${className} ${styles.title}`}>ИРОНАУ</div>;
}
