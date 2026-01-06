"use client";

import api from "@api";
import { COURSE_FLOW } from "@navigate";
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

export function CourseStartLearnButton({ id }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [loadingStartCourse, setLoadingStartCourse] = useState<boolean>(false);
  const [course, setCourse] = useState<null | CourseCard>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/courses/${id}`)
      .then((data) => setCourse(data.data.data))
      .finally(() => setLoading(false));
  }, []);

  function startCourse() {
    if (!user) {
      dispatch(openModal());
      return;
    }
    setLoadingStartCourse(true);
    api
      .post(`/enrollments/courses/${id}`)
      .then(() => {
        router.push(COURSE_FLOW(id));
      })
      .finally(() => {
        setLoadingStartCourse(false);
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
  } else if (course === null) {
    return null;
  }

  if (course.is_enrolled) {
    return (
      <Link className={`${className}`} href={COURSE_FLOW(id)}>
        Продолжить обучение
      </Link>
    );
  } else {
    return (
      <button onClick={startCourse} className={`${className}`}>
        {loadingStartCourse ? <Loader size="sm" /> : "Начать обучение"}
      </button>
    );
  }
}
