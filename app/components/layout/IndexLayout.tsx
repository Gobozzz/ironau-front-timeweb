"use client";

import type { PropsWithChildren } from "react";
import Container from "@components/layout/Container";
import { IndexAside } from "@components/features/IndexAside/IndexAside";
import { Footer } from "./Footer/Footer";

export default function IndexLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <Container>
      <div className="flex items-start gap-8">
        <div className="sticky top-1">
          <IndexAside />
        </div>
        <main className="min-h-screen flex flex-col justify-between flex-auto">
          <div>{children}</div>
          <Footer />
        </main>
      </div>
    </Container>
  );
}
