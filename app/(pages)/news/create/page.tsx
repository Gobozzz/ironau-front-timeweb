"use client";

import { NewsCreate } from "@/app/components/features/news/NewsCreate/NewsCreate";
import { MegaTitle } from "@/app/components/ui/MegaTitle/MegaTitle";
import ShortLayout from "@components/layout/ShortLayout";

interface Props {}

export default function Page({}: Props) {
  return (
    <ShortLayout>
      <MegaTitle>Редактор новостей</MegaTitle>
      <NewsCreate />
    </ShortLayout>
  );
}
