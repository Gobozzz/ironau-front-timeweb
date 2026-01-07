import ShortLayout from "@/app/components/layout/ShortLayout";
import { PageTitle } from "@/app/components/ui/PageTitle/PageTitle";
import { Metadata } from "next";

import styles from "@/app/styles/politic.module.css";

export const metadata: Metadata = {
  title: "Пользовательское соглашение",
  description: "Пользовательское соглашение сайта Ironau.ru",
};

export default function Page() {
  return (
    <ShortLayout>
      <PageTitle>Пользовательское соглашение</PageTitle>
      <div className={styles.section}>
        <p>
          Добро пожаловать на сайт{" "}
          <a
            className={styles.link}
            href="https://ironau.ru"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ironau.ru
          </a>
          . Используя наш сервис, вы соглашаетесь с условиями данного
          соглашения.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.title}>1. Общие положения</h2>
        <p>
          Сервис предназначен для изучения осетинского языка. Пользователи
          регистрируются, предоставляя только свою почту, имя и пароль.
          Регистрация означает согласие с условиями.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.title}>2. Обязанности пользователей</h2>
        <ul className={styles.list}>
          <li>Не использовать сервис для незаконных целей;</li>
          <li>Сохранять конфиденциальность своих данных;</li>
          <li>Не распространять вредоносное ПО и спам.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.title}>3. Ответственность</h2>
        <p>
          Иванов Вячеслав Геннадьевич не несет ответственности за любой ущерб,
          возникший при использовании сервиса, а также за точность и полноту
          информации.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.title}>4. Изменения условий</h2>
        <p>
          Мы оставляем за собой право менять условия соглашения без
          предварительного уведомления. Продолжая пользоваться сайтом, вы
          соглашаетесь с изменениями.
        </p>
      </div>
    </ShortLayout>
  );
}
