"use client";

import { RedactorTranslations } from "@components/features/bilinguals/RedactorTranslations/RedactorTranslations";
import AuthLayout from "@components/layout/AuthLayout";
import ShortLayout from "@components/layout/ShortLayout";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const { id } = params;

  return (
    <AuthLayout>
      <ShortLayout>
        <RedactorTranslations id={Number(id)} />
      </ShortLayout>
    </AuthLayout>
  );
}
