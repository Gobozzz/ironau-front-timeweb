"use client";

import Link from "next/link";
import styles from "./Result.module.css";
import { TypeGlobalSearch, typeGlobalSearchLabels } from "@enums";
import {
  BILINGUAL_SHOW,
  COURSE_SHOW,
  HOME,
  LESSON_SHOW,
  LITERATURE_SHOW,
  NEWS_SHOW,
} from "@navigate";
import CustomSkeleton from "@components/ui/CustomSkeleton/CustomSkeleton";

interface Props {
  className?: string;
  searchItems: Array<IGlobalSearchItem>;
  searchText: string;
  loading: boolean;
}

function getLinkPageByType(type: string, slug: string, id: number): string {
  switch (type) {
    case TypeGlobalSearch.LESSON:
      return LESSON_SHOW(slug, id);
    case TypeGlobalSearch.COURSE:
      return COURSE_SHOW(slug, id);
    case TypeGlobalSearch.LITERATURE:
      return LITERATURE_SHOW(slug, id);
    case TypeGlobalSearch.NEWS:
      return NEWS_SHOW(slug, id);
    case TypeGlobalSearch.BILINGUAL:
      return BILINGUAL_SHOW(slug, id);
    default:
      return HOME;
  }
}

function highlightText(text: string, searchText: string): React.ReactNode {
  if (!searchText) return text;
  const regex = new RegExp(`(${searchText})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? <mark key={index}>{part}</mark> : part
  );
}

export function Result({
  className = "",
  searchText,
  searchItems,
  loading,
}: Props) {
  return (
    <div className={`${styles.inner} ${className}`}>
      <div className={styles.title}>Результаты выдачи</div>
      <div className={styles.result}>
        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <CustomSkeleton key={index} height={100} />
          ))}
        {!loading && searchText.length === 0 && (
          <div className={styles.empty}>Введите запрос в поисковой строке</div>
        )}
        {!loading && searchText.length > 0 && searchItems.length === 0 && (
          <div className={styles.empty}>
            Ничего не найдено. Попробуйте изменить запрос
          </div>
        )}
        {!loading &&
          searchText.length > 0 &&
          searchItems.length > 0 &&
          searchItems.map((searchItem, index) => (
            <div className={styles.item} key={index}>
              <div>
                <Link
                  className={`line-clamp-1 ${styles.item_title}`}
                  href={getLinkPageByType(
                    searchItem.type,
                    searchItem.slug,
                    searchItem.id
                  )}
                >
                  {highlightText(searchItem.title, searchText)}
                </Link>
                <div className={`line-clamp-1 ${styles.item_type}`}>
                  {typeGlobalSearchLabels[searchItem.type]}
                </div>
              </div>
              <div>
                <Link
                  className={styles.link}
                  href={getLinkPageByType(
                    searchItem.type,
                    searchItem.slug,
                    searchItem.id
                  )}
                >
                  Перейти
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
