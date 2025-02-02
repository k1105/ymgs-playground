"use client";

import styles from "./WorkList.module.css";
import { InkFilter } from "../common/filter/InkFilter";
import Link from "next/link";
import { OpacityFilter } from "../common/filter/OpacityFilter";
import { useSceneProps } from "../common/SceneManager";
import { useEffect, useState } from "react";
export const WorkList = ({
  locale = "ja",
  works = [],
}: {
  locale: string;
  works?: Work[];
}) => {
  const { transitionProgress, setSegmentsLength, currentSegmentIndex } =
    useSceneProps();
  const [workSegments, setWorkSegments] = useState<Work[][]>([]);
  const placeHolderImageUrl =
    "https://images.microcms-assets.io/assets/e718b308ac2c472db6bcc18df3f70f4e/409d214c21a74689845e5751db63f0a2/placeholder.png";

  useEffect(() => {
    setSegmentsLength(Math.ceil(works.length / 8));
    const tempList: Work[][] = [];
    let currentIndex = 0;

    while (currentIndex < works.length) {
      if (currentIndex % 8 == 0) tempList.push([]);
      tempList[tempList.length - 1].push(works[currentIndex]);
      currentIndex++;
    }
    setWorkSegments(tempList);
  }, []);
  return (
    <>
      <div className={styles.workIndexContainer}>
        {workSegments.length > 0 &&
          workSegments[currentSegmentIndex].map((work) => (
            <div className={styles.workContainer} key={work.slug}>
              <Link
                href={`/${locale}/works/${work.slug}`}
                style={{ textDecoration: "none", color: "var(--text-color)" }}
              >
                <OpacityFilter transitionProgress={transitionProgress}>
                  <img
                    src={
                      work.ogpImage
                        ? `${work.ogpImage.url}?w=800&fm=webp`
                        : `${placeHolderImageUrl}?w=800&fm=webp`
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
