"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Flow.module.css";
import { CourseMarkButton } from "./CourseMarkButton";

interface Props {
  flow: CourseFlow;
  updateActiveExercise: (id: number) => void;
  activeExercise: number | null;
  refreshFlowForce: () => void;
}

export function CourseSidebarFlow({
  flow,
  updateActiveExercise,
  activeExercise,
  refreshFlowForce,
}: Props) {
  const [localActiveExercise, setLocalActiveExercise] =
    useState(activeExercise);

  const [activeMobile, setActiveMobile] = useState<boolean>(false);

  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalActiveExercise(activeExercise);
  }, [activeExercise]);

  useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      if (localActiveExercise !== null) {
        updateActiveExercise(localActiveExercise);
      }
    }, 300);
  }, [localActiveExercise]);

  function handlerOpenMobile() {
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = "hidden";
    }
    setActiveMobile(true);
  }

  function handlerCloseMobile() {
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = "auto";
    }
    setActiveMobile(false);
  }

  return (
    <>
      <div className="hidden max-[1200px]:block">
        <button
          onClick={handlerOpenMobile}
          className={`${styles.show_sidebar_btn} glass_effect_bg`}
          type="button"
        >
          Список упражнений
        </button>
      </div>
      <div
        onClick={handlerCloseMobile}
        className={`${styles.close_sidebar} ${
          activeMobile ? styles.active : ""
        }`}
      ></div>
      <div
        className={`${styles.sidebar} hide-scrollbar ${
          activeMobile ? styles.active : ""
        }`}
      >
        {flow.can_rating && (
          <CourseMarkButton refreshFlowForce={refreshFlowForce} flow={flow} />
        )}
        <div className={styles.sidebar_title}>{flow.course.title}</div>
        <div className={styles.sidebar_items}>
          {flow.lessons.map((lesson, index) => (
            <div key={lesson.id} className={styles.sidebar_item}>
              <div
                className={`${styles.sidebar_item_lesson_title} line-clamp-1`}
              >
                {index + 1}. {lesson.title}
              </div>
              <div className={styles.sidebar_item_exercises}>
                {lesson.exercises.map((exercise, sub_index) => (
                  <button
                    onClick={() => {
                      setLocalActiveExercise(exercise.id);
                      handlerCloseMobile();
                    }}
                    type="button"
                    key={exercise.id}
                    className={`${styles.sidebar_item_exercise} ${
                      exercise.is_completed ? styles.completed : ""
                    } ${
                      localActiveExercise === exercise.id ? styles.active : ""
                    }`}
                  >
                    <div className="line-clamp-1">
                      {index + 1}.{sub_index + 1}
                    </div>
                    <div className="line-clamp-1">{exercise.title}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
