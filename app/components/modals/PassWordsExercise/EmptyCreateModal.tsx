"use client";

import React, { useState } from "react";
import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import styles from "./PassWordsExercise.module.css";
import { ErrorsInput } from "@components/ui/ErrorsInput/ErrorsInput";
import Image from "next/image";
import TrashBlueIcon from "@/public/icons/trash-blue.svg";

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
  add_new_empty: (text: string, variants: string[]) => void;
}

export default function EmptyCreateModal({
  isModalOpen,
  handleClose,
  add_new_empty,
}: Props) {
  const [text, setText] = useState<string>("");
  const [variants, setVariants] = useState<string[]>([""]);
  const [errors, setErrors] = useState<ServerErrors>({});

  function delete_variant(index: number) {
    const copy_variants = [...variants];
    copy_variants.splice(index, 1);
    setVariants(copy_variants);
  }

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
            "@media(max-width:1200px)": {
              maxWidth: "calc(100vw - 20px)",
              margin:"0"
            },
          },
        }}
      >
        <div className="h-full flex flex-col gap-8 p-5">
          <div className={styles.form_item}>
            <div className={styles.form_input_title}>Верный вариант</div>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              className={styles.form_input}
              placeholder="Введите верный вариант..."
            />
            <ErrorsInput errors={errors.text} />
          </div>
          <div className={styles.form_item}>
            <div className={styles.form_input_title}>
              Только неверные варианты
            </div>
            {variants.map((variant, index) => (
              <div className="flex items-end gap-3" key={index}>
                <input
                  value={variant}
                  onChange={(e) => {
                    const variants_copy = [...variants];
                    variants_copy[index] = e.target.value;
                    setVariants(variants_copy);
                  }}
                  type="text"
                  className={styles.form_input}
                  placeholder="Введите..."
                />
                <button
                  onClick={() => delete_variant(index)}
                  type="button"
                  className={styles.tool}
                >
                  <Image src={TrashBlueIcon} alt="Удалить упражнение" />
                </button>
              </div>
            ))}
            <ErrorsInput errors={errors.variants} />
          </div>
          <div className={styles.form_item}>
            <button
              onClick={() => {
                setVariants((prev) => [...prev, ""]);
              }}
              className={styles.add_choise_button}
            >
              Добавить вариант
            </button>
          </div>
          <div className={styles.form_item}>
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
                const variants_copy = [...variants];

                if (variants_copy.length === 0) {
                  setErrors({
                    variants: ["Не оставляйте пустым"],
                  });
                  return;
                }
                const emptyCount = variants_copy.reduce((count, str) => {
                  return str.trim() === "" ? count + 1 : count;
                }, 0);
                if (emptyCount > 0) {
                  setErrors({
                    variants: ["Пустые поля остались, исправьте!"],
                  });
                  return;
                }
                variants_copy.unshift(value);
                add_new_empty(value, variants_copy);
                handleClose();
                setText("");
                setVariants([""]);
              }}
              className={styles.button}
            >
              Добавить
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
