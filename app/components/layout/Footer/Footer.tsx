"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import {
  BILINGUALS,
  CENTER_LEARNING,
  LITERATURE,
  NEWS,
  POLITIC,
  PRAVOPISANIE,
  SPRAVOCHNIK,
  USER_AGREEMENT,
} from "@navigate";

interface Props {
  className?: string;
}

export function Footer({ className }: Props) {
  return (
    <footer className={`${styles.footer} ${className}`}>
      <div className="flex items-start gap-25 max-[1400px]:flex-col-reverse max-[1400px]:items-center max-[800px]:gap-15">
        <div className="max-[1400px]:flex max-[1400px]:flex-col-reverse max-[1400px]:gap-13">
          <h2 className={styles.title}>иронау</h2>
          <div className="flex flex-col-reverse gap-4 max-[1400px]:items-center max-[1400px]:gap-11">
            <div className="font-navigation! text-base select-none max-[800px]:text-sm">
              2001 — {new Date().getFullYear()}
            </div>
            <div className="max-[1400px]:flex max-[1400px]:flex-col max-[1400px]:items-center max-[1400px]:gap-4">
              <div className="text-gray text-base select-none max-[800px]:text-center max-[800px]:text-sm">
                Главный редактор
              </div>
              <div className="text-base underline select-none max-[800px]:text-center max-[800px]:text-sm">В. Иванов</div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-30 max-[800px]:flex-col-reverse max-[800px]:items-center max-[800px]:gap-15">
          <div className={styles.links}>
            <Link href={CENTER_LEARNING} aria-label="Центр обучения">
              Центр обучения
            </Link>
            <Link href={LITERATURE} aria-label="Литература">
              Литература
            </Link>
            <Link href={SPRAVOCHNIK} aria-label="Справочник">
              Справочник
            </Link>
          </div>
          <div className={styles.links}>
            <Link href={BILINGUALS}>Билингвы</Link>
            <Link href={PRAVOPISANIE}>Правописание</Link>
            <Link href={NEWS}>Все новости</Link>
          </div>
          <div className={styles.links}>
            <Link href={POLITIC}>Политика конфеденциальности</Link>
            <Link href={USER_AGREEMENT}>Пользовательское соглашение</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
