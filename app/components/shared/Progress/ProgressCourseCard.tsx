"use client";

import styles from "./Progres.module.css";

interface Props {
  className?: string;
  percent: number;
}

export function ProgressCourseCard({ className = "", percent }: Props) {
  return (
    <div className={`${styles.progress_inner} ${className}`}>
      <div className={styles.progress_title}>Прогресс курса</div>
      <div className={styles.progress_metric}>
        <div className={styles.progress_metric_number}>0%</div>
        <div className={styles.progress_metric_number}>100%</div>
      </div>
      <div className={styles.progress_line_inner}>
        <div
          className={styles.progress_line}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}
