"use client";

import Link from "next/link";
import styles from "./NewsCard.module.css";
import { NEWS_SHOW } from "@navigate";

interface Props {
  className?: string;
  data: NewsCardInterface;
}

export function NewsCard({ className = "", data }: Props) {
  return (
    <article className={`${styles.card} ${className}`}>
      <div>
        <time className={styles.date} dateTime="2025-07-27">
          {data.date}
        </time>
        <div className={styles.author}>{data.user.name}</div>
      </div>
      <div className={styles.tags}>
        {data.categories.map((category) => (
          <div key={category.id} className={styles.tag}>
            {category.title}
          </div>
        ))}
      </div>
      <Link className="select-all!" href={NEWS_SHOW(data.slug, data.id)}>
        <h2 className={`${styles.title} line-clamp-2`}>{data.title}</h2>
      </Link>
      <p className={`${styles.text} line-clamp-6`}>{data.description}</p>
      <Link href={NEWS_SHOW(data.slug, data.id)} className={styles.link}>
        Читать полностью
      </Link>
    </article>
  );
}
