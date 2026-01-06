"use client";

import { useState } from "react";
import styles from "./Form.module.css";
import { ErrorsInput } from "@/app/components/ui/ErrorsInput/ErrorsInput";
import api from "@/app/api";

interface Props {}

export function ResetPassword({}: Props) {
  const [email, setEmail] = useState<string>("");
  const [successReset, setSuccessReset] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ServerErrors>({});
  const [open, setOpen] = useState<boolean>(false);

  function handlerReset() {
    if (!open) {
      setOpen(true);
      return;
    }
    if (isLoading) {
      return;
    }
    if (email.trim().length === 0) {
      setErrors({ email: ["Не оставляйте пустым"] });
      return;
    }
    setErrors({});
    setSuccessReset(false);
    api
      .post("/forgot-password", { email })
      .then(() => {
        setSuccessReset(true);
        setEmail("");
      })
      .catch((err) => {
        let errors;
        if (err.status === 429) {
          errors = { message: ["Подождите минутку и повторите попытку."] };
        } else if (err.response?.data?.errors) {
          errors = err.response.data.errors;
        } else {
          errors = { message: ["Произошла ошибка сбросе пароля"] };
        }
        setErrors(errors);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <div style={{ display: open ? "block" : "none" }} className={styles.item}>
        {successReset && (
          <div className="my-2 text-sm text-black!">
            Письмо для сброса отправлено на вашу почту!
          </div>
        )}
        <ErrorsInput errors={errors.message} />
        <div className={styles.item_title}>
          Введите почту, а мы отправим ссылку восстановления
        </div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="mates@web.ru"
          className={styles.input}
          autoComplete="email"
        />
        <ErrorsInput errors={errors.email} />
      </div>
      <button
        onClick={handlerReset}
        type="button"
        disabled={isLoading}
        className={`${styles.button_form} bg-black! ${
          isLoading ? "opacity-65" : ""
        }`}
      >
        Забыл пароль
      </button>
    </>
  );
}
