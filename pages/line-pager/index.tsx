import { convertCssUnitToPx } from "@/components/convertCssUnitToPx";
import { TextPager } from "@/components/TextPager";
import { useEffect, useState } from "react";
import { paginateByBinarySearch } from "@/components/paginateText";

export default function LinePager() {
  const sampleText = `She is engaged in activities to reveal the slightest differences, which are so subtle that they cannot be seen, through various methods centering on visual expression. Her past works include “Lag,” in which she captured the individual differences in sausage based on the difference in the popping sound made during heating, and “Observing Variation: in sliced loin Hams,” in which she focused on the production process of sliced loin ham and composed the differences into an animated expression. Currently, she is conducting expressive research on the theme of what kind of objects and what kind of methods can be used to visualize such objects that remind us of “incidents” lurking behind them when differences are visualized. ◽️
`;
  const [pages, setPages] = useState<string[]>([]);
  const [boxSize, setBoxSize] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });
  const [fontSize, setFontSize] = useState<number>(0);
  const [lineHeight, setLineHeight] = useState<number>(0);

  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  // ここでページ分割ロジックを一度だけ実行
  useEffect(() => {
    setBoxSize({
      w: convertCssUnitToPx(window.innerWidth < 600 ? "90vw" : "40vw"),
      h: convertCssUnitToPx("30rem"),
    });
    setFontSize(convertCssUnitToPx("0.9rem"));
    setLineHeight(convertCssUnitToPx("1.6rem"));
  }, []);

  useEffect(() => {
    console.log("line height: " + lineHeight);
    if (document && boxSize.w > 0)
      setPages(
        paginateByBinarySearch(
          sampleText,
          boxSize.w,
          boxSize.h,
          lineHeight,
          fontSize
        )
      );
  }, [boxSize, lineHeight]);

  useEffect(() => {
    console.log(pages);
  }, [pages]);

  return (
    <div style={{ color: "white" }}>
      <div
        style={{
          margin: "2rem 0",
          display: "flex",
          gap: "1rem",
          width: "15rem",
          justifyContent: "space-between",
        }}
      >
        <button
          className="button"
          onClick={() => {
            setCurrentPageIndex(
              (prev) => (prev + pages.length - 1) % pages.length
            );
          }}
        >
          前へ
        </button>
        <button
          className="button"
          onClick={() => {
            setCurrentPageIndex((prev) => (prev + 1) % pages.length);
          }}
        >
          次へ
        </button>
      </div>

      <div style={{ position: "absolute", bottom: "2rem", left: "5vw" }}>
        <h1 style={{ marginBottom: "2rem" }}>Profile:</h1>
        <TextPager
          text={pages[currentPageIndex]}
          pageIndex={currentPageIndex}
          width={boxSize.w}
          height={boxSize.h}
          fontSize={fontSize}
          lineHeight={lineHeight}
        />
        <p style={{ textAlign: "right", fontSize: "0.8rem" }}>
          {currentPageIndex + 1} / {pages.length}
        </p>
      </div>

      <style jsx>{`
        .button {
          width: 8rem;
        }
      `}</style>
    </div>
  );
}
