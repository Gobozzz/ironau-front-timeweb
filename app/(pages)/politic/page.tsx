import ShortLayout from "@/app/components/layout/ShortLayout";
import { PageTitle } from "@/app/components/ui/PageTitle/PageTitle";
import { Metadata } from "next";

import styles from "@/app/styles/politic.module.css";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика конфиденциальности сайта Ironau.ru",
};

export default function Page() {
  return (
    <ShortLayout>
      <PageTitle>Политика конфиденциальности</PageTitle>
      <div className={styles.section}>
        <p>
          Ваша конфиденциальность важна для Вячеслава Иванова, владельца сайта{" "}
          <a className={styles.link} href="https://ironau.ru" target="_blank" rel="noopener noreferrer">
            https://ironau.ru
          </a>
          .
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.title}>1. Собираемая информация</h2>
        <p>
          При регистрации пользователи предоставляют только свою почту, имя и
          пароль. Мы также собираем информацию о вашем поведении на сайте для
          улучшения сервиса.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.title}>2. Использование данных</h2>
        <p>
          Собранные данные используются для предоставления услуг, улучшения
          сайта и поддержки пользователей. Мы не передаем ваши личные данные
          третьим лицам без вашего согласия.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.title}>3. Защита данных</h2>
        <p>
          Мы применяем меры безопасности для защиты ваших данных от
          несанкционированного доступа, изменения, раскрытия или уничтожения.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.title}>4. Ваши права</h2>
        <p>
          Вы имеете право на доступ к своим данным, их изменение или удаление.
          Для этого свяжитесь с нами по электронной почте, указанной на сайте.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.title}>5. Контакты</h2>
        <p>
          В случае вопросов о политике конфиденциальности, пишите на почту:{" "}
          <a href="mailto:contact@ironau.ru">
            {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>
    </ShortLayout>
  );
}
