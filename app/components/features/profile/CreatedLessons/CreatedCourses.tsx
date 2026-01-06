"use client";

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
import { SureModal } from "@components/modals/SureModal/SureModal";
import { CreatedCourseShortCard } from "@/app/components/shared/Cards/CreatedCourseShortCard";
import { CourseEditModal } from "@/app/components/modals/LearningCreate/CourseEditModal";

interface Props {
  className?: string;
}

export function CreatedCourses({ className = "" }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || !canUserRule(UserRules.CREATE_TEACH_MATERIAL, user)) {
    return null;
  }

  const [items, setItems] = useState<CreatedCourseCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [isMore, setIsMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [editIdCourse, setEditIdCourse] = useState<number | null>(null);
  const [deleteIdCourse, setDeleteIdCourse] = useState<number | null>(null);
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
        `/courses/created?page=${page}${
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
      .delete(`/courses/${id}`)
      .then(() => {
        setDeleteIdCourse(null);
        refreshLessons();
      })
      .finally(() => setLoadingDelete(false));
  }

  return (
    <div className={`${styles.inner} ${className}`}>
      <SureModal
        open={!!deleteIdCourse}
        close={() => setDeleteIdCourse(null)}
        callback={() => {
          if (deleteIdCourse !== null) {
            deleteLesson(deleteIdCourse);
          }
        }}
        question="Вы уверены что хотите удалить курс?"
        textYes="Да, удалить"
        disabled={loadingDelete}
      />
      <CourseEditModal
        open={!!editIdCourse}
        close={() => {
          setEditIdCourse(null);
        }}
        callbackSuccessEdit={refreshLessons}
        id={editIdCourse}
      />
      <SectionTitle>СОЗДАННЫЕ КУРСЫ</SectionTitle>
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
              <CreatedCourseShortCard
                setDeleteId={(id: number) => setDeleteIdCourse(id)}
                setEditId={(id: number) => setEditIdCourse(id)}
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
        <div className="text-sm">У вас пока нет созданных курсов</div>
      )}
      {!loading && items.length === 0 && debouncedSearch.length > 0 && (
        <div className="text-sm">Не нашлось курсов по "{debouncedSearch}"</div>
      )}
    </div>
  );
}
