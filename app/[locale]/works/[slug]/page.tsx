import { fetchWorkBySlug } from "@/lib/microCMS";
import Layout from "@/components/Layout";
import { SceneManager } from "@/components/SceneManager";
import TitlePage from "@/components/TitlePage";
import { FullPageMultiImage } from "@/components/FullPageMultiImage";
import { FullPageMovie } from "@/components/FullPageMovie";
import { Outline } from "@/components/Outline";
import { FullPageText } from "@/components/FullPageText";
import { ReactElement } from "react";

interface Props {
  params: {
    slug: string;
    locale: string;
  };
}

interface Work {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: {
    fieldId: string;
    text_ja: string;
    text_en: string;
  };
  slug: string;
  ogpImage: {
    url: string;
    height: number;
    width: number;
  };
  category: string[];
  year: number;
  appendix: any;
  page: Page[];
  credit: {
    fieldId: string;
    content_ja: string;
    content_en: string;
  };
  outline: {
    fieldId: string;
    content_ja?: string;
    content_en?: string;
  };
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
  const { slug, locale } = params;
  const work = await fetchWorkBySlug(slug);
  return {
    title: `${work.title[`text_${locale}`]} | 森田 明日香`,
    description: work.outline[`content_${locale}`],
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug, locale } = params;
  const work = await fetchWorkBySlug(slug);
  const scenes: ReactElement[] = [];

  scenes.push(
    <TitlePage
      key="title-page"
      title={work.title[`text_${locale}`]}
      year={work.year.toString()}
      credit={work.credit[`content_${locale}`]}
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

  if (work.outline.content_ja && work.outline.content_en) {
    scenes.push(
      <Outline
        key="outline"
        textJa={work.outline.content_ja}
        textEn={work.outline.content_en}
      />
    );
  }

  if (!work) {
    return <p>作品が見つかりませんでした。</p>;
  }

  return (
    <>
      <Layout>
        <SceneManager scenes={scenes} languageMode={locale} />
      </Layout>
    </>
  );
}
