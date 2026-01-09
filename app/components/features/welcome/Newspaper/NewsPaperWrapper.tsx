"use client";

import LazyLoadComponent from "@/app/components/shared/Lazy/LazyLoadComponent";
import { Newspaper } from "./Newspaper";
import { NewspaperOld } from "./NewspaperOld";
import { useEffect, useState } from "react";

interface Props {}

export function NewsPaperWrapper({}: Props) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // Выполняется только в браузере после монтирования
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 800);
    }
  }, []);

  if (isMobile === null) {
    // Можно вернуть блок загрузки или null, пока определяем
    return null;
  }

  return (
    <LazyLoadComponent>
      {window.innerWidth < 800 && <NewspaperOld />}
      {window.innerWidth >= 800 && <Newspaper />}
    </LazyLoadComponent>
  );
}
