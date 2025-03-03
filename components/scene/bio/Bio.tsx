"use client";

import styles from "./Bio.module.scss";
import { Fragment } from "react";
import { InkFilter } from "../../common/filter/InkFilter";
import { useSceneProps } from "@/components/common/SceneManager";
import Typesetter from "palt-typesetting";
import "palt-typesetting/dist/typesetter.css";

export const Bio = ({ locale, bio }: { locale: string; bio: string }) => {
  const paragraphs = bio.split("\n").map((line, index) => (
    <Fragment key={index}>
      {line}
      <br />
    </Fragment>
  ));

  const { transitionProgress } = useSceneProps();
  // Typesetter のインスタンスを作成
  const typesetter = new Typesetter();

  // セレクターにマッチする要素に対して組版を適用
  typesetter.renderToSelector("paragraph");

  return (
    <div className={styles.container}>
      <InkFilter blurIntensity={transitionProgress}>
        <p className={styles.name}>
          {locale === "ja" ? (
            <>
              森田 明日香 <wbr />
              <small className={styles.small}>(もりた・あすか)</small>
            </>
          ) : (
            <>
              Asuka Morita <wbr />
              <small className={styles.small}>(もりた・あすか)</small>
            </>
          )}
        </p>
        <div className={styles.profileContainer}>
          <p className={`${locale == "en" && styles.en} paragraph`}>
            {paragraphs}
          </p>
        </div>
      </InkFilter>
    </div>
  );
};
