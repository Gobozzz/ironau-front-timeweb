"use client";

import LazyLoadComponent from "@/app/components/shared/Lazy/LazyLoadComponent";
import { MyQuestions } from "./MyQuestions";

interface Props {}

export function MyQuestionWrapper({}: Props) {
  return (
    <LazyLoadComponent placeholder={<div className="h-[500px]"></div>}>
      <MyQuestions className="mb-16" />
    </LazyLoadComponent>
  );
}
