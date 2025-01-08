import { FontTester } from "@/components/FontTester";
import { FullPageMovie } from "@/components/FullPageMovie";
import { FullPageMultiImage } from "@/components/FullPageMultiImage";
import { FullPageSingleImage } from "@/components/FullPageSingleImage";
import { FullPageText } from "@/components/FullPageText";
import { SceneManager } from "@/components/SceneManager";
import TitlePage from "@/components/TitlePage";
import { information } from "@/public/workInformation";
import { useState } from "react";
import Layout from "../Layout";

const OnlyText = () => {
  const [languageMode, setLanguageMode] = useState<"ja" | "en">("ja");

  return (
    <>
      <Layout>
        <div className="language-switcher">
          <span
            onClick={() => {
              setLanguageMode("ja");
            }}
          >
            JP
          </span>{" "}
          /{" "}
          <span
            onClick={() => {
              setLanguageMode("en");
            }}
          >
            EN
          </span>
        </div>
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
          languageMode={languageMode}
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
