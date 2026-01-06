"use client";

import styles from "./NewsCreate.module.css";
import { UserRules } from "@/app/enums";
import { canUserRule } from "@/app/helpers/rules";
import { RootState } from "@/app/redux/store";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import ArrowDown from "@/public/icons/arrow-down.svg";
import { NewsCategoriesModal } from "@/app/components/modals/News/NewsCategoriesModal";
import EditorEdit from "@/app/components/shared/Editor/EditorEdit";
import { NewsTitleInput } from "./NewsTitleInput";
import { Loader } from "@/app/components/ui/Loader/Loader";
import api from "@/app/api";
import { SuccessModal } from "@/app/components/modals/SuccessModal/SuccessModal";
import { ErrorsInput } from "@/app/components/ui/ErrorsInput/ErrorsInput";
import { useRouter } from "next/navigation";
import { NEWS_SHOW, PROFILE } from "@/app/navigate";

interface Props {}

export function NewsCreate({}: Props) {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [categories, setCategories] = useState<number[]>([]);
  const [content, setContent] = useState<any>({});
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [successSubmit, setSuccessSubmit] = useState<boolean>(false);
  const [errors, setErrors] = useState<ServerErrors>({});

  function changeSelectedCategory(id: number) {
    setCategories((prev) => {
      let copy_data = [...prev];
      if (copy_data.includes(id)) {
        copy_data = copy_data.filter((cat) => cat !== id);
      } else if (copy_data.length < 5) {
        copy_data.push(id);
      }
      return copy_data;
    });
  }

  const [openCategoriesModal, setOpenCategoriesModal] =
    useState<boolean>(false);

  function handlerSubmit() {
    if (loadingSubmit) {
      return;
    }
    setLoadingSubmit(true);
    setErrors({});
    api
      .post("/news", {
        title,
        categories,
        content,
      })
      .then((data) => {
        setSuccessSubmit(true);
        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        }, 1500);
      })
      .catch((err) => {
        let errors;
        if (err.response?.data?.errors) {
          errors = err.response.data.errors;
        } else {
          errors = { message: ["Произошла ошибка при создании новости"] };
        }
        setErrors(errors);
      })
      .finally(() => {
        setLoadingSubmit(false);
      });
  }

  if (!user || !canUserRule(UserRules.WRITE_NEWS, user)) {
    return null;
  }

  return (
    <div className={styles.form_inner}>
      <SuccessModal
        title="Новость отправлена на модерацию"
        open={successSubmit}
        close={() => setSuccessSubmit(false)}
      />
      <NewsCategoriesModal
        changeSelectedCategory={changeSelectedCategory}
        open={openCategoriesModal}
        close={() => setOpenCategoriesModal(false)}
        selected_categories_ids={categories}
      />
      <button
        onClick={handlerSubmit}
        disabled={loadingSubmit}
        className={styles.button_submit}
      >
        {loadingSubmit ? <Loader size="sm" /> : "Опубликовать"}
      </button>
      <ErrorsInput errors={errors.message} />
      <NewsTitleInput
        initial_title={title}
        errors={errors}
        onChange={(title) => setTitle(title)}
      />
      <div className={styles.form_item}>
        <div className={styles.form_item_title}>
          Выберите категории, не более 5
        </div>
        <button
          onClick={() => setOpenCategoriesModal(true)}
          className={styles.categories_button}
        >
          Категории
          <Image src={ArrowDown} alt="Стрелка вниз" />
        </button>
        <ErrorsInput errors={errors.categories} />
      </div>
      <div className={styles.form_item}>
        <div className={styles.form_item_title}>Новость</div>
        <ErrorsInput errors={errors.content} />
        <div className="max-w-240">
          <EditorEdit
            className="min-h-[720px]!"
            value={content}
            onChange={(data) => setContent(data)}
          />
        </div>
      </div>
    </div>
  );
}
