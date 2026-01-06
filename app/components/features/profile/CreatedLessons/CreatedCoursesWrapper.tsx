"use client";

import LazyLoadComponent from "@/app/components/shared/Lazy/LazyLoadComponent";
import { CreatedCourses } from "./CreatedCourses";

interface Props {}

export function CreatedCoursesWrapper({}: Props) {
  return (
    <LazyLoadComponent placeholder={<div className="h-[500px]"></div>}>
      <CreatedCourses className="mb-16" />
    </LazyLoadComponent>
  );
}
