"use client";

import { useEffect, useState } from "react";
import { PageTitle } from "../../ui/PageTitle/PageTitle";
import styles from "./Questions.module.css";
import api from "@api";
import { ErrorsInput } from "../../ui/ErrorsInput/ErrorsInput";
import { Loader } from "../../ui/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { openModal } from "@slices/loginModalSlice";

interface Props {}

export function CreateForm({}: Props) {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>(user?.email || "");

  const [successCreate, setSuccessCreate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ServerErrors>({});

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      dispatch(openModal());
    }
  }, []);

  function handlerSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || successCreate) return;
    if (!user) {
      dispatch(openModal());
      return;
    }
    setLoading(true);
    setErrors({});
    api
      .post("/questions", { title: title.trim(), email: email.trim() })
      .then(() => {
        setSuccessCreate(true);
        setTitle("");
        setEmail("");
      })
      .catch((err) => {
        let errors;
        if (err?.status === 429) {
          errors = { message: ["Подождите минутку и попробуйте еще раз"] };
        } else if (err.response?.data?.errors) {
          errors = err.response.data.errors;
        } else {
          errors = { message: ["Произошла ошибка отправке вопроса"] };
        }
        setErrors(errors);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className={styles.create_inner}>
      <div className={styles.create_left}>
        <PageTitle>Вопрос справочному бюро</PageTitle>
        <form onSubmit={handlerSubmit} className={styles.form}>
          <div className={styles.form_inner}>
            <ErrorsInput errors={errors.message} />
            <ErrorsInput errors={errors.title} />
            <textarea
              onClick={() => {
                if (!user) {
                  dispatch(openModal());
                }
              }}
              disabled={successCreate}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.form_textarea}
              placeholder="Задайте свой вопрос"
            ></textarea>
            <div className={styles.form_down}>
              <div className={styles.form_item}>
                <ErrorsInput errors={errors.email} />
                <div className={styles.form_item_title}>
                  Ваша электронная почта
                </div>
                <input
                  onClick={() => {
                    if (!user) {
                      dispatch(openModal());
                    }
                  }}
                  disabled={successCreate}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.form_item_input}
                  type="email"
                  placeholder="gobozovbogdan@gmail.com"
                />
              </div>
              {!successCreate && (
                <button
                  disabled={loading}
                  className={styles.form_button}
                  type="submit"
                >
                  {loading ? <Loader size="sm" /> : "Отправить вопрос"}
                </button>
              )}
              {successCreate && (
                <div className="text-sm max-[1200px]:text-center">
                  Вопрос был отправлен в справочное бюро. Ожидайте ответа.
                </div>
              )}
            </div>
          </div>
          <div className={styles.create_right}>
            <div className={styles.create_right_title}>
              Уважаемые пользователи!
            </div>
            <div className={styles.create_right_text}>
              Справочная служба отвечает на ваши вопросы об осетинском языке (и
              ни на какие другие). <br /> <br />
              Часто бывает так, что ответ на ваш вопрос или вопрос, аналогичный
              вашему, уже есть в архиве ответов справочной службы и справочных
              материалах, опубликованных на нашем портале. <br /> <br />
              Поэтому, прежде чем задать вопрос, попробуйте найти ответ
              самостоятельно с помощью поисковой строки в верхней части
              страницы. 
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
