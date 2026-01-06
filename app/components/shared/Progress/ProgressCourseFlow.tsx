"use client";

import styles from "./Progres.module.css";

interface Props {
  className?: string;
  percent: number;
}

export function ProgressCourseFlow({ className = "", percent }: Props) {
  return (
    <div className={`${styles.progress_inner} bg-gray-light! max-h-16 ${className}`}>
      <div className={styles.progress_title}>Прогресс курса</div>
      <div className={styles.progress_metric}>
        <div className={styles.progress_metric_number}>0%</div>
        <div className={styles.progress_metric_number}>100%</div>
      </div>
      <div className={`${styles.progress_line_inner} bg-white!`}>
        <div
          className={styles.progress_line}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}
