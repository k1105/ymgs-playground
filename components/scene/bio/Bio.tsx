"use client";

import styles from "./Bio.module.scss";
import { Fragment } from "react";
import { InkFilter } from "../../common/filter/InkFilter";
import { useSceneProps } from "@/components/common/SceneManager";

export const Bio = ({ locale, bio }: { locale: string; bio: string }) => {
  const paragraphs = bio.split("\n").map((line, index) => (
    <Fragment key={index}>
      {line}
      <br />
    </Fragment>
  ));

  const { transitionProgress } = useSceneProps();

  return (
    <div className={styles.container}>
      <InkFilter blurIntensity={transitionProgress}>
        <p className={styles.name}>
          {locale === "ja" ? `森田 明日香 (もりた・あすか)` : `Asuka Morita`}
        </p>
        <div className={styles.profileContainer}>
          <p
            style={{
              fontSize: "0.9rem",
              marginBottom: "2rem",
              lineHeight: "1.8rem",
            }}
          >
            {paragraphs}
          </p>
        </div>
      </InkFilter>
    </div>
  );
};
