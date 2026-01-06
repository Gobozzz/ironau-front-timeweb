"use client";

import LazyLoadComponent from "@/app/components/shared/Lazy/LazyLoadComponent";
import { CreatedNews } from "./CreatedNews";

interface Props {}

export function CreatedNewsWrapper({}: Props) {
  return (
    <LazyLoadComponent placeholder={<div className="h-[500px]"></div>}>
      <CreatedNews className="mb-16" />
    </LazyLoadComponent>
  );
}
