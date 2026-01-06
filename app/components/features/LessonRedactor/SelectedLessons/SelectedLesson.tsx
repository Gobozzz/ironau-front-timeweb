"use client";

import Image from "next/image";
import styles from "./SelectedLessons.module.css";
import TranslateIcon from "@/public/icons/translate.svg";
import TrashIcon from "@/public/icons/trash-blue.svg";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  item: SelectedLessonRedactor;
  index: number;
  setSelectedLessons: React.Dispatch<
    React.SetStateAction<SelectedLessonRedactor[]>
  >;
}

export function SelectedLesson({ item, index, setSelectedLessons }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} key={item.id} className={styles.item}>
      <div className={styles.item_tools}>
        <div className={styles.count}>{index + 1}</div>
        <button
          ref={setActivatorNodeRef}
          style={{ cursor: "grab" }}
          {...attributes}
          {...listeners}
          className={styles.tool}
        >
          <Image src={TranslateIcon} alt="Переместить выбранный урок" />
        </button>
        <button
          className={styles.tool}
          onClick={() => {
            setSelectedLessons((prev) => {
              const copy_selected = [...prev];
              return copy_selected.filter((selItem) => selItem.id !== item.id);
            });
          }}
        >
          <Image src={TrashIcon} alt="Удалить выбранный урок" />
        </button>
      </div>
      <div className={styles.item_title}>{item.title}</div>
    </div>
  );
}
