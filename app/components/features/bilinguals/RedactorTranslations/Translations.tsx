"use client";

import styles from "./RedactorTranslations.module.css";
import { useEffect, useState } from "react";
import { Translation } from "./Translation";

interface Props {
  errors: ServerErrors;
  translations: BilingualTranslationInterface[];
  activeTranslations: BilingualActiveTranslations;
  changeTranslations: (translations: BilingualTranslationInterface[]) => void;
  deletePart: (i: number) => void;
}

export function Translations({
  translations,
  activeTranslations,
  changeTranslations,
  deletePart,
  errors,
}: Props) {
  const [leftTranslation, setLeftTranslation] =
    useState<BilingualTranslationInterface | null>(null);

  const [rightTranslation, setRightTranslation] =
    useState<BilingualTranslationInterface | null>(null);

  useEffect(() => {
    setLeftTranslation(
      translations.find(
        (tr) =>
          tr.id === activeTranslations.left ||
          tr.tempId === activeTranslations.left
      ) || null
    );
    setRightTranslation(
      translations.find(
        (tr) =>
          tr.id === activeTranslations.right ||
          tr.tempId === activeTranslations.right
      ) || null
    );
  }, [translations, activeTranslations]);

  function changeTranslation(translation: BilingualTranslationInterface) {
    const index_translation = translations.findIndex(
      (tr) =>
        (tr.id === translation.id &&
          tr.id !== undefined &&
          translation.id !== undefined) ||
        (tr.tempId === translation.tempId &&
          tr.tempId !== undefined &&
          translation.tempId !== undefined)
    );

    if (index_translation === -1) {
      return;
    }
    const copy_translations = [...translations];
    copy_translations[index_translation] = translation;
    changeTranslations(copy_translations);
  }

  return (
    <div className={styles.translations}>
      <div className={styles.translation}>
        {leftTranslation && (
          <Translation
            errors={errors}
            deletePart={deletePart}
            changeTranslation={changeTranslation}
            translation={leftTranslation}
          />
        )}
        {!leftTranslation && <div className="text-center">Выберите язык</div>}
      </div>
      <div className={styles.translations_line}></div>
      <div className={styles.translation}>
        {rightTranslation && (
          <Translation
            errors={errors}
            deletePart={deletePart}
            changeTranslation={changeTranslation}
            translation={rightTranslation}
          />
        )}
        {!rightTranslation && <div className="text-center">Выберите язык</div>}
      </div>
    </div>
  );
}
