"use client";

import { Dialog, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { SureModal } from "../SureModal/SureModal";

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
  translations: BilingualTranslationInterface[];
  deleteTranslation: (id: number | string) => void;
}

export function DeleteLanguageModal({
  open,
  close,
  translations,
  deleteTranslation,
}: Props) {
  const [deleteId, setDeleteId] = useState<number | string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState<string | null>(null);

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
          maxWidth: "280px",
          background: "var(--light-gray)",
          borderRadius: "12px",
          maxHeight: "350px",
        },
      }}
    >
      <SureModal
        question={`Вы уверены, что хотите удалить,${
          deleteTitle ? ` ${deleteTitle.toLocaleLowerCase()}` : ""
        } язык`}
        open={!!deleteId}
        close={() => {
          setDeleteId(null);
          setDeleteTitle(null);
        }}
        callback={() => {
          if (deleteId) {
            deleteTranslation(deleteId);
          }
          setDeleteId(null);
          setDeleteTitle(null);
          close();
        }}
      />
      <div className="flex flex-col gap-y-5 p-4">
        {translations.map((tr) => {
          return (
            <button
              className="text-black!"
              onClick={() => {
                setDeleteId(tr.id || tr.tempId || 1);
                setDeleteTitle(tr.language?.title || null);
              }}
              key={tr.id || tr.tempId}
            >
              {tr.language?.title}
            </button>
          );
        })}
      </div>
    </Dialog>
  );
}
