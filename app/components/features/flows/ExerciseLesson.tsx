"use client";

import { useEffect, useState } from "react";
import styles from "./Flow.module.css";
import api from "@api";
import { Loader } from "@components/ui/Loader/Loader";
import { PageTitle } from "@components/ui/PageTitle/PageTitle";
import { NavigateExcerciseLesson } from "./NavigateExcerciseLesson";
import { ExerciseTypes } from "@enums";
import { TeoreticalExerciseFlow } from "./Exercises/TeoreticalExerciseFlow";
import { TextExerciseFlow } from "./Exercises/TextExerciseFlow";
import { SingleExerciseFlow } from "./Exercises/SingleExerciseFlow";
import { MultipleExerciseFlow } from "./Exercises/MultipleExerciseFlow";
import { PassWordsExerciseFlow } from "./Exercises/PassWordsExerciseFlow";

interface Props {
  id: number;
  exercises: ExerciseFlowAsideInteraface[];
  updateActiveExercise: (id: number) => void;
  activeExercise: number | null;
  refreshFlowForce: () => void;
}

export function ExerciseLesson({
  id,
  updateActiveExercise,
  exercises,
  activeExercise,
  refreshFlowForce,
}: Props) {
  const [exercise, setExercise] = useState<ExerciseFlow | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`exercises/${id}/students`)
      .then((data) => {
        setExercise(data.data.data);
      })
      .catch(() => {
        setExercise(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="w-full flex items-center h-[50vh] justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (exercise === null) {
    return (
      <div className="w-full flex items-center h-[50vh] justify-center">
        Не удалось получить упражнение, обновите страницу
      </div>
    );
  }

  return (
    <div className={styles.exercise_flow}>
      <PageTitle className="text-black!">{exercise.title}</PageTitle>
      <NavigateExcerciseLesson
        exercises={exercises}
        activeExercise={activeExercise}
        updateActiveExercise={updateActiveExercise}
      />
      {exercise.description && (
        <div className={styles.exercise_flow_description}>
          {exercise.description}
        </div>
      )}
      {exercise.type === ExerciseTypes.TEORETICAL && (
        <TeoreticalExerciseFlow
          refreshFlowForce={refreshFlowForce}
          exercise={exercise}
        />
      )}
      {exercise.type === ExerciseTypes.TEXT && (
        <TextExerciseFlow
          refreshFlowForce={refreshFlowForce}
          exercise={exercise}
        />
      )}
      {exercise.type === ExerciseTypes.SINGLE && (
        <SingleExerciseFlow
          refreshFlowForce={refreshFlowForce}
          exercise={exercise}
        />
      )}
      {exercise.type === ExerciseTypes.MULTIPLE && (
        <MultipleExerciseFlow
          refreshFlowForce={refreshFlowForce}
          exercise={exercise}
        />
      )}
      {exercise.type === ExerciseTypes.PASS_WORD && (
        <PassWordsExerciseFlow
          refreshFlowForce={refreshFlowForce}
          exercise={exercise}
        />
      )}
    </div>
  );
}
