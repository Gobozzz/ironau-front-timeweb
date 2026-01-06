import type { Metadata } from "next";
import "./globals.css";
import AppLayout from "@components/layout/AppLayout";
import Providers from "./components/layout/Providers";

export const metadata: Metadata = {
  // Основной title с шаблоном
  title: {
    default:
      "Осетинский язык онлайн — курсы, уроки, билингвы и справочные материалы",
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME}`, // Автоматически добавляет префикс для дочерних страниц
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
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    title: `${process.env.NEXT_PUBLIC_SITE_NAME} — изучение осетинского языка онлайн`,
    description: "Курсы, уроки, билингвы по осетинскому языку от носителей",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${process.env.NEXT_PUBLIC_SITE_NAME} - Осетинский язык онлайн`,
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: `${process.env.NEXT_PUBLIC_SITE_NAME} — изучение осетинского языка онлайн`,
    description: "Курсы, уроки, билингвы по осетинскому языку",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/twitter-image.jpg`],
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
    { name: "Ironau", url: `${process.env.NEXT_PUBLIC_SITE_URL}` },
    { name: "Осетинский язык онлайн" },
  ],
  generator: "Next.js",

  // Категория и рейтинг
  category: "education",

  // Альтернативные языки
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    languages: {
      "ru-RU": `${process.env.NEXT_PUBLIC_SITE_URL}`,
      "x-default": `${process.env.NEXT_PUBLIC_SITE_URL}`,
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
