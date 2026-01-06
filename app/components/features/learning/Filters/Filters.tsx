"use client";

import Image from "next/image";
import styles from "./Filters.module.css";
import SearchIcon from "@/public/icons/search.svg";
import MiddleLevel from "@/public/icons/middle_level.svg";
import HardLevel from "@/public/icons/hard_level.svg";
import GalochkaIcon from "@/public/icons/galochka-black.svg";
import { useEffect, useRef, useState } from "react";
import api from "@api";
import CustomSkeleton from "@components/ui/CustomSkeleton/CustomSkeleton";
import begginersLevelIcon from "@/public/icons/beginners_level.svg";
import { LearningLevelsEnum } from "@enums";

interface Props {
  filters: LearningFilters;
  setFilters: React.Dispatch<React.SetStateAction<LearningFilters>>;
}

export function Filters({ filters, setFilters }: Props) {
  const [filtersLocal, setFiltersLocal] = useState<LearningFilters>(filters);
  const [loadingLevels, setLoadingLevels] = useState<boolean>(false);
  const [levels, setLevels] = useState<LearningLevels[]>([]);

  let timeoutUpdateFilters = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLoadingLevels(true);
    api
      .get("/lesson-levels")
      .then((data) => {
        setLevels(data.data.data);
      })
      .finally(() => setLoadingLevels(false));
  }, []);

  useEffect(() => {
    if (timeoutUpdateFilters.current) {
      clearTimeout(timeoutUpdateFilters.current);
    }
    timeoutUpdateFilters.current = setTimeout(() => {
      setFilters(filtersLocal);
    }, 350);
  }, [filtersLocal]);

  function updateLevelLocalFilters(id: number) {
    let levels_ids = [...filtersLocal.level_f];
    if (!levels_ids.includes(id)) {
      levels_ids.push(id);
    } else {
      levels_ids = levels_ids.filter((level_id) => level_id !== id);
    }
    setFiltersLocal((prev) => {
      return { ...prev, level_f: levels_ids };
    });
  }

  return (
    <div className={styles.inner}>
      <div className={styles.search_filter}>
        <Image src={SearchIcon} alt="Поиск" />
        <input
          value={filtersLocal.title_f}
          onChange={(e) =>
            setFiltersLocal((prev) => {
              return { ...prev, title_f: e.target.value };
            })
          }
          className={styles.search}
          type="text"
          placeholder="Произношение сложных звуков"
        />
      </div>
      <div className={styles.levels}>
        {loadingLevels && (
          <div className="flex items-center flex-wrap gap-2">
            <CustomSkeleton className="w-20" height={44} />
            <CustomSkeleton className="w-20" height={44} />
            <CustomSkeleton className="w-20" height={44} />
          </div>
        )}
        {!loadingLevels &&
          levels.map((level) => {
            let icon;
            switch (level.title) {
              case LearningLevelsEnum.BEGINNERS:
                icon = begginersLevelIcon;
                break;
              case LearningLevelsEnum.MIDDLE:
                icon = MiddleLevel;
                break;
              case LearningLevelsEnum.HARD:
                icon = HardLevel;
                break;
              default:
                icon = begginersLevelIcon;
            }
            return (
              <button
                onClick={() => updateLevelLocalFilters(level.id)}
                key={level.id}
                className={styles.level}
                type="button"
              >
                <Image src={icon} alt={level.title} />
                {level.title}
                <div className={styles.galochka_inner}>
                  <Image
                    className={`${styles.galochka} ${
                      filtersLocal.level_f.includes(level.id)
                        ? styles.active
                        : ""
                    }`}
                    src={GalochkaIcon}
                    alt="Галочка"
                  />
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
}
