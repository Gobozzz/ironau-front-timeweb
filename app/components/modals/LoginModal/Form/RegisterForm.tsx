"use client";

import { RoundedCheckbox } from "@components/ui/Checkbox/RoundedCheckbox";
import styles from "./Form.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { register } from "@slices/authSlice";
import { ErrorsInput } from "@components/ui/ErrorsInput/ErrorsInput";
import Link from "next/link";
import { POLITIC } from "@/app/navigate";

interface Props {
  className?: string;
}

export function RegisterForm({ className = "" }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { errorsRegister, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const [checked, setChecked] = useState<boolean>(false);
  const [checkedError, setCheckedError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    if (!checked) {
      setCheckedError(true);
      return;
    }
    setCheckedError(false);
    const data = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    };
    dispatch(register(data));
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${className}`}>
      <ErrorsInput errors={errorsRegister.message} />
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
        <ErrorsInput errors={errorsRegister.email} />
      </div>
      <div className={styles.item}>
        <div className={styles.item_title}>Придумайте пароль</div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="******"
          className={styles.input}
          autoComplete="new-password"
        />
        <ErrorsInput errors={errorsRegister.password} />
      </div>
      <div className={styles.item}>
        <div className={styles.item_title}>Ваше имя</div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Иван Иванов"
          className={styles.input}
          autoComplete="username"
        />
        <ErrorsInput errors={errorsRegister.name} />
      </div>
      <button
        disabled={isLoading}
        className={`${styles.button_form} ${isLoading ? "opacity-65" : ""}`}
      >
        Зарегистрироваться
      </button>
      <div className={styles.checked_inner}>
        <RoundedCheckbox
          checked={checked}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setChecked(event.target.checked)
          }
        />
        <Link
          target="_blank"
          href={POLITIC}
          className={`${styles.checked_text} ${
            checkedError ? "text-red-600!" : ""
          }`}
        >
          Я соглашаюсь на обработку моих персональных данных
        </Link>
      </div>
    </form>
  );
}
