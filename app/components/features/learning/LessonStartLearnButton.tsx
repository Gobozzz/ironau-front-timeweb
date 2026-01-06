"use client";

import api from "@api";
import { LESSON_FLOW } from "@navigate";
import { openModal } from "@slices/loginModalSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "@components/ui/Loader/Loader";

interface Props {
  id: number;
}

export function LessonStartLearnButton({ id }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [loadingStartLesson, setLoadingStartLesson] = useState<boolean>(false);
  const [lesson, setLesson] = useState<null | LessonCard>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/lessons/${id}`)
      .then((data) => setLesson(data.data.data))
      .finally(() => setLoading(false));
  }, []);

  function startLesson() {
    if (!user) {
      dispatch(openModal());
      return;
    }
    setLoadingStartLesson(true);
    api
      .post(`/enrollments/lessons/${id}`)
      .then(() => {
        router.push(LESSON_FLOW(id));
      })
      .finally(() => {
        setLoadingStartLesson(false);
      });
  }

  const className =
    "w-full h-11 rounded-xl flex! items-center justify-center mb-6 text-[14px] bg-foreground! text-background!";

  if (loading) {
    return (
      <div className="my-2">
        <Loader size="base" />
      </div>
    );
  } else if (lesson === null) {
    return null;
  }

  if (lesson.is_enrolled) {
    return (
      <Link className={`${className}`} href={LESSON_FLOW(id)}>
        Повторить урок
      </Link>
    );
  } else {
    return (
      <button onClick={startLesson} className={`${className}`}>
        {loadingStartLesson ? <Loader size="sm" /> : "Начать урок"}
      </button>
    );
  }
}
