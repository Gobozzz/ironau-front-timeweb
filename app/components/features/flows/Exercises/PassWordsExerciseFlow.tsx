"use client";

import styles from "../Flow.module.css";
import api from "@api";
import { useEffect, useState } from "react";
import { SubmitButtonExercise } from "../SubmitButtonExercise";
import { ErrorsInput } from "@components/ui/ErrorsInput/ErrorsInput";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface Props {
  exercise: ExerciseFlow;
  refreshFlowForce: () => void;
  courseId?: number | null;
}

export function PassWordsExerciseFlow({
  exercise,
  refreshFlowForce,
  courseId = null,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ServerErrors>({});
  const [success, setSuccess] = useState<boolean>(false);
  const count_hidden_paths = exercise.content.reduce(
    (count: number, path: { type: string }) => {
      if (path.type === "hidden") {
        return count + 1;
      }
      return count;
    },
    0
  );
  const [answer, setAnswer] = useState<string[]>(
    new Array(count_hidden_paths).fill("")
  );

  function handlerSubmitAnswer() {
    if (answer.length === 0) {
      setErrors({ answer: ["Выберите ответы"] });
      return;
    }
    const count_empty_answers = answer.reduce(
      (count: number, answer_variant: string) => {
        if (answer_variant.trim().length === 0) {
          return count + 1;
        }
        return count;
      },
      0
    );
    if (count_empty_answers > 0) {
      setErrors({ answer: ["Заполните все пропуски"] });
      return;
    }
    setErrors({});
    setLoading(true);
    api
      .post(`/exercises/execute/${exercise.id}${courseId !== null ? `/${courseId}` : ''}`, {
        answer: answer,
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
    if (exercise.is_complete && exercise.answer?.body) {
      const true_answers: string[] = [];
      let index_answer = -1;
      exercise.answer.body.forEach(
        (answer_variant: { type: string; text: string }) => {
          if (answer_variant.type === "hidden") {
            true_answers[++index_answer] = answer_variant.text;
          }
        }
      );
      setAnswer(true_answers);
    }
  }, []);

  let index_hidden = -1;

  return (
    <div>
      <ErrorsInput errors={errors.answer} />
      <div className={styles.exercise_path_words_paths}>
        {exercise.content.map(
          (
            variant: { type: string; text?: string; variants?: string[] },
            index: number
          ) => {
            if (variant.type === "text") {
              return (
                <div
                  key={index}
                  className={styles.exercise_path_words_path_text}
                >
                  {variant.text || ""}
                </div>
              );
            } else if (variant.type === "hidden") {
              const local_index_hidden = ++index_hidden;
              return (
                <div key={index}>
                  <Select
                    disabled={exercise.is_complete || loading || success}
                    className={styles.hidden_block_pass_words_select}
                    value={answer[local_index_hidden]}
                    onChange={(event: SelectChangeEvent) => {
                      setAnswer((prev) => {
                        const copy_prev = [...prev];
                        copy_prev[local_index_hidden] = event.target
                          .value as string;
                        return copy_prev;
                      });
                    }}
                    sx={{ color: "black" }} // задаем черный цвет текста
                  >
                    {variant.variants &&
                      variant.variants.map(
                        (option: string, index_sub: number) => (
                          <MenuItem
                            key={index_sub}
                            className={styles.hidden_block_pass_words_option}
                            value={option}
                            sx={{ color: "black" }} // задаем черный цвет текста
                          >
                            {option}
                          </MenuItem>
                        )
                      )}
                  </Select>
                </div>
              );
            }
          }
        )}
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
