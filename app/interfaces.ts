interface IGlobalSearchItem {
  id: number;
  title: string;
  slug: string;
  type: string;
}

interface ServerErrors {
  [key: string]: string[];
}

interface Interesting {
  content: string;
}

interface NewsCategory {
  id: number;
  slug: string;
  title: string;
}

interface NewsCardInterface {
  categories: NewsCategory[];
  date: string;
  description: string;
  id: number;
  slug: string;
  title: string;
  user: { id: number; email: string; name: string };
  status: number;
  status_name: string;
}

interface LevelLearning {
  id: number;
  title: string;
  slug: string;
}

interface CreatedLessonCard {
  id: number;
  title: string;
  slug: string;
  only_course: boolean;
  time_to_complete: number;
  content: string;
  image: string;
  level: LevelLearning;
  rating: number;
  count_enrolled: number;
  status: string;
  status_name: string;
}

interface CreatedCourseCard {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: string;
  level: LevelLearning;
  rating: number;
  count_enrolled: number;
  count_lessons: number;
  author: Author;
  status: string;
  status_name: string;
}

interface LessonCard {
  id: number;
  title: string;
  slug: string;
  time_to_complete: number;
  content: string;
  image: string | null;
  level: LevelLearning;
  rating: number;
  count_enrolled: number;
  author: Author;
  is_enrolled: boolean;
}

interface CourseCard {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: string;
  level: LevelLearning;
  rating: number;
  count_enrolled: number;
  count_lessons: number;
  progress_percent: number | null;
  author: Author;
  is_enrolled: boolean;
}

interface Author {
  id: number;
  name: string;
  email: string;
}

interface LearningLevels {
  id: number;
  slug: string;
  title: string;
}

interface EditLesson {
  title: string;
  time_to_complete: number | null;
  level_id: number | null;
  content: string;
  image: string | null;
  image_url: string | null;
  only_course: boolean;
}

interface EditExercise {
  order: number;
  type: number;
  title: string;
  description: string | null;
  content: any;
  id?: number;
  tempId?: string;
}

interface EditCourse {
  title: string;
  level_id: number | null;
  content: string;
  image: string | null;
  image_url: string | null;
  lessons: number[];
}

interface UpdateEmptyVariantExercise {
  index: number;
  title: string;
  variants: string[];
}

interface UpdateTextVariantExercise {
  index: number;
  title: string;
}

interface PaginatePageInterface {
  label: string;
  page: number | null;
  active: boolean;
}

interface SelectedLessonRedactor {
  id: number;
  title: string;
}

interface UpdateLessonsInCourseInterface {
  id: number;
  title: string;
  content: string;
  image: string;
  level_id: number | null;
  lessons: SelectedLessonRedactor[];
}

interface LearningFilters {
  title_f: string;
  level_f: number[];
}

interface BilingualFilters {
  title_f: string;
  period: string;
  tags_f: number[];
}

interface LiteratureFilters {
  title_f: string;
  period: string;
  tags_f: number[];
}

interface LessonFlow {
  can_rating: boolean;
  lesson: { id: number; title: string; slug: string };
  exercises: ExerciseFlowAsideInteraface[];
}

interface CourseFlow {
  can_rating: boolean;
  course: { id: number; title: string; slug: string };
  lessons: {
    id: number;
    title: string;
    exercises: ExerciseFlowAsideInteraface[];
  }[];
  progress: number;
}

interface ExerciseFlowAsideInteraface {
  id: number;
  title: string;
  type: number;
  is_completed: boolean;
}

interface ExerciseFlow {
  answer: any;
  content: any;
  description: string | null;
  id: number;
  is_complete: boolean;
  title: string;
  type: number;
}

interface BilingualLanguageInterface {
  id: number;
  title: string;
  slug: string;
}

interface BilingualTagInterface {
  id: number;
  title: string;
  slug: string;
}

interface LiteratureTagInterface {
  id: number;
  title: string;
  slug: string;
}

interface BilingualTranslatedLanguageInterface {
  id: number;
  language: BilingualLanguageInterface;
  slug: string;
  title: string;
}

interface BilingualCreatedCardInterface {
  id: number;
  title: string;
  slug: string;
  author: string;
  image: string | null;
  image_url: string | null;
  language: BilingualLanguageInterface;
  status: number;
  status_name: string;
  tags: BilingualTagInterface[];
  translated_languages: BilingualTranslatedLanguageInterface[];
  translator: string;
  year: number;
}

interface BilingualCreateData {
  title: string;
  author: string;
  translator: string;
  year: string;
  language_id: number | null;
  image: string | null;
  image_url: string | null;
  tags: number[];
}

interface TranslationsPart {
  blocks: { id: string; type: string; data: any }[];
  time: number;
  version: string;
}

interface BilingualTranslationInterface {
  id?: number;
  tempId?: string;
  language: BilingualLanguageInterface | null;
  title: string;
  parts: any[];
}

interface BilingualShowInterface {
  id: number;
  title: string;
  slug: string;
  author: string;
  image: string | null;
  image_url: string | null;
  language: BilingualLanguageInterface;
  status: number;
  tags: BilingualTagInterface[];
  translations: BilingualTranslationInterface[];
  translator: string;
  year: number;
}

interface BilingualActiveTranslations {
  left: number | string | null;
  right: number | string | null;
}

interface BilingualTranslationShortInterface {
  id: number;
  title: string;
  slug: string;
  language: BilingualLanguageInterface;
}

interface BilingualCardInterface {
  id: number;
  title: string;
  slug: string;
  author: string;
  image: string | null;
  language: BilingualLanguageInterface;
  tags: BilingualTagInterface[];
  translated_languages: BilingualTranslationShortInterface[];
  translator: string;
  year: number;
}

interface LiteratureCardInterface {
  id: number;
  title: string;
  slug: string;
  description: string;
  author: string;
  image: string | null;
  link_url: string | null;
  tags: LiteratureTagInterface[];
  year: number | null;
}

interface LiteratureShowInterface {
  id: number;
  title: string;
  slug: string;
  description: string;
  author: string;
  image: string | null;
  content: {
    blocks: { id: string; type: string; data: any }[];
    time: number;
    version: string;
  };
  link_url: string | null;
  tags: LiteratureTagInterface[];
  year: number | null;
}

interface QuestionCardInterface {
  id: number;
  title: string;
  answer: string;
  is_hot: boolean;
  date: string;
}

interface QuestionsFiltersInterface {
  title: string;
  is_hot: boolean;
}

interface NewsCategoryShow {
  id: number;
  title: string;
  slug: string;
  children: NewsCategoryShow[];
}

interface NewsCreateData {
  title: string;
  categories: number[];
  content: any;
}

interface NewsFilters {
  category: number | null;
  period: string;
  day: string;
  sorted: string;
}

interface NewsShowInterface {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  user: Author;
  categories: NewsCategory[];
  content: any;
}
