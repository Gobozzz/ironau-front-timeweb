"use client";

import { ArrowDown } from "@/app/components/ui/Icons/ArrowDown";
import styles from "./FiltersBilinguals.module.css";
import { useEffect, useRef, useState } from "react";

function generateYearIntervals(
  startYear: number = 1900,
  interval: number = 10
): string[] {
  const endYear = new Date().getFullYear();

  const result: string[] = [];

  for (let i = startYear; i < endYear; i += interval) {
    if (i >= endYear) {
      break;
    }
    if (i + interval > endYear) {
      result.push(`${i} — ${endYear}`);
      break;
    }
    result.push(`${i} — ${i + interval}`);
  }

  return result;
}

interface Props {
  filters: BilingualFilters;
  setFilters: React.Dispatch<React.SetStateAction<BilingualFilters>>;
}

export function FiltersBilinguals({ filters, setFilters }: Props) {
  const [filtersLocal, setFiltersLocal] = useState<BilingualFilters>(filters);
  let timeoutUpdateFilters = useRef<NodeJS.Timeout | null>(null);
  const [openPeriod, setOpenPeriod] = useState<boolean>(false);

  useEffect(() => {
    setFiltersLocal(filters);
  }, [filters]);

  useEffect(() => {
    if (timeoutUpdateFilters.current) {
      clearTimeout(timeoutUpdateFilters.current);
    }
    timeoutUpdateFilters.current = setTimeout(() => {
      setFilters(filtersLocal);
    }, 350);
  }, [filtersLocal]);

  return (
    <div className={styles.inner}>
      <div className={styles.title}>Фильтры</div>
      <div className={styles.items}>
        <div className={styles.item}>
          <div className={styles.item_up}>
            <div
              onClick={() => setOpenPeriod((prev) => !prev)}
              className={styles.item_title}
            >
              Периоды публикации
            </div>
            <button
              onClick={() => setOpenPeriod((prev) => !prev)}
              className={`${styles.item_arrow} ${
                openPeriod ? "-rotate-180" : ""
              }`}
            >
              <ArrowDown color="var(--color-foreground)" />
            </button>
          </div>
          <div
            className={`${styles.item_down} ${openPeriod ? styles.active : ""}`}
          >
            {generateYearIntervals().map((period, index) => (
              <button
                onClick={() => {
                  const period_f = period.replace(" — ", "_");
                  if (filtersLocal.period === period_f) {
                    setFiltersLocal((prev) => {
                      return { ...prev, period: "" };
                    });
                  } else {
                    setFiltersLocal((prev) => {
                      return { ...prev, period: period_f };
                    });
                  }
                }}
                key={index}
                className={`${styles.filter_button} ${
                  period.replace(" — ", "_") === filtersLocal.period
                    ? styles.active
                    : ""
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
