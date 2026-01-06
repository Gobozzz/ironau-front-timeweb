"use client";

import styles from "./Paginate.module.css";

interface Props {
  className?: string;
  pages: PaginatePageInterface[];
  onClick: (page: number) => void;
}

export function Paginate({ pages, onClick, className = "" }: Props) {
  if (pages.length === 0) {
    return null;
  }

  const count_normal_page = pages.reduce((count, p) => {
    if (p.page !== null && /^\d+$/.test(p.label)) {
      return count + 1;
    }
    return count;
  }, 0);

  if (count_normal_page < 2) {
    return null;
  }

  return (
    <div className={`${styles.inner} ${className}`}>
      {pages.map((page, index) => {
        if (
          (page.page === null || isNaN(Number(page.label))) &&
          page.label !== "..."
        ) {
          return null;
        }
        if (page.label === "...") {
          <button key={index} className={styles.page} type="button">
            {page.label}
          </button>;
        }
        return (
          <button
            onClick={() => onClick(page.page || 1)}
            key={index}
            className={`${styles.page} ${page.active ? styles.active : ""}`}
            type="button"
          >
            {page.label}
          </button>
        );
      })}
    </div>
  );
}
