"use client";

import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import styles from "./LearningCreate.module.css";
import { LearningLevels } from "./LearningLevels/LearningLevels";
import api from "@/app/api";
import { Loader } from "@components/ui/Loader/Loader";
import FilePickerButton from "@components/ui/FilePickerButton/FilePickerButton";
import Image from "next/image";
import NoLogo from "@/public/icons/no-logo.svg";
import { ErrorsInput } from "@components/ui/ErrorsInput/ErrorsInput";
import { SuccessModal } from "../SuccessModal/SuccessModal";

interface Props {
  open: boolean;
  close: () => void;
  id: number | null;
  callbackSuccessEdit?: (() => void) | null;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function CourseEditModal({
  open,
  close,
  id = null,
  callbackSuccessEdit = null,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingUploadImage, setLoadingUploadImage] = useState<boolean>(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [errors, setErrors] = useState<ServerErrors>({});
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [data, setData] = useState<EditCourse>({
    title: "",
    level_id: null,
    content: "",
    image: null,
    image_url: null,
    lessons: [],
  });

  useEffect(() => {
    if (id === null) return;
    setLoading(true);
    api
      .get(`/courses/${id}/owner`)
      .then((data) => {
        setData({
          title: data.data.data.title,
          level_id: data.data.data.level.id,
          content: data.data.data.content,
          image: data.data.data.image,
          image_url: data.data.data.image_url,
          lessons: data.data.data.lessons_ids,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handlerUploadImage = (files: File[]) => {
    if (loadingUploadImage) {
      return false;
    }
    const file = files[0];
    const body = new FormData();
    body.append("image", file);
    setLoadingUploadImage(true);
    api
      .post("/courses/upload-image", body, {
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
      .put(`/courses/${id}`, data)
      .then(() => {
        setOpenSuccessModal(true);
        close();
        if (callbackSuccessEdit !== null && callbackSuccessEdit !== undefined) {
          callbackSuccessEdit();
        }
      })
      .catch((err) => {
        let errors;
        if (err.response?.data?.errors) {
          errors = err.response.data.errors;
        } else {
          errors = { message: ["Произошла ошибка обновлении урока"] };
        }
        setErrors(errors);
      })
      .finally(() => setLoadingUpdate(false));
  }

  return (
    <>
      <SuccessModal
        title="Курс отправлен на модерацию"
        subtitle="После модерации курс появится в общем доступе"
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
          },
        }}
      >
        {loading && (
          <div className="w-full h-full flex items-center justify-center">
            <Loader size="base" />
          </div>
        )}
        {!loading && data !== null && (
          <form onSubmit={handlerSubmit} className={styles.form}>
            <ErrorsInput errors={errors.message} />
            <div className={styles.input_item}>
              <div className={styles.input_item_title}>Название курса</div>
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
              <div className="flex flex-col gap-3">
                <div className={`${styles.input_item_title}`}>
                  Добавьте обложку курса
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
        )}
      </Dialog>
    </>
  );
}
