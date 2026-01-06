"use client";

import styles from "./StatusLesson.module.css";
import { LearningStatus } from "@enums";

interface Props {
  className?: string;
  status: string;
}

export function StatusLesson({ className = "", status }: Props) {
  let classes;
  switch (status) {
    case LearningStatus.ACTIVE:
      classes = "bg-green!";
      break;
    case LearningStatus.MODERATED:
      classes = "bg-orange!";
      break;
    default:
      classes = "bg-green!";
  }

  return <div className={`${styles.item} line-clamp-1 ${classes} ${className} `}>{status}</div>;
}
