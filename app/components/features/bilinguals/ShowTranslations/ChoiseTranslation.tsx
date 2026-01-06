"use client";

import styles from "./ShowTranslations.module.css";

interface Props {
  translations: BilingualTranslationInterface[];
  activeTranslation: number;
  changeActiveTranslation: React.Dispatch<React.SetStateAction<number>>;
}

export function ChoiseTranslation({
  translations,
  activeTranslation,
  changeActiveTranslation,
}: Props) {
  return (
    <div className={styles.choise}>
      <div className={styles.choise_title}>Выберите язык</div>
      <div className={styles.choise_items}>
        {translations.map((tr, index) => (
          <button
            key={index}
            onClick={() => {
              changeActiveTranslation(index);
            }}
            className={`${styles.choise_item} ${
              activeTranslation === index ? styles.active : ""
            }`}
          >
            {tr.language?.title}
          </button>
        ))}
      </div>
    </div>
  );
}
