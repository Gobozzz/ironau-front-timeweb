"use client";

import styles from "./CreatedNews.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import api from "@api";
import { useRef } from "react";
import { Loader } from "@components/ui/Loader/Loader";
import { SectionTitle } from "@components/ui/SectionTitle/SectionTitle";
import { SearchBase } from "@components/shared/Search/SearchBase";
import CustomSkeleton from "@components/ui/CustomSkeleton/CustomSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { canUserRule } from "@helpers/rules";
import { UserRules } from "@/app/enums";
import { CreatedNewsCard } from "@/app/components/shared/Cards/NewsCard/CreatedNewsCard";
import { SureModal } from "@/app/components/modals/SureModal/SureModal";

interface Props {
  className?: string;
}

export function CreatedNews({ className = "" }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || !canUserRule(UserRules.WRITE_NEWS, user)) {
    return null;
  }

  const [items, setItems] = useState<NewsCardInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMore, setIsMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [refreshItems, setRefreshItems] = useState<boolean>(false);

  const isFetchingRef = useRef(false);

  useEffect(() => {
    if (!isMore || loading || isFetchingRef.current) {
      return;
    }
    isFetchingRef.current = true;
    setLoading(true);
    api
      .get(
        `/news/me?page=${page}${
          debouncedSearch.length > 0 ? `&title_f=${debouncedSearch}` : ""
        }`
      )
      .then((data) => {
        setItems((prev) => [...prev, ...data.data.data]);
        setIsMore(!!data.data?.links?.next);
      })
      .catch(() => {
        setIsMore(false);
      })
      .finally(() => {
        setLoading(false);
        isFetchingRef.current = false;
      });
  }, [page, debouncedSearch, refreshItems]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setItems([]);
      setPage(1);
      setIsMore(true);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  function refreshNews() {
    setItems([]);
    setPage(1);
    setSearch("");
    setDebouncedSearch("");
    setIsMore(true);
    setRefreshItems((prev) => !prev);
  }

  function deleteLesson(id: number) {
    if (loadingDelete) {
      return;
    }
    setLoadingDelete(true);
    api
      .delete(`/news/${id}`)
      .then(() => {
        refreshNews();
      })
      .finally(() => {
        setDeleteId(null);
        setLoadingDelete(false);
      });
  }

  function handlerSliderScrollEnd() {
    if (loading || !isMore || isFetchingRef.current || items.length == 0)
      return;
    setPage((prev) => prev + 1);
  }

  return (
    <div className={`${styles.inner} ${className}`}>
      <SureModal
        open={!!deleteId}
        close={() => setDeleteId(null)}
        callback={() => {
          if (deleteId !== null) {
            deleteLesson(deleteId);
          }
        }}
        question="Вы уверены что хотите удалить новость?"
        textYes="Да, удалить"
        disabled={loadingDelete}
      />
      <SectionTitle>СОЗДАННЫЕ Новости</SectionTitle>
      <SearchBase
        value={search}
        callback={(value: string) => setSearch(value)}
        placeholder="Произношение сложных звуков"
      />
      <div className={styles.items}>
        <Swiper
          className="ml-0! mr-0!"
          onReachEnd={handlerSliderScrollEnd}
          spaceBetween={32}
          slidesPerView={"auto"}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <CreatedNewsCard
                delete_callback={(id: number) => setDeleteId(id)}
                className="select-none min-w-[340px]! max-w-[340px]!"
                data={item}
              />
            </SwiperSlide>
          ))}
          {loading && items.length > 0 && (
            <SwiperSlide className={styles.slide}>
              <div className="h-[300px] flex items-center justify-center">
                <Loader size="base" />
              </div>
            </SwiperSlide>
          )}
          {loading &&
            items.length === 0 &&
            Array.from({ length: 6 }).map((_, index) => (
              <SwiperSlide className={styles.slide}>
                <CustomSkeleton key={index} height={320} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      {!loading && items.length === 0 && debouncedSearch.length == 0 && (
        <div className="text-sm">Пока нет отвеченных вопросов</div>
      )}
      {!loading && items.length === 0 && debouncedSearch.length > 0 && (
        <div className="text-sm">
          Не нашлось вопросов по "{debouncedSearch}"
        </div>
      )}
    </div>
  );
}
