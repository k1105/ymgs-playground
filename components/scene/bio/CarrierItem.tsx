import { useLayoutEffect, useRef, useState } from "react";
import styles from "./CarrierItem.module.scss";

export const CarrierItem = ({
  index,
  elem,
}: {
  index: number;
  elem: { year: number | undefined; content: string[] };
}) => {
  // コンポーネントのルート要素への参照を作成
  const containerRef = useRef<HTMLDivElement>(null);
  // 高さを state として保持（単位は px）
  const [height, setHeight] = useState<number>(0);

  // レンダリング後に高さを計測
  useLayoutEffect(() => {
    if (containerRef.current) {
      const measuredHeight =
        containerRef.current.getBoundingClientRect().height;
      setHeight(measuredHeight);
    }
  }, [elem]); // elem が変わるたびに再計測する場合

  return (
    <div className={styles.carrierItem} ref={containerRef}>
      {elem.year && <p className={styles.year}>{elem.year}</p>}
      <div className={styles.item}>
        {elem.content.map((text, itemId) => (
          <p key={`item-${index}-${itemId}`}>{text}</p>
        ))}
      </div>
      {/* デバッグ用に高さを表示する例 */}
      {/* <p>高さ: {height}px</p> */}
    </div>
  );
};
