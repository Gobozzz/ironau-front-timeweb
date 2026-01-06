"use client";

import Link from "next/link";
import styles from "./ProfileNavigate.module.css";
import { HOME } from "@/app/navigate";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ProfileLink } from "@components/ui/ProfileLink/ProfileLink";
import Image from "next/image";
import lightIcon from "@/public/icons/light-theme.svg";
import darkIcon from "@/public/icons/dark-theme.svg";

interface Props {
  className?: string;
}

export function ProfileNavigate({ className = "" }: Props) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlerThemeClick = () => setTheme(theme == "dark" ? "light" : "dark");

  return (
    <div className={`${styles.items} ${className}`}>
      <Link className={styles.item} href={HOME} aria-label="Домой">
        <img src="/icons/home.svg" alt="Домой" />
      </Link>
      <ProfileLink />
      <button onClick={handlerThemeClick} className={styles.item}>
        {mounted && (
          <Image
            src={theme === "light" ? darkIcon : lightIcon}
            alt="Тема сайта"
          />
        )}
      </button>
    </div>
  );
}
