"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./RedactorTranslations.module.css";

interface Props {
  title_initial: string;
  updateTitle: (title: string) => void;
}

export function TitleTranslation({ title_initial, updateTitle }: Props) {
  const [title, setTitle] = useState<string>(title_initial);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      updateTitle(title);
    }, 500);

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [title]);

  useEffect(() => {
    setTitle(title_initial);
  }, [title_initial]);

  return (
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className={styles.translation_name}
      type="text"
      placeholder="Введите название"
    />
  );
}
