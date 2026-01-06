"use client";

import styles from "./page.module.css";
import { PageTitle } from "@components/ui/PageTitle/PageTitle";
import AuthLayout from "@components/layout/AuthLayout";
import ShortLayout from "@components/layout/ShortLayout";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@api";
import { MegaTitle } from "@components/ui/MegaTitle/MegaTitle";
import CustomSkeleton from "@components/ui/CustomSkeleton/CustomSkeleton";
import { AsideExercises } from "@components/features/lessonEdit/AsideExercises/AsideExercises";
import { EditExercises } from "@components/features/lessonEdit/EditExercises/EditExercises";
import { SuccessModal } from "@components/modals/SuccessModal/SuccessModal";

export default function Page() {
  const params = useParams();
  const { id } = params;

  const [exercises, setExercises] = useState<EditExercise[]>([]);
  const [lesson, setLesson] = useState<EditLesson>({
    title: "",
    time_to_complete: null,
    level_id: null,
    content: "",
    image: null,
    image_url: null,
    only_course: false,
  });
  const [loadingExercise, setLoadingExercise] = useState<boolean>(false);
  const [loadingLesson, setLoadingLesson] = useState<boolean>(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [errors, setErrors] = useState<ServerErrors>({});
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState<boolean>(false);

  useEffect(() => {
    setLoadingExercise(true);
    setLoadingLesson(true);
    api
      .get(`/exercises/lessons/${id}`)
      .then((data) => {
        setExercises(data.data.data);
      })
      .catch()
      .finally(() => {
        setLoadingExercise(false);
      });
    api
      .get(`/lessons/${id}/owner`)
      .then((data) => {
        setLesson(data.data.data);
      })
      .catch()
      .finally(() => {
        setLoadingLesson(false);
      });
  }, []);

  function handlerUpdate() {
    setErrors({});
    setLoadingUpdate(true);
    const exercises_copy = exercises.map((exercise, index) => {
      exercise.order = index + 1;
      return exercise;
    });
    api
      .patch(`/lessons/${id}/exercises`, { exercises: exercises_copy })
      .then(() => {
        setIsOpenSuccessModal(true);
      })
      .catch((err) => {
        let errors;
        if (err.response?.data?.errors) {
          errors = err.response.data.errors;
        } else {
          errors = { message: ["Произошла ошибка при изменении данных"] };
        }
        setErrors(errors);
        setTimeout(() => {
          const errorElement = document.querySelector("[data-error-input]");
          if (errorElement) {
            errorElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 250);
      })
      .finally(() => {
        setLoadingUpdate(false);
      });
  }

  return (
    <AuthLayout>
      <ShortLayout>
        <SuccessModal
          title="Урок отправлен на модерацию"
          subtitle="После модерации урок появится в общем доступе"
          open={isOpenSuccessModal}
          close={() => setIsOpenSuccessModal(false)}
        />
        <div className="">
          <MegaTitle>Редактор уроков</MegaTitle>
          {loadingLesson && <CustomSkeleton height={50} width={320} />}
          {!loadingLesson && <PageTitle>{lesson.title}</PageTitle>}
          <button
            className={`${styles.submit_btn} ${
              loadingUpdate || loadingExercise ? "opacity-85" : ""
            }`}
            disabled={loadingUpdate || loadingExercise}
            onClick={handlerUpdate}
          >
            Отправить на модерацию
          </button>
          <div className="flex items-start gap-10">
            <AsideExercises setExercises={setExercises} />
            <EditExercises
              loadingExercise={loadingExercise}
              exercises={exercises}
              setExercises={setExercises}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
        </div>
      </ShortLayout>
    </AuthLayout>
  );
}
