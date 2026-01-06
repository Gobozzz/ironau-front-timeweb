"use client";

import Image from "next/image";
import styles from "./Exercise.module.css";
import TrashBlueIcon from "@/public/icons/trash-blue.svg";
import TranslateIcon from "@/public/icons/translate.svg";
import EditorEdit from "@components/shared/Editor/EditorEdit";
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

export function TeoreticalExercise({
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
      <div className={styles.type}>Теоретический материал</div>
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
      <div className={`${styles.form_item}`}>
        <EditorEdit
          value={localData.content.body}
          onChange={(output) => {
            setLocalData((prev) => {
              const tmp = { ...prev };
              tmp.content.body = output;
              return tmp;
            });
          }}
        />
      </div>
    </div>
  );
}
