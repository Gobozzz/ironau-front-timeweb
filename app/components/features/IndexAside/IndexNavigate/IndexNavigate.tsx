"use client";

import Link from "next/link";
import styles from "./IndexNavigate.module.css";
import Image from "next/image";
import centerLearningImage from "@/public/icons/center-learning.svg";
import literatureImage from "@/public/icons/literature.svg";
import spravochnikImage from "@/public/icons/spravochnik.svg";
import bilingualImage from "@/public/icons/bilinguals.svg";
import pravopisanieImage from "@/public/icons/pravopisanie.svg";
import newsImage from "@/public/icons/news.svg";
import {
  BILINGUALS,
  CENTER_LEARNING,
  LITERATURE,
  NEWS,
  PRAVOPISANIE,
  SPRAVOCHNIK,
} from "@navigate";

interface Props {
  className?: string;
}

interface NavigateItem {
  icon: any;
  title: string;
  href: string;
}

const items: NavigateItem[] = [
  {
    icon: centerLearningImage,
    title: "Центр обучения",
    href: CENTER_LEARNING,
  },
  {
    icon: literatureImage,
    title: "Литература",
    href: LITERATURE,
  },
  {
    icon: spravochnikImage,
    title: "Справочник",
    href: SPRAVOCHNIK,
  },
  {
    icon: bilingualImage,
    title: "Билингвы",
    href: BILINGUALS,
  },
  {
    icon: pravopisanieImage,
    title: "Правописание",
    href: PRAVOPISANIE,
  },
  {
    icon: newsImage,
    title: "Все новости",
    href: NEWS,
  },
];

export function IndexNavigate({ className = "" }: Props) {
  return (
    <nav className={`${className} ${styles.items}`}>
      {items.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={styles.item}
          aria-label={item.title}
        >
          <Image src={item.icon} alt={item.title} />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
