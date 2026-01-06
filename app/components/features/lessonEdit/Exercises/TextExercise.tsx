"use client";

import Image from "next/image";
import styles from "./Exercise.module.css";
import TrashBlueIcon from "@/public/icons/trash-blue.svg";
import TranslateIcon from "@/public/icons/translate.svg";
import KrestBlueIcon from "@/public/icons/krest-blue.svg";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ErrorsInput } from "@components/ui/ErrorsInput/ErrorsInput";

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

export function TextExercise({
  data,
  idOrTempId,
  updateExercise,
  deleteExercise,
  index,
  errors,
  setErrors,
}: Props) {
  const [newCorrectWord, setNewCorrectWord] = useState<string>("");

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

  function delete_correct_word(indexCorrectWord: number) {
    const new_correct_words = [...localData.content.correct_words];
    new_correct_words.splice(indexCorrectWord, 1);
    setLocalData({
      ...localData,
      content: { correct_words: new_correct_words },
    });
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = newCorrectWord.trim();
      if (value.length > 0) {
        const new_correct_words = [...localData.content.correct_words];
        new_correct_words.push(value);
        setLocalData({
          ...localData,
          content: { correct_words: new_correct_words },
        });
        setNewCorrectWord("");
      }
    }
  };

  return (
    <div ref={setNodeRef} style={style} className={`${styles.wrapper}`}>
      <div className={styles.type}>Текстовый ввод</div>
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
        <div className={styles.form_input_title}>Введите правильные ответы</div>
        <input
          value={newCorrectWord}
          onChange={(e) => setNewCorrectWord(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.form_input}
          type="text"
          placeholder="Вводите здесь"
        />
      </div>
      <div className={styles.correct_words_inner}>
        {localData.content.correct_words.map(
          (word: string, indexCorrectWord: number) => (
            <div key={indexCorrectWord} className={styles.correct_word}>
              {word}
              <button
                onClick={() => delete_correct_word(indexCorrectWord)}
                className={styles.correct_word_delete}
              >
                <Image src={KrestBlueIcon} alt="Удалить" />
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
