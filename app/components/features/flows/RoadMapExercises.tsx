"use client";

import { ExerciseTypes } from "@enums";
import styles from "./Flow.module.css";
import { MultipleExerciseIcon } from "@components/ui/Icons/Flow/MultipleExerciseIcon";
import { SingleExerciseIcon } from "@components/ui/Icons/Flow/SingleExerciseIcon";
import { TextExerciseIcon } from "@components/ui/Icons/Flow/TextExerciseIcon";
import { PassWordsExerciseIcon } from "@components/ui/Icons/Flow/PassWordsExerciseIcon";
import { TeoreticalExerciseIcon } from "@components/ui/Icons/Flow/TeoreticalExerciseIcon";
import { useEffect, useRef, useState } from "react";

interface Props {
  exercises: ExerciseFlowAsideInteraface[];
  updateActiveExercise: (id: number) => void;
  activeExercise: number | null;
}

function getIconByType(type: number) {
  switch (type) {
    case ExerciseTypes.MULTIPLE:
      return MultipleExerciseIcon;
    case ExerciseTypes.SINGLE:
      return SingleExerciseIcon;
    case ExerciseTypes.TEXT:
      return TextExerciseIcon;
    case ExerciseTypes.PASS_WORD:
      return PassWordsExerciseIcon;
    case ExerciseTypes.TEORETICAL:
      return TeoreticalExerciseIcon;
    default:
      return TeoreticalExerciseIcon;
  }
}

export function RoadMapExercises({
  exercises,
  updateActiveExercise,
  activeExercise,
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
    <div className={styles.roadmap_exercises}>
      {exercises.map((exercise) => {
        const IconComponent = getIconByType(exercise.type);
        return (
          <button
            onClick={() => setLocalActiveExercise(exercise.id)}
            key={exercise.id}
            className={`${styles.roadmap_exercise} ${
              exercise.id === localActiveExercise ? styles.active : ""
            } ${exercise.is_completed ? styles.completed : ""}`}
          >
            <IconComponent
              color={exercise.is_completed ? "var(--white)" : "var(--black)"}
            />
          </button>
        );
      })}
    </div>
  );
}
