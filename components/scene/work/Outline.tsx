"use client";

import { useEffect, useState } from "react";
import { convertCssUnitToPx } from "../../../lib/convertCssUnitToPx";
import { paginateByBinarySearch } from "../../../lib/paginateText";
import { InkFilter } from "../../common/filter/InkFilter";
import { useNameContainer } from "../../context/NameContainerContext";
// import { OpacityFilter } from "../../common/filter/OpacityFilter";
import styles from "./Outline.module.scss";
import { TextPager } from "../../common/TextPager";
import Link from "next/link";
import { useSceneProps } from "@/components/common/SceneManager";
import Image from "next/image";
import { useParams } from "next/navigation";

export const Outline = ({
  title,
  outline,
  credit,
  nextWorkSlug = "",
  nextWorkTitle = "",
  images,
}: {
  title: string;
  outline: { ja: string; en: string };
  credit: string;
  currentSegmentIndex?: number;
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
  const params = useParams();
  const locale = Array.isArray(params.locale)
    ? params.locale[0]
    : params.locale || "ja"; // `locale` を取得

  useEffect(() => {
    console.log("credit:", credit);
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
      setSegmentsLength(locale == "ja" ? jaSegments.length : enSegments.length);
    }
  }, [jaSegments, enSegments]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            {images.length > 0 && (
              <Image
                className={styles.image}
                src={`${images[0].url}?w=800&fm=webp`}
                fill
                alt=""
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>
          <div className={styles.imageWrapper}>
            {images.length > 1 && (
              <Image
                className={styles.image}
                fill
                src={`${images[1].url}?w=800&fm=webp`}
                alt=""
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>
        </div>
        <div>
          <div className={styles.textWrapper}>
            <h3 style={{ marginBottom: "2rem" }}>{title}</h3>
            <InkFilter blurIntensity={transitionProgress}>
              <TextPager
                text={
                  locale == "ja"
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
        <Link
          href={`${locale == "ja" ? "" : "/" + locale}/works/${nextWorkSlug}`}
          className={styles.nextLink}
        >
          <p className={styles.nextButton}>つぎは</p>
          <div className={styles.nextLinkTitle}>
            <p>{nextWorkTitle}</p>
            <p>→</p>
          </div>
        </Link>
      )}
    </>
  );
};
