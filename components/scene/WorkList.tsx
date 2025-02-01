"use client";

import styles from "./WorkList.module.css";
import { InkFilter } from "../InkFilter";
import Link from "next/link";
import { OpacityFilter } from "../OpacityFilter";
export const WorkList = ({
  transitionProgress = 0,
  locale = "ja",
  works = [],
}: {
  transitionProgress?: number;
  locale: string;
  works?: Work[];
}) => {
  const placeHolderImageUrl =
    "https://images.microcms-assets.io/assets/e718b308ac2c472db6bcc18df3f70f4e/409d214c21a74689845e5751db63f0a2/placeholder.png";
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
                        : `${placeHolderImageUrl}?w=800`
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
