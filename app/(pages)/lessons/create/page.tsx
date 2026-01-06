"use client";

import ShortLayout from "@components/layout/ShortLayout";
import AuthLayout from "@components/layout/AuthLayout";
import { MegaTitle } from "@components/ui/MegaTitle/MegaTitle";
import { CreateMenu } from "@components/features/lessonEdit/CreateMenu/CreateMenu";
import { LessonRedactor } from "@components/features/LessonRedactor/LessonRedactor";
import { SelectedLessons } from "@components/features/LessonRedactor/SelectedLessons/SelectedLessons";
import { useEffect, useState } from "react";
import { CourseRedactor } from "@components/features/LessonRedactor/CourseRedactor";

export default function Page() {
  const [selectedLessons, setSelectedLessons] = useState<
    SelectedLessonRedactor[]
  >([]);
  const [isSelectedMode, setIsSelectedMode] = useState<boolean>(false);
  const [updateCourse, setUpdateCourse] =
    useState<UpdateLessonsInCourseInterface | null>(null);

  function clearSelectedMode() {
    setSelectedLessons([]);
    setIsSelectedMode(false);
    setUpdateCourse(null);
  }

  useEffect(() => {
    if (updateCourse === null) {
      clearSelectedMode();
    } else {
      setSelectedLessons(updateCourse.lessons);
      setIsSelectedMode(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [updateCourse]);

  return (
    <AuthLayout>
      <ShortLayout>
        <div>
          <MegaTitle>Редактор</MegaTitle>
          <CreateMenu
            isSelectedMode={isSelectedMode}
            setIsSelectedMode={setIsSelectedMode}
            selectedLessons={selectedLessons}
            clearSelectedMode={clearSelectedMode}
            updateCourse={updateCourse}
          />
          <SelectedLessons
            isSelectedMode={isSelectedMode}
            selectedLessons={selectedLessons}
            setSelectedLessons={setSelectedLessons}
          />
          <LessonRedactor
            selectedLessons={selectedLessons}
            isSelectedMode={isSelectedMode}
            setSelectedLessons={setSelectedLessons}
          />
          {!isSelectedMode && (
            <CourseRedactor setUpdateCourse={setUpdateCourse} />
          )}
        </div>
      </ShortLayout>
    </AuthLayout>
  );
}
