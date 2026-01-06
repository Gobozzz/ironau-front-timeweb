"use client";

import { useDispatch, useSelector } from "react-redux";
import styles from "./Update.module.css";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useState } from "react";
import api from "@api";
import { refresh } from "@slices/authSlice";
import { ErrorsInput } from "@components/ui/ErrorsInput/ErrorsInput";

interface Props {
  className?: string;
}

export function UpdatePersonal({ className = "" }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ServerErrors>({});

  if (!user) {
    return null;
  }

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    const data = {
      email: email.trim(),
      name: name.trim(),
    };
    api
      .put("/user", data)
      .then(() => {
        dispatch(refresh());
      })
      .catch((err) => {
        let errors;
        if (err.response?.data?.errors) {
          errors = err.response.data.errors;
        } else {
          errors = { message: ["Произошла ошибка при изменении данных"] };
        }
        setErrors(errors);
      })
      .finally(() => setLoading(false));
  };

  const [email, setEmail] = useState<string>(user.email);
  const [name, setName] = useState<string>(user.name);

  return (
    <form onSubmit={handlerSubmit} className={`${styles.items} ${className}`}>
      <ErrorsInput errors={errors.message} />
      <div className={styles.item}>
        <div className={styles.item_title}>Электронная почта (логин)</div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className={styles.item_input}
        />
        <ErrorsInput errors={errors.email} />
      </div>
      <div className={styles.item}>
        <div className={styles.item_title}>ФИО</div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className={styles.item_input}
        />
        <ErrorsInput errors={errors.name} />
      </div>
      <button
        disabled={loading}
        className={`${styles.button} ${loading ? "opacity-80" : ""}`}
      >
        Сохранить изменения
      </button>
    </form>
  );
}
