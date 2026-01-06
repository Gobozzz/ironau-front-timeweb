import { PageTitle } from "@components/ui/PageTitle/PageTitle";
import { Metadata } from "next";
import { Questions } from "@components/features/questions/Questions";
import ShortLayout from "@/app/components/layout/ShortLayout";

export const metadata: Metadata = {
  title: "Справочное бюро | Ответы на вопросы по осетинскому языку",
  description:
    "Получите быстрые ответы и полезную информацию по осетинскому языку. Справочное бюро — ваш надежный источник знаний и советов по осетинской грамматике, лексике и языковой практике.",
};

export default function Page() {
  return (
    <ShortLayout>
      <div>
        <PageTitle>Справочный центр</PageTitle>
        <Questions />
      </div>
    </ShortLayout>
  );
}
