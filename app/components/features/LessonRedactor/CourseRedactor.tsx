"use client";

import styles from "./LessonRedactor.module.css";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import api from "@api";
import { Loader } from "@components/ui/Loader/Loader";
import { SearchBase } from "@components/shared/Search/SearchBase";
import CustomSkeleton from "@components/ui/CustomSkeleton/CustomSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { canUserRule } from "@helpers/rules";
import { UserRules } from "@enums";
import { SureModal } from "@components/modals/SureModal/SureModal";
import { Paginate } from "@components/shared/Paginate/Paginate";
import { CreatedCourseCard } from "@components/shared/Cards/CreatedCourseCard";
import { CourseEditModal } from "@components/modals/LearningCreate/CourseEditModal";

interface Props {
  className?: string;
  setUpdateCourse: React.Dispatch<
    React.SetStateAction<UpdateLessonsInCourseInterface | null>
  >;
}

export function CourseRedactor({ className = "", setUpdateCourse }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || !canUserRule(UserRules.CREATE_TEACH_MATERIAL, user)) {
    return null;
  }

  const [items, setItems] = useState<CreatedCourseCard[]>([]);
  const [paginate, setPaginate] = useState<PaginatePageInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [editIdCourse, setEditIdCourse] = useState<number | null>(null);
  const [deleteIdLesson, setDeleteIdLesson] = useState<number | null>(null);
  const [refreshItems, setRefreshItems] = useState<boolean>(false);
  const containerLesson = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading) {
      return;
    }
    setItems([]);
    setLoading(true);
    api
      .get(
        `/courses/created?page=${page}${
          debouncedSearch.length > 0 ? `&title_f=${debouncedSearch}` : ""
        }`
      )
      .then((data) => {
        setItems(data.data.data);
        setPaginate(data.data.meta.links);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, [page, debouncedSearch, refreshItems]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setItems([]);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  function refreshLessons() {
    setItems([]);
    setPage(1);
    setSearch("");
    setDebouncedSearch("");
    setRefreshItems((prev) => !prev);
  }

  function deleteLesson(id: number) {
    if (loadingDelete) return;
    setLoadingDelete(true);
    api
      .delete(`/courses/${id}`)
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
      <CourseEditModal
        open={!!editIdCourse}
        close={() => {
          setEditIdCourse(null);
        }}
        callbackSuccessEdit={refreshLessons}
        id={editIdCourse}
      />
      <div className={styles.title_section}>Ваши курсы</div>
      <SearchBase
        value={search}
        callback={(value: string) => setSearch(value)}
        placeholder="Произношение сложных звуков"
      />
      <div ref={containerLesson} className={styles.items}>
        {items.map((item) => (
          <CreatedCourseCard
            setUpdateCourse={setUpdateCourse}
            key={item.id}
            setDeleteId={(id: number) => setDeleteIdLesson(id)}
            setEditId={(id: number) => setEditIdCourse(id)}
            className="select-none max-w-full!"
            data={item}
          />
        ))}
        {loading && items.length > 0 && (
          <div className="h-[300px] flex items-center justify-center">
            <Loader size="base" />
          </div>
        )}
        {loading &&
          items.length === 0 &&
          Array.from({ length: 4 }).map((_, index) => (
            <CustomSkeleton key={index} height={320} />
          ))}
      </div>
      {!loading && (
        <Paginate
          onClick={(page: number) => {
            setPage(page);
            if (containerLesson.current) {
              containerLesson.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }}
          pages={paginate}
        />
      )}
      {!loading && items.length === 0 && debouncedSearch.length == 0 && (
        <div className="text-sm">У вас пока нет созданных курсов</div>
      )}
      {!loading && items.length === 0 && debouncedSearch.length > 0 && (
        <div className="text-sm">Не нашлось курсов по "{debouncedSearch}"</div>
      )}
    </div>
  );
}
