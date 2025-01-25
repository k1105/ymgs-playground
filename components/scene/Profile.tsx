"use client";

import styles from "./Profile.module.css";
import { InkFilter } from "../InkFilter";
import { OpacityFilter } from "../OpacityFilter";
import { Fragment } from "react";
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

export const Profile = ({
  bio,
  transitionProgress = 0,
  locale = "ja",
  works = [], // ここで作品の配列を受け取る
}: {
  bio: string;
  transitionProgress?: number;
  locale: string;
  works?: Work[]; // 作品データの配列をオプションで受け取れるように
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
                {locale === "ja"
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

          {/* ▼ ここから作品一覧を表示する部分 ▼ */}
          <InkFilter blurIntensity={transitionProgress}>
            <div className={styles.workIndexContainer}>
              {works.length > 0 &&
                works.map((work) => (
                  <Link
                    key={`link-to-${work.slug}`}
                    href={`/${locale}/works/${work.slug}`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <div className={styles.workTitleWrapper} key={work.slug}>
                      <h2>
                        {/* 詳細ページへのリンク */}

                        {locale == "en"
                          ? work.title.text_en
                          : work.title.text_ja}
                        {/* 年度表示がある場合はこんな感じで */}
                        <span className={styles.year}>({work.year})</span>
                      </h2>
                    </div>
                  </Link>
                ))}
            </div>
          </InkFilter>
        </div>
      </div>
    </>
  );
};
