"use client";

import styles from "./WorkList.module.css";
import { InkFilter } from "../InkFilter";
import Link from "next/link";
import { OpacityFilter } from "../OpacityFilter";

// MicroCMSの「work」から取得した型を仮定
type Work = {
  slug: string;
  title: {
    text_ja: string;
    text_en: string;
  };
  ogpImage: { url: string; width: number; height: number };
  year: number;
};

export const WorkList = ({
  transitionProgress = 0,
  locale = "ja",
  works = [],
}: {
  transitionProgress?: number;
  locale: string;
  works?: Work[];
}) => {
  return (
    <>
      <div className={styles.workIndexContainer}>
        {works.length > 0 &&
          works.map((work) => (
            <div className={styles.workContainer} key={work.slug}>
              <Link
                href={`/${locale}/works/${work.slug}`}
                style={{ textDecoration: "none", color: "var(--text-color)" }}
              >
                <OpacityFilter transitionProgress={transitionProgress}>
                  <img
                    src={
                      work.ogpImage
                        ? `${work.ogpImage.url}?w=800`
                        : "/img/placeHolder.png"
                    }
                    alt="work"
                    className={styles.thumbnail}
                  />
                </OpacityFilter>
                <InkFilter blurIntensity={transitionProgress}>
                  <h2 className={styles.workTitle}>
                    {locale == "en" ? work.title.text_en : work.title.text_ja}
                    <span className={styles.year}>({work.year})</span>
                  </h2>
                </InkFilter>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};
