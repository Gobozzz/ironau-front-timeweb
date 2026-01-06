"use client";

import styles from "../Flow.module.css";
import api from "@api";
import { useEffect, useState } from "react";
import { SubmitButtonExercise } from "../SubmitButtonExercise";
import { ErrorsInput } from "@components/ui/ErrorsInput/ErrorsInput";
import { RoundedCheckbox } from "@components/ui/Checkbox/RoundedCheckbox";

interface Props {
  exercise: ExerciseFlow;
  refreshFlowForce: () => void;
  courseId?: number | null;
}

export function MultipleExerciseFlow({
  exercise,
  refreshFlowForce,
  courseId = null,
}: Props) {
  const [answer, setAnswer] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ServerErrors>({});
  const [success, setSuccess] = useState<boolean>(false);

  function handlerSubmitAnswer() {
    if (answer.length === 0) {
      setErrors({ answer: ["Выберите ответы"] });
      return;
    }
    const answers = exercise.content.filter((variant: string, index: number) =>
      answer.includes(index)
    );
    setErrors({});
    setLoading(true);
    api
      .post(`/exercises/execute/${exercise.id}${courseId !== null ? `/${courseId}` : ''}`, {
        answer: answers,
      })
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
      let correct_answers_titles: string[] = [];
      correct_answers.forEach(
        (correct_a: { title: string; is_correct: boolean }) => {
          if (correct_a.is_correct) {
            correct_answers_titles.push(correct_a.title);
          }
        }
      );
      const correct_indexs_in_variants: number[] = [];
      exercise.content.forEach((variant: string, index: number) => {
        if (correct_answers_titles.includes(variant)) {
          correct_indexs_in_variants.push(index);
        }
      });
      setAnswer(correct_indexs_in_variants);
    }
  }, []);

  return (
    <div>
      <ErrorsInput errors={errors.answer} />
      <div className={styles.exercise_answer_variant_items}>
        {exercise.content.map((variant: string, index: number) => (
          <div key={index} className={styles.exercise_answer_variant_item}>
            <RoundedCheckbox
              disabled={loading || success || exercise.is_complete}
              checked={answer.includes(index)}
              onChange={() => {
                if (answer.includes(index)) {
                  setAnswer((prev) => {
                    let prev_copy = [...prev];
                    prev_copy = prev_copy.filter((item) => item !== index);
                    return prev_copy;
                  });
                } else {
                  setAnswer((prev) => {
                    const prev_copy = [...prev];
                    prev_copy.push(index);
                    return prev_copy;
                  });
                }
              }}
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
