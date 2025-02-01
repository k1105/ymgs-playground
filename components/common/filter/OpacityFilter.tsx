"use client";

import { CSSProperties, useEffect, useRef } from "react";

export const OpacityFilter = ({
  children,
  className,
  style,
  transitionProgress,
}: {
  children: React.ReactNode;
  transitionProgress: number;
  className?: string;
  style?: CSSProperties;
}) => {
  const componentWrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (componentWrapperRef.current) {
      componentWrapperRef.current.style.opacity = String(
        1 - Math.abs(transitionProgress) / 100
      );
    }
  }, [transitionProgress]);
  return (
    <>
      <div style={style} className={className} ref={componentWrapperRef}>
        {children}
      </div>
    </>
  );
};
