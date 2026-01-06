"use client";

import LazyLoadComponent from "@/app/components/shared/Lazy/LazyLoadComponent";
import { MyLessons } from "./MyLessons";

interface Props {}

export function MyLessonsWrapper({}: Props) {
  return (
    <LazyLoadComponent placeholder={<div className="h-[500px]"></div>}>
      <MyLessons className="mb-16" />
    </LazyLoadComponent>
  );
}
