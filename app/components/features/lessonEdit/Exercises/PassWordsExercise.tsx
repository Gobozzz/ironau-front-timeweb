"use client";

import Image from "next/image";
import styles from "./Exercise.module.css";
import TrashBlueIcon from "@/public/icons/trash-blue.svg";
import PenIcon from "@/public/icons/pen-blue.svg";
import TranslateIcon from "@/public/icons/translate.svg";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TextCreateModal from "@components/modals/PassWordsExercise/TextCreateModal";
import EmptyCreateModal from "@components/modals/PassWordsExercise/EmptyCreateModal";
import EmptyUpdateModal from "@components/modals/PassWordsExercise/EmptyUpdateModal";
import TextUpdateModal from "@components/modals/PassWordsExercise/TextUpdateModal";
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

const TYPE_TEXT = "text";
const TYPE_HIDDEN = "hidden";

export function PassWordsExercise({
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

  const [isOpenModalTextCreate, setIsOpenModalTextCreate] =
    useState<boolean>(false);
  const [isOpenModalHiddenCreate, setIsOpenModalHiddenCreate] =
    useState<boolean>(false);

  const [dataUpdateEmptyVariant, setDataUpdateEmptyVariant] =
    useState<UpdateEmptyVariantExercise | null>(null);

  const [dataUpdateTextVariant, setDataUpdateTextVariant] =
    useState<UpdateTextVariantExercise | null>(null);

  function add_new_text(text: string) {
    const body = [...localData.content.body];
    body.push({
      type: TYPE_TEXT,
      text: text,
    });
    setLocalData({ ...localData, content: { body: body } });
  }

  function add_new_empty(text: string, variants: string[]) {
    const body = [...localData.content.body];
    body.push({
      type: TYPE_HIDDEN,
      text: text,
      variants: variants,
    });
    setLocalData({ ...localData, content: { body: body } });
  }

  function delete_path(index_path: number) {
    const body = [...localData.content.body];
    body.splice(index_path, 1);
    setLocalData({ ...localData, content: { body: body } });
  }

  const [localData, setLocalData] = useState<EditExercise>(data);

  useEffect(() => {
    updateExercise(idOrTempId, localData);
  }, [localData]);

  return (
    <>
      <TextCreateModal
        add_new_text={add_new_text}
        isModalOpen={isOpenModalTextCreate}
        handleClose={() => setIsOpenModalTextCreate(false)}
      />
      <EmptyCreateModal
        add_new_empty={add_new_empty}
        isModalOpen={isOpenModalHiddenCreate}
        handleClose={() => setIsOpenModalHiddenCreate(false)}
      />
      <EmptyUpdateModal
        data={dataUpdateEmptyVariant}
        handleClose={() => setDataUpdateEmptyVariant(null)}
        update_handler={(updated_data) => {
          const body = [...localData.content.body];
          if (body[updated_data.index] === undefined) {
            return;
          }
          body[updated_data.index].text = updated_data.title;
          body[updated_data.index].variants = updated_data.variants;
          setLocalData({ ...localData, content: { body: body } });
        }}
      />

      <TextUpdateModal
        data={dataUpdateTextVariant}
        handleClose={() => setDataUpdateTextVariant(null)}
        update_handler={(updated_data) => {
          const body = [...localData.content.body];
          if (body[updated_data.index] === undefined) {
            return;
          }
          body[updated_data.index].text = updated_data.title;
          setLocalData({ ...localData, content: { body: body } });
        }}
      />

      <div ref={setNodeRef} style={style} className={`${styles.wrapper}`}>
        <div className={styles.type}>Пропуск слова</div>
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
          <div className={styles.form_input_title}>Части текста</div>
          <div className={styles.pass_words_tools}>
            <button
              onClick={() => setIsOpenModalTextCreate(true)}
              className={`${styles.choise_tab} ${styles.active}`}
            >
              Обычный
            </button>
            <button
              onClick={() => setIsOpenModalHiddenCreate(true)}
              className={`${styles.choise_tab} ${styles.active} bg-orange!`}
            >
              С выбором
            </button>
          </div>
          <div className={styles.pass_words_paths}>
            {localData.content.body.map(
              (
                path: { text: string; type: string; variants?: string[] },
                index: number
              ) =>
                (path.type === TYPE_TEXT && (
                  <div key={index} className={styles.pass_words_path}>
                    <div className={styles.pass_words_path_empty_title}>
                      {path.text}
                    </div>
                    <div className={styles.pass_words_path_empty_tools}>
                      <button
                        onClick={() => delete_path(index)}
                        type="button"
                        className={styles.tool}
                      >
                        <Image src={TrashBlueIcon} alt="Удалить вариант" />
                      </button>
                      <button
                        onClick={() => {
                          setDataUpdateTextVariant({
                            index: index,
                            title: path.text,
                          });
                        }}
                        type="button"
                        className={styles.tool}
                      >
                        <Image src={PenIcon} alt="Изменить вариант" />
                      </button>
                    </div>
                  </div>
                )) ||
                (path.type === TYPE_HIDDEN && (
                  <div key={index} className={styles.pass_words_path_empty}>
                    <div className={styles.pass_words_path_empty_title}>
                      {path.text} ({path.variants?.length || 0})
                    </div>
                    <div className={styles.pass_words_path_empty_tools}>
                      <button
                        onClick={() => delete_path(index)}
                        type="button"
                        className={styles.tool}
                      >
                        <Image src={TrashBlueIcon} alt="Удалить вариант" />
                      </button>
                      <button
                        onClick={() => {
                          setDataUpdateEmptyVariant({
                            index: index,
                            title: path.text,
                            variants:
                              path.variants?.filter(
                                (variant) => variant !== path.text
                              ) || [],
                          });
                        }}
                        type="button"
                        className={styles.tool}
                      >
                        <Image src={PenIcon} alt="Изменить вариант" />
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
