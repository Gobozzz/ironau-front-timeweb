import IndexLayout from "@components/layout/IndexLayout";
import api from "@api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTitle } from "@components/ui/PageTitle/PageTitle";
import { LESSON_FLOW } from "@navigate";
import Image from "next/image";
import noLogo from "@/public/icons/no-logo.svg";
import CountStudentsIcon from "@/public/icons/count_humans_lesson.svg";
import RatingIcon from "@/public/icons/rating_card.svg";
import TimeIcon from "@/public/icons/time_lesson.svg";
import styles from "./page.module.css";
import { LevelLesson } from "@components/shared/LevelLesson/LevelLesson";
import { LessonStartLearnButton } from "@/app/components/features/learning/LessonStartLearnButton";
import { getRealId } from "@helpers/links";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const id_real = getRealId(id);

  const lesson = await getLessonData(id_real);

  if (!lesson) {
    return {
      title: "Урок не найден",
      description: "Урок не существует",
    };
  }

  const imageOG = {
    url:
      lesson.image || `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: `${lesson.title} - Осетинский язык онлайн`,
  };

  return {
    title: `${lesson.title}`,
    description: lesson.content.slice(0, 200),
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: LESSON_FLOW(lesson.id),
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      title: `${lesson.title} | Изучение осетинского языка`,
      description: `${lesson.content.slice(
        0,
        200
      )} | Изучение осетинского языка`,
      images: [imageOG],
    },
  };
}

async function getLessonData(id: string): Promise<LessonCard | null> {
  const id_real = getRealId(id);
  try {
    const res = await api.get(`/lessons/${id_real}`);

    if (res.status === 200) {
      return res.data.data;
    }

    return null;
  } catch (error) {
    return null;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = await getLessonData(id);

  if (lesson === null) {
    notFound();
  }

  return (
    <IndexLayout>
      <PageTitle>{lesson.title}</PageTitle>
      <div className="flex items-start gap-13">
        <div className="min-w-95 max-w-95">
          <Image
            className="w-full aspect-square rounded-2xl mb-6 object-center object-cover"
            src={lesson.image || noLogo}
            width={380}
            height={380}
            alt={lesson.title}
          />
          <div className={styles.statistics}>
            <div className={styles.statistics_item}>
              <Image src={CountStudentsIcon} alt="Количество учеников" />
              {lesson.count_enrolled}
            </div>
            <div className={styles.statistics_item}>
              <Image src={RatingIcon} alt="Рейтинг" />
              {lesson.rating || "Нет"}
            </div>
            <div className={styles.statistics_item}>
              <Image src={TimeIcon} alt="Время на прохождение" />~{" "}
              {lesson.time_to_complete} мин
            </div>
            <div className={styles.statistics_item}>
              <LevelLesson
                level={lesson.level.title}
                className="bg-gray-light!"
              />
            </div>
          </div>
          <LessonStartLearnButton id={lesson.id} />
          <div>
            <div className="text-base text-gray! font-navigation mb-2 italic select-none">
              Автор урока
            </div>
            <div className="text-xl font-navigation">{lesson.author.name}</div>
          </div>
        </div>
        <p className="max-w-200 text-base whitespace-pre-wrap">
          {lesson.content}
        </p>
      </div>
    </IndexLayout>
  );
}
