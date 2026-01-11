"use client";

import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import styles from "./MarkModal.module.css";
import { PageTitle } from "@components/ui/PageTitle/PageTitle";
import { StarIcon } from "@components/ui/Icons/Flow/StarIcon";
import { ErrorsInput } from "@components/ui/ErrorsInput/ErrorsInput";
import api from "@api";
import { Loader } from "@components/ui/Loader/Loader";

interface Props {
  id: number;
  isModalOpen: boolean;
  handleClose: () => void;
  refreshFlowForce: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MAX_MARK = 5;

export function LessonMarkModal({
  id,
  isModalOpen,
  handleClose,
  refreshFlowForce,
}: Props) {
  const [mark, setMark] = useState<number>(0);
  const [errors, setErrors] = useState<ServerErrors>({});
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit() {
    if (isNaN(Number(mark))) {
      setErrors({ message: ["Оценка может быть только числом"] });
      return;
    }
    if (mark > 5 || mark < 1) {
      setErrors({
        message: ["Оценка может быть выставлена в пределах от 1 до 5"],
      });
      return;
    }
    setLoading(true);
    setErrors({});
    api
      .post(`/ratings/lessons/${id}`, { mark: mark })
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          handleClose();
          refreshFlowForce();
        }, 800);
      })
      .catch(() => {
        setErrors({
          message: ["Не удалось оставить оценку. Попробуйте позже."],
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Dialog
      open={isModalOpen}
      onClose={handleClose}
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
          maxWidth: "1200px",
          height: "680px",
          background: "var(--white)",
          borderRadius: "24px",
          "@media(max-width:1200px)": {
            maxWidth: "90%",
            margin: "0",
          },
        },
      }}
    >
      <div className={styles.inner}>
        <PageTitle className="text-black! m-0!">Оцените урок</PageTitle>
        <div className={styles.stars}>
          {new Array(MAX_MARK).fill(1).map((_, index) => (
            <button
              disabled={loading || success}
              onClick={() => setMark(index + 1)}
              key={index}
              className={styles.star}
              type="button"
            >
              {index + 1 <= mark && (
                <StarIcon color="var(--blue)" opacity={1} />
              )}
              {index + 1 > mark && <StarIcon opacity={0.2} />}
            </button>
          ))}
        </div>
        <ErrorsInput errors={errors.message} />
        {!success && (
          <button
            disabled={loading}
            onClick={handleSubmit}
            type="button"
            className={styles.button_submit}
          >
            {loading ? <Loader size="sm" /> : "Оценить"}
          </button>
        )}
        {success && (
          <div className="text-sm text-center select-none">
            Оценка успешно отправлена. Бузныг!
          </div>
        )}
      </div>
    </Dialog>
  );
}
