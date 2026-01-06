"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./RedactorTranslations.module.css";
import { TranslationPart } from "./TranslationPart";

interface Props {
  parts_initial: any[];
  updateParts: (parts: TranslationsPart[]) => void;
  translationId: number | string;
}

export function PartsTranslation({
  parts_initial,
  updateParts,
  translationId,
}: Props) {
  const [parts, setParts] = useState<any[]>(parts_initial);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      updateParts(parts);
    }, 500);

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [parts]);

  useEffect(() => {
    setParts(parts_initial);
  }, [parts_initial]);

  return (
    <div className={styles.translation_parts}>
      {parts.map((part, index) => (
        <TranslationPart
          part={part}
          key={`${translationId}_${index}`}
          index={index}
          setParts={setParts}
        />
      ))}
    </div>
  );
}
