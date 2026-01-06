"use client";

import { useSelector } from "react-redux";
import styles from "./CreateBilingual.module.css";
import { RootState } from "@/app/redux/store";
import { UserRules } from "@/app/enums";
import { canUserRule } from "@/app/helpers/rules";
import Image from "next/image";
import SearchIcon from "@/public/icons/search.svg";
import FilePickerButton from "@/app/components/ui/FilePickerButton/FilePickerButton";
import NoPhoto from "@/public/images/no-photo-3-4.png";
import { useEffect, useState } from "react";
import api from "@/app/api";
import { Loader } from "@/app/components/ui/Loader/Loader";
import { ErrorsInput } from "@/app/components/ui/ErrorsInput/ErrorsInput";
import { SuccessModal } from "@/app/components/modals/SuccessModal/SuccessModal";

interface Props {
  id: number;
}

export function EditBilingual({ id }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || !canUserRule(UserRules.CREATE_BILINGUALS, user)) {
    return null;
  }


  const [successGetBilingual, setSuccessGetBilingual] =
    useState<boolean>(false);
  const [loadingGet, setLoadingGet] = useState<boolean>(false);

  const [languages, setLanguages] = useState<BilingualLanguageInterface[]>([]);
  const [tags, setTags] = useState<BilingualTagInterface[]>([]);
  const [searchTag, setSearchTag] = useState<string>("");
  const [searchTags, setSearchTags] = useState<BilingualTagInterface[]>([]);

  const [loadingDownloadImage, setLoadingDownloadImage] =
    useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const [successUpdate, setSuccessUpdate] = useState<boolean>(false)

  const [errors, setErrors] = useState<ServerErrors>({});

  const [data, setData] = useState<BilingualCreateData>({
    title: "",
    author: "",
    translator: "",
    year: "",
    language_id: null,
    image: null,
    image_url: null,
    tags: [],
  });

  useEffect(() => {
    setLoadingGet(true);
    api
      .get(`/bilinguals/${id}`)
      .then((data) => {
        setSuccessGetBilingual(true);
        setData({
          title: data.data.data.title,
          author: data.data.data.author,
          translator: data.data.data.translator,
          year: data.data.data.year,
          language_id: data.data.data.language?.id,
          image: data.data.data.image,
          image_url: data.data.data.image_url,
          tags: data.data.data.tags.map((tag: { id: number }) => tag.id),
        });
      })
      .finally(() => setLoadingGet(false));
  }, []);

  useEffect(() => {
    setSearchTags(
      tags.filter((tag) =>
        tag.title.toLowerCase().includes(searchTag.trim().toLowerCase())
      )
    );
  }, [searchTag]);

  useEffect(() => {
    api
      .get("/bilingual-languages")
      .then((data) => setLanguages(data.data.data));
  }, []);

  useEffect(() => {
    api.get("/bilingual-tags").then((data) => {
      setTags(data.data.data);
      setSearchTags(data.data.data);
    });
  }, []);

  function handlerUploadImage(file: File) {
    if (loadingDownloadImage) {
      return;
    }
    setErrors((prev) => {
      const copy_errors = { ...prev };
      delete copy_errors.image;
      return copy_errors;
    });
    setLoadingDownloadImage(true);
    const data = new FormData();
    data.append("image", file);
    api
      .post("/bilinguals/upload-image", data, {
        headers: {
          "Content-Type": "mult",
        },
      })
      .then((data) => {
        setData((prev) => {
          return {
            ...prev,
            image: data.data.data.path,
            image_url: data.data.data.url,
          };
        });
      })
      .catch((err) => {
        let errors;
        if (err.response?.data?.errors?.image) {
          errors = { image: err.response?.data?.errors?.image };
        } else {
          errors = { image: ["Произошла ошибка при скачивании фото"] };
        }
        setErrors(errors);
      })
      .finally(() => {
        setLoadingDownloadImage(false);
      });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loadingSubmit) {
      return;
    }
    setLoadingSubmit(true);
    setErrors({});
    api
      .put(`/bilinguals/${id}`, data)
      .then(() => {
        setSuccessUpdate(true)
      })
      .catch((err) => {
        let errors;
        if (err.response?.data?.errors) {
          errors = err.response.data.errors;
        } else {
          errors = { message: ["Произошла ошибка при обновлении билингвы"] };
        }
        setErrors(errors);
        setTimeout(() => {
          const errorElement = document.querySelector("[data-error-input]");
          if (errorElement) {
            errorElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 250);
      })
      .finally(() => setLoadingSubmit(false));
  }

  if (!successGetBilingual && !loadingGet) {
    return null;
  }

  if (!successGetBilingual && loadingGet) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div>
      <SuccessModal title="Билингва отправлена на модерацию" open={successUpdate} close={() => setSuccessUpdate(false)} />
      <form onSubmit={handleSubmit} className={styles.form}>
        <ErrorsInput errors={errors.message} />
        <div className={styles.form_item}>
          <div className={styles.form_item_title}>Название оригинала</div>
          <input
            value={data.title}
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, title: e.target.value };
              })
            }
            type="text"
            placeholder="Себялюбивый великан"
            className={styles.form_item_input_big}
          />
          <ErrorsInput errors={errors.title} />
        </div>
        <div className={styles.form_item}>
          <div className={styles.form_item_title}>Автор оригинала</div>
          <input
            value={data.author}
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, author: e.target.value };
              })
            }
            type="text"
            placeholder="Астрид Лингрен"
            className={styles.form_item_input}
          />
          <ErrorsInput errors={errors.author} />
        </div>
        <div className={styles.form_item}>
          <div className={styles.form_item_title}>Перевели</div>
          <input
            value={data.translator}
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, translator: e.target.value };
              })
            }
            type="text"
            placeholder="Иван Иванов, ..."
            className={styles.form_item_input}
          />
          <ErrorsInput errors={errors.translator} />
        </div>
        <div className={styles.form_item}>
          <div className={styles.form_item_title}>Выберите язык оригинала</div>
          <div className={styles.form_item_values}>
            {languages.map((language) => (
              <button
                onClick={() =>
                  setData((prev) => {
                    return { ...prev, language_id: language.id };
                  })
                }
                key={language.id}
                type="button"
                className={`${styles.language} ${
                  data.language_id === language.id ? styles.active : ""
                }`}
              >
                {language.title}
              </button>
            ))}
          </div>
          <ErrorsInput errors={errors.language_id} />
        </div>
        <div className={styles.form_item}>
          <div className={styles.form_item_title}>
            Добавьте теги, не более 5
          </div>
          <div className={styles.search}>
            <Image src={SearchIcon} alt="Поиск" />
            <input
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
              type="text"
              placeholder="Лирика"
              className={styles.search_input}
            />
          </div>
          <div className={styles.form_item_values}>
            {searchTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => {
                  let copy_tags = [...data.tags];
                  if (copy_tags.includes(tag.id)) {
                    copy_tags = copy_tags.filter((tag_f) => tag_f !== tag.id);
                  } else if (copy_tags.length < 5) {
                    copy_tags.push(tag.id);
                  }
                  setData((prev) => {
                    return { ...prev, tags: copy_tags };
                  });
                }}
                className={`${styles.tag} ${
                  data.tags.includes(tag.id) ? styles.active : ""
                }`}
              >
                {tag.title}
              </button>
            ))}
          </div>
          <ErrorsInput errors={errors.tags} />
        </div>
        <div className={styles.form_item}>
          <div className={styles.form_item_title}>Укажите год публикации</div>
          <input
            value={data.year}
            onChange={(e) =>
              setData((prev) => {
                return { ...prev, year: e.target.value };
              })
            }
            type="number"
            placeholder="1990"
            className={`${styles.form_item_input} max-w-[320px]!`}
          />
          <ErrorsInput errors={errors.year} />
        </div>
        <div className={styles.form_item}>
          <div className="flex flex-col gap-2">
            <div className={styles.form_item_title}>Добавьте обложку</div>
            <div className={styles.form_item_image_text}>
              300 x 400 px, вес до 2 мб.
            </div>
            <ErrorsInput errors={errors.image} />
            {!loadingDownloadImage && (
              <>
                <FilePickerButton
                  onFileSelected={(files) => handlerUploadImage(files[0])}
                />
                <Image
                  width={300}
                  height={400}
                  src={data.image_url || NoPhoto}
                  alt="Фото билингвы"
                />
              </>
            )}
            {loadingDownloadImage && <Loader size="base" />}
          </div>
        </div>
        <button disabled={loadingSubmit} className={styles.button_submit}>
          {loadingSubmit ? <Loader size="sm" /> : "Обновить"}
        </button>
      </form>
    </div>
  );
}
