"use client";

import styles from "./Bio.module.scss";
import { Fragment } from "react";
import { InkFilter } from "../InkFilter";

export const Bio = ({
  transitionProgress = 0,
  locale,
  bio,
}: {
  transitionProgress?: number;
  locale: string;
  bio: string;
}) => {
  const paragraphs = bio.split("\n").map((line, index) => (
    <Fragment key={index}>
      {line}
      <br />
    </Fragment>
  ));

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
