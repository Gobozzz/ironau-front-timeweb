"use client";

import type { PropsWithChildren } from "react";
import Container from "@components/layout/Container";
import { IndexAside } from "@components/features/IndexAside/IndexAside";
import { Footer } from "./Footer/Footer";
import { MobileFixedElementsLayout } from "./MobileFixedElementsLayout/MobileFixedElementsLayout";

export default function IndexLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <MobileFixedElementsLayout />
      <Container>
        <div className="flex items-start gap-8 max-[1200px]:block">
          <div className="sticky top-1 max-[1200px]:hidden">
            <IndexAside />
          </div>
          <main className="min-h-screen flex flex-col justify-between flex-auto">
            <div>{children}</div>
            <Footer />
          </main>
        </div>
      </Container>
    </>
  );
}
