import { Metadata } from "next";
import EmptyLayout from "@/app/components/layout/EmptyLayout";

import { BilingualsIndex } from "@/app/components/features/bilinguals/BilingualsIndex/BilingualsIndex";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Билингвы | Переводы произведений на осетинский",
  description:
    "Погрузитесь в мир двуязычных переводов произведений на осетинский язык. Ознакомьтесь с би‑лингвальными текстами, переводами и интересными материалами о культуре и языке.",
};

export default function Page() {
  return (
    <EmptyLayout>
      <Suspense>
        <BilingualsIndex />
      </Suspense>
    </EmptyLayout>
  );
}
