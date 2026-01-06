"use client";

import { useEffect, useState } from "react";
import { QuestionCard } from "../../shared/Cards/questions/QuestionCard";
import { CountQuestions } from "./CountQuestions";
import { NoSearch } from "./NoSearch";
import styles from "./Questions.module.css";
import api from "@/app/api";
import { Paginate } from "../../shared/Paginate/Paginate";
import CustomSkeleton from "../../ui/CustomSkeleton/CustomSkeleton";
import { PageTitle } from "../../ui/PageTitle/PageTitle";
import { Loader } from "../../ui/Loader/Loader";
import { CreateForm } from "./CreateForm";

interface Props {}

export function Questions({}: Props) {
  const [page, setPage] = useState<number>(1);
  const [paginate, setPaginate] = useState<PaginatePageInterface[]>([]);
  const [questions, setQuestions] = useState<QuestionCardInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [loadingCountQuestion, setLoadingCountQuestion] =
    useState<boolean>(false);
  const [countActiveQuestions, setCountActiveQuestions] = useState<
    number | null
  >(null);
  const [activeTab, setActiveTab] = useState<"search" | "hot" | "question">(
    "search"
  );
  const [filters, setFilters] = useState<QuestionsFiltersInterface>({
    title: "",
    is_hot: false,
  });

  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    if (loadingCountQuestion) return;
    setLoadingCountQuestion(true);
    api
      .get("/questions/answered/count")
      .then((data) => {
        setCountActiveQuestions(data.data.count);
      })
      .finally(() => {
        setLoadingCountQuestion(false);
      });
  }, []);

  function handlerSearch() {
    if (activeTab === "question") {
      setFilters((prev) => {
        return { ...prev, is_hot: false, title: searchText.trim() };
      });
      setActiveTab("search");
      return;
    }
    setFilters((prev) => {
      return { ...prev, title: searchText.trim() };
    });
  }

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    setLoading(true);
    api
      .get(
        `/questions?page=${page}${
          filters.title.trim().length > 0 ? `&title_f=${filters.title}` : ""
        }${filters.is_hot ? `&hot_f=1` : ""}`
      )
      .then((data) => {
        setQuestions(data.data.data);
        setPaginate(data.data.meta.links);
      })
      .finally(() => setLoading(false));
  }, [filters, page]);

  return (
    <div>
      <div className={styles.search}>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={styles.search_input}
          type="text"
          placeholder="Искать на портале"
        />
        <button
          disabled={loading}
          onClick={handlerSearch}
          type="button"
          className={styles.search_button}
        >
          {loading ? <Loader size="sm" /> : "Найти ответ"}
        </button>
      </div>
      <div className={styles.tabs}>
        <button
          onClick={() => {
            setActiveTab("search");
            setFilters((prev) => {
              return { ...prev, is_hot: false };
            });
          }}
          type="button"
          className={`${styles.tab} ${
            activeTab === "search" ? styles.active : ""
          }`}
        >
          Ответы справочной службы
        </button>
        <button
          onClick={() => {
            setActiveTab("hot");
            setFilters((prev) => {
              return { ...prev, is_hot: true };
            });
          }}
          type="button"
          className={`${styles.tab} ${
            activeTab === "hot" ? styles.active : ""
          }`}
        >
          Горячие вопросы
        </button>
        <button
          onClick={() => {
            setActiveTab("question");
          }}
          type="button"
          className={`${styles.tab} ${
            activeTab === "question" ? styles.active : ""
          }`}
        >
          Задать вопрос
        </button>
      </div>
      {(activeTab === "search" || activeTab === "hot") && (
        <>
          <div className={styles.subtitle}>
            На вопросы изучающих осетинский язык отвечают специалисты портала –
            преподаватели кафедры осетинского языка СОГУ, филологи, лингвисты и
            представители научных центров Осетии.
          </div>
          <div className={styles.questions_inner}>
            <div className={styles.questions_items}>
              {loading &&
                Array.from({ length: 3 }).map((_, index) => (
                  <CustomSkeleton key={index} height={320} />
                ))}
              {!loading &&
                questions.map((question) => (
                  <QuestionCard
                    searchedText={filters.title}
                    data={question}
                    key={question.id}
                  />
                ))}
              {!loading &&
                questions.length === 0 &&
                filters.title.trim().length > 0 && (
                  <div className="text-sm text-center">
                    Ничего не нашлось по запросу "{filters.title}"
                  </div>
                )}
            </div>
            <div className={styles.questions_info}>
              <CountQuestions
                count={countActiveQuestions}
                loading={loadingCountQuestion}
              />
              <NoSearch
                changeTab={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                  setActiveTab("question");
                }}
              />
            </div>
          </div>
          {!loading && (
            <Paginate
              onClick={(page) => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                setPage(page);
              }}
              pages={paginate}
            />
          )}
        </>
      )}
      {activeTab === "question" && <CreateForm />}
    </div>
  );
}
