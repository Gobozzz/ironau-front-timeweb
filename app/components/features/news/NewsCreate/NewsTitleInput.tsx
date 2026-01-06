"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./NewsCreate.module.css";
import { ErrorsInput } from "@/app/components/ui/ErrorsInput/ErrorsInput";

interface Props {
  errors: ServerErrors;
  onChange: (title: string) => void;
  initial_title: string;
}

export function NewsTitleInput({ onChange, errors, initial_title }: Props) {
  const [title, setTitle] = useState<string>(initial_title);

  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      onChange(title);
    }, 500);
  }, [title]);

  return (
    <div className={styles.form_item}>
      <div className={styles.form_item_title}>Заголовок</div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`${styles.form_input} max-w-200`}
        type="text"
        placeholder="Международная конференция лингвистов"
      />
      <ErrorsInput errors={errors.title} />
    </div>
  );
}
