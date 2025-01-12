"use client";

import styles from "./Profile.module.css";
import { InkFilter } from "../InkFilter";
import { OpacityFilter } from "../OpacityFilter";

export const Profile = ({
  transitionProgress = 0,
}: {
  transitionProgress?: number;
}) => {
  return (
    <>
      <div className={styles.container}>
        <OpacityFilter
          transitionProgress={transitionProgress}
          style={{ mixBlendMode: "screen" }}
        >
          <div className={styles.profileImageWrapper}>
            <img src="/img/ham.png" className={styles.profileImage} />
          </div>
        </OpacityFilter>

        <div className={styles.textContainer}>
          <InkFilter blurIntensity={transitionProgress}>
            <div>
              <h1 style={{ fontWeight: "400" }}>morita asuka</h1>
              <h3 style={{ marginBottom: "1rem", fontWeight: "400" }}>
                森田 明日香
              </h3>
            </div>
          </InkFilter>

          <InkFilter blurIntensity={transitionProgress}>
            <>
              <div className={styles.profileContainer}>
                <p
                  style={{
                    fontSize: "0.9rem",
                    marginBottom: "2rem",
                    lineHeight: "1.8rem",
                  }}
                >
                  目に見えないほどの僅かな差異を、映像表現を中心としたさまざまな手法を通して顕在化する活動を行う。これまでに、ウインナーソーセージの個体差を加熱時の破裂音の違いから捉えた《Lag》、スライスロースハムの製造プロセスに着目して差異をアニメーション表現として構成した《Observing
                  Variation: in sliced loin
                  Hams》などがある。現在は、差異が可視化されることでその背後に潜む「事件」を彷彿とさせるような対象がなにか、そしてそれはどのような手法で可視化できるのかということをテーマに、表現研究を行っている。
                </p>
                <p style={{ fontSize: "0.9rem" }}>
                  She is engaged in activities to reveal the slightest
                  differences, which are so subtle that they cannot be seen,
                  through various methods centering on visual expression. Her
                  past works include “Lag,” in which she captured the individual
                  differences in sausage based on the difference in the popping
                  sound made during heating, and “Observing Variation: in sliced
                  loin Hams,” in which she focused on the production process of
                  sliced loin ham and composed the differences into an animated
                  expression. Currently, she is conducting expressive research
                  on the theme of what kind of objects and what kind of methods
                  can be used to visualize such objects that remind us of
                  “incidents” lurking behind them when differences are
                  visualized.
                </p>
              </div>
            </>
          </InkFilter>
          <InkFilter blurIntensity={transitionProgress}>
            <>
              <h3 style={{ marginBottom: "1rem" }}>経歴</h3>
              <div className={styles.carrierContainer}>
                <div className={styles.carrierItem}>
                  <p className={styles.year}>2000</p>
                  <p>大阪府出身</p>
                </div>
                <div className={styles.carrierItem}>
                  <p className={styles.year}>2018</p>
                  <p>大阪府立港南造形高等学校 漆芸専攻 卒業</p>
                </div>
                <div className={styles.carrierItem}>
                  <p className="year">2022</p>
                  <p>秋田公立美術大学 美術学部 ビジュアルアーツ専攻 卒業</p>
                </div>
                <div className={styles.carrierItem}>
                  <p className="year">2024</p>
                  <p>
                    情報科学芸術大学院大学メディア表現研究科 博士前期課程 卒業
                  </p>
                </div>
                <div className={styles.carrierItem}>
                  <p className="year">2024-</p>
                  <p>
                    愛知淑徳大学創造表現学部メディアプロデュース専攻 助教 在職
                  </p>
                </div>
              </div>
            </>
          </InkFilter>
        </div>
      </div>
    </>
  );
};
