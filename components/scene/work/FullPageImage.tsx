"use client";
import { useEffect, useContext } from "react";
import Image from "next/image";
import { useNameContainer } from "@/components/context/NameContainerContext";
import { SceneContext } from "@/components/common/SceneManager";
import styles from "./FullPageImage.module.scss";

export const FullPageImage = ({
  images,
}: {
  images: {
    fieldId: string;
    image: Image[];
    caption_ja: string;
    caption_en: string;
  }[];
}) => {
  const { setIsHidden } = useNameContainer();
  useEffect(() => {
    setIsHidden(true);
  }, [setIsHidden]);

  const sceneContext = useContext(SceneContext);
  if (!sceneContext) {
    return null;
  }
  const { transitionProgress } = sceneContext;

  // 「画像が複数枚ある行が1つでもあるか」を判定
  const hasMultipleImages = images.some((row) => row.image.length > 1);

  return (
    <>
      <div
        className={`${styles.pageWrapper} ${
          hasMultipleImages ? styles.hasMultipleImages : ""
        }`}
      >
        <div
          className={styles.imageContainer}
          style={{ opacity: `${1 - Math.abs(transitionProgress) / 100}` }}
        >
          {images.map((imageRow, rowIndex) => (
            <div key={`image-row-${rowIndex}`}>
              <div className={styles.imageRow}>
                {imageRow.image.length > 1 ? (
                  imageRow.image.map((image, index) => (
                    <Image
                      key={`image-${index}`}
                      src={`${image.url}?w=1200&fm=webp`}
                      alt={`Image ${index}`}
                      width={image.width}
                      height={image.height}
                      className={styles.multiImage}
                    />
                  ))
                ) : (
                  <Image
                    className={styles.singleImage}
                    key={`single-image`}
                    src={`${imageRow.image[0].url}?w=1600&fm=webp`}
                    alt="Single Image"
                    width={imageRow.image[0].width}
                    height={imageRow.image[0].height}
                  />
                )}
              </div>
              <p className={styles.caption}>{imageRow.caption_ja}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
