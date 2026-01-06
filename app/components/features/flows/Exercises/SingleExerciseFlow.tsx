"use client";

import styles from "../Flow.module.css";
import api from "@api";
import { useEffect, useState } from "react";
import { SubmitButtonExercise } from "../SubmitButtonExercise";
import { ErrorsInput } from "@components/ui/ErrorsInput/ErrorsInput";
import { CustomRadioButton } from "@components/ui/RadioButton/RadioButton";

interface Props {
  exercise: ExerciseFlow;
  refreshFlowForce: () => void;
  courseId?: number | null;
}

export function SingleExerciseFlow({
  exercise,
  refreshFlowForce,
  courseId = null,
}: Props) {
  const [answer, setAnswer] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ServerErrors>({});
  const [success, setSuccess] = useState<boolean>(false);

  function handlerSubmitAnswer() {
    if (answer === null || exercise.content[answer] === undefined) {
      setErrors({ answer: ["Выберите ответ"] });
      return;
    }
    setErrors({});
    setLoading(true);
    api
      .post(
        `/exercises/execute/${exercise.id}${
          courseId !== null ? `/${courseId}` : ""
        }`,
        {
          answer: exercise.content[answer].trim(),
        }
      )
      .then(() => {
        setSuccess(true);
        refreshFlowForce();
      })
      .catch((err) => {
        let res_errors = [];
        if (err.response?.status === 403) {
          res_errors = ["Ошибка доступа к упражнению. Перезагрузите страницу."];
        } else if (err.response?.status === 429) {
          res_errors = [
            "Вы превысили количество запросов. Подождите 1 минутку и попробуйте еще.",
          ];
        } else {
          res_errors = ["Ответ неверный. Попробуйте еще."];
        }
        setErrors({ answer: res_errors });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (exercise.is_complete && exercise.answer?.answers) {
      const correct_answers = exercise.answer?.answers;
      const index_correct = correct_answers.findIndex(
        (answer_item: { title: string; is_correct: boolean }) =>
          answer_item.is_correct
      );
      if (index_correct === -1) {
        return;
      }
      const correct_answer = correct_answers[index_correct];
      const correct_index_in_variants = exercise.content.findIndex(
        (variant: string) => variant === correct_answer.title
      );
      if (correct_index_in_variants === -1) {
        return;
      }
      setAnswer(correct_index_in_variants);
    }
  }, []);

  return (
    <div>
      <ErrorsInput errors={errors.answer} />
      <div className={styles.exercise_answer_variant_items}>
        {exercise.content.map((variant: string, index: number) => (
          <div key={index} className={styles.exercise_answer_variant_item}>
            <CustomRadioButton
              disabled={loading || success || exercise.is_complete}
              checked={index === answer}
              onChange={() => setAnswer(index)}
            />
            <div className={styles.exercise_answer_variant_item_title}>
              {variant}
            </div>
          </div>
        ))}
      </div>
      {!success && !exercise.is_complete && (
        <SubmitButtonExercise
          disabled={loading || exercise.is_complete || success}
          loading={loading}
          callback={handlerSubmitAnswer}
        />
      )}
      {(success || exercise.is_complete) && (
        <div className={styles.success_answer}>Вы ответили верно!</div>
      )}
    </div>
  );
}
