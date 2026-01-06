"use client";

import type { PropsWithChildren } from "react";
import Container from "@components/layout/Container";
import { Footer } from "./Footer/Footer";

export default function EmptyLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <Container>
      <main className="min-h-screen">
        <div>{children}</div>
      </main>
      <Footer />
    </Container>
  );
}
