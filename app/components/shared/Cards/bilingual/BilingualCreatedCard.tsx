"use client";

import Link from "next/link";
import styles from "./BilingualCard.module.css";
import Image from "next/image";
import TrashIcon from "@/public/icons/trash.svg";
import NoPhoto from "@/public/images/no-photo-3-4.png";
import { getDecadePeriod } from "@helpers/date";
import { StatusLesson } from "../../StatusLesson/StatusLesson";
import { BILINGUAL_EDIT, BILINGUAL_SHOW, BILINGUAL_TRANSLATIONS_EDIT } from "@navigate";

interface Props {
  data: BilingualCreatedCardInterface;
  delete_callback: (id: number) => void;
}

export function BilingualCreatedCard({ data, delete_callback }: Props) {
  const period = getDecadePeriod(data.year);
  return (
    <article className={styles.card}>
      <div className={styles.card_up}>
        <div className={styles.tags}>
          {data.tags.map((tag) => (
            <div key={tag.id} className={styles.tag}>
              {tag.title}
            </div>
          ))}
        </div>
        <div className={styles.period}>
          {period.start} — {period.end}
        </div>
        <Link href={BILINGUAL_SHOW(data.slug, data.id)}>
          <Image
            loading="lazy"
            className={styles.card_photo}
            src={data.image_url || NoPhoto}
            width={300}
            height={400}
            alt={data.title}
          />
        </Link>
        <StatusLesson
          className="absolute top-2 left-2 z-3"
          status={data.status_name}
        />
      </div>
      <div className={styles.card_down}>
        <h2 className={`${styles.title} line-clamp-2`}>{data.title}</h2>
        <div className={styles.card_down_item}>
          <div className={styles.card_down_item_title}>Автор</div>
          <div className={styles.card_down_item_value}>{data.author}</div>
        </div>
        <div className={styles.card_down_item}>
          <div className={styles.card_down_item_title}>Переведено на</div>
          <div className={styles.card_down_item_value}>
            {data.translated_languages
              .reduce((languages: string[], tr_language) => {
                languages.push(tr_language.language.title);
                return languages;
              }, [])
              .join(", ")}
            {data.translated_languages.length === 0 && "Переводы не добавлены"}
          </div>
        </div>
        <Link className={styles.card_button} href={BILINGUAL_TRANSLATIONS_EDIT(data.id)}>
          Редактировать перевод
        </Link>
        <Link
          className={`${styles.card_button} bg-white! text-black!`}
          href={BILINGUAL_EDIT(data.id)}
        >
          Редактировать данные
        </Link>
        <button
          onClick={() => delete_callback(data.id)}
          className={styles.card_trash}
        >
          <Image src={TrashIcon} alt="Удалить" />
        </button>
      </div>
    </article>
  );
}
