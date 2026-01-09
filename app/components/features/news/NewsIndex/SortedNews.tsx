"use client";

import Image from "next/image";
import ArrowDown from "@/public/icons/arrow-down.svg";
import { useState } from "react";

interface Props {
  filters: NewsFilters;
  setFilters: React.Dispatch<React.SetStateAction<NewsFilters>>;
}

const sorted_list = [
  {
    title: "Сначала новые",
    filter: "new",
  },
  {
    title: "Сначала старые",
    filter: "old",
  },
];

export function SortedNews({ filters, setFilters }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const active_sorted =
    sorted_list.find((sr) => sr.filter === filters.sorted) || null;
  return (
    <div className="bg-gray-light! min-w-[260px] pl-5 pr-3 py-1 rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="text-base font-text-medium select-none text-black!">
          {active_sorted?.title || "Не выбрано"}
        </div>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`min-w-11 min-h-11 flex! items-center justify-center`}
          type="button"
        >
          <Image
            className={`${isOpen ? "-rotate-180" : ""}`}
            src={ArrowDown}
            alt="Стрелка вниз"
          />
        </button>
      </div>
      <div className={`${isOpen ? "flex" : "hidden"} flex-col gap-2`}>
        {sorted_list.map((sorted, index) => {
          if (sorted.filter === active_sorted?.filter) return null;
          return (
            <button
              className="text-base text-left min-h-11 select-none text-black!"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
                setFilters((prev) => {
                  const prev_filters = { ...prev };
                  prev_filters.sorted = sorted.filter;
                  return prev_filters;
                });
                setIsOpen(false);
              }}
              key={index}
            >
              {sorted.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
