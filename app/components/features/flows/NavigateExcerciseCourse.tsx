"use client";

import styles from "./Flow.module.css";

interface Props {
  flow: CourseFlow;
  activeExercise: number;
  updateActiveExercise: (id: number) => void;
  activeExercises: ExerciseFlowAsideInteraface[];
}

export function NavigateExcerciseCourse({
  flow,
  activeExercise,
  updateActiveExercise,
  activeExercises,
}: Props) {
  const active_ex_index = activeExercises.findIndex(
    (ex) => ex.id === activeExercise
  );
  if (active_ex_index === -1) return null;

  const previous_id =
    active_ex_index > 0 ? activeExercises[active_ex_index - 1].id : null;
  const next_id =
    active_ex_index < activeExercises.length - 1
      ? activeExercises[active_ex_index + 1].id
      : null;

  const index_current_lesson = flow.lessons.findIndex((lesson, index) => {
    if (
      lesson.exercises.findIndex(
        (exercise) => exercise.id === activeExercise
      ) !== -1
    ) {
      return true;
    }
    return false;
  });

  const next_lesson_first_exercise_id =
    index_current_lesson === -1
      ? null
      : flow.lessons[index_current_lesson + 1] === undefined
      ? null
      : flow.lessons[index_current_lesson + 1].exercises[0].id;

  return (
    <div className={`${styles.navigate_exercises_items} mb-0!`}>
      {previous_id && (
        <button
          onClick={() => updateActiveExercise(previous_id)}
          type="button"
          className={styles.navigate_exercises_item}
        >
          Предыдущее упражнение
        </button>
      )}
      {next_id && (
        <button
          onClick={() => updateActiveExercise(next_id)}
          type="button"
          className={styles.navigate_exercises_item}
        >
          Следующее упражнение
        </button>
      )}
      {next_id === null && next_lesson_first_exercise_id !== null && (
        <button
          onClick={() => updateActiveExercise(next_lesson_first_exercise_id)}
          type="button"
          className={styles.navigate_exercises_item}
        >
          Следующий урок
        </button>
      )}
    </div>
  );
}
