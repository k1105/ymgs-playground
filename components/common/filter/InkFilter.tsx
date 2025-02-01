"use client";

import { useEffect, useState, useRef, useId } from "react";
import styles from "./InkFilter.module.scss";

export const InkFilter = ({
  children,
  from = 3,
  to = 0,
  blurIntensity,
}: {
  children: React.ReactNode;
  from?: number;
  to?: number;
  blurIntensity: number;
}) => {
  const filterId = useId(); // ✅ `useId()` でサーバーとクライアントの ID を一致させる
  const filterRef = useRef<HTMLDivElement>(null);

  // blurValue の初期値を計算
  const initialBlurValue =
    (Math.abs(isNaN(blurIntensity) ? 0 : blurIntensity) / 100) * (from - to) +
    to;
  const [blurValue, setBlurValue] = useState(initialBlurValue);

  useEffect(() => {
    // blurIntensity の変化に応じてフィルターの強度を更新
    const computedBlur =
      (Math.abs(isNaN(blurIntensity) ? 0 : blurIntensity) / 100) * (from - to) +
      to;
    setBlurValue(computedBlur);
  }, [blurIntensity, from, to]);

  return (
    <>
      <div className={styles.componentWrapper}>
        <div
          className={blurIntensity !== 0 ? styles.effect : ""}
          ref={filterRef}
          style={{ filter: blurIntensity !== 0 ? `url(#${filterId})` : "none" }}
        >
          {children}
        </div>
      </div>

      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id={filterId}>
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={blurValue}
            result="blurred"
          />
          <feComponentTransfer in="blurred" result="thresholded">
            <feFuncR type="discrete" tableValues="0 1" />
            <feFuncG type="discrete" tableValues="0 1" />
            <feFuncB type="discrete" tableValues="0 1" />
            <feFuncA type="identity" />
          </feComponentTransfer>
          <feComposite in="thresholded" in2="thresholded" operator="over" />
        </filter>
      </svg>
    </>
  );
};
