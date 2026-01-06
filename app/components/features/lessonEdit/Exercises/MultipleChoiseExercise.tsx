"use client";

import Image from "next/image";
import styles from "./Exercise.module.css";
import TrashBlueIcon from "@/public/icons/trash-blue.svg";
import TranslateIcon from "@/public/icons/translate.svg";
import { ErrorsInput } from "@components/ui/ErrorsInput/ErrorsInput";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  data: EditExercise;
  idOrTempId: number | string;
  updateExercise: (idOrTempId: number | string, data: EditExercise) => void;
  deleteExercise: (idOrTempId: number | string) => void;
  index: number;
  errors: ServerErrors;
  setErrors: Dispatch<SetStateAction<ServerErrors>>;
}

export function MultipleChoiseExercise({
  data,
  idOrTempId,
  updateExercise,
  deleteExercise,
  index,
  errors,
  setErrors,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: idOrTempId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [localData, setLocalData] = useState<EditExercise>(data);

  useEffect(() => {
    updateExercise(idOrTempId, localData);
  }, [localData]);

  return (
    <div ref={setNodeRef} style={style} className={`${styles.wrapper}`}>
      <div className={styles.type}>Множественный выбор</div>
      <ErrorsInput errors={errors[`exercises.${index}`]} />
      <div className={styles.tools}>
        <div className={styles.order}>{index + 1}</div>
        <button
          onClick={() => deleteExercise(idOrTempId)}
          type="button"
          className={styles.tool}
        >
          <Image src={TrashBlueIcon} alt="Удалить упражнение" />
        </button>
        <button
          ref={setActivatorNodeRef}
          style={{ cursor: "grab" }}
          {...attributes}
          {...listeners}
          type="button"
          className={styles.tool}
        >
          <Image src={TranslateIcon} alt="Переместить упражнение" />
        </button>
      </div>
      <div className={styles.form_item}>
        <input
          value={localData.title}
          onChange={(e) => {
            setLocalData({ ...localData, title: e.target.value });
          }}
          className={styles.form_input}
          type="text"
          placeholder="Заголовок"
        />
        <ErrorsInput errors={errors[`exercises.${index}.title`]} />
      </div>
      <div className={styles.form_item}>
        <input
          value={localData.description || ""}
          onChange={(e) => {
            setLocalData({ ...localData, description: e.target.value });
          }}
          className={styles.form_input}
          type="text"
          placeholder="Описание"
        />
        <ErrorsInput errors={errors[`exercises.${index}.description`]} />
      </div>
      <div className={styles.form_item}>
        <div className={styles.form_input_title}>Ответы</div>
        <div className={styles.choises}>
          {localData.content.answers.map(
            (answer: { title: string; is_correct: boolean }, index: number) => (
              <div key={index} className={styles.choise}>
                <input
                  value={answer.title}
                  onChange={(e) => {
                    const new_answers = [...localData.content.answers];
                    new_answers[index].title = e.target.value;
                    setLocalData({
                      ...localData,
                      content: { answers: new_answers },
                    });
                  }}
                  className={styles.form_input}
                  type="text"
                  placeholder={`Вариант ${index + 1}`}
                />
                <div className={styles.choises_tabs}>
                  <button
                    onClick={() => {
                      const new_answers = [...localData.content.answers];
                      new_answers[index].is_correct = true;
                      setLocalData({
                        ...localData,
                        content: { answers: new_answers },
                      });
                    }}
                    className={`${styles.choise_tab} ${
                      answer.is_correct ? styles.active : ""
                    }`}
                    type="button"
                  >
                    Верный
                  </button>
                  <button
                    onClick={() => {
                      const new_answers = [...localData.content.answers];
                      new_answers[index].is_correct = false;
                      setLocalData({
                        ...localData,
                        content: { answers: new_answers },
                      });
                    }}
                    className={`${styles.choise_tab} ${
                      !answer.is_correct ? styles.active : ""
                    }`}
                    type="button"
                  >
                    Неверный
                  </button>
                </div>
                <button
                  onClick={() => {
                    const new_answers = [...localData.content.answers];
                    new_answers.splice(index, 1);
                    setLocalData({
                      ...localData,
                      content: { answers: new_answers },
                    });
                  }}
                  type="button"
                  className={styles.tool}
                >
                  <Image src={TrashBlueIcon} alt="Удалить вариант" />
                </button>
              </div>
            )
          )}
        </div>
      </div>
      <div className={styles.form_item}>
        <button
          onClick={() => {
            const new_answers = [...localData.content.answers];
            new_answers.push({
              title: "",
              is_correct: false,
            });
            setLocalData({
              ...localData,
              content: { answers: new_answers },
            });
          }}
          type="button"
          className={styles.add_choise_button}
        >
          Добавить вариант
        </button>
      </div>
    </div>
  );
}
