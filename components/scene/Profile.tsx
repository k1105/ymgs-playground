"use client";

import styles from "./Profile.module.css";
import { InkFilter } from "../InkFilter";
import { OpacityFilter } from "../OpacityFilter";
import { Fragment } from "react";

export const Profile = ({
  bio,
  transitionProgress = 0,
  locale = "ja",
}: {
  bio: string;
  transitionProgress?: number;
  locale: string;
}) => {
  const paragraphs = bio.split("\n").map((line, index) => (
    <Fragment key={index}>
      {line}
      <br />
    </Fragment>
  ));

  return (
    <>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <InkFilter blurIntensity={transitionProgress}>
            <div>
              <p className={styles.name}>
                {locale == "ja"
                  ? `森田 明日香 (もりた・あすか)`
                  : `Asuka Morita`}
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
            </div>
          </InkFilter>
          <InkFilter blurIntensity={transitionProgress}>
            <div className={styles.workIndexContainer}>
              <div className={styles.workTitleWrapper}>
                <h2>
                  きりもちの所在<span className={styles.year}>(2024)</span>
                </h2>
              </div>
              <div className={styles.workTitleWrapper}>
                <h2>
                  Observing Variations: in Sliced Loin Hams
                  <span className={styles.year}>(2024)</span>
                </h2>
              </div>
              <div className={styles.workTitleWrapper}>
                <h2>
                  きりもちの所在<span className={styles.year}>(2024)</span>
                </h2>
              </div>
              <div className={styles.workTitleWrapper}>
                <h2>
                  きりもちの所在<span className={styles.year}>(2024)</span>
                </h2>
              </div>
              <div className={styles.workTitleWrapper}>
                <h2>
                  きりもちの所在<span className={styles.year}>(2024)</span>
                </h2>
              </div>
              <div className={styles.workTitleWrapper}>
                <h2>
                  きりもちの所在<span className={styles.year}>(2024)</span>
                </h2>
              </div>
              <div className={styles.workTitleWrapper}>
                <h2>
                  きりもちの所在<span className={styles.year}>(2024)</span>
                </h2>
              </div>
              <div className={styles.workTitleWrapper}>
                <h2>
                  きりもちの所在<span className={styles.year}>(2024)</span>
                </h2>
              </div>
              <div className={styles.workTitleWrapper}>
                <h2>
                  きりもちの所在<span className={styles.year}>(2024)</span>
                </h2>
              </div>
              <div className={styles.workTitleWrapper}>
                <h2>
                  きりもちの所在<span className={styles.year}>(2024)</span>
                </h2>
              </div>
              <div className={styles.workTitleWrapper}>
                <h2>
                  きりもちの所在<span className={styles.year}>(2024)</span>
                </h2>
              </div>
              <div className={styles.workTitleWrapper}>
                <h2>
                  きりもちの所在<span className={styles.year}>(2024)</span>
                </h2>
              </div>
              <div className={styles.workTitleWrapper}>
                <h2>
                  きりもちの所在<span className={styles.year}>(2024)</span>
                </h2>
              </div>
            </div>
          </InkFilter>
        </div>
      </div>
    </>
  );
};
