"use client";

import Link from "next/link";
import styles from "./NewsCard.module.css";
import { NEWS_EDIT, NEWS_SHOW } from "@navigate";
import { StatusLesson } from "../../StatusLesson/StatusLesson";
import Image from "next/image";
import TrashIcon from "@/public/icons/trash-blue.svg";

interface Props {
  className?: string;
  data: NewsCardInterface;
  delete_callback: (id: number) => void;
}

export function CreatedNewsCard({
  className = "",
  data,
  delete_callback,
}: Props) {
  return (
    <article className={`${styles.card} ${className}`}>
      <StatusLesson className="max-w-max" status={data.status_name} />
      <div>
        <time className={styles.date} dateTime="2025-07-27">
          {data.date}
        </time>
        <div className={styles.author}>{data.user.name}</div>
      </div>
      <div className={styles.tags}>
        {data.categories.map((category) => (
          <div key={category.id} className={styles.tag}>
            {category.title}
          </div>
        ))}
      </div>
      <Link href={NEWS_SHOW(data.slug, data.id)}>
        <h2 className={`${styles.title} line-clamp-2`}>{data.title}</h2>
      </Link>
      <p className={`${styles.text} line-clamp-6`}>{data.description}</p>
      <Link
        target="_blank"
        href={NEWS_EDIT(data.id)}
        className={styles.link_edit}
      >
        Редактировать
      </Link>
      <button
        onClick={() => delete_callback(data.id)}
        type="button"
        className={styles.button_delete}
      >
        <Image src={TrashIcon} alt="Мусорка" />
      </button>
    </article>
  );
}
