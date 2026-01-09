"use client";

import Image from "next/image";
import { ProfileNavigate } from "../../IndexAside/ProfileNavigate/ProfileNavigate";
import styles from "./SearchBilinguals.module.css";
import SearchIcon from "@/public/icons/search.svg";
import { useEffect, useRef, useState } from "react";
import api from "@/app/api";
import CustomSkeleton from "@/app/components/ui/CustomSkeleton/CustomSkeleton";

interface Props {
  filters: BilingualFilters;
  setFilters: React.Dispatch<React.SetStateAction<BilingualFilters>>;
}

export function SearchBilinguals({ filters, setFilters }: Props) {
  const [filtersLocal, setFiltersLocal] = useState<BilingualFilters>(filters);

  let timeoutUpdateFilters = useRef<NodeJS.Timeout | null>(null);
  const [loadingGetTags, setLoadingGetTags] = useState<boolean>(false);
  const [tags, setTags] = useState<BilingualTagInterface[]>([]);
  const [searchedTags, setSearchedTags] = useState<BilingualTagInterface[]>([]);
  const [searchTag, setSearchTag] = useState<string>("");

  useEffect(() => {
    if (timeoutUpdateFilters.current) {
      clearTimeout(timeoutUpdateFilters.current);
    }
    timeoutUpdateFilters.current = setTimeout(() => {
      setFilters(filtersLocal);
    }, 350);
  }, [filtersLocal]);

  useEffect(() => {
    setFiltersLocal(filters);
  }, [filters]);

  useEffect(() => {
    const filtered = tags.filter((tag) =>
      tag.title.toLowerCase().includes(searchTag.trim().toLowerCase())
    );
    setSearchedTags(filtered);
  }, [searchTag]);

  useEffect(() => {
    if (loadingGetTags) return;
    setLoadingGetTags(true);
    api
      .get("/bilingual-tags")
      .then((data) => {
        setTags(data.data.data);
        setSearchedTags(data.data.data);
      })
      .finally(() => setLoadingGetTags(false));
  }, []);

  function updateTagLocalFilters(id: number) {
    let tags_ids = [...filtersLocal.tags_f];
    if (!tags_ids.includes(id)) {
      tags_ids.push(id);
    } else {
      tags_ids = tags_ids.filter((tag_id) => tag_id !== id);
    }
    setFiltersLocal((prev) => {
      return { ...prev, tags_f: tags_ids };
    });
  }

  return (
    <div className={styles.inner}>
      <div className="max-[1200px]:hidden">
        <ProfileNavigate className="m-0!" />
      </div>
      <div className={styles.search}>
        <Image src={SearchIcon} alt="Поиск" />
        <input
          value={filtersLocal.title_f}
          onChange={(e) =>
            setFiltersLocal((prev) => {
              return { ...prev, title_f: e.target.value };
            })
          }
          type="text"
          placeholder="Поиск по названию"
          className={styles.search_input}
        />
      </div>
      <div className={styles.tags_inner}>
        <div className={styles.tags_title}>Теги</div>
        <div className={styles.search}>
          <Image src={SearchIcon} alt="Поиск" />
          <input
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            type="text"
            placeholder="Лирика"
            className={styles.search_input}
          />
        </div>
        <div className={styles.tags}>
          {!loadingGetTags &&
            searchedTags.map((tag) => (
              <button
                onClick={() => updateTagLocalFilters(tag.id)}
                key={tag.id}
                type="button"
                className={`${styles.tag} ${
                  filtersLocal.tags_f.includes(tag.id) ? styles.active : ""
                }`}
              >
                {tag.title}
              </button>
            ))}
          {loadingGetTags && (
            <>
              <CustomSkeleton className="w-20" height={32} />
              <CustomSkeleton className="w-20" height={32} />
              <CustomSkeleton className="w-20" height={32} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
