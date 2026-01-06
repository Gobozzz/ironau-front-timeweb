"use client";

import AuthLayout from "@components/layout/AuthLayout";
import ShortLayout from "@components/layout/ShortLayout";
import { useParams } from "next/navigation";
import { NewsEdit } from "@/app/components/features/news/NewsCreate/NewsEdit";

export default function Page() {
  const params = useParams();
  const { id } = params;

  return (
    <AuthLayout>
      <ShortLayout>
        <NewsEdit id={Number(id)} />
      </ShortLayout>
    </AuthLayout>
  );
}
