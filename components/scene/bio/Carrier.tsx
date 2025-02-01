"use client";

import styles from "./Carrier.module.css";
import { InkFilter } from "@/components/common/filter/InkFilter";

export const Carrier = ({
  transitionProgress = 0,
  title,
  items,
}: {
  transitionProgress?: number;
  title: string;
  items: { year: number; content: string[] }[];
}) => {
  const sortedItems = [...items].sort((a, b) => b.year - a.year);

  return (
    <>
      <InkFilter blurIntensity={transitionProgress}>
        <div className={styles.container}>
          <h2 className={styles.carrierName}>{title}</h2>
          <div className={styles.border} />
          <div className={styles.carrierContainer}>
            {sortedItems.map((elem, i) => (
              <div className={styles.carrierItem} key={`carrier-item-${i}`}>
                {elem.year && <p className={styles.year}>{elem.year}</p>}
                <div className={styles.item}>
                  {elem.content.map((text, itemId) => (
                    <p key={`item-${i}-${itemId}`}>{text}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </InkFilter>
    </>
  );
};
