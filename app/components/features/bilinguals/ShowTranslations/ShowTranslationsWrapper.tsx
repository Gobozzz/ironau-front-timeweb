"use client";

import { useEffect, useState } from "react";
import { ShowTranslations } from "./ShowTranslations";
import { ShowTranslationsDesctop } from "./ShowTranslationsDesctop";

interface Props {
  bilingual: BilingualShowInterface;
}

export function ShowTranslationsWrapper({ bilingual }: Props) {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (typeof window === "undefined") {
    return null;
  }

  if (window.innerWidth >= 1200) {
    return <ShowTranslationsDesctop bilingual={bilingual} />;
  }

  return <ShowTranslations bilingual={bilingual} />;
}
