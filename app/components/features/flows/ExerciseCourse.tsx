"use client";

import { useEffect, useState } from "react";
import styles from "./Flow.module.css";
import api from "@api";
import { Loader } from "@components/ui/Loader/Loader";
import { PageTitle } from "@components/ui/PageTitle/PageTitle";
import { ExerciseTypes } from "@enums";
import { TeoreticalExerciseFlow } from "./Exercises/TeoreticalExerciseFlow";
import { TextExerciseFlow } from "./Exercises/TextExerciseFlow";
import { SingleExerciseFlow } from "./Exercises/SingleExerciseFlow";
import { MultipleExerciseFlow } from "./Exercises/MultipleExerciseFlow";
import { PassWordsExerciseFlow } from "./Exercises/PassWordsExerciseFlow";
import { NavigateExcerciseCourse } from "./NavigateExcerciseCourse";
import { ProgressCourseFlow } from "../../shared/Progress/ProgressCourseFlow";

interface Props {
  flow: CourseFlow;
  id: number;
  activeExercises: ExerciseFlowAsideInteraface[];
  updateActiveExercise: (id: number) => void;
  activeExercise: number;
  refreshFlowForce: () => void;
}

export function ExerciseCourse({
  flow,
  id,
  updateActiveExercise,
  activeExercises,
  activeExercise,
  refreshFlowForce,
}: Props) {
  const [exercise, setExercise] = useState<ExerciseFlow | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`exercises/${id}/students/${flow.course.id}`)
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
      <div className="flex items-center w-full gap-6 mb-8">
        <ProgressCourseFlow
          className="w-full max-w-[380px]"
          percent={flow.progress}
        />
        <NavigateExcerciseCourse
          activeExercises={activeExercises}
          activeExercise={activeExercise}
          flow={flow}
          updateActiveExercise={updateActiveExercise}
        />
      </div>
      {exercise.description && (
        <div className={styles.exercise_flow_description}>
          {exercise.description}
        </div>
      )}
      {exercise.type === ExerciseTypes.TEORETICAL && (
        <TeoreticalExerciseFlow
          refreshFlowForce={refreshFlowForce}
          exercise={exercise}
          courseId={flow.course.id}
        />
      )}
      {exercise.type === ExerciseTypes.TEXT && (
        <TextExerciseFlow
          refreshFlowForce={refreshFlowForce}
          exercise={exercise}
          courseId={flow.course.id}
        />
      )}
      {exercise.type === ExerciseTypes.SINGLE && (
        <SingleExerciseFlow
          refreshFlowForce={refreshFlowForce}
          exercise={exercise}
          courseId={flow.course.id}
        />
      )}
      {exercise.type === ExerciseTypes.MULTIPLE && (
        <MultipleExerciseFlow
          refreshFlowForce={refreshFlowForce}
          exercise={exercise}
          courseId={flow.course.id}
        />
      )}
      {exercise.type === ExerciseTypes.PASS_WORD && (
        <PassWordsExerciseFlow
          refreshFlowForce={refreshFlowForce}
          exercise={exercise}
          courseId={flow.course.id}
        />
      )}
    </div>
  );
}
