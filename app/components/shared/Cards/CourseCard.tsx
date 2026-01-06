"use client";

import { LevelLesson } from "@components/shared/LevelLesson/LevelLesson";
import styles from "./Card.module.css";
import Image from "next/image";
import CountStudentsIcon from "@/public/icons/count_humans_lesson.svg";
import RatingIcon from "@/public/icons/rating_card.svg";
import CountLessonsIcon from "@/public/icons/count_lessons_lesson.svg";
import NoLogo from "@/public/icons/no-logo.svg";
import { getCountLessonsWord } from "@helpers/words";
import Link from "next/link";
import { COURSE_FLOW, COURSE_SHOW } from "@/app/navigate";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppDispatch, RootState } from "@/app/redux/store";
import { openModal } from "@/app/redux/slices/loginModalSlice";
import api from "@api";
import { Loader } from "@components/ui/Loader/Loader";
import { ProgressCourseCard } from "../Progress/ProgressCourseCard";

interface Props {
  className?: string;
  data: CourseCard;
}

export function CourseCard({ className = "", data }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [loadingStartCourse, setLoadingStartCourse] = useState<boolean>(false);

  function startCourse() {
    if (!user) {
      dispatch(openModal());
      return;
    }
    setLoadingStartCourse(true);
    api
      .post(`/enrollments/courses/${data.id}`)
      .then(() => {
        router.push(COURSE_FLOW(data.id));
      })
      .finally(() => {
        setLoadingStartCourse(false);
      });
  }

  return (
    <article className={`${styles.card} ${className}`}>
      <div className={styles.up}>
        <div className={styles.up_up}>
          <div className={styles.up_left}>
            <LevelLesson level={data.level.title} className="mb-5" />
            <h2 className={`${styles.title} line-clamp-2`}>{data.title}</h2>
          </div>
          <div className={styles.up_right}>
            <Link href={COURSE_SHOW(data.slug, data.id)}>
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
              <Image src={CountLessonsIcon} alt="Количество уроков" />
              {data.count_lessons} {getCountLessonsWord(data.count_lessons)}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.down}>
        {data.progress_percent !== null && (
          <ProgressCourseCard percent={data.progress_percent} />
        )}
        {data.is_enrolled && (
          <Link className={styles.link_edit} href={COURSE_FLOW(data.id)}>
            Продолжить обучение
          </Link>
        )}
        {!data.is_enrolled && (
          <button
            disabled={loadingStartCourse}
            onClick={startCourse}
            type="button"
            className={`${styles.link_edit} bg-black! text-white!`}
          >
            {loadingStartCourse ? <Loader size="sm" /> : "Начать обучение"}
          </button>
        )}
      </div>
    </article>
  );
}
