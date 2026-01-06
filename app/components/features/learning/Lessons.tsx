"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Learning.module.css";
import { Filters } from "./Filters/Filters";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import api from "@/app/api";
import { Paginate } from "@components/shared/Paginate/Paginate";
import CustomSkeleton from "@components/ui/CustomSkeleton/CustomSkeleton";
import { LessonCard } from "@components/shared/Cards/LessonCard";
import { Tabs } from "./Tabs/Tabs";

interface Props {}

function getQueryFilters(filters: LearningFilters, page: number) {
  const filters_good = [];
  if (filters.title_f.trim().length > 0) {
    filters_good.push(`title_f=${filters.title_f}`);
  }
  if (filters.level_f.length > 0) {
    filters.level_f.forEach((level) => {
      if (!isNaN(Number(level))) {
        filters_good.push(`level_f[]=${level}`);
      }
    });
  }
  filters_good.push(`page=${!isNaN(Number(page)) ? page : 1}`);
  return `?${filters_good.join("&")}`;
}

export function Lessons({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMounting = useRef<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<LessonCard[]>([]);
  const [paginate, setPaginate] = useState<PaginatePageInterface[]>([]);

  const [filters, setFilters] = useState<LearningFilters>({
    title_f: searchParams.get("title") || "",
    level_f: searchParams.getAll("level").map(Number),
  });
  const [page, setPage] = useState<number>(
    parseInt(searchParams.get("page") || "1") || 1
  );

  const createQueryString = useCallback(
    (filters: LearningFilters, page: number) => {
      const params = new URLSearchParams();

      if (filters.title_f) {
        params.set("title", filters.title_f);
      }

      filters.level_f.forEach((level) => {
        if (!isNaN(Number(level))) {
          params.append("level", level.toString());
        }
      });

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
      .get(`/lessons${getQueryFilters(filters, page)}`)
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
    <div>
      <Tabs type="lessons" />
      <Filters filters={filters} setFilters={setFilters} />
      <div className={styles.items}>
        {!loading &&
          items.length > 0 &&
          items.map((item) => (
            <LessonCard className="max-w-max!" key={item.id} data={item} />
          ))}
        {loading &&
          Array.from({ length: 3 }).map((_, index) => (
            <CustomSkeleton key={index} height={320} />
          ))}
      </div>
      {!loading && (
        <div className={styles.paginate_inner}>
          <Paginate
            onClick={(page: number) => {
              setPage(page);
            }}
            pages={paginate}
          />
        </div>
      )}
      {!loading && items.length === 0 && (
        <div className="text-sm">Не нашлось уроков</div>
      )}
    </div>
  );
}
