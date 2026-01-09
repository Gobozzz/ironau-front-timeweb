"use client";

import { useState } from "react";
import styles from "./Form.module.css";
import { ErrorsInput } from "@components/ui/ErrorsInput/ErrorsInput";
import api from "@api";
import { Loader } from "@components/ui/Loader/Loader";
import { IMaskInput } from "react-imask";

interface Props {}

export function Form({}: Props) {
  const [errors, setErrors] = useState<ServerErrors>({});
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const front_errors: ServerErrors = {};
    if (name.trim().length === 0) {
      front_errors.name = ["Не оставляйте пустым"];
    }
    if (phone.trim().length !== 18) {
      front_errors.phone = ["Проверьте"];
    }
    if (Object.keys(front_errors).length > 0) {
      setErrors(front_errors);
      return;
    }
    setLoading(true);
    setErrors({});
    api
      .post("/forms/become-teacher", {
        name: name.trim(),
        phone: phone.trim(),
      })
      .then(() => {
        setSuccess(true);
        setName("");
        setPhone("");
      })
      .catch((err) => {
        let errors;
        if (err.response?.data?.errors) {
          errors = err.response.data.errors;
        } else {
          errors = { message: ["Произошла ошибка при отправке формы"] };
        }
        return setErrors(errors);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className={styles.inner}>
      <div className={styles.title}>
        Хотите создать собственный курс или урок?
      </div>
      <div className={styles.subtitle}>
        Оставьте свои контакты и мы свяжемся с вами
      </div>
      <ErrorsInput errors={errors.message} />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form_item}>
          <div className={styles.form_item_title}>Ваше имя</div>
          <ErrorsInput errors={errors.name} />
          <input
            className={styles.form_item_input}
            type="text"
            placeholder="Геворгизов Артур"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.form_item}>
          <div className={styles.form_item_title}>Номер телефона</div>
          <ErrorsInput errors={errors.phone} />
          <IMaskInput
            className={styles.form_item_input}
            type="tel"
            mask="+{7} (000) 000-00-00"
            unmask={false}
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhone(e.target.value)
            }
            placeholder="+7 (___) ___-__-__"
          />
        </div>
        <div className={styles.form_item}>
          {!success && (
            <button type="submit" className={styles.form_button}>
              {loading ? <Loader size="sm" /> : "Отправить"}
            </button>
          )}
          {success && (
            <div className="text-sm text-black! text-center">
              Заявка отправлена, с вами свяжутся позже
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
