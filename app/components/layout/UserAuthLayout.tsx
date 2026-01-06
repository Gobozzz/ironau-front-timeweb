"use client";

import { refresh } from "@slices/authSlice";
import { AppDispatch } from "@/app/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function UserAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refresh());
  }, []);

  return <>{children}</>;
}
