import type { Metadata } from "next";
import IndexLayout from "@components/layout/IndexLayout";
import { PageTitle } from "@components/ui/PageTitle/PageTitle";
import AuthLayout from "@components/layout/AuthLayout";
import { LogoutButton } from "@components/ui/LogoutButton/LogoutButton";
import { UpdatePersonal } from "@components/features/profile/Update/UpdatePersonal";
import { UpdatePassword } from "@components/features/profile/Update/UpdatePassword";

export const metadata: Metadata = {
  title: "Редактирование профиля",
  description:
    "Добро пожаловать в ваш личный кабинет, тут вы можете просматриварть ваши вопросы, уроки, курсы, новости и прочее",
};

export default function ProfileEdit() {
  return (
    <AuthLayout>
      <IndexLayout>
        <div className="max-[1200px]:hidden">
          <LogoutButton />
        </div>
        <div className="">
          <PageTitle>Редактирование данных</PageTitle>
          <UpdatePersonal />
          <UpdatePassword />
        </div>
      </IndexLayout>
    </AuthLayout>
  );
}
