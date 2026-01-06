"use client";

import { Dialog, Slide } from "@mui/material";
import styles from "./SureModal.module.css";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";

interface Props {
  open: boolean;
  close: () => void;
  callback: () => void;
  question: string;
  textYes?: string;
  textNo?: string;
  disabled?: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function SureModal({
  open,
  close,
  callback,
  question,
  textYes = "Да",
  textNo = "Нет",
  disabled = false,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={close}
      fullWidth={true}
      maxWidth={false}
      scroll="paper"
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
          maxWidth: "462px",
          background: "var(--white)",
          borderRadius: "12px",
          padding: "32px 44px",
        },
      }}
      className="select-none"
    >
      <div className={styles.question}>{question}</div>
      <div className={styles.buttons}>
        <button
          disabled={disabled}
          onClick={callback}
          className={`${styles.button_yes} ${disabled ? "opacity-65" : ""}`}
        >
          {textYes}
        </button>
        <button
          disabled={disabled}
          onClick={close}
          className={styles.button_no}
        >
          {textNo}
        </button>
      </div>
    </Dialog>
  );
}
