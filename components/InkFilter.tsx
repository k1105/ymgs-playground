import { useEffect, useState, useRef } from "react";

export const InkFilter = ({
  children,
  from = 3,
  to = 0,
  blurIntensity,
}: {
  children: React.ReactNode;
  from?: number;
  to?: number;
  blurIntensity: number; // -100 ~ 100
}) => {
  const [blurValue, setBlurValue] = useState(0);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Safari対策: stdDeviation を useState で動的に更新
    const computedBlur =
      (Math.abs(isNaN(blurIntensity) ? 0 : blurIntensity) / 100) * (from - to) +
      to;
    setBlurValue(computedBlur);

    // Safari用: `filter` を `useRef` で適用
    if (filterRef.current) {
      filterRef.current.style.filter = "url(#myInkFilter)";
    }
  }, [blurIntensity, from, to]);

  return (
    <>
      <div className="component-wrapper">
        <div className="effect" ref={filterRef}>
          {children}
        </div>
      </div>

      {/* SVG フィルター定義 */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="myInkFilter">
          {/* ガウシアンぼかし (blurValue を useState で適用) */}
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={blurValue}
            result="blurred"
          />

          {/* グレースケール化 */}
          {/* <feColorMatrix
            in="blurred"
            type="matrix"
            result="gray"
            values="
              0.3333 0.3333 0.3333 0 0
              0.3333 0.3333 0.3333 0 0
              0.3333 0.3333 0.3333 0 0
              0      0      0      1 0
            "
          /> */}

          {/* 二値化: `in` を gray に修正 */}
          <feComponentTransfer in="blurred" result="thresholded">
            <feFuncR type="discrete" tableValues="0 1" />
            <feFuncG type="discrete" tableValues="0 1" />
            <feFuncB type="discrete" tableValues="0 1" />
            <feFuncA type="identity" />
          </feComponentTransfer>

          <feComposite in="thresholded" in2="thresholded" operator="over" />
        </filter>
      </svg>

      <style jsx>{`
        .component-wrapper {
          mix-blend-mode: screen;
        }

        .effect {
          color: white;
          background: #333;
        }
      `}</style>
    </>
  );
};
