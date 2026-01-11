"use client";

import styles from "./Flow.module.css";

interface Props {
  exercises: ExerciseFlowAsideInteraface[];
  activeExercise: number | null;
  updateActiveExercise: (id: number) => void;
}

export function NavigateExcerciseLesson({
  exercises,
  activeExercise,
  updateActiveExercise,
}: Props) {
  const active_ex_index = exercises.findIndex((ex) => ex.id === activeExercise);
  if (active_ex_index === -1) return null;

  const previous_id =
    active_ex_index > 0 ? exercises[active_ex_index - 1].id : null;
  const next_id =
    active_ex_index < exercises.length - 1
      ? exercises[active_ex_index + 1].id
      : null;

  return (
    <div className={styles.navigate_exercises_items}>
      {previous_id && (
        <button
          onClick={() => updateActiveExercise(previous_id)}
          type="button"
          className={styles.navigate_exercises_item}
        >
          Предыдущее{" "}
          {typeof window !== "undefined" &&
            window.innerWidth >= 1200 &&
            "упражнение"}
        </button>
      )}
      {next_id && (
        <button
          onClick={() => updateActiveExercise(next_id)}
          type="button"
          className={styles.navigate_exercises_item}
        >
          Следующее{" "}
          {typeof window !== "undefined" &&
            window.innerWidth >= 1200 &&
            "упражнение"}
        </button>
      )}
    </div>
  );
}
