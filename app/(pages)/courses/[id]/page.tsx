import IndexLayout from "@components/layout/IndexLayout";
import api from "@api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTitle } from "@components/ui/PageTitle/PageTitle";
import { COURSE_FLOW } from "@navigate";
import Image from "next/image";
import noLogo from "@/public/icons/no-logo.svg";
import CountStudentsIcon from "@/public/icons/count_humans_lesson.svg";
import RatingIcon from "@/public/icons/rating_card.svg";
import CountLessonIcon from "@/public/icons/count_lessons_lesson.svg";
import styles from "./page.module.css";
import { LevelLesson } from "@components/shared/LevelLesson/LevelLesson";
import { getRealId } from "@helpers/links";
import { getCountLessonsWord } from "@helpers/words";
import { CourseStartLearnButton } from "@components/features/learning/CourseStartLearnButton";
import { SITE_NAME } from "@/app/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const id_real = getRealId(id);

  const course = await getCourseData(id_real);

  if (!course) {
    return {
      title: "Курс не найден",
      description: "Курс не существует",
    };
  }

  const imageOG = {
    url:
      course.image || `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: `${course.title} - Осетинский язык онлайн`,
  };

  return {
    title: `${course.title}`,
    description: course.content.slice(0, 200),
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: COURSE_FLOW(course.id),
      siteName: SITE_NAME,
      title: `${course.title} | Изучение осетинского языка`,
      description: `${course.content.slice(
        0,
        200
      )} | Изучение осетинского языка`,
      images: [imageOG],
    },
  };
}

async function getCourseData(id: string): Promise<CourseCard | null> {
  const id_real = getRealId(id);
  try {
    const res = await api.get(`/courses/${id_real}`);

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
  const course = await getCourseData(id);

  if (course === null) {
    notFound();
  }

  return (
    <IndexLayout>
      <PageTitle>{course.title}</PageTitle>
      <div className="flex items-start gap-13">
        <div className="min-w-95 max-w-95">
          <Image
            className="w-full aspect-square rounded-2xl mb-6 object-center object-cover"
            src={course.image || noLogo}
            width={380}
            height={380}
            alt={course.title}
          />
          <div className={styles.statistics}>
            <div className={styles.statistics_item}>
              <Image src={CountStudentsIcon} alt="Количество учеников" />
              {course.count_enrolled}
            </div>
            <div className={styles.statistics_item}>
              <Image src={RatingIcon} alt="Рейтинг" />
              {course.rating || "Нет"}
            </div>
            <div className={styles.statistics_item}>
              <Image src={CountLessonIcon} alt="Количество уроков" />
              {course.count_lessons} {getCountLessonsWord(course.count_lessons)}
            </div>
            <div className={styles.statistics_item}>
              <LevelLesson
                level={course.level.title}
                className="bg-gray-light!"
              />
            </div>
          </div>
          <CourseStartLearnButton id={course.id} />
          <div>
            <div className="text-base text-gray! font-navigation mb-2 italic select-none">
              Автор курса
            </div>
            <div className="text-xl font-navigation">{course.author.name}</div>
          </div>
        </div>
        <p className="max-w-200 text-base whitespace-pre-wrap">
          {course.content}
        </p>
      </div>
    </IndexLayout>
  );
}
