"use client";

import { useEffect, useState } from "react";
import styles from "./CreatedBilinguals.module.css";
import api from "@api";
import { Paginate } from "@components/shared/Paginate/Paginate";
import { SearchBase } from "@components/shared/Search/SearchBase";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { UserRules } from "@enums";
import { canUserRule } from "@helpers/rules";
import CustomSkeleton from "@/app/components/ui/CustomSkeleton/CustomSkeleton";
import { BilingualCreatedCard } from "@/app/components/shared/Cards/bilingual/BilingualCreatedCard";
import { SureModal } from "@/app/components/modals/SureModal/SureModal";

interface Props {}

export function CreatedBilinguals({}: Props) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || !canUserRule(UserRules.CREATE_BILINGUALS, user)) {
    return null;
  }

  const [loading, setLoading] = useState<boolean>(false);
  const [paginate, setPaginate] = useState<PaginatePageInterface[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [refreshItems, setRefreshItems] = useState<boolean>(false);
  const [items, setItems] = useState<BilingualCreatedCardInterface[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search.trim().length === 0) {
        refreshBilinguals();
        return;
      }
      setDebouncedSearch(search.trim());
      setItems([]);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  function refreshBilinguals() {
    setItems([]);
    setPage(1);
    setSearch("");
    setDebouncedSearch("");
    setRefreshItems((prev) => !prev);
  }

  useEffect(() => {
    setLoading(true);
    api
      .get(
        `/bilinguals/me?page=${page}${
          debouncedSearch.length > 0 ? `&title_f=${debouncedSearch}` : ""
        }`
      )
      .then((data) => {
        setItems(data.data.data);
        setPaginate(data.data.meta.links);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }, [page, debouncedSearch, refreshItems]);

  function handlerDelete() {
    if (deleteId === null) return;
    setLoadingDelete(true);
    api.delete(`/bilinguals/${deleteId}`).finally(() => {
      setDeleteId(null);
      refreshBilinguals();
      setLoadingDelete(false);
    });
  }

  return (
    <div className={styles.inner}>
      <SureModal
        open={!!deleteId}
        close={() => setDeleteId(null)}
        callback={() => handlerDelete()}
        question="Вы уверены, что хотите удалить билингву?"
        textYes="Да, удалить"
        textNo="Нет"
        disabled={loadingDelete}
      />
      <SearchBase
        value={search}
        callback={(value: string) => setSearch(value)}
        placeholder="Произношение сложных звуков"
        className="mb-11"
      />
      <div className={styles.items}>
        {loading &&
          Array.from({ length: 4 }).map((_, index) => (
            <CustomSkeleton key={index} height={320} />
          ))}
        {!loading &&
          items.map((bilingual) => (
            <BilingualCreatedCard
              key={bilingual.id}
              data={bilingual}
              delete_callback={(id) => setDeleteId(id)}
            />
          ))}
      </div>
      {!loading && paginate.length > 0 && (
        <div className="mt-20">
          <Paginate
            pages={paginate}
            onClick={(page: number) => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              setPage(page);
            }}
          />
        </div>
      )}
      {!loading && items.length === 0 && debouncedSearch.length == 0 && (
        <div className="text-sm">Вы еще не создавали билингвы</div>
      )}
      {!loading && items.length === 0 && debouncedSearch.length > 0 && (
        <div className="text-sm">Не нашли билингвы по "{debouncedSearch}"</div>
      )}
    </div>
  );
}
