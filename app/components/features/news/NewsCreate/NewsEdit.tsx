"use client";

import styles from "./NewsCreate.module.css";
import { UserRules } from "@/app/enums";
import { canUserRule } from "@/app/helpers/rules";
import { RootState } from "@/app/redux/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ArrowDown from "@/public/icons/arrow-down.svg";
import { NewsCategoriesModal } from "@/app/components/modals/News/NewsCategoriesModal";
import EditorEdit from "@/app/components/shared/Editor/EditorEdit";
import { NewsTitleInput } from "./NewsTitleInput";
import { Loader } from "@/app/components/ui/Loader/Loader";
import api from "@/app/api";
import { SuccessModal } from "@/app/components/modals/SuccessModal/SuccessModal";
import { ErrorsInput } from "@/app/components/ui/ErrorsInput/ErrorsInput";

interface Props {
  id: number;
}

export function NewsEdit({ id }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);

  const [successGetNews, setSuccessGetNews] = useState<boolean>(false);
  const [loadingNews, setLoadingNews] = useState<boolean>(false);

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
      } else if (copy_data.length >= 5) {
        alert("Нельзя выбрать более 5 категорий");
      } else {
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
      .put(`/news/${id}`, {
        title,
        categories,
        content,
      })
      .then((data) => {
        setSuccessSubmit(true);
      })
      .catch((err) => {
        let errors;
        if (err.response?.data?.errors) {
          errors = err.response.data.errors;
        } else {
          errors = { message: ["Произошла ошибка при обновлении новости"] };
        }
        setErrors(errors);
      })
      .finally(() => {
        setLoadingSubmit(false);
      });
  }

  useEffect(() => {
    if (loadingNews) return;
    setLoadingNews(true);
    api
      .get(`/news/${id}`)
      .then((data) => {
        if (data.data.data.user.id !== user?.id) {
          return;
        }
        setSuccessGetNews(true);
        setTitle(data.data.data.title);
        setCategories(
          data.data.data.categories.map((cat: { id: number }) => cat.id)
        );
        setContent(data.data.data.content);
      })
      .finally(() => {
        setLoadingNews(false);
      });
  }, [id]);

  if (!user || !canUserRule(UserRules.WRITE_NEWS, user)) {
    return null;
  }

  if (loadingNews) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!successGetNews) {
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
        {loadingSubmit ? <Loader size="sm" /> : "Обновить"}
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
