import { Metadata } from "next";
import EmptyLayout from "@/app/components/layout/EmptyLayout";

import { LiteratureIndex } from "@components/features/literature/LiteratureIndex/LiteratureIndex";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Литература | Великие произведения Осетии",
  description:
    "Погрузитесь в богатую культуру Осетии через лучшие литературные произведения. Ознакомьтесь с великими произведениями и историей осетинской литературы.",
};

export default function Page() {
  return (
    <EmptyLayout>
      <Suspense>
        <LiteratureIndex />
      </Suspense>
    </EmptyLayout>
  );
}
