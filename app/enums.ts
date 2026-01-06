// Глобальный поиск

export enum TypeGlobalSearch {
  LESSON = "lesson",
  LITERATURE = "literature",
  COURSE = "course",
  NEWS = "news",
  BILINGUAL = "bilingual",
}

export const typeGlobalSearchLabels: { [key: string]: string } = {
  [TypeGlobalSearch.LESSON]: "Центр обучения",
  [TypeGlobalSearch.COURSE]: "Центр обучения",
  [TypeGlobalSearch.LITERATURE]: "Литература",
  [TypeGlobalSearch.NEWS]: "Новости",
  [TypeGlobalSearch.BILINGUAL]: "Билингвы",
};

// Права пользователя

export enum UserRules {
  WRITE_NEWS = "write_news",
  CREATE_TEACH_MATERIAL = "create_teach_material",
  CREATE_BILINGUALS = "create_bilinguals",
}

// Уровни уроков и курсов

export enum LearningLevelsEnum {
  BEGINNERS = "Начинающий",
  MIDDLE = "Средний",
  HARD = "Продвинутый",
}

// Статусы уроков, курсов, и прочего

export enum LearningStatus {
  MODERATED = "На модерации",
  ACTIVE = "Активирован",
}

// Типы упражнений
export enum ExerciseTypes {
  TEORETICAL = 1,
  TEXT = 2,
  SINGLE = 3,
  MULTIPLE = 4,
  PASS_WORD = 5,
}
