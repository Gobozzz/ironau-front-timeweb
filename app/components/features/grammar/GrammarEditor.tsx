"use client";

import { useEffect, useState } from "react";
import nspell from "nspell";
import { Loader } from "../../ui/Loader/Loader";
import styles from "./GrammarEditor.module.css";
import Image from "next/image";
import FileIcon from "@/public/icons/file.svg";

interface Props {}

interface Word {
  text: string;
  variants: string[];
  is_correct: boolean;
}

interface ReplaceWord {
  index_word: number;
  variants: string[];
  coordinates: { x: number; y: number };
}

const alfavit_os =
  "воаитенрсйлпкьыяудмзбчгюцхфэъӕæАВСМКГПТЕИЛФНДОЭРЗЮЯБХЦУЧЬЫЪЙӔÆ";
const letters_punctuations = ".,?!";
const pattern_empty_letters = /^[\s\r\n]*$/;

function getArrayWordsInString(text: string): string[] {
  let word_string = "";
  const words = [];
  for (let i = 0; i < text.length; i++) {
    const letter = text[i];
    const letter_lower = letter.toLowerCase();
    if (letters_punctuations.includes(letter_lower)) {
      word_string += letter;
      words.push(word_string);
      word_string = "";
    } else if (pattern_empty_letters.test(letter_lower)) {
      if (word_string.length > 0) {
        words.push(word_string);
      }
      words.push(letter);
      word_string = "";
    } else {
      word_string += letter;
    }
  }

  if (word_string.trim().length > 0) {
    words.push(word_string);
  }

  return words;
}

function downloadTextAsFile(
  text: string,
  filename: string = "IronauRU_Правописание.txt"
): void {
  // Создаем Blob из текста
  const blob = new Blob([text], { type: "text/plain" });

  // Создаем URL для Blob
  const url = URL.createObjectURL(blob);

  // Создаем ссылку для скачивания
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  // Добавляем ссылку в DOM, кликаем и удаляем
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Освобождаем URL
  URL.revokeObjectURL(url);
}

export function GrammarEditor({}: Props) {
  const [text, setText] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);
  const [spellChecker, setSpellChecker] = useState<nspell | null>(null);
  const [mode, setMode] = useState<"edit" | "show">("edit");
  const [words, setWords] = useState<Word[]>([]);
  const [replaceWord, setReplaceWord] = useState<ReplaceWord | null>(null);
  const [isErrors, setIsErrors] = useState(false);

  // Загрузка словаря
  useEffect(() => {
    const loadDictionary = async () => {
      setIsLoading(true);

      try {
        const [affResponse, dicResponse] = await Promise.all([
          fetch("/dictionaries/os.aff"),
          fetch("/dictionaries/os.dic"),
        ]);

        const aff = await affResponse.text();
        const dic = await dicResponse.text();

        const spell = nspell(aff, dic);

        setSpellChecker(spell);
      } catch (error) {
        console.error("Ошибка загрузки словаря:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDictionary();
  }, []);

  function refreshStrokeFormat() {
    let new_text = "";
    words.forEach((word) => (new_text += word.text));
    setText(new_text);
  }

  function checkText() {
    if (spellChecker === null) {
      return;
    }
    setIsErrors(false);
    const new_words: Word[] = [];
    const words = getArrayWordsInString(text);

    words.forEach((word) => {
      const clearWord = word.trim().replace(/[.,?!":';*@]+/g, "");
      if (clearWord.length > 1 && !spellChecker.correct(clearWord)) {
        if (!isErrors) {
          setIsErrors(true);
        }
        const suggestions = spellChecker.suggest(clearWord);
        new_words.push({
          text: word,
          variants: suggestions,
          is_correct: false,
        });
      } else {
        new_words.push({ text: word, variants: [], is_correct: true });
      }
    });

    setReplaceWord(null);
    setWords(new_words);
    setMode("show");
  }

  function handlerReturnEditFormat() {
    refreshStrokeFormat();
    setMode("edit");
    setReplaceWord(null);
    setTimeout(() => {
      const textarea_editor = document.querySelector(
        "[data-textarea-editor]"
      ) as HTMLTextAreaElement;
      if (textarea_editor) {
        textarea_editor.focus();
        textarea_editor.selectionStart = textarea_editor.value.length;
      }
      autoResize();
    }, 300);
  }

  function autoResize() {
    const textarea_editor = document.querySelector(
      "[data-textarea-editor]"
    ) as HTMLTextAreaElement;
    if (!textarea_editor) return;
    textarea_editor.style.height = "auto";
    textarea_editor.style.height = textarea_editor.scrollHeight + "px";
  }

  function handlerDownloadTextFile() {
    setTimeout(() => {
      downloadTextAsFile(text);
    }, 300);
  }

  if (isLoading) {
    return <Loader size="base" />;
  }

  return (
    <div>
      {replaceWord && (
        <div
          className={styles.replace_word_inner}
          style={{
            top: `${replaceWord.coordinates.y}px`,
            left: `${replaceWord.coordinates.x}px`,
          }}
        >
          {replaceWord.variants.length === 0 && (
            <div className={styles.replace_word_item}>Не нашлось вариантов</div>
          )}
          {replaceWord.variants.map((variant, index) => (
            <button
              onClick={() => {
                const copy_words = [...words];
                const last_letter_old_text =
                  copy_words[replaceWord.index_word].text[
                    copy_words[replaceWord.index_word].text.length - 1
                  ];
                copy_words[replaceWord.index_word].text =
                  variant +
                  `${
                    alfavit_os.includes(last_letter_old_text)
                      ? ""
                      : last_letter_old_text
                  }`;
                copy_words[replaceWord.index_word].variants = [];
                copy_words[replaceWord.index_word].is_correct = true;
                setWords(copy_words);
                setReplaceWord(null);
                setTimeout(refreshStrokeFormat, 300);
              }}
              key={index}
              className={styles.replace_word_item}
            >
              {variant}
            </button>
          ))}
        </div>
      )}
      <div className={styles.tools}>
        <button className={styles.tool_check} onClick={checkText}>
          Проверить текст
        </button>
        <button
          className={styles.tool_download_text}
          onClick={handlerDownloadTextFile}
        >
          <Image src={FileIcon} alt="Скачать текстом" />
          Скачать текст PDF файлом
        </button>
      </div>

      {mode === "edit" && (
        <textarea
          spellCheck="false"
          data-textarea-editor
          placeholder="Дæ текст"
          className={styles.textarea}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            autoResize();
          }}
        ></textarea>
      )}
      {mode === "show" && (
        <>
          {!isErrors && (
            <div className="text-sm my-2">Ошибок в тексте не найдено</div>
          )}
          <div className={styles.words_inner} onClick={() => {}}>
            <div
              onClick={handlerReturnEditFormat}
              className={styles.words_inner_back}
            ></div>
            {words.map((word, index) => {
              if (word.is_correct) {
                if (word.text === "\n" || word.text === "\r") {
                  return <br key={index} />;
                }
                return (
                  <span
                    onClick={handlerReturnEditFormat}
                    className={styles.word}
                    key={index}
                  >
                    {word.text}
                  </span>
                );
              } else {
                return (
                  <button
                    key={index}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                      const button = event.currentTarget;
                      const rect = button.getBoundingClientRect();
                      const x = rect.left + window.scrollX;
                      const y = rect.top + window.scrollY + button.clientHeight;
                      setReplaceWord({
                        index_word: index,
                        variants: word.variants,
                        coordinates: { x, y },
                      });
                    }}
                    className={styles.incorrect_word}
                  >
                    {word.text}
                  </button>
                );
              }
            })}
          </div>
        </>
      )}
    </div>
  );
}
