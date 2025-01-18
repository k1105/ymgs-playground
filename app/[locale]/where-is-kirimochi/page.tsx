"use client";

import { FullPageMovie } from "@/components/FullPageMovie";
import { FullPageMultiImage } from "@/components/FullPageMultiImage";
import { FullPageSingleImage } from "@/components/FullPageSingleImage";
import { FullPageText } from "@/components/FullPageText";
import { SceneManager } from "@/components/SceneManager";
import TitlePage from "@/components/TitlePage";
import { information } from "@/public/workInformation";
import { useParams } from "next/navigation";
import Layout from "../../../components/Layout";
import { Outline } from "@/components/Outline";

const OnlyText = () => {
  const params = useParams();
  const locale = Array.isArray(params.locale)
    ? params.locale[0]
    : params.locale || "ja";
  return (
    <>
      <Layout>
        <SceneManager
          scenes={[
            <TitlePage
              key="title-page"
              title={
                locale == "ja"
                  ? information.workTitle.ja
                  : information.workTitle.en
              }
              credit={
                locale == "ja" ? information.credit.ja : information.credit.en
              }
            />,
            <FullPageText
              key="work-text"
              textJa={information.content[0].ja}
              textEn={information.content[0].en}
              locale={locale}
            />,
            <FullPageMultiImage key="multi-image" />,
            <FullPageSingleImage key="single-image" />,
            <FullPageMovie key="movie" />,
            <Outline
              key="outline"
              textJa={information.outline.ja}
              textEn={information.outline.en}
            />,
          ]}
          languageMode={locale}
        />
      </Layout>
    </>
  );
};

export default OnlyText;
