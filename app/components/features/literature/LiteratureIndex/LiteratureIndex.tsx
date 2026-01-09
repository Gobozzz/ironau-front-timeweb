"use client";

import { PageTitle } from "@/app/components/ui/PageTitle/PageTitle";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import api from "@/app/api";
import styles from "./LiteratureIndex.module.css";
import CustomSkeleton from "@/app/components/ui/CustomSkeleton/CustomSkeleton";
import { Paginate } from "@/app/components/shared/Paginate/Paginate";
import { BilingualCard } from "@/app/components/shared/Cards/bilingual/BilingualCard";
import { Filters } from "./Filters/Filters";
import { Search } from "./Search/Search";
import { LiteratureCard } from "@/app/components/shared/Cards/literature/LiteratureCard";

interface Props {}

function getQueryFilters(filters: LiteratureFilters, page: number): string {
  const filters_good = [];
  if (filters.title_f.trim().length > 0) {
    filters_good.push(`title_f=${filters.title_f}`);
  }
  if (filters.tags_f.length > 0) {
    filters.tags_f.forEach((tag) => {
      if (!isNaN(Number(tag))) {
        filters_good.push(`tags_f[]=${tag}`);
      }
    });
  }
  if (filters.period.trim().length > 0) {
    filters_good.push(`period=${filters.period}`);
  }
  filters_good.push(`page=${!isNaN(Number(page)) ? page : 1}`);
  return `?${filters_good.join("&")}`;
}

export function LiteratureIndex({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMounting = useRef<boolean>(true);

  const [filters, setFilters] = useState<LiteratureFilters>({
    title_f: searchParams.get("title") || "",
    period: searchParams.get("period") || "",
    tags_f: searchParams.getAll("tag").map(Number),
  });

  const [page, setPage] = useState<number>(
    parseInt(searchParams.get("page") || "1") || 1
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<LiteratureCardInterface[]>([]);
  const [paginate, setPaginate] = useState<PaginatePageInterface[]>([]);

  const createQueryString = useCallback(
    (filters: LiteratureFilters, page: number) => {
      const params = new URLSearchParams();

      if (filters.title_f) {
        params.set("title", filters.title_f);
      }

      filters.tags_f.forEach((tag) => {
        if (!isNaN(Number(tag))) {
          params.append("tag", tag.toString());
        }
      });

      if (filters.period) {
        params.set("period", filters.period);
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
      .get(`/literature${getQueryFilters(filters, page)}`)
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
    <div className="flex items-start justify-between gap-x-5 max-[1200px]:flex-col">
      <Search filters={filters} setFilters={setFilters} />
      <div className="flex-auto max-[1200px]:w-full">
        <PageTitle className="max-[1200px]:hidden">Литература</PageTitle>
        <div className={styles.items}>
          {!loading &&
            items.length > 0 &&
            items.map((item) => (
              <LiteratureCard className="" key={item.id} data={item} />
            ))}
          {loading &&
            Array.from({ length: 6 }).map((_, index) => (
              <CustomSkeleton key={index} height={320} />
            ))}
        </div>
        {!loading && items.length === 0 && (
          <div className="text-sm">Не нашлось литературы</div>
        )}
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
      <Filters filters={filters} setFilters={setFilters} />
    </div>
  );
}
