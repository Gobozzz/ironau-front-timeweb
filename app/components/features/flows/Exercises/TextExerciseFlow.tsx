"use client";

import styles from "../Flow.module.css";
import api from "@api";
import { useState } from "react";
import { SubmitButtonExercise } from "../SubmitButtonExercise";
import { ErrorsInput } from "@/app/components/ui/ErrorsInput/ErrorsInput";

interface Props {
  exercise: ExerciseFlow;
  refreshFlowForce: () => void;
  courseId?: number | null;
}

export function TextExerciseFlow({
  exercise,
  refreshFlowForce,
  courseId = null,
}: Props) {
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ServerErrors>({});
  const [success, setSuccess] = useState<boolean>(false);

  function handlerSubmitAnswer() {
    let localErrors: ServerErrors = {};
    if (answer.trim().length === 0) {
      localErrors.answer = ["Заполните ответ"];
    }
    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
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
          answer: answer.trim(),
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
          res_errors = ["Ответ неверный. Часто бывает так, что обучающиеся пишут букву Æ/æ как 'ае'."];
        }
        setErrors({ answer: res_errors });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <ErrorsInput errors={errors.answer} />
      <input
        placeholder="Введите ответ здесь"
        disabled={success || loading || exercise.is_complete}
        className={styles.text_exercise_input}
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
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
      {exercise.is_complete && exercise.answer?.correct_words && (
        <>
          <div className={styles.success_answer}>Подходящие слова:</div>
          <div className="flex flex-col gap-1">
            {exercise.answer?.correct_words.map(
              (correct_word: string, index: number) => (
                <div className={styles.success_answer} key={index}>
                  - {correct_word}
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
