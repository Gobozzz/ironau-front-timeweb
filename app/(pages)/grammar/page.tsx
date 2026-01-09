import { PageTitle } from "@components/ui/PageTitle/PageTitle";
import IndexLayout from "@components/layout/IndexLayout";
import { Metadata } from "next";
import { GrammarEditor } from "@/app/components/features/grammar/GrammarEditor";

export const metadata: Metadata = {
  title: "Правописание | Пиши на осетинском без ошибок",
  description:
    "Сервис для проверки и автоматического исправления орфографических ошибок на осетинском языке, помогая писать правильно и грамотно.",
};

export default function Page() {
  return (
    <IndexLayout>
      <div>
        <PageTitle>Правописание</PageTitle>
        <p className="text-base max-w-[1000px] mb-6 select-none max-[1200px]:text-[12px] max-[1200px]:mb-13">
          Сервис предназначен для тех, кому важна точность и грамотность текстов
          на осетинском языке. Благодаря нашим услугам ваши тексты будут
          свободны от ошибок и станут выразительными инструментами общения и
          самовыражения.
        </p>
        <GrammarEditor />
      </div>
    </IndexLayout>
  );
}
