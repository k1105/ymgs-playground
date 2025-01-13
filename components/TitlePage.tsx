import styles from "./TitlePage.module.scss";
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
          <div className={styles.titleContainer}>
            <h1>
              {languageMode == "ja"
                ? information.workTitle.ja
                : information.workTitle.en}
            </h1>
            <p className={styles.year}>(2024)</p>

            <p className={styles.credit}>
              {languageMode == "ja"
                ? information.credit.ja
                : information.credit.en}
            </p>
          </div>
        </>
      </InkFilter>
    </>
  );
};

export default TitlePage;
