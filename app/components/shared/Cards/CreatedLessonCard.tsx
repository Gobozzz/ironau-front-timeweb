"use client";

import { LevelLesson } from "@components/shared/LevelLesson/LevelLesson";
import styles from "./Card.module.css";
import Image from "next/image";
import CountStudentsIcon from "@/public/icons/count_humans_lesson.svg";
import RatingIcon from "@/public/icons/rating_card.svg";
import TimeIcon from "@/public/icons/time_lesson.svg";
import NoLogo from "@/public/icons/no-logo.svg";
import TrashIcon from "@/public/icons/trash.svg";
import Link from "next/link";
import { StatusLesson } from "../StatusLesson/StatusLesson";
import { LESSON_EDIT, LESSON_SHOW } from "@navigate";

interface Props {
  className?: string;
  data: CreatedLessonCard;
  setEditId: (number: number) => void;
  setDeleteId: (number: number) => void;
}

export function CreatedLessonCard({
  className = "",
  data,
  setEditId,
  setDeleteId,
}: Props) {
  return (
    <article className={`${styles.card} ${className}`}>
      <div className={styles.up}>
        <div className={styles.up_up}>
          <div className={styles.up_left}>
            <LevelLesson level={data.level.title} className="mb-5" />
            <h2 className={`${styles.title} line-clamp-2`}>{data.title}</h2>
          </div>
          <div className={styles.up_right}>
            <Link target="_blank" href={LESSON_SHOW(data.slug, data.id)}>
              <Image
                className={`${styles.logo} mb-2`}
                loading="lazy"
                width={92}
                height={92}
                src={data.image || NoLogo}
                alt="Логотип урока"
              />
            </Link>
            <StatusLesson status={data.status_name} />
          </div>
        </div>
        <div className={styles.up_down}>
          <p className={`${styles.desc} line-clamp-5`}>{data.content}</p>
          <div className={styles.statistics}>
            <div className={styles.statistics_item}>
              <Image src={CountStudentsIcon} alt="Количество учеников" />
              {data.count_enrolled}
            </div>
            <div className={styles.statistics_item}>
              <Image src={RatingIcon} alt="Рейтинг" />
              {data.rating || "Нет"}
            </div>
            <div className={styles.statistics_item}>
              <Image src={TimeIcon} alt="Время на прохождение" />~{" "}
              {data.time_to_complete} мин
            </div>
          </div>
        </div>
      </div>
      <div className={styles.down}>
        <Link className={styles.link_edit} href={LESSON_EDIT(data.id)}>
          Редактировать
        </Link>
        <button
          onClick={() => setEditId(data.id)}
          className={styles.link_edit_data}
        >
          Редактировать данные
        </button>
        <button onClick={() => setDeleteId(data.id)} className={styles.delete}>
          <Image src={TrashIcon} alt="Удалить" />
        </button>
      </div>
    </article>
  );
}
