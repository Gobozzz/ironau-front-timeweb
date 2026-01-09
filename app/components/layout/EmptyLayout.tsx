"use client";

import type { PropsWithChildren } from "react";
import Container from "@components/layout/Container";
import { Footer } from "./Footer/Footer";
import { MobileFixedElementsLayout } from "./MobileFixedElementsLayout/MobileFixedElementsLayout";

export default function EmptyLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <MobileFixedElementsLayout />
      <Container>
        <main className="min-h-screen">
          <div>{children}</div>
        </main>
        <Footer />
      </Container>
    </>
  );
}
