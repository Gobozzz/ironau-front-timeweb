"use client";

import { CreatedLessonCard } from "@components/shared/Cards/CreatedLessonCard";
import styles from "./CreatedLessons.module.css";
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
import { LessonEditModal } from "@/app/components/modals/LearningCreate/LessonEditModal";
import { SureModal } from "@/app/components/modals/SureModal/SureModal";

interface Props {
  className?: string;
}

export function CreatedLessons({ className = "" }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || !canUserRule(UserRules.CREATE_TEACH_MATERIAL, user)) {
    return null;
  }

  const [items, setItems] = useState<CreatedLessonCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [isMore, setIsMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [editIdLesson, setEditIdLesson] = useState<number | null>(null);
  const [deleteIdLesson, setDeleteIdLesson] = useState<number | null>(null);
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
        `/lessons/created?page=${page}${
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
      if (search.trim().length === 0) {
        refreshLessons();
        return;
      }
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

  function refreshLessons() {
    setItems([]);
    setPage(1);
    setSearch("");
    setDebouncedSearch("");
    setIsMore(true);
    setRefreshItems((prev) => !prev);
  }

  function deleteLesson(id: number) {
    if (loadingDelete) return;
    setLoadingDelete(true);
    api
      .delete(`/lessons/${id}`)
      .then(() => {
        setDeleteIdLesson(null);
        refreshLessons();
      })
      .finally(() => setLoadingDelete(false));
  }

  return (
    <div className={`${styles.inner} ${className}`}>
      <SureModal
        open={!!deleteIdLesson}
        close={() => setDeleteIdLesson(null)}
        callback={() => {
          if (deleteIdLesson !== null) {
            deleteLesson(deleteIdLesson);
          }
        }}
        question="Вы уверены что хотите удалить урок?"
        textYes="Да, удалить"
        disabled={loadingDelete}
      />
      <LessonEditModal
        open={!!editIdLesson}
        close={() => {
          setEditIdLesson(null);
        }}
        callbackSuccessEdit={refreshLessons}
        id={editIdLesson}
      />
      <SectionTitle>СОЗДАННЫЕ УРОКИ</SectionTitle>
      <SearchBase
        value={search}
        callback={(value: string) => setSearch(value)}
        placeholder="Произношение сложных звуков"
      />
      <div className={styles.items}>
        <Swiper
          className="ml-0! mr-0!"
          onReachEnd={handlerSliderScrollEnd}
          spaceBetween={20}
          slidesPerView={"auto"}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <CreatedLessonCard
                setDeleteId={(id: number) => setDeleteIdLesson(id)}
                setEditId={(id: number) => setEditIdLesson(id)}
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
        <div className="text-sm">У вас пока нет созданных уроков</div>
      )}
      {!loading && items.length === 0 && debouncedSearch.length > 0 && (
        <div className="text-sm">Не нашлось уроков по "{debouncedSearch}"</div>
      )}
    </div>
  );
}
