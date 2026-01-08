"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./ArrowUp.module.css";
import { usePathname } from "next/navigation";

export function ArrowUp() {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      // Отменяем предыдущий таймаут
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Дебаунсим проверку на 100ms
      timeoutRef.current = setTimeout(() => {
        const scrolled = window.scrollY;

        const shouldShow = scrolled > 100;

        setIsVisible(shouldShow);
      }, 100);
    };

    // Passive listener для производительности
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Начальная проверка
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      className={`${styles.arrow} ${styles.arrowVisible} ${pathname === "/" && window.innerWidth <= 799 ? styles.mobile : ''}`}
      onClick={scrollToTop}
      aria-label="Прокрутить наверх"
    >
      <img className={styles.arrow_white} src="/icons/arrow-up.svg" alt="Стрелочка наверх" />
      <img className={styles.arrow_black} src="/icons/arrow-up-black.svg" alt="Стрелочка наверх" />
    </button>
  );
}
