export const HOME = "/";
export const PROFILE = "/profile";
export const PROFILE_EDIT = "/profile/edit";
export const CENTER_LEARNING = "/lessons";
export const LITERATURE = "/literature";
export const SPRAVOCHNIK = "/questions";
export const BILINGUALS = "/bilinguals";
export const PRAVOPISANIE = "/grammar";
export const NEWS = "/news";
export const POLITIC = "/politic";
export const USER_AGREEMENT = "/agreement";
export const LESSON_CREATE = "/lessons/create";
export const BILINGUALS_CREATED = "/bilinguals/created";
export const BILINGUALS_CREATE = "/bilinguals/create";
export const NEWS_CREATE = "/news/create";
export const COURSES = "/courses";

export const LESSON_SHOW = (slug: string, id: number) =>
  `/lessons/${slug}-${id}`;
export const LITERATURE_SHOW = (slug: string, id: number) =>
  `/literature/${slug}-${id}`;
export const COURSE_SHOW = (slug: string, id: number) =>
  `/courses/${slug}-${id}`;
export const NEWS_SHOW = (slug: string, id: number) => `/news/${slug}-${id}`;
export const NEWS_EDIT = (id: number) => `/news/${id}/edit`;
export const NEWS_CATEGORY = (slug: string, id: number) =>
  `/news/c/${slug}-${id}`;

export const BILINGUAL_SHOW = (slug: string, id: number) =>
  `/bilinguals/${slug}-${id}`;
export const LESSON_EDIT = (id: number) => `/lessons/${id}/edit`;
export const LESSON_FLOW = (id: number) => `/lessons/${id}/flow`;

export const COURSE_FLOW = (id: number) => `/courses/${id}/flow`;

export const BILINGUAL_EDIT = (id: number) => `/bilinguals/${id}/edit`;
export const BILINGUAL_TRANSLATIONS_EDIT = (id: number) =>
  `/bilinguals/${id}/translations-edit`;
