import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

import ArrowLeftIcon from "@/public/icons/arrow-calendar-left.svg";
import ArrowRightIcon from "@/public/icons/arrow-calendar-right.svg";

interface CalendarProps {
  onSelectDates?: (dates: Date[]) => void; // callback при выборе 0-2 дат
  close?: () => void; // функция для закрытия календаря при клике вне
}

const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const weekDaysShort = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function Calendar({ onSelectDates, close }: CalendarProps) {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const calendarRef = useRef<HTMLDivElement>(null);

  // Обработчик клика вне календаря
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       calendarRef.current &&
  //       !calendarRef.current.contains(event.target as Node)
  //     ) {
  //       if (close) close();
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [close]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayWeekday = new Date(currentYear, currentMonth, 1).getDay();
  const startOffset = (firstDayWeekday + 6) % 7; // понедельник=0

  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;

  const calendarCells = Array.from({ length: totalCells }, (_, i) => {
    const dateNumber = i - startOffset + 1;
    if (dateNumber < 1 || dateNumber > daysInMonth) return null;
    return new Date(currentYear, currentMonth, dateNumber);
  });

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
    // setSelectedDates([]);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
    // setSelectedDates([]);
  };

  const handleDateClick = (date: Date) => {
    const exists = selectedDates.some(
      (d) => d.toDateString() === date.toDateString()
    );
    let newSelected: Date[];

    if (exists) {
      // Удаляем если уже выбрана
      newSelected = selectedDates.filter(
        (d) => d.toDateString() !== date.toDateString()
      );
    } else {
      // Добавляем, если меньше 2
      if (selectedDates.length < 2) {
        newSelected = [...selectedDates, date];
      } else {
        // Заменяем первый выбранный
        newSelected = [selectedDates[1], date];
      }
    }

    setSelectedDates(newSelected);

    // Вызываем callback, если выбранных дат 0-2
    if (onSelectDates && newSelected.length <= 2) {
      onSelectDates(newSelected);
    }
  };

  const isSelected = (date: Date) => {
    return selectedDates.some((d) => d.toDateString() === date.toDateString());
  };

  const monthYearLabel = `${monthNames[currentMonth]} ${currentYear}`;

  return (
    <div style={{ position: "relative", userSelect: "none" }}>
      <div
        ref={calendarRef}
        style={{
          maxWidth: 400,
          margin: "0 auto",
          fontFamily: "Arial, sans-serif",
          border: "1px solid #ccc",
          padding: "12px 6px",
          backgroundColor: "var(--white)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Верхняя часть */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <button
            className="min-h-11 min-w-11 flex! items-center justify-center"
            onClick={handlePrevMonth}
          >
            <Image src={ArrowLeftIcon} alt="Стрелка влево" />
          </button>
          <div className="text-[14px] font-navigation text-black!">
            {monthYearLabel}
          </div>
          <button
            className="min-h-11 min-w-11 flex! items-center justify-center"
            onClick={handleNextMonth}
          >
            <Image src={ArrowRightIcon} alt="Стрелка влево" />
          </button>
        </div>

        {/* Дни недели */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          {weekDaysShort.map((day) => (
            <div
              className="text-base font-text-medium min-h-11 min-w-11 flex items-center justify-center text-black!"
              key={day}
            >
              {day.toUpperCase()}
            </div>
          ))}
        </div>

        {/* Дни месяца */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            textAlign: "center",
          }}
        >
          {calendarCells.map((date, index) => (
            <div
              key={index}
              style={{
                cursor: date ? "pointer" : "default",
                backgroundColor:
                  date && isSelected(date) ? "var(--black)" : "transparent",
                color:
                  date && isSelected(date) ? "var(--white)" : "var(--black)",
                minHeight: "44px",
                minWidth: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "12px",
              }}
              onClick={() => date && handleDateClick(date)}
            >
              {date ? date.getDate() : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
