import api from "@api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageTitle } from "@components/ui/PageTitle/PageTitle";
import { BILINGUAL_SHOW, LITERATURE } from "@navigate";
import { getRealId } from "@helpers/links";
import ShortLayout from "@/app/components/layout/ShortLayout";
import Image from "next/image";
import NoPhoto from "@/public/images/no-photo-580-680.png";
import FileIcon from "@/public/icons/file.svg";
import Link from "next/link";
import { EditorShow } from "@/app/components/shared/Editor/EditorShow/EditorShow";
import { ArrowBack } from "@/app/components/ui/ArrowBack/ArrowBack";
import { SITE_NAME, SITE_URL } from "@/app/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const id_real = getRealId(id);

  const literature = await getData(id_real);

  if (!literature) {
    return {
      title: "Литература не найдена",
      description: "Литература не найдена",
    };
  }

  const imageOG = {
    url: literature.image || `${SITE_URL}/images/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: `${literature.title} - Осетинский язык онлайн`,
  };

  return {
    title: `${literature.title}`,
    description: `${literature.description} | Изучение осетинского языка`,
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: BILINGUAL_SHOW(literature.slug, literature.id),
      siteName: SITE_NAME,
      title: `${literature.title} | Изучение осетинского языка`,
      description: `${literature.description} | Изучение осетинского языка`,
      images: [imageOG],
    },
  };
}

async function getData(id: string): Promise<LiteratureShowInterface | null> {
  const id_real = getRealId(id);
  try {
    const res = await api.get(`/literature/${id_real}`);

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
  const literature = await getData(id);

  if (literature === null) {
    notFound();
  }

  return (
    <ShortLayout>
      <div className="max-[1200px]:hidden">
        <ArrowBack url={LITERATURE} />
      </div>
      <div className="flex items-start gap-10 mb-10 max-[1200px]:flex-col max-[1200px]:gap-5">
        <Image
          className="block w-full max-w-[580px] rounded-xl"
          loading="eager"
          width={580}
          height={680}
          src={literature.image || NoPhoto}
          alt={literature.title}
        />
        <div>
          <PageTitle>{literature.title}</PageTitle>
          <div className="text-base font-navigation mb-6 italic max-[1200px]:mb-3">
            {literature.year ? `${literature.year} год` : "Год неизвестен"}
          </div>
          <div className="text-sm font-navigation mb-6 italic max-[1200px]:mb-3">
            {literature.author || "Автор неизвестен"}
          </div>
          {literature.tags.length > 0 && (
            <div className="mb-10 flex items-start gap-2 flex-wrap max-[1200px]:mb-3">
              {literature.tags.map((tag) => (
                <div
                  className="bg-gray-light px-3 min-h-6 text-black! text-[10px] wrap-break-word rounded-sm flex items-center justify-center"
                  key={tag.id}
                >
                  {tag.title}
                </div>
              ))}
            </div>
          )}
          {literature.link_url && (
            <Link
              target="_blank"
              href={literature.link_url}
              className="flex items-center justify-center gap-2 w-full max-w-[300px] h-9 rounded-xl bg-gray-light text-[12px] text-black! font-text-medium! max-[1200px]:max-w-full"
            >
              <Image src={FileIcon} alt="Файл" />
              Скачать файл
            </Link>
          )}
        </div>
      </div>
      <div className="bg-white! rounded-lg">
        <EditorShow blocks={literature.content.blocks} />
      </div>
    </ShortLayout>
  );
}
