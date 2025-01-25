"use client";

import styles from "./WorkList.module.css";
import { InkFilter } from "../InkFilter";
import Link from "next/link";

// MicroCMSの「work」から取得した型を仮定
type Work = {
  slug: string;
  title: {
    text_ja: string;
    text_en: string;
  };
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
      <InkFilter blurIntensity={transitionProgress}>
        <div className={styles.workIndexContainer}>
          <p className={styles.tableName}>
            {locale !== "en" ? "作品一覧" : "Works"}:
          </p>
          {works.length > 0 &&
            works.map((work) => (
              <Link
                key={`link-to-${work.slug}`}
                href={`/${locale}/works/${work.slug}`}
                style={{ textDecoration: "none", color: "var(--text-color)" }}
              >
                <div className={styles.workTitleWrapper} key={work.slug}>
                  <h2 className={styles.workTitle}>
                    {locale == "en" ? work.title.text_en : work.title.text_ja}
                    <span className={styles.year}>({work.year})</span>
                  </h2>
                </div>
              </Link>
            ))}
        </div>
      </InkFilter>
    </>
  );
};
