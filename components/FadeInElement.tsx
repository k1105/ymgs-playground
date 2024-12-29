import { useState, useEffect } from "react";

export const FadeInElement = ({
  children,
  from = 10,
  to = 0.6,
  animationState,
}: {
  children: React.ReactNode;
  from: number;
  to: number;
  animationState: "stop" | "fadein" | "fadeout";
}) => {
  // ぼかし強度 (stdDeviation) を state 管理する
  const [blurIntensity, setBlurIntensity] = useState<number>(from);

  useEffect(() => {
    animateBlurTo(blurIntensity, to, 1000);
  }, []);

  useEffect(() => {
    if (animationState == "fadeout") {
      animateBlurTo(blurIntensity, from, 1000);
    }
  }, [animationState]);

  // アニメーション用関数
  const animateBlurTo = (
    startValue: number,
    endValue: number,
    duration = 3000
  ) => {
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0～1 の範囲

      // 補間した値
      const current = startValue + (endValue - startValue) * progress;
      setBlurIntensity(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <>
      <div className="effect">{children}</div>
      {/* SVG フィルター定義（stdDeviation を動的に変化させる） */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="myInkFilter">
          {/* ガウシアンぼかし (blurIntensity を指定) */}
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={blurIntensity}
            result="blurred"
          />

          {/* グレースケール化 */}
          <feColorMatrix
            in="blurred"
            type="matrix"
            result="gray"
            values="
              0.3333 0.3333 0.3333 0 0
              0.3333 0.3333 0.3333 0 0
              0.3333 0.3333 0.3333 0 0
              0      0      0      1 0
            "
          />

          {/* 二値化: discrete + tableValues="0 1" */}
          <feComponentTransfer in="gray" result="thresholded">
            <feFuncR type="discrete" tableValues="0 1" />
            <feFuncG type="discrete" tableValues="0 1" />
            <feFuncB type="discrete" tableValues="0 1" />
            <feFuncA type="identity" />
          </feComponentTransfer>

          <feComposite in="thresholded" in2="thresholded" operator="over" />
        </filter>
      </svg>

      <style jsx>{`
        main {
          margin: 3rem;
        }

        .image-container {
          img {
            width: 100%;
          }
        }

        .effect {
          mix-blend-mode: screen;
          filter: url(#myInkFilter);
          font-size: 1rem;
          color: white;
          background: #333;
          transition: all ease 1s;
        }
      `}</style>
    </>
  );
};
