"use client";

import { Dialog, Slide } from "@mui/material";
import styles from "./SuccessModal.module.css";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  close: () => void;
  title: string;
  subtitle?: string | null;
}

export function SuccessModal({ open, close, title, subtitle = null }: Props) {
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
          maxWidth: "1000px",
          background: "var(--light-gray)",
          borderRadius: "24px",
          padding: "56px 32px",
          "@media(max-width:1200px)": {
            padding: "20px 10px",
          },
        },
      }}
    >
      <div className={styles.title}>{title}</div>
      {subtitle !== null && <div className={styles.subtitle}>{subtitle}</div>}
      <button onClick={close} className={styles.button} type="button">
        Понятно, спасибо
      </button>
    </Dialog>
  );
}
