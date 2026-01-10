"use client";

import Image from "next/image";
import styles from "./AsideExercises.module.css";

import BookIcon from "@/public/icons/book.svg";
import PenIcon from "@/public/icons/pen.svg";
import SingleIcon from "@/public/icons/single-choise.svg";
import MultipleIcon from "@/public/icons/multiple-choise.svg";
import PassWordsIcon from "@/public/icons/pass_words.svg";
import { Dispatch, SetStateAction, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ExerciseTypes } from "@/app/enums";
import KrestCloseIcon from "@/public/icons/krest-close.svg";

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
  const [activeMobile, setActiveMobile] = useState<boolean>(false);

  function handlerOpenMobile() {
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = "hidden";
    }
    setActiveMobile(true)
  }

  function handlerCloseMobile() {
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = "auto";
    }
    setActiveMobile(false)
  }

  return (
    <>
      <div className="hidden max-[1200px]:block">
        <button
          onClick={handlerOpenMobile}
          className="glass_effect_bg fixed bottom-2.5 left-2.5 right-2.5 h-11 rounded-[14px] z-4 text-[12px]"
          type="button"
        >
          Добавить упражнение
        </button>
      </div>
      <div
        onClick={handlerCloseMobile}
        className={`${styles.aside_close} ${activeMobile ? styles.active : ""}`}
      ></div>
      <div className={`${styles.aside} ${activeMobile ? styles.active : ""}`}>
        <div>
          <div className="hidden max-[1200px]:block">
            <button
              className="absolute right-2.5 top-3 min-w-11 min-h-11 flex! items-center justify-center ml-auto"
              type="button"
              onClick={handlerCloseMobile}
            >
              <Image src={KrestCloseIcon} alt="Закрыть" />
            </button>
          </div>
          <div className={styles.title}>Добавить упражнение</div>
        </div>
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
    </>
  );
}
