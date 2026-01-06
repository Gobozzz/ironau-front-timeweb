"use client";

import { useSelector } from "react-redux";
import styles from "./RulesBlock.module.css";
import { RootState } from "@/app/redux/store";
import Link from "next/link";
import { UserRules } from "@enums";
import { canUserRule } from "@helpers/rules";
import { BILINGUALS_CREATED, LESSON_CREATE, NEWS_CREATE } from "@navigate";

interface Props {
  className?: string;
}

export function RulesBlock({ className = "" }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || user.rules === null) {
    return null;
  }

  return (
    <div className={`${styles.inner} ${className}`}>
      {canUserRule(UserRules.CREATE_TEACH_MATERIAL, user) && (
        <Link href={LESSON_CREATE} className={styles.rule}>
          Уроки
        </Link>
      )}
      {canUserRule(UserRules.WRITE_NEWS, user) && (
        <Link href={NEWS_CREATE} className={styles.rule}>
          Новости
        </Link>
      )}
      {canUserRule(UserRules.CREATE_BILINGUALS, user) && (
        <Link href={BILINGUALS_CREATED} className={styles.rule}>
          Билингвы
        </Link>
      )}
    </div>
  );
}
