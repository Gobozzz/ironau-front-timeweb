"use client";

import Calendar from "@/app/components/shared/Calendar/Calendar";
import CalendarIcon from "@/public/icons/calendar.svg";
import Image from "next/image";
import { useState } from "react";

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

export function DatesFilter({ filters, setFilters }: Props) {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);

  function handlerSelectedDates(dates: Date[]) {
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
    <>
      <div
        className={`${
          openCalendar ? "block" : "hidden"
        } fixed inset-0 w-full h-full bg-black z-19 opacity-30`}
      ></div>
      <div className="relative">
        <div
          className={`${
            openCalendar ? "block" : "hidden"
          } absolute bottom-0 left-0 -translate-x-full translate-y-full z-20`}
        >
          <Calendar
            close={() => setOpenCalendar(false)}
            onSelectDates={(dates) => handlerSelectedDates(dates)}
          />
        </div>
        <button
          onClick={() => setOpenCalendar(true)}
          className="flex! items-center justify-center min-w-13 min-h-13 bg-gray-light! rounded-xl"
          type="button"
        >
          <Image src={CalendarIcon} alt="Календарь" />
        </button>
      </div>
    </>
  );
}
