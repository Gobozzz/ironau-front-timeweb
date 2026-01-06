"use client";

import Image from "next/image";
import styles from "./LevelLesson.module.css";
import { LearningLevelsEnum } from "@enums";
import begginersLevelIcon from "@/public/icons/beginners_level.svg";
import middleLevelIcon from "@/public/icons/middle_level.svg";
import hardLevelIcon from "@/public/icons/hard_level.svg";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  level: string;
}

export function LevelLesson({ className = "", level, ...props }: Props) {
  let icon;

  switch (level) {
    case LearningLevelsEnum.BEGINNERS:
      icon = begginersLevelIcon;
      break;
    case LearningLevelsEnum.MIDDLE:
      icon = middleLevelIcon;
      break;
    case LearningLevelsEnum.HARD:
      icon = hardLevelIcon;
      break;
    default:
      icon = begginersLevelIcon;
  }

  return (
    <div className={`${styles.item} ${className}`} {...props}>
      <Image src={icon} alt="Уровень сложности" />
      {level}
    </div>
  );
}
