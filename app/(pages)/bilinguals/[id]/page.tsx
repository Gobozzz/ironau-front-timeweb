import api from "@api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTitle } from "@components/ui/PageTitle/PageTitle";
import { BILINGUAL_SHOW, BILINGUALS } from "@navigate";
import { getRealId } from "@helpers/links";
import ShortLayout from "@/app/components/layout/ShortLayout";
import { ShowTranslationsDesctop } from "@/app/components/features/bilinguals/ShowTranslations/ShowTranslationsDesctop";
import { ArrowBack } from "@/app/components/ui/ArrowBack/ArrowBack";
import { SITE_NAME } from "@/app/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const id_real = getRealId(id);

  const bilingual = await getData(id_real);

  if (!bilingual) {
    return {
      title: "Билингва не найдена",
      description: "Билингва не найдена",
    };
  }

  const imageOG = {
    url:
      bilingual.image ||
      `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: `${bilingual.title} - Осетинский язык онлайн`,
  };

  return {
    title: `${bilingual.title}`,
    description: `Перевод "${bilingual.title}" на осетинский язык | Изучение осетинского языка`,
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: BILINGUAL_SHOW(bilingual.slug, bilingual.id),
      siteName: SITE_NAME,
      title: `${bilingual.title} | Изучение осетинского языка`,
      description: `Перевод "${bilingual.title}" на осетинский язык | Изучение осетинского языка`,
      images: [imageOG],
    },
  };
}

async function getData(id: string): Promise<BilingualShowInterface | null> {
  const id_real = getRealId(id);
  try {
    const res = await api.get(`/bilinguals/${id_real}`);

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
  const bilingual = await getData(id);

  if (bilingual === null) {
    notFound();
  }

  return (
    <ShortLayout>
      <ArrowBack url={BILINGUALS} />
      <PageTitle>{bilingual.title}</PageTitle>
      <ShowTranslationsDesctop bilingual={bilingual} />
    </ShortLayout>
  );
}
