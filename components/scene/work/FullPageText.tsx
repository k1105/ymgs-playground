"use client";

import { useEffect, useState } from "react";
import { convertCssUnitToPx } from "@/lib/convertCssUnitToPx";
import { paginateByBinarySearch } from "@/lib/paginateText";
import { InkFilter } from "@/components/common/filter/InkFilter";
import { useNameContainer } from "@/components/context/NameContainerContext";
import { useSceneProps } from "@/components/common/SceneManager";

export const FullPageText = ({
  textJa,
  textEn,
  locale,
}: {
  textJa: string;
  textEn: string;
  locale: string;
}) => {
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [lineHeight, setLineHeight] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(0);
  const [jaSegments, setJaSegments] = useState<string[]>([]);
  const [enSegments, setEnSegments] = useState<string[]>([]);
  const { setIsHidden } = useNameContainer();

  const { transitionProgress, setSegmentsLength, currentSegmentIndex } =
    useSceneProps();

  useEffect(() => {
    if (document)
      setSize({
        w: convertCssUnitToPx(window.innerWidth > 600 ? "50vw" : "90vw"),
        h: convertCssUnitToPx("75vh"),
      });

    setLineHeight(
      convertCssUnitToPx(window.innerWidth > 600 ? "3rem" : "2.5rem")
    );
    setFontSize(
      convertCssUnitToPx(window.innerWidth > 600 ? "1rem" : "0.9rem")
    );
    setIsHidden(true);
  }, []);

  useEffect(() => {
    if (size.w > 0) {
      setJaSegments(
        paginateByBinarySearch(textJa, size.w, size.h, lineHeight, fontSize)
      );
      setEnSegments(
        paginateByBinarySearch(textEn, size.w, size.h, lineHeight, fontSize)
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
      <TextContainer
        text={
          locale == "ja"
            ? jaSegments[currentSegmentIndex]
            : enSegments[currentSegmentIndex]
        }
        size={size}
        lineHeight={lineHeight}
        fontSize={fontSize}
        transitionProgress={transitionProgress}
      />
    </>
  );
};

const TextContainer = ({
  text,
  size,
  lineHeight,
  fontSize,
  transitionProgress = 0,
}: {
  transitionProgress?: number;
  text: string;
  size: { w: number; h: number };
  lineHeight: number;
  fontSize: number;
}) => {
  return (
    <>
      <div className="container">
        <InkFilter blurIntensity={transitionProgress}>{text}</InkFilter>
      </div>
      <style jsx>
        {`
          .container {
            width: ${size.w}px;
            height: ${size.h}px;
            margin: 0 auto;
            position: absolute;
            left: 20vw;
            bottom: 10rem;
            line-height: ${lineHeight}px;
            font-size: ${fontSize}px;
            white-space: pre-wrap;
            word-break: break-word;
            box-sizing: border-box;
            line-break: strict;
            // overflow: hidden;
          }

          @media screen and (max-width: 600px) {
            .container {
              left: 5vw;
              bottom: 15vh;
            }
          }
        `}
      </style>
    </>
  );
};
