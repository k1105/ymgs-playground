import { information } from "@/public/workInformation";
import { InkFilter } from "./InkFilter";

const TitlePage = ({
  transitionProgress = 0,
  languageMode = "ja",
}: {
  transitionProgress?: number;
  languageMode?: "ja" | "en";
}) => {
  return (
    <>
      <InkFilter blurIntensity={transitionProgress}>
        <>
          <div className="title-container">
            <h1>
              {languageMode == "ja"
                ? information.workTitle.ja
                : information.workTitle.en}
            </h1>
            <p className="year">(2024)</p>

            <p className="credit">
              {languageMode == "ja"
                ? information.credit.ja
                : information.credit.en}
            </p>
          </div>
          <style jsx>{`
            .title-container {
              margin-left: 10vw;
              height: 70vh;
              margin-top: 30vh;
              color: white;
              position: relative;
            }

            .credit {
              width: 40vw;
              font-size: 0.8rem;
              position: absolute;
              bottom: 10vh;
              white-space: pre-wrap;
              word-break: break-word;
              box-sizing: border-box;
              line-break: strict;
            }

            .year {
              font-size: 1rem;
            }
          `}</style>
        </>
      </InkFilter>
    </>
  );
};

export default TitlePage;
