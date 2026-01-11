import api from "@api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTitle } from "@components/ui/PageTitle/PageTitle";
import { NEWS, NEWS_SHOW } from "@navigate";
import { getRealId } from "@helpers/links";
import { EditorShow } from "@/app/components/shared/Editor/EditorShow/EditorShow";
import { ArrowBack } from "@/app/components/ui/ArrowBack/ArrowBack";
import IndexLayout from "@/app/components/layout/IndexLayout";
import { SITE_NAME, SITE_URL } from "@/app/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const id_real = getRealId(id);

  const news = await getData(id_real);

  if (!news) {
    return {
      title: "Новость не найдена",
      description: "Новость не найдена",
    };
  }

  const imageOG = {
    url: `${SITE_URL}/images/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: `${news.title} - Новости Осетии`,
  };

  return {
    title: `${news.title} | Новости Осетии`,
    description: `${news.description} | Новости Осетии`,
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: NEWS_SHOW(news.slug, news.id),
      siteName: SITE_NAME,
      title: `${news.title} | Новости Осетии`,
      description: `${news.description} | Новости Осетии`,
      images: [imageOG],
    },
  };
}

async function getData(id: string): Promise<NewsShowInterface | null> {
  const id_real = getRealId(id);
  try {
    const res = await api.get(`/news/${id_real}`);

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
  const news = await getData(id);

  if (news === null) {
    notFound();
  }

  return (
    <IndexLayout>
      <div className="max-[1200px]:hidden">
        <ArrowBack url={NEWS} />
      </div>
      <PageTitle>{news.title}</PageTitle>
      <div className="flex flex-col gap-4 mb-6">
        <div className="text-base font-navigation leading-none text-gray!">
          {news.date}
        </div>
        <div className="text-base font-navigation leading-none text-gray!">
          {news.user.name}
        </div>
        {news.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {news.categories.map((cat) => (
              <div
                className="bg-gray-light! py-2 px-4 rounded-md text-black! text-[12px] font-text-medium select-none"
                key={cat.id}
              >
                {cat.title}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white! rounded-xl">
        <EditorShow blocks={news.content.blocks} />
      </div>
    </IndexLayout>
  );
}
