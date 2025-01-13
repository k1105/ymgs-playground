import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { convertCssUnitToPx } from "../lib/convertCssUnitToPx";
import { paginateByBinarySearch } from "../lib/paginateText";
import { InkFilter } from "./InkFilter";

export const FullPageText = ({
  textJa,
  textEn,
  currentSegmentIndex = 0,
  setSegmentsLength,
  languageMode = "ja",
  transitionProgress = 0,
}: {
  textJa: string;
  textEn: string;
  currentSegmentIndex?: number;
  setSegmentsLength?: Dispatch<SetStateAction<number>>;
  languageMode?: "ja" | "en";
  transitionProgress?: number;
}) => {
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [lineHeight, setLineHeight] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(0);
  const [jaSegments, setJaSegments] = useState<string[]>([]);
  const [enSegments, setEnSegments] = useState<string[]>([]);

  useEffect(() => {
    if (document)
      setSize({
        w: convertCssUnitToPx(window.innerWidth > 600 ? "50vw" : "90vw"),
        h: convertCssUnitToPx("70vh"),
      });

    setLineHeight(convertCssUnitToPx("3rem"));
    setFontSize(convertCssUnitToPx("1rem"));
  }, []);

  useEffect(() => {
    console.log("size.w: " + size.w);
    console.log("size.h: " + size.h);
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
      setSegmentsLength(
        languageMode == "ja" ? jaSegments.length : enSegments.length
      );
    }
  }, [jaSegments, enSegments]);

  return (
    <>
      <TextContainer
        text={
          languageMode == "ja"
            ? jaSegments[currentSegmentIndex]
            : enSegments[currentSegmentIndex]
        }
        size={size}
        lineHeight={lineHeight}
        fontSize={fontSize}
        transitionProgress={transitionProgress}
      />
      <style jsx>{`
        .language-switcher {
          position: fixed;
          top: 1rem;
          left: 1rem;
          color: white;
          a {
            text-decoration: none;
            font-size: 1rem;
          }

          a.active {
            opacity: 0.5;
          }
        }
      `}</style>
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
              bottom: 3rem;
            }
          }
        `}
      </style>
    </>
  );
};
