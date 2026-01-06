"use client";

import { useState } from "react";

import styles from "./ShowTranslations.module.css";
import { ChoiseTranslation } from "./ChoiseTranslation";
import { Translation } from "./Translation";

interface Props {
  bilingual: BilingualShowInterface;
}

export function ShowTranslations({ bilingual }: Props) {
  if (bilingual.translations.length === 0) {
    return <div className="my-3 text-lg">Переводы еще не были добавлены</div>;
  }

  const [leftTranslation, setLeftTranslation] = useState<number>(0);
  const [rightTranslation, setRightTranslation] = useState<number>(
    bilingual.translations.length > 1 ? 1 : 0
  );

  return (
    <div className={styles.main_inner}>
      <div className={styles.inner_part}>
        <ChoiseTranslation
          activeTranslation={leftTranslation}
          changeActiveTranslation={setLeftTranslation}
          translations={bilingual.translations}
        />
        <div className={styles.author_block}>
          <div className={styles.author_block_title}>Автор</div>
          <div className={styles.author_block_value}>{bilingual.author}</div>
        </div>
        <Translation translation={bilingual.translations[leftTranslation]} />
      </div>
      <div className={styles.line_inner}></div>
      <div className={styles.inner_part}>
        <ChoiseTranslation
          activeTranslation={rightTranslation}
          changeActiveTranslation={setRightTranslation}
          translations={bilingual.translations}
        />
        <div className={styles.author_block}>
          <div className={styles.author_block_title}>Перевели</div>
          <div className={styles.author_block_value}>
            {bilingual.translator}
          </div>
        </div>
        <Translation translation={bilingual.translations[rightTranslation]} />
      </div>
    </div>
  );
}
