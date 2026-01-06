"use client";

import { useDispatch, useSelector } from "react-redux";
import styles from "./Form.module.css";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useState } from "react";
import { login } from "@slices/authSlice";
import { ErrorsInput } from "@components/ui/ErrorsInput/ErrorsInput";
import { ResetPassword } from "./ResetPassword";

interface Props {
  className?: string;
}

export function LoginForm({ className = "" }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { errorsLogin, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    const data = { email: email.trim(), password: password.trim() };
    dispatch(login(data));
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${className}`}>
      <ErrorsInput errors={errorsLogin.message} />
      <div className={styles.item}>
        <div className={styles.item_title}>Электронная почта (логин)</div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="mates@web.ru"
          className={styles.input}
          autoComplete="email"
        />
        <ErrorsInput errors={errorsLogin.name} />
      </div>
      <div className={styles.item}>
        <div className={styles.item_title}>Пароль</div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="******"
          className={styles.input}
          autoComplete="current-password"
        />
        <ErrorsInput errors={errorsLogin.password} />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`${styles.button_form} ${isLoading ? "opacity-65" : ""}`}
      >
        Войти
      </button>
      <ResetPassword />
    </form>
  );
}
