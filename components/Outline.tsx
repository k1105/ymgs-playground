"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { convertCssUnitToPx } from "../lib/convertCssUnitToPx";
import { paginateByBinarySearch } from "../lib/paginateText";
import { InkFilter } from "./InkFilter";
import { useNameContainer } from "./context/NameContainerContext";
import { OpacityFilter } from "./OpacityFilter";

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
  const { setIsHidden } = useNameContainer();
  const placeHolderImageUrl =
    "https://images.microcms-assets.io/assets/e718b308ac2c472db6bcc18df3f70f4e/409d214c21a74689845e5751db63f0a2/placeholder.png";

  useEffect(() => {
    if (document)
      setSize({
        w: convertCssUnitToPx(window.innerWidth > 600 ? "30vw" : "77vw"),
        h: outline.ja.length > 0 ? convertCssUnitToPx("15rem") : 0,
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
      <div className="container">
        <OpacityFilter transitionProgress={transitionProgress}>
          <div className="imageContainer">
            <img
              className="image"
              style={{ objectFit: "cover" }}
              src={placeHolderImageUrl}
              alt=""
            />
            <img
              className="image"
              style={{ objectFit: "cover" }}
              src={placeHolderImageUrl}
              alt=""
            />
          </div>
        </OpacityFilter>
        <div className="textContainer">
          <div className="textWrapper" style={{ width: `${size.w}px` }}>
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
        </div>
      </div>
      <div>
        <p className="nextButton">つぎは</p>
        <div className="nextLinkTitle">
          <p>ゆらぎの翻訳</p>
          <p>→</p>
        </div>
      </div>

      <style jsx>{`
        .container {
          margin-left: 7rem;
          display: flex;
          gap: 3rem;
        }
        .textContainer {
        }
        .textWrapper {
          margin-top: 20vh;
        }

        .imageContainer {
          display: flex;
          height: 100vh;
          width: 41vw;
          flex-direction: column;
          justify-content: space-between;
        }

        .image {
          aspect-ratio: 4 / 3;
          background-color: black;
        }

        .nextButton {
          background-color: black;
          font-size: 0.8rem;
          width: 3.5rem;
          border-radius: 2rem;
          text-align: center;
          color: white;
        }
        .nextLinkTitle {
          display: flex;
          gap: 1rem;
        }

        .credit {
          font-size: 0.8rem;
        }

        @media screen and (max-width: 600px) {
          .container {
            margin-left: 4rem;
            flex-direction: column-reverse;
          }
          .imageContainer {
            width: 100%;
            height: 60vh;
          }

          .credit {
            font-size: 0.6rem;
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
            height: ${size.h}px;
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
