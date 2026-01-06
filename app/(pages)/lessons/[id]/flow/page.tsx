"use client";

import { LessonFlow } from "@/app/components/features/flows/LessonFlow";
import FlowLayout from "@components/layout/FlowLayout";
import AuthLayout from "@components/layout/AuthLayout";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const { id } = params;

  return (
    <AuthLayout>
      <FlowLayout>
        <LessonFlow id={Number(id)} />
      </FlowLayout>
    </AuthLayout>
  );
}
