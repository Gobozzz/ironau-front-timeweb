"use client";

import Link from "next/link";
import styles from "./LiteratureCard.module.css";
import Image from "next/image";
import NoPhoto from "@/public/images/no-photo-3-4.png";
import { getDecadePeriod } from "@helpers/date";
import { LITERATURE_SHOW } from "@navigate";
import FileIcon from "@/public/icons/file.svg";

interface Props {
  className?: string;
  data: LiteratureCardInterface;
}

export function LiteratureCard({ data, className = "" }: Props) {
  const period = data.year ? getDecadePeriod(data.year) : null;
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
        {period && (
          <div className={styles.period}>
            {period.start} — {period.end}
          </div>
        )}
        <Link href={LITERATURE_SHOW(data.slug, data.id)}>
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
        <h2 className={`${styles.title} line-clamp-2`}>{data.title}</h2>
        <div className={styles.year}>
          {data.year ? `${data.year} год` : "Год неизвестен"}
        </div>
        <div className={styles.author}>{data.author || "Автор неизвестен"}</div>
        <p className={`${styles.description} line-clamp-4`}>
          {data.description}
        </p>
        <Link
          target={data.link_url ? "_blank" : "_self"}
          className={styles.card_button}
          href={data.link_url || LITERATURE_SHOW(data.slug, data.id)}
        >
          {data.link_url ? (
            <>
              <Image src={FileIcon} alt="Файл" />
              Скачать файл
            </>
          ) : (
            "Читать"
          )}
        </Link>
      </div>
    </article>
  );
}
