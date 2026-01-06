"use client";

import { RoundedCheckbox } from "@/app/components/ui/Checkbox/RoundedCheckbox";
import Image from "next/image";
import ArrowDown from "@/public/icons/arrow-down.svg";
import { useState } from "react";

interface Props {
  selected_categories_ids: number[];
  category: NewsCategoryShow;
  checked: boolean;
  onChange: (id: number) => void;
}

export function NewsCategoryTreeInModal({
  category,
  checked,
  onChange,
  selected_categories_ids,
}: Props) {
  const [activeChildren, setActiveChildren] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex-auto flex items-center gap-3.5">
          <RoundedCheckbox
            onChange={() => onChange(category.id)}
            checked={checked}
          />
          <div
            className="line-clamp-1 text-sm font-text-medium w-full text-black!"
            style={{ wordBreak: "break-word" }}
          >
            {category.title}
          </div>
        </div>
        {category.children.length > 0 && (
          <button
            onClick={() => setActiveChildren((prev) => !prev)}
            className={`min-w-11 min-h-11 flex! items-center justify-center ${
              activeChildren ? "-rotate-180" : ""
            }`}
          >
            <Image src={ArrowDown} alt="Стрелка вниз" />
          </button>
        )}
      </div>
      <div
        className="flex-col gap-3 pl-3"
        style={{ display: activeChildren ? "flex" : "none" }}
      >
        {category.children.map((category_ch) => (
          <NewsCategoryTreeInModal
            selected_categories_ids={selected_categories_ids}
            checked={selected_categories_ids.includes(category_ch.id)}
            onChange={(id: number) => onChange(id)}
            key={category_ch.id}
            category={category_ch}
          />
        ))}
      </div>
    </div>
  );
}
