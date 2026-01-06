"use client";

import { Dialog, Slide } from "@mui/material";
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
  translations: BilingualTranslationInterface[];
  languages: BilingualLanguageInterface[];
  addTranslation: (language: BilingualLanguageInterface) => void;
}

export function CreateLanguageModal({
  open,
  close,
  translations,
  languages,
  addTranslation,
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
          maxWidth: "280px",
          background: "var(--light-gray)",
          borderRadius: "12px",
          maxHeight: "350px",
        },
      }}
    >
      <div className="flex flex-col gap-y-5 p-4">
        {languages.map((language) => {
          if (
            translations.findIndex((tr) => tr.language?.id === language.id) !==
            -1
          ) {
            return;
          }
          return (
            <button
            className="text-black!"
              onClick={() => {
                addTranslation({
                  id: language.id,
                  title: language.title,
                  slug: language.slug,
                });
                close();
              }}
              key={language.id}
            >
              {language.title}
            </button>
          );
        })}
      </div>
    </Dialog>
  );
}
