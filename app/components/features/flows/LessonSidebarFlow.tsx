"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Flow.module.css";
import { LessonMarkButton } from "./LessonMarkButton";

interface Props {
  flow: LessonFlow;
  updateActiveExercise: (id: number) => void;
  activeExercise: number | null;
  refreshFlowForce: () => void;
}

export function LessonSidebarFlow({
  flow,
  updateActiveExercise,
  activeExercise,
  refreshFlowForce,
}: Props) {
  const [localActiveExercise, setLocalActiveExercise] =
    useState(activeExercise);

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

  return (
    <div className={`${styles.sidebar} hide-scrollbar`}>
      {flow.can_rating && (
        <LessonMarkButton refreshFlowForce={refreshFlowForce} flow={flow} />
      )}
      <div className={styles.sidebar_title}>{flow.lesson.title}</div>
      <div className={styles.sidebar_item}>
        <div className={styles.sidebar_item_exercises}>
          {flow.exercises.map((exercise, index) => (
            <button
              onClick={() => {
                setLocalActiveExercise(exercise.id);
              }}
              type="button"
              key={exercise.id}
              className={`${styles.sidebar_item_exercise} ${
                exercise.is_completed ? styles.completed : ""
              } ${localActiveExercise === exercise.id ? styles.active : ""}`}
            >
              <div className="line-clamp-1">{index + 1}.</div>
              <div className="line-clamp-1">{exercise.title}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
