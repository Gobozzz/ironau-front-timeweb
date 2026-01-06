"use client";

import type { PropsWithChildren } from "react";
import Container from "@components/layout/Container";
import { Footer } from "./Footer/Footer";
import { ProfileNavigate } from "../features/IndexAside/ProfileNavigate/ProfileNavigate";

export default function ShortLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <Container>
      <div className="min-h-screen flex flex-col justify-between flex-auto">
        <div>
          <div className="mb-8">
            <ProfileNavigate />
          </div>
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </Container>
  );
}
