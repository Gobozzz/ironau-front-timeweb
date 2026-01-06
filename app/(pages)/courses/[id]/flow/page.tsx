"use client";

import FlowLayout from "@components/layout/FlowLayout";
import AuthLayout from "@components/layout/AuthLayout";
import { useParams } from "next/navigation";
import { CourseFlow } from "@/app/components/features/flows/CourseFlow";

export default function Page() {
  const params = useParams();
  const { id } = params;

  return (
    <AuthLayout>
      <FlowLayout>
        <CourseFlow id={Number(id)} />
      </FlowLayout>
    </AuthLayout>
  );
}
