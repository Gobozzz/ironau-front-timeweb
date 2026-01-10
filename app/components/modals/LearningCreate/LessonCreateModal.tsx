"use client";

import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./LearningCreate.module.css";
import { LearningLevels } from "./LearningLevels/LearningLevels";
import api from "@/app/api";
import { Loader } from "@components/ui/Loader/Loader";
import FilePickerButton from "@components/ui/FilePickerButton/FilePickerButton";
import Image from "next/image";
import NoLogo from "@/public/icons/no-logo.svg";
import { RoundedCheckbox } from "@components/ui/Checkbox/RoundedCheckbox";
import { ErrorsInput } from "@components/ui/ErrorsInput/ErrorsInput";
import { SuccessModal } from "../SuccessModal/SuccessModal";
import { useRouter } from "next/navigation";
import { LESSON_EDIT } from "@/app/navigate";
import KrestCloseIcon from "@/public/icons/krest-close.svg";

interface Props {
  open: boolean;
  close: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function LessonCreateModal({ open, close }: Props) {
  const router = useRouter();
  const [loadingUploadImage, setLoadingUploadImage] = useState<boolean>(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [errors, setErrors] = useState<ServerErrors>({});
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [data, setData] = useState<EditLesson>({
    title: "",
    time_to_complete: null,
    level_id: null,
    content: "",
    image: null,
    image_url: null,
    only_course: false,
  });

  const handlerUploadImage = (files: File[]) => {
    if (loadingUploadImage) {
      return false;
    }
    const file = files[0];
    const body = new FormData();
    body.append("image", file);
    setLoadingUploadImage(true);
    api
      .post("/lessons/upload-image", body, {
        headers: {
          "Content-Type": "mult",
        },
      })
      .then((response) =>
        setData((prev) => {
          return {
            ...prev,
            image: response.data.data.path,
            image_url: response.data.data.url,
          };
        })
      )
      .finally(() => {
        setLoadingUploadImage(false);
      });
  };

  function handlerSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loadingUpdate) {
      return;
    }
    setLoadingUpdate(true);
    setErrors({});
    api
      .post(`/lessons`, data)
      .then((data) => {
        setData({
          title: "",
          time_to_complete: null,
          level_id: null,
          content: "",
          image: null,
          image_url: null,
          only_course: false,
        });
        router.replace(LESSON_EDIT(data.data.data.id));
      })
      .catch((err) => {
        let errors;
        if (err.response?.data?.errors) {
          errors = err.response.data.errors;
        } else {
          errors = { message: ["Произошла ошибка создании урока"] };
        }
        setErrors(errors);
      })
      .finally(() => setLoadingUpdate(false));
  }

  function handlerClose() {
    setErrors({});
    close();
  }

  return (
    <>
      <SuccessModal
        title="Урок отправлен на модерацию"
        subtitle="А пока можете добавить упражнения"
        open={openSuccessModal}
        close={() => setOpenSuccessModal(false)}
      />
      <Dialog
        open={open}
        onClose={() => {
          setErrors({});
          close();
        }}
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
            height: "90vh",
            maxWidth: "1000px",
            background: "var(--light-gray)",
            borderRadius: "24px",
            "@media(max-width:1200px)": {
              maxWidth: "calc(100vw - 20px)",
              margin: "0",
            },
          },
        }}
      >
        <form onSubmit={handlerSubmit} className={styles.form}>
          <div className="hidden max-[1200px]:block">
            <button
              className="min-w-11 min-h-11 flex! items-center justify-center ml-auto"
              type="button"
              onClick={handlerClose}
            >
              <Image src={KrestCloseIcon} alt="Закрыть" />
            </button>
          </div>
          <ErrorsInput errors={errors.message} />
          <div className={styles.input_item}>
            <div className={styles.input_item_title}>Название урока</div>
            <input
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className={styles.input_item_input}
              type="text"
              placeholder="Произношение сложных звуков"
            />
            <ErrorsInput errors={errors.title} />
          </div>
          <div className={styles.input_item}>
            <div className={styles.input_item_title}>Выберите сложность</div>
            <LearningLevels
              selectedId={data.level_id}
              setSelectedId={(id) => setData({ ...data, level_id: id })}
            />
            <ErrorsInput errors={errors.level_id} />
          </div>
          <div className={styles.input_item}>
            <div className={styles.input_item_title}>Время на прохождение</div>
            <div className="flex items-center gap-2 select-none text-black!">
              ~
              <input
                value={String(data.time_to_complete || "")}
                onChange={(e) => {
                  const value = parseInt(e.target.value.replace(/\D/g, ""));
                  setData({
                    ...data,
                    time_to_complete: !isNaN(value) && value > 0 ? value : null,
                  });
                }}
                className={`${styles.input_item_input} max-w-[49px] px-3!`}
                type="text"
                placeholder="15"
              />
              минут
            </div>
            <ErrorsInput errors={errors.time_to_complete} />
          </div>
          <div className={styles.input_item}>
            <div className="flex flex-col gap-3">
              <div className={`${styles.input_item_title}`}>
                Добавьте обложку урока
              </div>
              {!loadingUploadImage && (
                <>
                  <FilePickerButton onFileSelected={handlerUploadImage} />
                  <div className={styles.logo_inner}>
                    <Image
                      width={92}
                      height={92}
                      className={styles.logo}
                      src={data.image_url || NoLogo}
                      alt="Логотип"
                    />
                  </div>
                </>
              )}
              {loadingUploadImage && <Loader size="sm" />}
              <ErrorsInput errors={errors.image} />
            </div>
          </div>
          <div className={styles.input_item}>
            <div className={styles.input_item_title}>Описание</div>
            <textarea
              value={data.content}
              onChange={(e) => setData({ ...data, content: e.target.value })}
              className={styles.input_item_textarea}
              placeholder="Вводите здесь"
            ></textarea>
            <ErrorsInput errors={errors.content} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <div className={styles.input_item_title}>Только для курсов</div>
              <RoundedCheckbox
                checked={data.only_course}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setData({ ...data, only_course: event.target.checked })
                }
              />
            </div>
            <ErrorsInput errors={errors.only_course} />
          </div>
          <button
            disabled={loadingUpdate}
            className={`${styles.btn_submit} ${
              loadingUpdate ? "opacity-65" : ""
            }`}
            type="submit"
          >
            Отправить на модерацию
          </button>
        </form>
      </Dialog>
    </>
  );
}
