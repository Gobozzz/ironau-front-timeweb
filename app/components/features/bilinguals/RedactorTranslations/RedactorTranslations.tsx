"use client";

import { useSelector } from "react-redux";
import styles from "./RedactorTranslations.module.css";
import { RootState } from "@/app/redux/store";
import { canUserRule } from "@/app/helpers/rules";
import { UserRules } from "@/app/enums";
import { useEffect, useState } from "react";
import api from "@/app/api";
import { Loader } from "@/app/components/ui/Loader/Loader";
import { MegaTitle } from "@/app/components/ui/MegaTitle/MegaTitle";
import { v4 as uuidv4 } from "uuid";
import { MenuLanguages } from "./MenuLanguages";
import { Translations } from "./Translations";
import Image from "next/image";
import PlusIcon from "@/public/icons/plus-white.svg";
import { SuccessModal } from "@/app/components/modals/SuccessModal/SuccessModal";
import { ErrorsInput } from "@/app/components/ui/ErrorsInput/ErrorsInput";

interface Props {
  id: number;
}

function getEmptyParts(count: number = 1): TranslationsPart[] {
  const parts = [];
  for (let i = 0; i < count; i++) {
    parts.push({
      id: uuidv4(),
      blocks: [],
      time: Date.now(),
      version: "2.22.0",
    });
  }
  return parts;
}

export function RedactorTranslations({ id }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || !canUserRule(UserRules.CREATE_BILINGUALS, user)) {
    return null;
  }

  const [bilingual, setBilingual] = useState<BilingualShowInterface | null>(
    null
  );

  const [languages, setLanguages] = useState<BilingualLanguageInterface[]>([]);

  const [translations, setTranslations] = useState<
    BilingualTranslationInterface[]
  >([]);

  const [errors, setErrors] = useState<ServerErrors>({});

  // тут храними id или tempId
  const [activeTranslations, setActiveTranslations] =
    useState<BilingualActiveTranslations>({ left: null, right: null });

  const [loadingGet, setLoadingGet] = useState<boolean>(false);

  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);

  function changeActiveTranslations(newTrs: BilingualActiveTranslations) {
    setActiveTranslations(newTrs);
  }

  function changeTranslations(translations: BilingualTranslationInterface[]) {
    setTranslations(translations);
  }

  function deleteTranslation(id: number | string) {
    setTranslations((prev) =>
      prev.filter((tr) => tr.id !== id && tr.tempId !== id)
    );
    if (activeTranslations.left === id) {
      setActiveTranslations((prev) => {
        return { ...prev, left: null };
      });
    } else if (activeTranslations.right === id) {
      setActiveTranslations((prev) => {
        return { ...prev, right: null };
      });
    }
  }

  function addTranslation(language: BilingualLanguageInterface) {
    const tr_this_language = translations.findIndex(
      (tr) => tr.language?.id === language.id
    );
    if (tr_this_language !== -1) {
      return;
    }
    const new_translation: BilingualTranslationInterface = {
      title: "",
      language: language,
      tempId: uuidv4(),
      parts: getEmptyParts(
        translations.length > 0 ? translations[0].parts.length : 1
      ),
    };
    setTranslations((prev) => {
      return [...prev, new_translation];
    });
    if (activeTranslations.right === null) {
      setActiveTranslations((prev) => {
        return {
          ...prev,
          right: new_translation.tempId || 1,
        };
      });
    } else {
      setActiveTranslations((prev) => {
        return {
          ...prev,
          left: new_translation.tempId || 1,
        };
      });
    }
  }

  function deletePart(i: number) {
    setTranslations((prev) => {
      return prev.map((tr) => {
        return {
          ...tr,
          parts: tr.parts.filter((_, partIndex) => partIndex !== i),
        };
      });
    });
  }

  function addPart() {
    setTranslations((prev) => {
      return prev.map((tr) => {
        const copy_prs = [...tr.parts];
        copy_prs.push(...getEmptyParts(1));
        return {
          ...tr,
          parts: copy_prs,
        };
      });
    });
  }

  function handleUpdateTranslations() {
    if (loadingUpdate) {
      return;
    }

    // тут можно попробовать воткнуть валидацию
    setLoadingUpdate(true);
    setErrors({});
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      const data = translations.map((tr) => {
        return {
          language_id: tr.language?.id,
          title: tr.title,
          parts: tr.parts,
        };
      });
      api
        .put(`/bilinguals/${id}/translations`, { translations: data })
        .then(() => {
          setOpenSuccessModal(true);
        })
        .catch((err) => {
          let errors;
          if (err.response?.data?.errors) {
            errors = err.response.data.errors;
          } else {
            errors = { message: ["Произошла ошибка при обновлении переводов"] };
          }
          setErrors({
            ...errors,
            message: [
              "Произошла ошибка при обновлении переводов. Проверьте данные. Могут быть пустые поля.",
            ],
          });
        })
        .finally(() => {
          setLoadingUpdate(false);
        });
    }, 1000);
  }

  useEffect(() => {
    if (loadingGet) return;
    setLoadingGet(true);
    api
      .get(`/bilinguals/${id}`)
      .then((data) => {
        setBilingual(data.data.data);
        const translations = data.data.data.translations;
        translations.map((tr: any) => {
          tr.parts = tr.parts.map((pr: any) => {
            pr.id = uuidv4();
            return pr;
          });
          return tr;
        });
        setTranslations(translations);
        setActiveTranslations({
          left: translations[0]?.id || null,
          right: translations[1]?.id || null,
        });
      })
      .finally(() => setLoadingGet(false));
  }, []);

  useEffect(() => {
    api
      .get("/bilingual-languages")
      .then((data) => setLanguages(data.data.data));
  }, []);

  if (loadingGet) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (bilingual === null) {
    return null;
  }

  return (
    <div>
      <SuccessModal
        open={openSuccessModal}
        close={() => setOpenSuccessModal(false)}
        title="Билингва отправлена на модерацию"
      />
      <MegaTitle>{bilingual.title}</MegaTitle>
      <MenuLanguages
        languages={languages}
        changeActiveTranslations={changeActiveTranslations}
        activeTranslations={activeTranslations}
        translations={translations}
        addTranslation={addTranslation}
        deleteTranslation={deleteTranslation}
      />
      <ErrorsInput errors={errors.message} />
      <ErrorsInput errors={errors.translations} />
      <Translations
        errors={errors}
        deletePart={deletePart}
        changeTranslations={changeTranslations}
        translations={translations}
        activeTranslations={activeTranslations}
      />
      <button
        onClick={() => {
          addPart();
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }}
        type="button"
        className={styles.button_add_part}
      >
        <Image src={PlusIcon} alt="" />
      </button>
      <button
        disabled={loadingUpdate}
        onClick={handleUpdateTranslations}
        type="button"
        className={styles.button_send}
      >
        {loadingUpdate ? <Loader size="sm" /> : "Сохранить"}
      </button>
    </div>
  );
}
