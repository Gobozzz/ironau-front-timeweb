"use client";

import { SectionTitle } from "@components/ui/SectionTitle/SectionTitle";
import styles from "./PersonalData.module.css";
import Link from "next/link";
import { PROFILE_EDIT } from "@navigate";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

interface Props {
  className?: string;
}

export function PersonalData({ className = "" }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className={`${className}`}>
      <SectionTitle>Персональные данные</SectionTitle>
      <div className={styles.items}>
        <div className={styles.item}>
          <div className={`${styles.title_item}`}>Статус</div>
          <div className={`${styles.value_item}`}>{user?.status_name}</div>
        </div>
        <div className={styles.item}>
          <div className={`${styles.title_item}`}>
            Электронная почта (логин)
          </div>
          <div className={`${styles.value_item}`}>{user?.email}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title_item}>ФИО</div>
          <div className={styles.value_item}>{user?.name}</div>
        </div>
        <Link className={styles.link} href={PROFILE_EDIT}>
          Редактировать данные
        </Link>
      </div>
    </div>
  );
}
