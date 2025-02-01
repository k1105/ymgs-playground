import { fetchWorkBySlug, fetchAllWorks } from "@/lib/microCMS";
import { SceneManager } from "@/components/SceneManager";
import TitlePage from "@/components/TitlePage";
import { FullPageMultiImage } from "@/components/FullPageMultiImage";
import { FullPageMovie } from "@/components/FullPageMovie";
import { Outline } from "@/components/Outline";
import { FullPageText } from "@/components/FullPageText";
import { ReactElement } from "react";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

interface Page {
  fieldId: string;
  text_ja?: string;
  text_en?: string;
  image_row?: {
    fieldId: string;
    image: {
      url: string;
      height: number;
      width: number;
    }[];
  }[];
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const work = await fetchWorkBySlug(slug);
  return {
    title: `${work.title[`text_${locale}`]} | 森田 明日香`,
    description: work.outline[`content_${locale}`],
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug, locale } = await params;
  const work = await fetchWorkBySlug(slug);
  const allWorks = await fetchAllWorks();
  const currentIndex = allWorks.findIndex((w: any) => w.slug === slug);
  const nextWork =
    currentIndex >= 0 && currentIndex < allWorks.length - 1
      ? allWorks[currentIndex + 1]
      : null;

  const scenes: ReactElement[] = [];

  scenes.push(
    <TitlePage
      key="title-page"
      title={work.title[`text_${locale}`]}
      year={work.year.toString()}
      backgroundImage={work.ogpImage ? work.ogpImage.url : ""}
    />
  );

  work.page &&
    work.page.forEach((page: Page, index: number) => {
      if (page.fieldId === "text_page") {
        scenes.push(
          <FullPageText
            key={`text-page-${index}`}
            locale={locale}
            textJa={page.text_ja ? page.text_ja : ""}
            textEn={page.text_en ? page.text_en : ""}
          />
        );
      } else if (page.fieldId === "image_page") {
        scenes.push(
          <FullPageMultiImage
            key={`image-page-${index}`}
            images={page.image_row ? page.image_row : []}
          />
        );
      } else if (page.fieldId === "mov_page") {
        scenes.push(<FullPageMovie key={`movie-page-${index}`} />);
      }
    });

  scenes.push(
    <Outline
      key="outline"
      title={work.title[`text_${locale}`]}
      outline={{
        ja: work.outline.content_ja ? work.outline.content_ja : "",
        en: work.outline.content_en ? work.outline.content_en : "",
      }}
      credit={work.credit[`content_${locale}`]}
      nextWorkTitle={nextWork ? nextWork.title[`text_${locale}`] : ""}
      nextWorkSlug={nextWork ? nextWork.slug : ""}
    />
  );

  if (!work) {
    return <p>作品が見つかりませんでした。</p>;
  }

  return (
    <>
      <SceneManager scenes={scenes} languageMode={locale} />
    </>
  );
}
