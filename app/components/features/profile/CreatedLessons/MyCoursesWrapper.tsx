"use client";

import LazyLoadComponent from "@/app/components/shared/Lazy/LazyLoadComponent";
import { MyCourses } from "./MyCourses";

interface Props {}

export function MyCoursesWrapper({}: Props) {
  return (
    <LazyLoadComponent placeholder={<div className="h-[500px]"></div>}>
      <MyCourses className="mb-16" />
    </LazyLoadComponent>
  );
}
