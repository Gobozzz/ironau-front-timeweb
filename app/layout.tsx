import type { Metadata } from "next";
import "./globals.css";
import AppLayout from "@components/layout/AppLayout";
import Providers from "./components/layout/Providers";
import { SITE_NAME, SITE_URL } from "./constants";

export const metadata: Metadata = {
  // Основной title с шаблоном
  title: {
    default:
      "Осетинский язык онлайн — курсы, уроки, билингвы и справочные материалы",
    template: `%s | ${SITE_NAME}`, // Автоматически добавляет префикс для дочерних страниц
  },

  // Описание
  description:
    "Онлайн-платформа для изучения осетинского языка. Курсы, уроки, билингвы, справочные материалы и проверка текстов.",

  // Ключевые слова (массив для удобства)
  keywords: [
    "осетинский язык",
    "изучение осетинского",
    "курсы осетинского",
    "уроки осетинского",
    "билингвы осетинский-русский",
    "осетинская литература",
    "проверка осетинских текстов",
    "онлайн обучение осетинскому",
    "иронский язык",
    "дигорский диалект",
  ],

  // Open Graph (соцсети)
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: `${SITE_URL}`,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — изучение осетинского языка онлайн`,
    description: "Курсы, уроки, билингвы по осетинскому языку от носителей",
    images: [
      {
        url: `${SITE_NAME}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Осетинский язык онлайн`,
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — изучение осетинского языка онлайн`,
    description: "Курсы, уроки, билингвы по осетинскому языку",
    images: [`${SITE_NAME}/images/twitter-image.jpg`],
    creator: "@ironau_ru",
  },

  // Robots (управление индексацией)
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Автор и генератор
  authors: [
    { name: "Ironau", url: `${SITE_URL}` },
    { name: "Осетинский язык онлайн" },
  ],
  generator: "Next.js",

  // Категория и рейтинг
  category: "education",

  // Альтернативные языки
  alternates: {
    canonical: `${SITE_URL}`,
    languages: {
      "ru-RU": `${SITE_URL}`,
      "x-default": `${SITE_URL}`,
      // Если будут версии на других языках
      // os: "https://ironau.ru/os",
    },
  },

  // Гео-метаданные
  other: {
    "geo.region": "RU",
    "geo.placename": "Russia",
    "geo.position": "43.024;44.683",
    ICBM: "43.024, 44.683",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
