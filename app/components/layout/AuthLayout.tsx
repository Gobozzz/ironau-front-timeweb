"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Loader } from "@components/ui/Loader/Loader";
import { HOME } from "@navigate";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(HOME);
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}
