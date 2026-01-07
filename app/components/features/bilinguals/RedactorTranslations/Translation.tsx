"use client";

import { TitleTranslation } from "./TitleTranslation";
import styles from "./RedactorTranslations.module.css";
import EditorEditBilingual from "@/app/components/shared/Editor/EditorEditBilingual";
import Image from "next/image";
import TrashIcon from "@/public/icons/trash-blue.svg";
import { OutputData } from "@editorjs/editorjs";

interface Props {
  errors: ServerErrors;
  translation: BilingualTranslationInterface;
  changeTranslation: (translation: BilingualTranslationInterface) => void;
  deletePart: (i: number) => void;
}

export function Translation({
  translation,
  changeTranslation,
  deletePart,
  errors,
}: Props) {

  function updateTitle(title: string) {
    translation.title = title;
    changeTranslation(translation);
  }

  function updateParts(dataOutput: OutputData, index: number) {
    if (translation.parts[index] === undefined) {
      return;
    }
    translation.parts[index] = {
      ...translation.parts[index],
      blocks: dataOutput.blocks,
      time: dataOutput.time,
      version: dataOutput.version,
    };
    changeTranslation(translation);
  }

  return (
    <>
      <TitleTranslation
        title_initial={translation.title}
        updateTitle={updateTitle}
      />
      <div className={styles.translation_parts}>
        {translation.parts.map((part, index) => (
          <div key={part.id} className={styles.translation_part}>
            <div className={styles.translation_part_number}>{index + 1}</div>
            <div className={styles.translation_part_redactor}>
              <EditorEditBilingual
                value={part}
                onChange={(data) => {
                  updateParts(data, index);
                }}
              />
            </div>
            <div className={styles.translation_part_tools}>
              <button
                onClick={() => deletePart(index)}
                className={styles.translation_part_tool}
                type="button"
              >
                <Image src={TrashIcon} alt="Удалить" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
