"use client";

import { useDispatch } from "react-redux";
import styles from "./Update.module.css";
import { AppDispatch } from "@/app/redux/store";
import { useState } from "react";
import api from "@api";
import { refresh } from "@slices/authSlice";
import { SectionTitle } from "@/app/components/ui/SectionTitle/SectionTitle";
import { ErrorsInput } from "@/app/components/ui/ErrorsInput/ErrorsInput";

interface Props {
  className?: string;
}

export function UpdatePassword({ className = "" }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmation, setConfirmation] = useState<string>("");
  const [errors, setErrors] = useState<ServerErrors>({});

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    const data = {
      old_password: oldPassword.trim(),
      new_password: newPassword.trim(),
      new_password_confirmation: confirmation.trim(),
    };
    api
      .put("/user/password", data)
      .then(() => {
        dispatch(refresh());
      })
      .catch((err) => {
        let errors;
        if (err.response?.data?.errors) {
          errors = err.response.data.errors;
        } else {
          errors = { message: ["Произошла ошибка при смене пароля"] };
        }
        setErrors(errors);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <SectionTitle>Пароль</SectionTitle>
      <form onSubmit={handlerSubmit} className={`${styles.items} ${className}`}>
        <ErrorsInput errors={errors.message} />
        <div className={styles.item}>
          <div className={styles.item_title}>Старый пароль</div>
          <input
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            type="password"
            className={styles.item_input}
          />
          <ErrorsInput errors={errors.old_password} />
        </div>
        <div className={styles.item}>
          <div className={styles.item_title}>Новый пароль</div>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            className={styles.item_input}
          />
          <ErrorsInput errors={errors.new_password} />
        </div>
        <div className={styles.item}>
          <div className={styles.item_title}>Подтвердите новый пароль</div>
          <input
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            type="password"
            className={styles.item_input}
          />
          <ErrorsInput errors={errors.new_password_confirmation} />
        </div>
        <button
          disabled={loading}
          className={`${styles.button} ${loading ? "opacity-80" : ""}`}
        >
          Сохранить изменения
        </button>
      </form>
    </>
  );
}
