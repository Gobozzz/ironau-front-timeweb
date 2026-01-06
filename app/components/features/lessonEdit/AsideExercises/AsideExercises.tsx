"use client";

import Image from "next/image";
import styles from "./AsideExercises.module.css";

import BookIcon from "@/public/icons/book.svg";
import PenIcon from "@/public/icons/pen.svg";
import SingleIcon from "@/public/icons/single-choise.svg";
import MultipleIcon from "@/public/icons/multiple-choise.svg";
import PassWordsIcon from "@/public/icons/pass_words.svg";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import { ExerciseTypes } from "@/app/enums";

function addTeoreticalExercise(
  setExercises: Dispatch<SetStateAction<EditExercise[]>>
) {
  setExercises((prev) => [
    ...prev,
    {
      title: "",
      description: null,
      order: prev.length,
      tempId: uuidv4(),
      type: ExerciseTypes.TEORETICAL,
      content: {
        time: Date.now(),
        blocks: [],
        version: "2.31.0",
      },
    },
  ]);
}

function addTextExercise(
  setExercises: Dispatch<SetStateAction<EditExercise[]>>
) {
  setExercises((prev) => [
    ...prev,
    {
      title: "",
      description: "",
      order: prev.length,
      tempId: uuidv4(),
      type: ExerciseTypes.TEXT,
      content: { correct_words: [] },
    },
  ]);
}

function addSingleChoiseExercise(
  setExercises: Dispatch<SetStateAction<EditExercise[]>>
) {
  setExercises((prev) => [
    ...prev,
    {
      title: "",
      description: "",
      order: prev.length,
      tempId: uuidv4(),
      type: ExerciseTypes.SINGLE,
      content: {
        answers: [
          { title: "", is_correct: true },
          { title: "", is_correct: false },
        ],
      },
    },
  ]);
}

function MultipleChoiseExercise(
  setExercises: Dispatch<SetStateAction<EditExercise[]>>
) {
  setExercises((prev) => [
    ...prev,
    {
      title: "",
      description: "",
      order: prev.length,
      tempId: uuidv4(),
      type: ExerciseTypes.MULTIPLE,
      content: {
        answers: [
          { title: "", is_correct: true },
          { title: "", is_correct: false },
        ],
      },
    },
  ]);
}

function PassWordsExercise(
  setExercises: Dispatch<SetStateAction<EditExercise[]>>
) {
  setExercises((prev) => [
    ...prev,
    {
      title: "",
      description: "",
      order: prev.length,
      tempId: uuidv4(),
      type: ExerciseTypes.PASS_WORD,
      content: {
        body: [],
      },
    },
  ]);
}

const items = [
  {
    title: "Теоретический материал",
    icon: BookIcon,
    callback: addTeoreticalExercise,
  },
  {
    title: "Текстовый ввод",
    icon: PenIcon,
    callback: addTextExercise,
  },
  {
    title: "Единичный выбор",
    icon: SingleIcon,
    callback: addSingleChoiseExercise,
  },
  {
    title: "Множественный выбор",
    icon: MultipleIcon,
    callback: MultipleChoiseExercise,
  },
  {
    title: "Пропуск слова",
    icon: PassWordsIcon,
    callback: PassWordsExercise,
  },
];

interface Props {
  setExercises: Dispatch<SetStateAction<EditExercise[]>>;
}

export function AsideExercises({ setExercises }: Props) {
  return (
    <div className={styles.aside}>
      <div className={styles.title}>Добавить упражнение</div>
      {items.map((item, index) => (
        <button
          onClick={() => {
            item.callback(setExercises);
            setTimeout(() => {
              const exercises_nodes =
                document.querySelectorAll(".exercise-item");
              if (exercises_nodes.length) {
                exercises_nodes[exercises_nodes.length - 1].scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }, 250);
          }}
          className={styles.item}
          key={index}
          type="button"
        >
          <div className={styles.logo}>
            <Image src={item.icon} alt={item.title} />
          </div>
          {item.title}
        </button>
      ))}
    </div>
  );
}
