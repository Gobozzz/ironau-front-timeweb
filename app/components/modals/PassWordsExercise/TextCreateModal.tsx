"use client";

import React, { useState } from "react";
import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import styles from "./PassWordsExercise.module.css";
import { ErrorsInput } from "@components/ui/ErrorsInput/ErrorsInput";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  isModalOpen: boolean;
  handleClose: () => void;
  add_new_text: (text: string) => void;
}

export default function TextCreateModal({
  isModalOpen,
  handleClose,
  add_new_text,
}: Props) {
  const [text, setText] = useState<string>("");
  const [errors, setErrors] = useState<ServerErrors>({});

  return (
    <>
      <Dialog
        open={isModalOpen}
        onClose={() => {
          setErrors({});
          handleClose();
        }}
        fullWidth={true}
        maxWidth={false}
        keepMounted
        slots={{
          transition: Transition,
        }}
        sx={{
          "& .MuiDialog-container": {
            justifyContent: "center",
          },
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "700px",
            background: "var(--light-gray)",
            borderRadius: "16px",
            overflowY: "auto",
          },
        }}
      >
        <div className="h-full flex flex-col gap-8 p-5">
          <div className={styles.form_item}>
            <div className={styles.form_input_title}>Отрезок текста</div>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              className={styles.form_input}
              placeholder="Введите..."
            />
            <ErrorsInput errors={errors.text} />
          </div>
          <button
            onClick={() => {
              setErrors({});
              const value = text.trim();
              if (value.length === 0) {
                setErrors({
                  text: ["Не оставляйте пустым"],
                });
                return;
              }
              add_new_text(value);
              handleClose();
              setText("");
            }}
            className={styles.button}
          >
            Добавить
          </button>
        </div>
      </Dialog>
    </>
  );
}
