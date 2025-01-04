import { ReactElement, useEffect, useState } from "react";
import { convertCssUnitToPx } from "./convertCssUnitToPx";
import { paginateByBinarySearch } from "./paginateText";
import { SceneManager } from "./SceneManager";
import { InkFilter } from "./InkFilter";

export const FullPageText = ({
  textJa,
  textEn,
}: {
  textJa: string;
  textEn: string;
}) => {
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [lineHeight, setLineHeight] = useState<number>(0);
  const [fontSize, setFontSize] = useState<number>(0);
  const [jaPages, setJaPages] = useState<string[]>([]);
  const [enPages, setEnPages] = useState<string[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [jaNodes, setJaNodes] = useState<ReactElement<any>[]>([]);
  const [enNodes, setEnNodes] = useState<ReactElement<any>[]>([]);
  const [isJaMode, setIsJaMode] = useState<boolean>(true);

  useEffect(() => {
    if (document)
      setSize({
        w: convertCssUnitToPx(window.innerWidth > 600 ? "50vw" : "90vw"),
        h: convertCssUnitToPx("70vh"),
      });

    setLineHeight(
      convertCssUnitToPx(window.innerWidth > 600 ? "3rem" : "2.5rem")
    );
    setFontSize(
      convertCssUnitToPx(window.innerWidth > 600 ? "1rem" : "0.9rem")
    );
  }, []);

  useEffect(() => {
    if (size.w > 0) {
      setJaPages(
        paginateByBinarySearch(textJa, size.w, size.h, lineHeight, fontSize)
      );
      setEnPages(
        paginateByBinarySearch(textEn, size.w, size.h, lineHeight, fontSize)
      );
    }
  }, [size]);

  useEffect(() => {
    if (jaPages.length > 0) {
      const nodes: ReactElement<any>[] = [];
      jaPages.map((text, i) => {
        nodes.push(
          <TextContainer
            text={text}
            size={size}
            lineHeight={lineHeight}
            fontSize={fontSize}
          />
        );
      });

      setJaNodes(nodes);
    }
  }, [jaPages]);

  useEffect(() => {
    if (jaPages.length > 0) {
      const nodes: ReactElement<any>[] = [];
      enPages.map((text, i) => {
        nodes.push(
          <TextContainer
            text={text}
            size={size}
            lineHeight={lineHeight}
            fontSize={fontSize}
          />
        );
      });

      setEnNodes(nodes);
    }
  }, [enPages]);

  return (
    <>
      <div className="language-switcher">
        <a
          onClick={() => setIsJaMode(true)}
          className={`${isJaMode && "active"}`}
        >
          JP
        </a>
        <span> / </span>
        <a
          onClick={() => setIsJaMode(false)}
          className={`${!isJaMode && "active"}`}
        >
          EN
        </a>
      </div>
      <SceneManager scenes={isJaMode ? jaNodes : enNodes} />
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
        <InkFilter blurIntensity={transitionProgress}>
          <>{text}</>
        </InkFilter>
      </div>
      <style jsx>
        {`
          .container {
            width: ${size.w}px;
            height: ${size.h}px;
            margin: 0 auto;
            position: absolute;
            left: 5vw;
            bottom: 10rem;
            line-height: ${lineHeight}px;
            font-size: ${fontSize}px;
            white-space: pre-wrap;
            word-break: break-word;
            box-sizing: border-box;
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
