"use client";

import { useEffect, useState } from "react";
import { ProfileNavigate } from "../../IndexAside/ProfileNavigate/ProfileNavigate";
import styles from "./NewsIndex.module.css";
import api from "@/app/api";
import { NewsCategory } from "./NewsCategory";
import CustomSkeleton from "@/app/components/ui/CustomSkeleton/CustomSkeleton";
import Link from "next/link";
import { NEWS } from "@/app/navigate";
import Image from "next/image";
import FilterIcon from "@/public/icons/filter.svg";

interface Props {
  id_category?: number | null;
}

export function NewsAside({ id_category = null }: Props) {
  const [activeFilters, setActiveFilters] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<NewsCategoryShow[]>([]);

  useEffect(() => {
    if (loading) return;
    setLoading(true);
    api
      .get(`/news-categories/tree${id_category ? `/${id_category}` : ""}`)
      .then((data) => setCategories(data.data.data))
      .finally(() => setLoading(false));
  }, [id_category]);

  return (
    <>
      <div className="hidden max-[1200px]:block">
        <button
          onClick={() => {
            const body = document.querySelector("body");
            if (body) {
              body.style.overflow = "hidden";
            }
            setActiveFilters(true);
          }}
          className={`glass_effect_bg ${styles.filter_open_button}`}
          type="button"
          aria-label="Фильтры"
        >
          <Image src={FilterIcon} alt="Фильтры" />
        </button>
      </div>
      <div
        onClick={() => {
          const body = document.querySelector("body");
          if (body) {
            body.style.overflow = "auto";
          }
          setActiveFilters(false);
        }}
        className={`${styles.close_filters} ${
          activeFilters ? styles.active : ""
        }`}
      ></div>
      <aside className={`${styles.aside} ${activeFilters ? styles.active : ""}`}>
        <div className="max-[1200px]:hidden">
          <ProfileNavigate />
        </div>
        <div className={styles.news_categories_list}>
          {!loading && id_category !== null && (
            <Link className="text-sm" href={NEWS}>
              &#8678; Все новости
            </Link>
          )}
          {loading && (
            <>
              <CustomSkeleton className="w-full" height={64} />
              <CustomSkeleton className="w-full" height={64} />
              <CustomSkeleton className="w-full" height={64} />
            </>
          )}
          {!loading &&
            categories.map((cat) => (
              <NewsCategory key={cat.id} category={cat} />
            ))}
        </div>
      </aside>
    </>
  );
}
