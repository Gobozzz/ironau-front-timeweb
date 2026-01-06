"use client";

import LazyLoadComponent from "@/app/components/shared/Lazy/LazyLoadComponent";
import { CreatedLessons } from "./CreatedLessons";

interface Props {}

export function CreatedLessonsWrapper({}: Props) {
  return (
    <LazyLoadComponent placeholder={<div className="h-[500px]"></div>}>
      <CreatedLessons className="mb-16" />
    </LazyLoadComponent>
  );
}
