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
  const filterId = useId();
  const filterRef = useRef<HTMLDivElement>(null);

  // Safari判定
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (
      ua.includes("safari") &&
      !ua.includes("chrome") &&
      !ua.includes("chromium")
    ) {
      setIsSafari(true);
    }
  }, []);

  // blurValue の初期値を計算
  const initialBlurValue =
    (Math.abs(isNaN(blurIntensity) ? 0 : blurIntensity) / 100) * (from - to) +
    to;
  const [blurValue, setBlurValue] = useState(initialBlurValue);

  useEffect(() => {
    const computedBlur =
      (Math.abs(isNaN(blurIntensity) ? 0 : blurIntensity) / 100) * (from - to) +
      to;
    setBlurValue(computedBlur);
  }, [blurIntensity, from, to]);

  // Safariなら CSSフィルターの blur() だけ、
  // それ以外は SVGフィルター (url(#filterId)) を使う
  const filterStyle = isSafari
    ? `blur(${blurValue}px)`
    : blurIntensity !== 0
    ? `url(#${filterId})`
    : "none";

  return (
    <>
      <div className={styles.container}>
        <div className={styles.componentWrapper}>
          <div
            className={
              blurIntensity !== 0
                ? `${styles.effect} ${!isSafari && styles.adjusterForFilter}`
                : styles.noEffect
            }
            ref={filterRef}
            style={{
              filter: filterStyle,
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Safariでない場合にだけ実際にSVG filterが意味を持つ */}
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
