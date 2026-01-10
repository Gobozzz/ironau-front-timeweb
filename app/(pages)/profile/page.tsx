import type { Metadata } from "next";
import IndexLayout from "@components/layout/IndexLayout";
import { PageTitle } from "@components/ui/PageTitle/PageTitle";
import AuthLayout from "@components/layout/AuthLayout";
import { LogoutButton } from "@components/ui/LogoutButton/LogoutButton";
import { PersonalData } from "@components/features/profile/PersonalData/PersonalData";
import { RulesBlock } from "@components/features/profile/RulesBlock/RulesBlock";
import { MyQuestionWrapper } from "@/app/components/features/profile/MyQuestions/MyQuestionWrapper";
import { MyLessonsWrapper } from "@/app/components/features/profile/CreatedLessons/MyLessonsWrapper";
import { MyCoursesWrapper } from "@/app/components/features/profile/CreatedLessons/MyCoursesWrapper";
import { CreatedNewsWrapper } from "@/app/components/features/profile/CreatedNews/CreatedNewsWrapper";
import { CreatedLessonsWrapper } from "@/app/components/features/profile/CreatedLessons/CreatedLessonsWrapper";
import { CreatedCoursesWrapper } from "@/app/components/features/profile/CreatedLessons/CreatedCoursesWrapper";

export const metadata: Metadata = {
  title: "Профиль",
  description:
    "Добро пожаловать в ваш личный кабинет, тут вы можете просматриварть ваши вопросы, уроки, курсы, новости и прочее",
};

export default function Profile() {
  return (
    <AuthLayout>
      <IndexLayout>
        <div className="max-[1200px]:hidden">
          <LogoutButton />
        </div>
        <div>
          <PageTitle>Личный кабинет</PageTitle>
          <div className="">
            <PersonalData className="mb-16 max-[1200px]:mb-10" />
            <RulesBlock className="mb-16 max-[1200px]:mb-10" />
            <CreatedCoursesWrapper />
            <CreatedLessonsWrapper />
            <CreatedNewsWrapper />
            <MyCoursesWrapper />
            <MyLessonsWrapper />
            <MyQuestionWrapper />
          </div>
        </div>
      </IndexLayout>
    </AuthLayout>
  );
}
