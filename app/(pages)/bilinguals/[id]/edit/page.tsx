"use client";

import AuthLayout from "@components/layout/AuthLayout";
import ShortLayout from "@components/layout/ShortLayout";
import { useParams } from "next/navigation";
import { EditBilingual } from "@components/features/bilinguals/CreateBilingual/EditBilingual";

export default function Page() {
  const params = useParams();
  const { id } = params;

  return (
    <AuthLayout>
      <ShortLayout>
        <EditBilingual id={Number(id)} />
      </ShortLayout>
    </AuthLayout>
  );
}
