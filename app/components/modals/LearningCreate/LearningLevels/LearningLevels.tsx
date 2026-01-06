"use client";

import { useEffect, useState } from "react";
import styles from "./LearningLevels.module.css";
import { LevelLesson } from "@components/shared/LevelLesson/LevelLesson";
import api from "@api";
import CustomSkeleton from "@components/ui/CustomSkeleton/CustomSkeleton";

interface Props {
  className?: string;
  selectedId?: number | null;
  setSelectedId: (id: number) => void;
}

export function LearningLevels({ className = "", selectedId = null, setSelectedId }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [levels, setLevels] = useState<LearningLevels[]>([]);

  useEffect(() => {
    setLoading(true);
    api
      .get("/lesson-levels")
      .then((data) => {
        setLevels(data.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={`${styles.inner} ${className}`}>
      {loading && (
        <div className="flex items-center flex-wrap gap-2">
          <CustomSkeleton className="w-20" color="var(--white)" height={32} />
          <CustomSkeleton className="w-20" color="var(--white)" height={32} />
          <CustomSkeleton className="w-20" color="var(--white)" height={32} />
        </div>
      )}
      {!loading &&
        levels.map((level) => (
          <LevelLesson
            key={level.id}
            onClick={() => setSelectedId(level.id)}
            className={`cursor-pointer border-2 ${
              selectedId === level.id ? "border-blue" : "border-transparent"
            }`}
            level={level.title}
          />
        ))}
    </div>
  );
}
