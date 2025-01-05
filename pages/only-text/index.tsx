import { FontTester } from "@/components/FontTester";
import { FullPageText } from "@/components/FullPageText";
import { SceneManager } from "@/components/SceneManager";
import TitlePage from "@/components/TitlePage";
import { information } from "@/public/workInformation";
import { useState } from "react";

const OnlyText = () => {
  const [languageMode, setLanguageMode] = useState<"ja" | "en">("ja");

  return (
    <>
      <FontTester>
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
          ]}
          languageMode={languageMode}
        />
      </FontTester>
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
