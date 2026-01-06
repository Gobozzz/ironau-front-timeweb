"use client";

import { useState } from "react";

import styles from "./ShowTranslations.module.css";
import { ChoiseTranslation } from "./ChoiseTranslation";
import DOMPurify from "dompurify";

interface Props {
  bilingual: BilingualShowInterface;
}

export function ShowTranslationsDesctop({ bilingual }: Props) {
  if (bilingual.translations.length === 0) {
    return <div className="my-3 text-lg">Переводы еще не были добавлены</div>;
  }

  const [leftTranslation, setLeftTranslation] = useState<number>(0);
  const [rightTranslation, setRightTranslation] = useState<number>(
    bilingual.translations.length > 1 ? 1 : 0
  );

  return (
    <div className="">
      <div className="flex items-stretch gap-8 w-full">
        <div className="flex-1">
          <ChoiseTranslation
            activeTranslation={leftTranslation}
            changeActiveTranslation={setLeftTranslation}
            translations={bilingual.translations}
          />
        </div>
        <div className={styles.line_inner}></div>
        <div className="flex-1">
          <ChoiseTranslation
            activeTranslation={rightTranslation}
            changeActiveTranslation={setRightTranslation}
            translations={bilingual.translations}
          />
        </div>
      </div>
      <div className="flex items-stretch gap-8 w-full">
        <div className="flex-1">
          <div className={styles.author_block}>
            <div className={styles.author_block_title}>Автор</div>
            <div className={styles.author_block_value}>{bilingual.author}</div>
          </div>
        </div>
        <div className={styles.line_inner}></div>
        <div className="flex-1">
          <div className={styles.author_block}>
            <div className={styles.author_block_title}>Перевели</div>
            <div className={styles.author_block_value}>
              {bilingual.translator}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-stretch gap-8 w-full">
        <div className="flex-1">
          <div className={styles.translation_title}>
            {bilingual.translations[leftTranslation].title}
          </div>
        </div>
        <div className={styles.line_inner}></div>
        <div className="flex-1">
          <div className={styles.translation_title}>
            {bilingual.translations[rightTranslation].title}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {bilingual.translations[leftTranslation].parts.map((_, index) => (
          <div
            key={`${bilingual.translations[leftTranslation].id}_${index}`}
            className="flex items-stretch gap-8 w-full"
          >
            <div className={styles.translation_part_desctop}>
              <div className={styles.translation_part_number}>{index + 1}</div>
              {bilingual.translations[leftTranslation].parts[index].blocks.map(
                (
                  block: { data: { text: string }; text: string },
                  sub_index: number
                ) => (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(block.data.text),
                    }}
                    key={sub_index}
                    className={styles.part_text}
                  />
                )
              )}
            </div>
            <div className={styles.line_inner}></div>
            <div className={styles.translation_part_desctop}>
              <div className={styles.translation_part_number}>{index + 1}</div>
              {bilingual.translations[rightTranslation].parts[index].blocks.map(
                (
                  block: { data: { text: string }; text: string },
                  sub_index: number
                ) => (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(block.data.text),
                    }}
                    key={sub_index}
                    className={styles.part_text}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
