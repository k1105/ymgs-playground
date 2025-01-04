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
  // アニメーション用関数
  // const animateBlurTo = (
  //   startValue: number,
  //   endValue: number,
  //   duration = 1000
  // ) => {
  //   const startTime = performance.now();

  //   const animate = (time: number) => {
  //     const elapsed = time - startTime;
  //     const progress = Math.min(elapsed / duration, 1); // 0～1 の範囲

  //     // 補間した値
  //     const current = startValue + (endValue - startValue) * progress;

  //     if (progress < 1) {
  //       requestAnimationFrame(animate);
  //     }
  //   };

  //   requestAnimationFrame(animate);
  // };

  return (
    <>
      <div className="component-wrapper">
        <div className="effect">{children}</div>
      </div>

      {/* SVG フィルター定義（stdDeviation を動的に変化させる） */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="myInkFilter">
          {/* ガウシアンぼかし (blurIntensity を指定) */}
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={(Math.abs(blurIntensity) / 100) * (from - to) + to}
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
          <feComponentTransfer in="inkEffect" result="thresholded">
            <feFuncR type="discrete" tableValues="0 1" />
            <feFuncG type="discrete" tableValues="0 1" />
            <feFuncB type="discrete" tableValues="0 1" />
            <feFuncA type="identity" />
          </feComponentTransfer>

          {/* <feComposite in="inkEffect" in2="inkEffect" operator="over" /> */}

          <feComposite in="thresholded" in2="thresholded" operator="over" />
        </filter>
      </svg>

      <style jsx>{`
        .component-wrapper {
          mix-blend-mode: screen;
        }

        .effect {
          filter: url(#myInkFilter);
          color: white;
          background: #333;
          transition: all ease 1s;
        }
      `}</style>
    </>
  );
};
