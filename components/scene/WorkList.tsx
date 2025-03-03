"use client";

import styles from "./WorkList.module.scss";
import { InkFilter } from "../common/filter/InkFilter";
import Link from "next/link";
import { OpacityFilter } from "../common/filter/OpacityFilter";
import { useSceneProps } from "../common/SceneManager";
import { useEffect, useState } from "react";
export const WorkList = ({
  locale = "",
  works = [],
}: {
  locale: string;
  works?: Work[];
}) => {
  const [contentNum, setContentNum] = useState<number>(0);
  const { transitionProgress, setSegmentsLength, currentSegmentIndex } =
    useSceneProps();
  const [workSegments, setWorkSegments] = useState<Work[][]>([]);
  const placeHolderImageUrl =
    "https://images.microcms-assets.io/assets/e718b308ac2c472db6bcc18df3f70f4e/409d214c21a74689845e5751db63f0a2/placeholder.png";

  useEffect(() => {
    if (window && window.innerWidth > 600) {
      setContentNum(8);
    } else {
      setContentNum(2);
    }
  }, []);

  useEffect(() => {
    if (contentNum == 0) return;

    setSegmentsLength(Math.ceil(works.length / contentNum));
    const tempList: Work[][] = [];
    let currentIndex = 0;

    while (currentIndex < works.length) {
      if (currentIndex % contentNum == 0) tempList.push([]);
      tempList[tempList.length - 1].push(works[currentIndex]);
      currentIndex++;
    }
    setWorkSegments(tempList);
  }, [contentNum]);
  return (
    <>
      <div className={styles.container}>
        {workSegments.length > 0 &&
          workSegments[currentSegmentIndex].map((work) => (
            <div className={styles.workWrapper} key={work.slug}>
              <Link
                href={`${locale == "ja" ? "" : "/" + locale}/works/${
                  work.slug
                }`}
                style={{ textDecoration: "none", color: "var(--text-color)" }}
              >
                <OpacityFilter transitionProgress={transitionProgress}>
                  <img
                    src={
                      work.ogpImage
                        ? `${work.ogpImage.url}?fm=avif`
                        : `${placeHolderImageUrl}?fm=avif`
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
