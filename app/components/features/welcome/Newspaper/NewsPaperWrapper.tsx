"use client";

import LazyLoadComponent from "@/app/components/shared/Lazy/LazyLoadComponent";
import { Newspaper } from "./Newspaper";
import { NewspaperOld } from "./NewspaperOld";

interface Props {}

export function NewsPaperWrapper({}: Props) {
  return (
    <LazyLoadComponent>
      {/* {window.innerWidth < 800 && <NewspaperOld />}
      {window.innerWidth >= 800 && <Newspaper />} */}
    </LazyLoadComponent>
  );
}
