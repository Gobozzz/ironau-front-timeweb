"use client";

import Image from "next/image";
import styles from "./NewsIndex.module.css";
import Calendar from "@/app/components/shared/Calendar/Calendar";
import CalendarIcon from "@/public/icons/calendar.svg";
import { useState } from "react";
import { SortedNews } from "./SortedNews";

interface Props {
  filters: NewsFilters;
  setFilters: React.Dispatch<React.SetStateAction<NewsFilters>>;
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function DatesFilterMobile({ filters, setFilters }: Props) {
  const [activeFilters, setActiveFilters] = useState<boolean>(false);

  function handlerSelectedDates(dates: Date[]) {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (dates.length === 0) {
      setFilters((prev) => {
        const prev_filters = { ...prev };
        prev_filters.period = "";
        prev_filters.day = "";
        return prev_filters;
      });
    } else if (dates.length === 1) {
      setFilters((prev) => {
        const prev_filters = { ...prev };
        prev_filters.period = "";
        prev_filters.day = formatDate(dates[0]);
        return prev_filters;
      });
    } else {
      setFilters((prev) => {
        const formattedString = `${formatDate(dates[0])}_${formatDate(
          dates[1]
        )}`;
        const prev_filters = { ...prev };
        prev_filters.period = formattedString;
        prev_filters.day = "";
        return prev_filters;
      });
    }
  }

  return (
    <div className={styles.filters_date_mobile}>
      <button
        onClick={() => {
          const body = document.querySelector("body");
          if (body) {
            body.style.overflow = "hidden";
          }
          setActiveFilters(true);
        }}
        className={`glass_effect_bg  ${styles.mobile_date_button}`}
        type="button"
      >
        <Image src={CalendarIcon} alt="Дата" />
      </button>
      <div
        onClick={() => {
          const body = document.querySelector("body");
          if (body) {
            body.style.overflow = "auto";
          }
          setActiveFilters(false);
        }}
        className={`${styles.mobile_date_filters_close} ${
          activeFilters ? styles.active : ""
        }`}
      ></div>
      <div
        className={`${styles.mobile_date_filters_inner} ${
          activeFilters ? styles.active : ""
        }`}
      >
        <div className={styles.mobile_date_filters_sorted_inner}>
          <SortedNews filters={filters} setFilters={setFilters} />
        </div>
        <div className={styles.mobile_date_filters_calendar_inner}>
          <Calendar onSelectDates={(dates) => handlerSelectedDates(dates)} />
        </div>
      </div>
    </div>
  );
}
