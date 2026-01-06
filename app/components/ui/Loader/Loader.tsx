"use client";

import LargeIcon from "@/public/icons/LoaderLarge.svg";
import BaseIcon from "@/public/icons/LoaderBase.svg";
import SmIcon from "@/public/icons/LoaderSm.svg";
import Image from "next/image";

interface Props {
  size?: "sm" | "base" | "lg";
}

export function Loader({ size = "sm" }: Props) {
  if (size == "sm") {
    return <Image loading="eager" className="animate-spin" src={SmIcon} alt="Загрузка" />;
  } else if (size == "base") {
    return <Image loading="eager" className="animate-spin" src={BaseIcon} alt="Загрузка" />;
  } else if (size === "lg") {
    return <Image loading="eager" className="animate-spin" src={LargeIcon} alt="Загрузка" />;
  } else {
    return <Image loading="eager" className="animate-spin" src={LargeIcon} alt="Загрузка" />;
  }
}
