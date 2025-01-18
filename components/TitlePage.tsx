"use client";

import styles from "./TitlePage.module.scss";
import { InkFilter } from "./InkFilter";

const TitlePage = ({
  transitionProgress = 0,
  title,
  credit,
}: {
  transitionProgress?: number;
  title: string;
  credit: string;
}) => {
  return (
    <>
      <InkFilter blurIntensity={transitionProgress}>
        <>
          <div className={styles.titleContainer}>
            <h1>{title}</h1>
            <p className={styles.year}>(2024)</p>

            <p className={styles.credit}>{credit}</p>
          </div>
        </>
      </InkFilter>
    </>
  );
};

export default TitlePage;
