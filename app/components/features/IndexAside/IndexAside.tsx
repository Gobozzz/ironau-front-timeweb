"use client";

import styles from "./IndexAside.module.css";
import { ProfileNavigate } from "@components/features/IndexAside/ProfileNavigate/ProfileNavigate";
import { IndexNavigate } from "@components/features/IndexAside/IndexNavigate/IndexNavigate";
import { Interesting } from "@components/features/IndexAside/Interesting/Interesting";

interface Props {
  className?: string;
}

export function IndexAside({ className = "" }: Props) {
  return (
    <aside className={`${className} ${styles.aside} hide-scrollbar`}>
      <ProfileNavigate />
      <IndexNavigate />
      <Interesting />
    </aside>
  );
}
