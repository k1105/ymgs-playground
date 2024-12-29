import { useState, useEffect } from "react";
import { FadeInElement } from "../FadeInElement";

export const Profile = ({
  sceneState,
}: {
  sceneState: "mounting" | "unmounting" | "mounted" | "unmounted" | undefined;
}) => {
  const [animationState, setAnimationState] = useState<
    "fadein" | "fadeout" | "stop"
  >("stop");

  const [isImageActive, setIsImageActive] = useState<boolean>(false);

  useEffect(() => {
    if (sceneState == "unmounting") {
      setAnimationState("fadeout");
    }
  }, [sceneState]);

  useEffect(() => {
    setIsImageActive(true);
  }, []);

  useEffect(() => {
    if (animationState == "fadeout") {
      setIsImageActive(false);
    }
  }, [animationState]);
  return (
    <>
      <div className="container">
        <div className={`profile-image-wrapper ${isImageActive && "active"}`}>
          <img src="/img/ham.png" className="profile-image" />
        </div>
        <div className="text-container">
          <FadeInElement from={10} to={0.6} animationState={animationState}>
            <div>
              <h1>morita asuka</h1>
              <h3 style={{ marginBottom: "1rem" }}>森田 明日香</h3>
            </div>
          </FadeInElement>

          <FadeInElement from={5} to={0.6} animationState={animationState}>
            <>
              <div className="profile-container">
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
          </FadeInElement>
          <FadeInElement from={10} to={0.6} animationState={animationState}>
            <>
              <h3 style={{ marginBottom: "1rem" }}>経歴</h3>
              <div className="carrier-container">
                <div className="carrier-item">
                  <p className="year">2000</p>
                  <p>大阪府出身</p>
                </div>
                <div className="carrier-item">
                  <p className="year">2018</p>
                  <p>大阪府立港南造形高等学校 漆芸専攻 卒業</p>
                </div>
                <div className="carrier-item">
                  <p className="year">2022</p>
                  <p>秋田公立美術大学 美術学部 ビジュアルアーツ専攻 卒業</p>
                </div>
                <div className="carrier-item">
                  <p className="year">2024</p>
                  <p>
                    情報科学芸術大学院大学メディア表現研究科 博士前期課程 卒業
                  </p>
                </div>
                <div className="carrier-item">
                  <p className="year">2024-</p>
                  <p>
                    愛知淑徳大学創造表現学部メディアプロデュース専攻 助教 在職
                  </p>
                </div>
              </div>
            </>
          </FadeInElement>
        </div>
      </div>
      <style jsx>{`
        .container {
          margin-top: 15rem;
        }
        .text-container {
          width: 80vw;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
        }
        .carrier-container {
          width: 400px;
        }
        .carrier-item {
          font-size: 0.9rem;
          display: flex;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .profile-image-wrapper {
          height: 10rem;
          width: 13rem;
          text-align: center;
          margin: 0 10vw 3rem;
          mix-blend-mode: screen;
          transition: all 1s ease;
          opacity: 0;
        }

        .profile-image {
          height: 100%;
        }

        .profile-image-wrapper.active {
          opacity: 1;
        }

        .profile-container {
          width: 500px;
        }

        @media screen and (max-width: 600px) {
          .profile-image-wrapper {
            height: 7rem;
            text-align: left;
            margin: 0 5vw 2rem;
          }
          .text-container {
            width: 90vw;
            margin-bottom: 10rem;
            flex-direction: column;
            gap: 3rem;
          }

          .container {
            margin-top: 5rem;
          }

          .profile-container,
          .carrier-container {
            width: auto;
          }
        }
      `}</style>
    </>
  );
};
