"use client";

import React, { useState } from "react";
import styles from "./QuestionCard.module.css";

interface Props {
  className?: string;
  data: QuestionCardInterface;
  searchedText?: string;
}

// Функция для выделения поискового текста
function highlightAndReplaceLineBreaks(
  text: string,
  searchText: string
): React.ReactNode {
  if (!searchText) {
    // Если поиск не активен, просто заменяем переносы на <br/>
    return (
      <>
        {text.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < text.split("\n").length - 1 && <br />}
          </React.Fragment>
        ))}
      </>
    );
  }

  const regex = new RegExp(`(${searchText})`, "gi");
  const lines = text.split("\n");

  const result = lines.map((line, index) => {
    const parts = line.split(regex);
    const processedParts = parts.map((part, i) =>
      regex.test(part) ? <mark key={i}>{part}</mark> : part
    );
    return (
      <React.Fragment key={index}>
        {processedParts}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
  return result;
}

export function QuestionCard({
  className = "",
  searchedText = "",
  data,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const ANSWER_THRESHOLD = 255;
  const isLongAnswer = data.answer.length > ANSWER_THRESHOLD;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const displayedAnswer =
    isExpanded || !isLongAnswer
      ? data.answer
      : data.answer.slice(0, ANSWER_THRESHOLD) + "...";

  return (
    <article className={`${styles.card} ${className}`}>
      <div className={styles.card_tags}>
        <div className={styles.number}>№{data.id}</div>
        {data.is_hot == true && (
          <div className={`${styles.number} bg-orange! text-white!`}>
            Горячий
          </div>
        )}
      </div>
      <h2 className={styles.title}>
        {highlightAndReplaceLineBreaks(data.title, searchedText)}
      </h2>
      <div className={styles.expert}>Ответ эксперта</div>
      <p className={styles.answer}>
        {highlightAndReplaceLineBreaks(displayedAnswer, searchedText)}
      </p>
      {/* Показываем кнопку только если ответ длинный */}
      {isLongAnswer && (
        <button
          type="button"
          className={styles.button_more}
          onClick={toggleExpand}
        >
          {isExpanded ? "Свернуть" : "Показать полностью"}
        </button>
      )}
      <div className={styles.date}>{data.date}</div>
    </article>
  );
}
