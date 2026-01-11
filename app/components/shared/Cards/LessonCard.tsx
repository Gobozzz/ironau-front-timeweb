"use client";

import { LevelLesson } from "@components/shared/LevelLesson/LevelLesson";
import styles from "./Card.module.css";
import Image from "next/image";
import CountStudentsIcon from "@/public/icons/count_humans_lesson.svg";
import RatingIcon from "@/public/icons/rating_card.svg";
import TimeIcon from "@/public/icons/time_lesson.svg";
import NoLogo from "@/public/icons/no-logo.svg";
import Link from "next/link";
import { LESSON_FLOW, LESSON_SHOW } from "@navigate";
import { useState } from "react";
import api from "@api";
import { useRouter } from "next/navigation";
import { Loader } from "../../ui/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { openModal } from "@/app/redux/slices/loginModalSlice";

interface Props {
  className?: string;
  data: LessonCard;
}

export function LessonCard({ className = "", data }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [loadingStartLesson, setLoadingStartLesson] = useState<boolean>(false);

  function startLesson() {
    if (!user) {
      dispatch(openModal());
      return;
    }
    setLoadingStartLesson(true);
    api
      .post(`/enrollments/lessons/${data.id}`)
      .then(() => {
        router.push(LESSON_FLOW(data.id));
      })
      .finally(() => {
        setLoadingStartLesson(false);
      });
  }

  return (
    <article className={`${styles.card} ${className}`}>
      <div className={styles.up}>
        <div className={styles.up_up}>
          <div className={styles.up_left}>
            <LevelLesson level={data.level.title} className="mb-5" />
            <Link className="select-all!" href={LESSON_SHOW(data.slug, data.id)}>
              <h2 className={`${styles.title} line-clamp-2`}>{data.title}</h2>
            </Link>
          </div>
          <div className={styles.up_right}>
            <Link href={LESSON_SHOW(data.slug, data.id)}>
              <Image
                className={`${styles.logo}`}
                loading="lazy"
                width={92}
                height={92}
                src={data.image || NoLogo}
                alt="Логотип урока"
              />
            </Link>
          </div>
        </div>
        <div className={styles.up_down}>
          <p className={`${styles.desc} line-clamp-5`}>{data.content}</p>
          <div className={styles.author_block}>
            <div className={styles.author_title}>Автор урока</div>
            <div className={styles.author_name}>{data.author.name}</div>
          </div>
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
        {data.is_enrolled && (
          <Link className={styles.link_edit} href={LESSON_FLOW(data.id)}>
            Повторить урок
          </Link>
        )}
        {!data.is_enrolled && (
          <button
            disabled={loadingStartLesson}
            onClick={startLesson}
            type="button"
            className={`${styles.link_edit} bg-black! text-white!`}
          >
            {loadingStartLesson ? <Loader size="sm" /> : "Начать урок"}
          </button>
        )}
      </div>
    </article>
  );
}
