"use client";

import styles from "./MyQuestions.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import api from "@api";
import { useRef } from "react";
import { Loader } from "@components/ui/Loader/Loader";
import { SectionTitle } from "@components/ui/SectionTitle/SectionTitle";
import { SearchBase } from "@components/shared/Search/SearchBase";
import CustomSkeleton from "@components/ui/CustomSkeleton/CustomSkeleton";
import { QuestionCard } from "@/app/components/shared/Cards/questions/QuestionCard";

interface Props {
  className?: string;
}

export function MyQuestions({ className = "" }: Props) {
  const [items, setItems] = useState<QuestionCardInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMore, setIsMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const isFetchingRef = useRef(false);

  useEffect(() => {
    if (!isMore || loading || isFetchingRef.current) {
      return;
    }
    isFetchingRef.current = true;
    setLoading(true);
    api
      .get(
        `/questions/me?page=${page}${
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
  }, [page, debouncedSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setItems([]);
      setPage(1);
      setIsMore(true);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  function handlerSliderScrollEnd() {
    if (loading || !isMore || isFetchingRef.current || items.length == 0)
      return;
    setPage((prev) => prev + 1);
  }

  return (
    <div className={`${styles.inner} ${className}`}>
      <SectionTitle>ОТВЕТЫ НА ваши ВОПРОСЫ</SectionTitle>
      <SearchBase
        value={search}
        callback={(value: string) => setSearch(value)}
        placeholder="Произношение сложных звуков"
      />
      <div className={styles.items}>
        <Swiper
          className="ml-0! mr-0!"
          onReachEnd={handlerSliderScrollEnd}
          breakpoints={{
            1199: {
              spaceBetween: 20,
            },
            320: {
              spaceBetween: 12,
            },
          }}
          slidesPerView={"auto"}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <QuestionCard
                searchedText={debouncedSearch}
                className="select-none"
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
