"use client";

import Link from "next/link";
import styles from "./MobileFixedElementsLayout.module.css";
import { HOME } from "@/app/navigate";
import HomeIcon from "@/public/icons/home-black.svg";
import Image from "next/image";
import { IndexNavigate } from "../../features/IndexAside/IndexNavigate/IndexNavigate";
import { ProfileNavigate } from "../../features/IndexAside/ProfileNavigate/ProfileNavigate";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SearchIcon from "@/public/icons/search.svg";
import { useDispatch } from "react-redux";
import { openModal } from "@/app/redux/slices/searchModalSlice";
import { ProfileLink } from "../../ui/ProfileLink/ProfileLink";
import { useTheme } from "next-themes";
import lightIcon from "@/public/icons/light-theme.svg";
import darkIcon from "@/public/icons/dark-theme.svg";

interface Props {}

export function MobileFixedElementsLayout({}: Props) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlerThemeClick = () => setTheme(theme == "dark" ? "light" : "dark");

  const [activeMenu, setActiveMenu] = useState<boolean>(false);

  const isHomePage = pathname === "/";

  function openMenu() {
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = "hidden";
    }
    setActiveMenu(true);
  }

  function closeMenu() {
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = "auto";
    }
    setActiveMenu(false);
  }

  return (
    <>
      <button onClick={openMenu} className={`glass_effect_bg ${styles.burger}`}>
        <div className={styles.burger_line}></div>
        <div className={styles.burger_line}></div>
        <div className={styles.burger_line}></div>
      </button>
      {isHomePage && (
        <button
          onClick={() => dispatch(openModal())}
          className={`glass_effect_bg ${styles.home}`}
          aria-label="Поиск по сайту"
        >
          <Image unoptimized src={SearchIcon} alt="Поиск по сайту" />
        </button>
      )}
      {!isHomePage && (
        <Link href={HOME} className={`glass_effect_bg ${styles.home}`}>
          <Image src={HomeIcon} alt="Домой" />
        </Link>
      )}
      <div className={`${styles.menu} ${activeMenu ? styles.active : ""}`}>
        <div className={styles.menu_tools}>
          <ProfileLink callbackClick={() => setActiveMenu(false)} />
          <button onClick={handlerThemeClick} className={styles.color_theme_button}>
            {mounted && (
              <Image
                src={theme === "light" ? darkIcon : lightIcon}
                alt="Тема сайта"
              />
            )}
          </button>
        </div>
        <IndexNavigate />
      </div>
      <div
        onClick={closeMenu}
        className={`${styles.menu_close} ${activeMenu ? styles.active : ""}`}
      ></div>
    </>
  );
}
