import api from "@api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { NEWS_CATEGORY } from "@navigate";
import { getRealId } from "@helpers/links";
import { NewsIndex } from "@/app/components/features/news/NewsIndex/NewsIndex";
import EmptyLayout from "@/app/components/layout/EmptyLayout";
import { SITE_NAME, SITE_URL } from "@/app/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const id_real = getRealId(id);

  const category = await getData(id_real);

  if (!category) {
    return {
      title: "Категория не найдена",
      description: "Категория не найдена",
    };
  }

  const imageOG = {
    url: `${SITE_URL}/images/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: `${category.title} - Осетинский язык онлайн`,
  };

  return {
    title: `${category.title}`,
    description: `${category.title} | Изучение осетинского языка`,
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: NEWS_CATEGORY(category.slug, category.id),
      siteName: SITE_NAME,
      title: `${category.title} | Изучение осетинского языка`,
      description: `${category.title} | Изучение осетинского языка`,
      images: [imageOG],
    },
  };
}

async function getData(id: string): Promise<NewsCategory | null> {
  const id_real = getRealId(id);
  try {
    const res = await api.get(`/news-categories/${id_real}`);

    if (res.status === 200) {
      return res.data.data;
    }

    return null;
  } catch (error) {
    return null;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getData(id);

  if (category === null) {
    notFound();
  }

  return (
    <EmptyLayout>
      <NewsIndex category={category} />
    </EmptyLayout>
  );
}
