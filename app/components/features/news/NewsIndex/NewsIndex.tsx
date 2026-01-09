"use client";

import { PageTitle } from "@/app/components/ui/PageTitle/PageTitle";
import styles from "./NewsIndex.module.css";
import { NewsAside } from "./NewsAside";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import api from "@/app/api";
import { NewsCard } from "@/app/components/shared/Cards/NewsCard/NewsCard";
import CustomSkeleton from "@/app/components/ui/CustomSkeleton/CustomSkeleton";
import { Paginate } from "@/app/components/shared/Paginate/Paginate";
import { SortedNews } from "./SortedNews";
import { DatesFilter } from "./DatesFilter";
import Image from "next/image";
import { DatesFilterMobile } from "./DatesFilterMobile";

interface Props {
  category?: NewsCategory | null;
}

function getQueryFilters(filters: NewsFilters, page: number): string {
  const filters_good = [];
  if (filters.period.trim().length > 0) {
    filters_good.push(`period=${filters.period}`);
  }
  if (filters.day.trim().length > 0) {
    filters_good.push(`day=${filters.day}`);
  }
  if (filters.sorted.trim().length > 0) {
    filters_good.push(`sorted=${filters.sorted}`);
  }
  if (filters.category !== null) {
    filters_good.push(`category_f=${filters.category}`);
  }
  filters_good.push(`page=${!isNaN(Number(page)) ? page : 1}`);
  return `?${filters_good.join("&")}`;
}

export function NewsIndex({ category = null }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMounting = useRef<boolean>(true);

  const [page, setPage] = useState<number>(
    parseInt(searchParams.get("page") || "1") || 1
  );
  const [filters, setFilters] = useState<NewsFilters>({
    category: category?.id || null,
    period: searchParams.get("period") || "",
    day: searchParams.get("day") || "",
    sorted: searchParams.get("sorted") || "new",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<NewsCardInterface[]>([]);
  const [paginate, setPaginate] = useState<PaginatePageInterface[]>([]);

  const createQueryString = useCallback(
    (filters: NewsFilters, page: number) => {
      const params = new URLSearchParams();

      if (filters.period) {
        params.set("period", filters.period);
      }

      if (filters.day) {
        params.set("day", filters.day);
      }

      if (filters.sorted) {
        params.set("sorted", filters.sorted);
      }

      if (filters.category) {
        params.set("category_f", String(filters.category));
      }

      if (page > 1) {
        params.set("page", page.toString());
      }

      return params.toString();
    },
    []
  );

  useEffect(() => {
    const queryString = createQueryString(filters, page);
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(newUrl);
  }, [filters, page, createQueryString, pathname, router]);

  useEffect(() => {
    if (isMounting.current) return;
    setPage(1);
  }, [filters]);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/news${getQueryFilters(filters, page)}`)
      .then((data) => {
        setItems(data.data.data);
        setPaginate(data.data.meta.links);
      })
      .catch(() => {
        setItems([]);
      })
      .finally(() => {
        setLoading(false);
      });
    isMounting.current = false;
  }, [page, filters]);

  return (
    <div className={styles.inner}>
      <NewsAside id_category={category?.id} />
      <div className={styles.main}>
        <PageTitle>{category?.title || "Все новости"}</PageTitle>
        <div className={styles.items}>
          {!loading &&
            items.length > 0 &&
            items.map((item) => (
              <NewsCard className="" key={item.id} data={item} />
            ))}
          {loading &&
            Array.from({ length: 6 }).map((_, index) => (
              <CustomSkeleton key={index} height={320} />
            ))}
          {!loading && items.length === 0 && (
            <div className="text-sm">Не нашлось новостей</div>
          )}
        </div>
        {!loading && (
          <div className={styles.paginate_inner}>
            <Paginate
              onClick={(page: number) => {
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
                setPage(page);
              }}
              pages={paginate}
            />
          </div>
        )}
      </div>
      <div className={styles.filters}>
        <SortedNews filters={filters} setFilters={setFilters} />
        <DatesFilter filters={filters} setFilters={setFilters} />
      </div>
      <DatesFilterMobile filters={filters} setFilters={setFilters} />
    </div>
  );
}
