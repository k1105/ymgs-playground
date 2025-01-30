"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { convertCssUnitToPx } from "../lib/convertCssUnitToPx";
import { paginateByBinarySearch } from "../lib/paginateText";
import { InkFilter } from "./InkFilter";

export const Outline = ({
  title,
  outline,
  credit,
  currentSegmentIndex = 0,
  setSegmentsLength,
  languageMode = "ja",
  transitionProgress = 0,
}: {
  title: string;
  outline: { ja: string; en: string };
  credit: string;
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
        w: convertCssUnitToPx(window.innerWidth > 600 ? "30vw" : "77vw"),
        h: convertCssUnitToPx("15rem"),
      });

    setLineHeight(convertCssUnitToPx("2rem"));
    setFontSize(convertCssUnitToPx("0.9rem"));
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
      <div className="container">
        <InkFilter blurIntensity={transitionProgress}>
          <h3 style={{ marginBottom: "3rem", color: "var(--text-color)" }}>
            {title}
          </h3>
          <TextContainer
            text={
              languageMode == "ja"
                ? jaSegments[currentSegmentIndex]
                : enSegments[currentSegmentIndex]
            }
            size={size}
            lineHeight={lineHeight}
            fontSize={fontSize}
          />
          <p className="credit">{credit}</p>
        </InkFilter>
      </div>

      <style jsx>{`
        .container {
          width: ${size.w}px;
          margin: 20vh 17vw;
        }

        .credit {
          font-size: 0.8rem;
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
}: {
  text: string;
  size: { w: number; h: number };
  lineHeight: number;
  fontSize: number;
}) => {
  return (
    <>
      <div className="container">
        <p>{text}</p>
      </div>
      <style jsx>
        {`
          .container {
            width: ${size.w}px;
            max-height: ${size.h}px;
            line-height: ${lineHeight}px;
            font-size: ${fontSize}px;
            white-space: pre-wrap;
            word-break: break-word;
            box-sizing: border-box;
            line-break: strict;
            margin-bottom: 0.6rem;
            border-bottom: 1px solid black;
          }

          @media screen and (max-width: 600px) {
            .title {
              margin: 10vh 5vw;
            }
          }
        `}
      </style>
    </>
  );
};
