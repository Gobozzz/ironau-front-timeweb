"use client";

import { useEffect, useState } from "react";
import styles from "./RedactorTranslations.module.css";
import { ReversArrow } from "@components/ui/Icons/ReversArrow";
import Image from "next/image";
import ArrowDown from "@/public/icons/arrow-down.svg";
import PlusIcon from "@/public/icons/plus-blue.svg";
import { CreateLanguageModal } from "@/app/components/modals/Bilingual/CreateLanguageModal";
import { DeleteLanguageModal } from "@/app/components/modals/Bilingual/DeleteLanguageModal";

interface Props {
  translations: BilingualTranslationInterface[];
  activeTranslations: BilingualActiveTranslations;
  changeActiveTranslations: (newTrs: BilingualActiveTranslations) => void;
  languages: BilingualLanguageInterface[];
  addTranslation: (language: BilingualLanguageInterface) => void;
  deleteTranslation: (id: number | string) => void;
}

export function MenuLanguages({
  translations,
  activeTranslations,
  changeActiveTranslations,
  languages,
  addTranslation,
  deleteTranslation,
}: Props) {
  const [colorReversIcon, setColorReversIcon] =
    useState<string>("var(--black)");

  const [activeLeftVariants, setActiveLeftVariants] = useState<boolean>(false);
  const [activeRightVariants, setActiveRightVariants] =
    useState<boolean>(false);

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  return (
    <div className={styles.menu}>
      <div className={styles.menu_up}>
        <div className={styles.menu_language_choise}>
          <div className="relative">
            <button
              onClick={() => setActiveLeftVariants((prev) => !prev)}
              type="button"
              className={`${styles.menu_language_active} line-clamp-1`}
            >
              {activeTranslations.left ? (
                translations.find(
                  (tr) =>
                    tr.id === activeTranslations.left ||
                    tr.tempId === activeTranslations.left
                )?.language?.title || (
                  <span className="text-gray!">Выберите язык</span>
                )
              ) : (
                <span className="text-gray!">Выберите язык</span>
              )}
            </button>
            {translations.length > 2 && (
              <button
                className="absolute top-[17px] right-[30px] z-2"
                onClick={() => setActiveLeftVariants((prev) => !prev)}
              >
                <Image className={`${activeLeftVariants ? 'rotate-180' : ''}`} src={ArrowDown} alt="Стрелка вниз" />
              </button>
            )}
          </div>
          <div
            className={`${styles.menu_languages_variants} ${
              activeLeftVariants ? styles.active : ""
            }`}
          >
            {translations.map((tr) => {
              if (
                tr.id === activeTranslations.left ||
                tr.tempId === activeTranslations.left ||
                tr.id === activeTranslations.right ||
                tr.tempId === activeTranslations.right
              ) {
                return;
              }
              return (
                <button
                  onClick={() => {
                    changeActiveTranslations({
                      ...activeTranslations,
                      left: tr.id || tr.tempId || 1,
                    });
                  }}
                  key={tr.id || tr.tempId}
                  className="line-clamp-1"
                  type="button"
                >
                  {tr.language?.title}
                </button>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => {
            changeActiveTranslations({
              left: activeTranslations.right,
              right: activeTranslations.left,
            });
          }}
          onMouseLeave={() => setColorReversIcon("var(--black)")}
          onMouseOver={() => setColorReversIcon("var(--blue)")}
          type="button"
          className={styles.menu_language_revers}
        >
          <ReversArrow color={colorReversIcon} />
        </button>
        <div className={styles.menu_language_choise}>
          <div className="relative">
            <button
              onClick={() => setActiveRightVariants((prev) => !prev)}
              type="button"
              className={`${styles.menu_language_active} line-clamp-1`}
            >
              {activeTranslations.right ? (
                translations.find(
                  (tr) =>
                    tr.id === activeTranslations.right ||
                    tr.tempId === activeTranslations.right
                )?.language?.title || (
                  <span className="text-gray!">Выберите язык</span>
                )
              ) : (
                <span className="text-gray!">Выберите язык</span>
              )}
            </button>
            {translations.length > 2 && (
              <button
                className="absolute top-[17px] right-[30px] z-2"
                onClick={() => setActiveRightVariants((prev) => !prev)}
              >
                <Image className={`${activeRightVariants ? 'rotate-180' : ''}`} src={ArrowDown} alt="Стрелка вниз" />
              </button>
            )}
          </div>
          <div
            className={`${styles.menu_languages_variants} ${
              activeRightVariants ? styles.active : ""
            }`}
          >
            {translations.map((tr) => {
              if (
                tr.id === activeTranslations.left ||
                tr.tempId === activeTranslations.left ||
                tr.id === activeTranslations.right ||
                tr.tempId === activeTranslations.right
              ) {
                return;
              }
              return (
                <button
                  onClick={() => {
                    changeActiveTranslations({
                      ...activeTranslations,
                      right: tr.id || tr.tempId || 1,
                    });
                  }}
                  key={tr.id || tr.tempId}
                  className="line-clamp-1"
                  type="button"
                >
                  {tr.language?.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={() => setOpenCreateModal(true)}
          className={styles.button_add_language}
        >
          <Image src={PlusIcon} alt="Плюс" />
          Добавить язык
        </button>
        <CreateLanguageModal
          addTranslation={addTranslation}
          languages={languages}
          translations={translations}
          open={openCreateModal}
          close={() => setOpenCreateModal(false)}
        />
        <button
          onClick={() => setOpenDeleteModal(true)}
          className={styles.button_delete_language}
        >
          Удалить язык
        </button>
        <DeleteLanguageModal
          deleteTranslation={deleteTranslation}
          translations={translations}
          open={openDeleteModal}
          close={() => setOpenDeleteModal(false)}
        />
      </div>
    </div>
  );
}
