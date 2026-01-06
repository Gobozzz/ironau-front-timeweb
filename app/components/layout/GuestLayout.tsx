"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Loader } from "@components/ui/Loader/Loader";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/profile");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (user) {
    return null;
  }

  return <>{children}</>;
}
