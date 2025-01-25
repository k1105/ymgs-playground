import { Metadata } from "next";
import { fetchWorkBySlug } from "@/lib/microCMS";
import { SceneManager } from "@/components/SceneManager";
import Layout from "@/components/Layout";
import { FullPageMovie } from "@/components/FullPageMovie";
import { FullPageMultiImage } from "@/components/FullPageMultiImage";
import { FullPageSingleImage } from "@/components/FullPageSingleImage";
import { FullPageText } from "@/components/FullPageText";
import { Outline } from "@/components/Outline";
import TitlePage from "@/components/TitlePage";
import { information } from "@/public/workInformation";
import { ReactElement } from "react";

type Props = { params: Promise<{ slug: string; locale: string }> };

export async function generateStaticParams() {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN!;
  const apiKey = process.env.MICROCMS_API_KEY!;

  // MicroCMS APIから全ての作品情報を取得
  const response = await fetch(
    `https://${serviceDomain}.microcms.io/api/v1/work`,
    {
      headers: {
        "X-MICROCMS-API-KEY": apiKey,
      },
    }
  ).then((res) => res.json());

  // slugを静的パラメータとして返す
  return response.contents.map((content: { slug: string }) => ({
    slug: content.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params; // デフォルトを "ja" に設定
  const work = await fetchWorkBySlug(slug);
  return {
    title: `${work.title[`text_${locale}`]} | 森田 明日香`,
    description: work.outline[`content_${locale}`],
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug, locale } = await params; // デフォルトを "ja" に設定
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

  scenes.push(
    <FullPageMultiImage key="multi-image" />,
    <FullPageSingleImage key="single-image" />,
    <FullPageMovie key="movie" />
  );

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
