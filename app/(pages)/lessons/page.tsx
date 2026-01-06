import { Lessons } from "@components/features/learning/Lessons";
import { PageTitle } from "@components/ui/PageTitle/PageTitle";
import IndexLayout from "@components/layout/IndexLayout";
import { Metadata } from "next";
import { Form } from "@components/features/learning/Form/Form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Центр обучения | Уроки",
  description:
    "Изучайте осетинский язык с нашим Центром обучения! Предлагаем курсы, уроки и материалы для начинающих и продвинутых. Откройте новые возможности общения и сохраните осетинскую культуру.",
};

export default function Page() {
  return (
    <IndexLayout>
      <div>
        <PageTitle>Центр обучения</PageTitle>
        <Suspense>
          <Lessons />
        </Suspense>
        <Form />
      </div>
    </IndexLayout>
  );
}
