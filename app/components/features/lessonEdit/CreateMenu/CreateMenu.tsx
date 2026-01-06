"use client";

import Image from "next/image";
import styles from "./CreateMenu.module.css";
import PlusIcon from "@/public/icons/plus-white.svg";
import { LessonCreateModal } from "@components/modals/LearningCreate/LessonCreateModal";
import { useState } from "react";
import { CourseCreateModal } from "@components/modals/LearningCreate/CourseCreateModal";
import api from "@api";
import { SuccessModal } from "@/app/components/modals/SuccessModal/SuccessModal";

interface Props {
  isSelectedMode: boolean;
  setIsSelectedMode: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLessons: SelectedLessonRedactor[];
  clearSelectedMode: () => void;
  updateCourse: UpdateLessonsInCourseInterface | null;
}

export function CreateMenu({
  isSelectedMode,
  setIsSelectedMode,
  selectedLessons,
  clearSelectedMode,
  updateCourse,
}: Props) {
  const [openCreateLessonModal, setOpenCreateLessonModal] = useState(false);
  const [openCreateCourseModal, setOpenCreateCourseModal] = useState(false);
  const [loadingUpdateCourse, setLoadingUpdateCourse] = useState(false);
  const [openSuccessUpdateCourseModal, setOpenSuccessUpdateCourseModal] =
    useState<boolean>(false);

  function updateCourseHandler() {
    if (
      selectedLessons.length === 0 ||
      updateCourse === null ||
      loadingUpdateCourse
    )
      return;
    setLoadingUpdateCourse(true);
    const data = {
      image: updateCourse.image,
      title: updateCourse.title,
      content: updateCourse.content,
      level_id: updateCourse.level_id,
      lessons: selectedLessons.map((sel) => sel.id),
    };
    api
      .put(`/courses/${updateCourse.id}`, data)
      .then(() => {
        clearSelectedMode();
        setOpenSuccessUpdateCourseModal(true);
      })
      .catch(() => {
        alert("Произошла ошибка обновлении урока");
        clearSelectedMode();
      })
      .finally(() => setLoadingUpdateCourse(false));
  }

  return (
    <>
      <LessonCreateModal
        open={openCreateLessonModal}
        close={() => setOpenCreateLessonModal(false)}
      />
      <SuccessModal
        title="Курс отправлен на модерацию"
        subtitle="После модерации курс появится в общем доступе"
        open={openSuccessUpdateCourseModal}
        close={() => setOpenSuccessUpdateCourseModal(false)}
      />
      <CourseCreateModal
        onSuccess={clearSelectedMode}
        selectedLessons={selectedLessons}
        open={openCreateCourseModal}
        close={() => setOpenCreateCourseModal(false)}
      />
      <div className={styles.inner}>
        {isSelectedMode && updateCourse === null && (
          <>
            <button
              disabled={selectedLessons.length === 0}
              onClick={() => {
                if (selectedLessons.length === 0) return;
                setOpenCreateCourseModal(true);
              }}
              className={`${styles.button} bg-blue! ${
                selectedLessons.length === 0 ? "opacity-85" : ""
              }`}
            >
              Объединить выбранные уроки
            </button>
            <button
              onClick={clearSelectedMode}
              className={`${styles.button} ${styles.button_course}`}
            >
              Отменить
            </button>
          </>
        )}
        {isSelectedMode && updateCourse !== null && (
          <>
            <button
              disabled={selectedLessons.length === 0 || loadingUpdateCourse}
              onClick={updateCourseHandler}
              className={`${styles.button} bg-blue! ${
                selectedLessons.length === 0 || loadingUpdateCourse
                  ? "opacity-85"
                  : ""
              }`}
            >
              Обновить
            </button>
            <button
              disabled={loadingUpdateCourse}
              onClick={clearSelectedMode}
              className={`${styles.button} ${styles.button_course}`}
            >
              Отменить
            </button>
          </>
        )}
        {!isSelectedMode && (
          <>
            <button
              onClick={() => setOpenCreateLessonModal(true)}
              className={`${styles.button} ${styles.button_lesson}`}
            >
              <Image src={PlusIcon} alt="Создать урок" />
              Новый урок
            </button>
            <button
              onClick={() => setIsSelectedMode(true)}
              className={`${styles.button} ${styles.button_course}`}
            >
              Объединить уроки в курс
            </button>
          </>
        )}
      </div>
    </>
  );
}
