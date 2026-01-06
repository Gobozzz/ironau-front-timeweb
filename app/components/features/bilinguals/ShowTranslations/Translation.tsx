"use client";

import styles from "./ShowTranslations.module.css";
import DOMPurify from "dompurify";

interface Props {
  translation: BilingualTranslationInterface;
}

export function Translation({ translation }: Props) {
  return (
    <div>
      <div className={styles.translation_title}>{translation.title}</div>
      <div className={styles.translation_parts}>
        {translation.parts.map((pr, index) => (
          <div key={index} className={styles.translation_part}>
            <div className={styles.translation_part_number}>{index + 1}</div>
            {pr.blocks.map(
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
        ))}
      </div>
    </div>
  );
}
