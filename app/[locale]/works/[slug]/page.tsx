import { fetchWorkBySlug, fetchAllWorks } from "@/lib/microCMS";
import { SceneManager } from "@/components/common/SceneManager";
import TitlePage from "@/components/scene/work/TitlePage";
import { FullPageImage } from "@/components/scene/work/FullPageImage";
import { FullPageMovie } from "@/components/scene/work/FullPageMovie";
import { Outline } from "@/components/scene/work/Outline";
import { FullPageText } from "@/components/scene/work/FullPageText";
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
    image: Image[];
    caption_ja: string;
    caption_en: string;
  }[];
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const work = await fetchWorkBySlug(slug);
  return {
    title: `${
      locale == "en" ? work.title.text_en : work.title.text_ja
    } | 森田 明日香`,
    description:
      locale == "en" ? work.outline.content_en : work.outline.content_ja,
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
      title={locale == "en" ? work.title.text_en : work.title.text_ja}
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
          <FullPageImage
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
      title={locale == "en" ? work.title.text_en : work.title.text_ja}
      outline={{
        ja: work.outline.content_ja ? work.outline.content_ja : "",
        en: work.outline.content_en ? work.outline.content_en : "",
      }}
      credit={locale == "en" ? work.credit.content_en : work.credit.content_ja}
      nextWorkTitle={nextWork ? nextWork.title[`text_${locale}`] : ""}
      nextWorkSlug={nextWork ? nextWork.slug : ""}
      images={work.outlineImages}
    />
  );

  if (!work) {
    return <p>作品が見つかりませんでした。</p>;
  }

  return (
    <>
      <SceneManager
        scenes={scenes}
        languageMode={locale}
        redirectNextTo={nextWork && `/works/${nextWork.slug}`}
      />
    </>
  );
}
