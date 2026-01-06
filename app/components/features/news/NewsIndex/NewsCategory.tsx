"use client";

import Link from "next/link";
import styles from "./NewsIndex.module.css";
import { NEWS_CATEGORY } from "@/app/navigate";
import Image from "next/image";
import ArrowDown from "@/public/icons/arrow-down.svg";
import { useState } from "react";

interface Props {
  category: NewsCategoryShow;
}

export function NewsCategory({ category }: Props) {
  const [activeChildren, setActiveChildren] = useState<boolean>(false);

  return (
    <div className={styles.news_category}>
      <div className={styles.news_category_up}>
        <Link
          className={`line-clamp-1 ${styles.news_category_title}`}
          href={NEWS_CATEGORY(category.slug, category.id)}
        >
          {category.title}
        </Link>
        {category.children.length > 0 && (
          <button
            onClick={() => setActiveChildren((prev) => !prev)}
            className={`${styles.news_category_arrow} ${
              activeChildren ? styles.active : ""
            }`}
            type="button"
          >
            <Image src={ArrowDown} alt="Стрелка вниз" />
          </button>
        )}
      </div>
      {category.children.length > 0 && (
        <div
          className={`${styles.news_category_childrens} ${
            activeChildren ? styles.active : ""
          }`}
        >
          {category.children.map((child) => (
            <NewsCategory key={child.id} category={child} />
          ))}
        </div>
      )}
    </div>
  );
}
