"use client";

import { useEffect, useState } from "react";
import { convertCssUnitToPx } from "../../../lib/convertCssUnitToPx";
import { paginateByBinarySearch } from "../../../lib/paginateText";
import { InkFilter } from "../../common/filter/InkFilter";
import { useNameContainer } from "../../context/NameContainerContext";
import { OpacityFilter } from "../../common/filter/OpacityFilter";
import styles from "./Outline.module.scss";
import { TextPager } from "../../common/TextPager";
import DynamicLink from "../../common/DynamicLink";
import { useSceneProps } from "@/components/common/SceneManager";
import Image from "next/image";

export const Outline = ({
  title,
  outline,
  credit,
  languageMode = "ja",
  nextWorkSlug = "",
  nextWorkTitle = "",
  images,
}: {
  title: string;
  outline: { ja: string; en: string };
  credit: string;
  currentSegmentIndex?: number;
  languageMode?: "ja" | "en";
  nextWorkSlug?: string;
  nextWorkTitle?: string;
  images: Image[];
}) => {
  const { transitionProgress, setSegmentsLength, currentSegmentIndex } =
    useSceneProps();
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [lineHeight, setLineHeight] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(0);
  const [jaSegments, setJaSegments] = useState<string[]>([]);
  const [enSegments, setEnSegments] = useState<string[]>([]);
  const { setIsHidden } = useNameContainer();
  const placeHolderImageUrl =
    "https://images.microcms-assets.io/assets/e718b308ac2c472db6bcc18df3f70f4e/409d214c21a74689845e5751db63f0a2/placeholder.png";

  useEffect(() => {
    if (document)
      setSize({
        w: convertCssUnitToPx(window.innerWidth > 600 ? "30vw" : "77vw"),
        h:
          outline.ja.length > 0
            ? window.innerWidth > 600
              ? convertCssUnitToPx("50vh")
              : convertCssUnitToPx("15rem")
            : 0,
      });

    setLineHeight(
      window.innerWidth > 600
        ? convertCssUnitToPx("2rem")
        : convertCssUnitToPx("1.5rem")
    );
    setFontSize(
      window.innerWidth > 600
        ? convertCssUnitToPx("0.9rem")
        : convertCssUnitToPx("0.8rem")
    );
    setIsHidden(false);
  }, []);

  useEffect(() => {
    if (size.w > 0) {
      setJaSegments(
        paginateByBinarySearch(outline.ja, size.w, size.h, lineHeight, fontSize)
      );
      setEnSegments(
        paginateByBinarySearch(outline.en, size.w, size.h, lineHeight, fontSize)
      );
    }
  }, [size]);

  useEffect(() => {
    if (setSegmentsLength !== undefined && jaSegments.length > 0) {
      setSegmentsLength(
        languageMode == "ja" ? jaSegments.length : enSegments.length
      );
    }
  }, [jaSegments, enSegments]);

  return (
    <>
      <div className={styles.container}>
        <OpacityFilter transitionProgress={transitionProgress}>
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <Image
                className={styles.image}
                fill
                src={
                  images.length > 0
                    ? `${images[0].url}?w=800&fm=webp`
                    : placeHolderImageUrl
                }
                alt=""
              />
            </div>
            <div className={styles.imageWrapper}>
              <Image
                className={styles.image}
                fill
                src={
                  images.length > 1
                    ? `${images[1].url}?w=800&fm=webp`
                    : placeHolderImageUrl
                }
                alt=""
              />
            </div>
          </div>
        </OpacityFilter>
        <div className={styles.textContainer}>
          <div className={styles.textWrapper} style={{ width: `${size.w}px` }}>
            <h3 style={{ marginBottom: "2rem" }}>{title}</h3>
            <InkFilter blurIntensity={transitionProgress}>
              <TextPager
                text={
                  languageMode == "ja"
                    ? jaSegments[currentSegmentIndex]
                    : enSegments[currentSegmentIndex]
                }
                size={size}
                lineHeight={lineHeight}
                fontSize={fontSize}
              />
            </InkFilter>
            <p className={styles.credit}>{credit}</p>
          </div>
        </div>
      </div>
      {nextWorkSlug.length > 0 && nextWorkTitle.length > 0 && (
        <DynamicLink
          href={`/works/${nextWorkSlug}`}
          className={styles.nextLink}
        >
          <p className={styles.nextButton}>つぎは</p>
          <div className={styles.nextLinkTitle}>
            <p>{nextWorkTitle}</p>
            <p>→</p>
          </div>
        </DynamicLink>
      )}
    </>
  );
};
