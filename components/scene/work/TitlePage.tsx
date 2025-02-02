"use client";

import styles from "./TitlePage.module.scss";
import { InkFilter } from "@/components/common/filter/InkFilter";
import { useSceneProps } from "@/components/common/SceneManager";
import { useNameContainer } from "@/components/context/NameContainerContext";
import { useEffect } from "react";

const TitlePage = ({
  title,
  year,
  backgroundImage,
}: {
  title: string;
  year: string;
  backgroundImage: string;
}) => {
  const { transitionProgress } = useSceneProps();
  const { setIsHidden } = useNameContainer();
  useEffect(() => {
    setIsHidden(false);
  }, []);
  return (
    <>
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${backgroundImage}?w=1600)`,
          backgroundSize: "cover",
          opacity: 1 - Math.abs(transitionProgress) / 100,
        }}
      />
      <InkFilter blurIntensity={transitionProgress}>
        <>
          <div className={styles.titleContainer}>
            <h1>{title}</h1>
            <p className={styles.year}>({year})</p>
          </div>
        </>
      </InkFilter>
    </>
  );
};

export default TitlePage;
