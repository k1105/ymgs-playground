"use client";

import styles from "./Profile.module.css";
import { InkFilter } from "../InkFilter";
import { OpacityFilter } from "../OpacityFilter";

export const Profile = ({
  bio,
  transitionProgress = 0,
}: {
  bio: string;
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
                  {bio}
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
