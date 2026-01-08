"use client";

import Link from "next/link";
import styles from "./SocialMobile.module.css";
import { TG_LINK, VK_LINK } from "@/app/constants";
import { TG } from "../../ui/Icons/TG";
import { VK } from "../../ui/Icons/VK";

interface Props {}

export function SocialMobile({}: Props) {
  return (
    <div className={`${styles.inner} glass_effect_bg`}>
      <Link target="_blank" className={styles.item} href={TG_LINK}>
        <TG />
      </Link>
      <Link target="_blank" className={styles.item} href={VK_LINK}>
        <VK />
      </Link>
    </div>
  );
}
