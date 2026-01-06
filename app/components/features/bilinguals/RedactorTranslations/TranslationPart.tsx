"use client";

import EditorEditBilingual from "@/app/components/shared/Editor/EditorEditBilingual";
import { useEffect, useState } from "react";
import TrashIcon from "@/public/icons/trash-blue.svg";
import Image from "next/image";

import styles from "./RedactorTranslations.module.css";

interface Props {
  part: TranslationsPart;
  index: number;
  setParts: React.Dispatch<React.SetStateAction<any[]>>;
}

export function TranslationPart({ part, index, setParts }: Props) {
  const [localData, setLocalData] = useState<any>(part);

  useEffect(() => {
    setLocalData(part);
  }, [part]);

  return (
    <div key={index} className={styles.translation_part}>
      <div className={styles.translation_part_number}>{index + 1}</div>
      <div className={styles.translation_part_redactor}>
        <EditorEditBilingual
          value={localData}
          onChange={(data) => {
            setParts((prev) => {
              const copy_prev = [...prev];
              copy_prev[index] = data;
              return copy_prev;
            });
          }}
        />
      </div>
      <div className={styles.translation_part_tools}>
        <button className={styles.translation_part_tool} type="button">
          <Image src={TrashIcon} alt="Удалить" />
        </button>
      </div>
    </div>
  );
}
