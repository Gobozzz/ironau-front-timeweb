"use client";

import AuthLayout from "@components/layout/AuthLayout";
import ShortLayout from "@/app/components/layout/ShortLayout";
import { CreateBilingual } from "@/app/components/features/bilinguals/CreateBilingual/CreateBilingual";

export default function Page() {
  return (
    <AuthLayout>
      <ShortLayout>
        <CreateBilingual />
      </ShortLayout>
    </AuthLayout>
  );
}
