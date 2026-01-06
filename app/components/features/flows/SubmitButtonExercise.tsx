"use client";

import { Loader } from "@components/ui/Loader/Loader";
import styles from "./Flow.module.css";

interface Props {
  loading: boolean;
  callback: () => void;
  disabled?: boolean;
}

export function SubmitButtonExercise({
  loading,
  callback,
  disabled = false,
}: Props) {
  return (
    <button
      disabled={disabled}
      onClick={callback}
      className={`${styles.submit_button_exercise} ${disabled ? 'opacity-85' : '' }`}
    >
      {loading ? <Loader size="sm" /> : "Отправить"}
    </button>
  );
}
