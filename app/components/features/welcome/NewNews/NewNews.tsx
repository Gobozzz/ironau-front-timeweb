"use client";

import { NewsCard } from "@/app/components/shared/Cards/NewsCard/NewsCard";
import styles from "./NewNews.module.css";
import { Marquee } from "@components/features/welcome/Marque/Marque";
import { NEWS } from "@navigate";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@api";
import CustomSkeleton from "@components/ui/CustomSkeleton/CustomSkeleton";

interface Props {
  className?: string;
}

export function NewNews({ className }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [news, setNews] = useState<NewsCardInterface[]>([]);

  useEffect(() => {
    setLoading(true);
    api
      .get("/news/latest")
      .then((data) => {
        setNews(data.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={`${styles.inner} ${className}`}>
      <div>
        <Marquee />
      </div>
      <div className={styles.news}>
        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <CustomSkeleton key={index} height={100} />
          ))}
        {!loading && news.map((item) => <NewsCard key={item.id} data={item} />)}
      </div>
      <Link className={styles.more} href={NEWS} aria-label="Больше новостей">
        Больше новостей
      </Link>
    </div>
  );
}
