"use client";

import type { PropsWithChildren } from "react";
import { ArrowBackFlow } from "@components/ui/ArrowBackFlow/ArrowBackFlow";

export default function FlowLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <div>{children}</div>
      <ArrowBackFlow />
    </>
  );
}
