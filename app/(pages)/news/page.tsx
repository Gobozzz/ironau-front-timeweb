import { Metadata } from "next";
import EmptyLayout from "@/app/components/layout/EmptyLayout";
import { NewsIndex } from "@/app/components/features/news/NewsIndex/NewsIndex";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Новости Осетии",
  description:
    "Читайте свежие новости, новости политики, экономики и культуры Осетии. Актуальные новости региона напрямую на вашем сайте.",
  keywords:
    "новости Осетии, новости региона, Осетия, свежие новости, политика, экономика, культура, актуальные новости, события в Осетии",
};

export default function Page() {
  return (
    <EmptyLayout>
      <Suspense>
        <NewsIndex />
      </Suspense>
    </EmptyLayout>
  );
}
