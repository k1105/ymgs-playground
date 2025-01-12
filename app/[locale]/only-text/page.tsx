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
            <TitlePage key="title-page" />,
            <FullPageText
              key="work-text"
              textJa={information.content[0].ja}
              textEn={information.content[0].en}
            />,
            <FullPageMultiImage key="multi-image" />,
            <FullPageSingleImage key="single-image" />,
            <FullPageMovie key="movie" />,
          ]}
          languageMode={locale}
        />
      </Layout>

      <style jsx>{`
        .language-switcher {
          position: fixed;
          top: 1rem;
          left: 1rem;
          color: white;
        }
      `}</style>
    </>
  );
};

export default OnlyText;
