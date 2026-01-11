"use client";

import Link from "next/link";
import styles from "./BilingualCard.module.css";
import Image from "next/image";
import NoPhoto from "@/public/images/no-photo-3-4.png";
import { getDecadePeriod } from "@helpers/date";
import { BILINGUAL_SHOW } from "@navigate";

interface Props {
  className?: string;
  data: BilingualCardInterface;
}

export function BilingualCard({ data, className = "" }: Props) {
  const period = getDecadePeriod(data.year);
  return (
    <article className={`${styles.card} ${className}`}>
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
            src={data.image || NoPhoto}
            width={300}
            height={400}
            alt={data.title}
          />
        </Link>
      </div>
      <div className={styles.card_down}>
        <Link className="select-all!" href={BILINGUAL_SHOW(data.slug, data.id)}>
          <h2 className={`${styles.title} line-clamp-2`}>{data.title}</h2>
        </Link>
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
        <Link
          className={styles.card_button}
          href={BILINGUAL_SHOW(data.slug, data.id)}
        >
          Перейти к переводу
        </Link>
      </div>
    </article>
  );
}
