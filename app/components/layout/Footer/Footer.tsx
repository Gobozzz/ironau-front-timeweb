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
      <div className="flex items-start gap-25">
        <div>
          <h2 className={styles.title}>иронау.ру</h2>
          <div className="flex justify-between items-end">
            <div className="font-navigation! text-base select-none">
              2001 — {new Date().getFullYear()}
            </div>
            <div>
              <div className="text-gray text-base select-none">
                Главный редактор
              </div>
              <div className="text-base underline select-none">В. Иванов</div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-30">
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
