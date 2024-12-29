import { FadeInElement } from "../FadeInElement";
import { useEffect, useState } from "react";

export const Carieer = ({
  sceneState,
}: {
  sceneState: "mounting" | "unmounting" | "mounted" | "unmounted" | undefined;
}) => {
  const [animationState, setAnimationState] = useState<
    "fadein" | "fadeout" | "stop"
  >("stop");

  useEffect(() => {
    if (sceneState == "unmounting") {
      setAnimationState("fadeout");
    }
  }, [sceneState]);
  return (
    <>
      <FadeInElement from={10} to={0.6} animationState={animationState}>
        <div className="container">
          <h2>Grants and Awards</h2>
          <div className="carrier-container">
            <div className="carrier-item">
              <p className="year">2019</p>
              <p className="item">
                ISCA 2019 , デジタルコンテンツ部門 , 最優秀賞
              </p>
            </div>
            <div className="carrier-item">
              <p className="year">2020</p>
              <p className="item">秋田県アーツアーツサポートプログラム 2020 </p>
            </div>
            <div className="carrier-item">
              <p className="year">2021</p>
              <p className="item">
                3331 ART FAIR 2021 , コレクタープライズ 林曉甫賞
              </p>
            </div>
            <div className="carrier-item">
              <p className="year">2022</p>
              <p className="item">
                情報科学芸術大学院大学 , 特別給費生
                <br />
                アートアワードトーキョー丸の内 2022
              </p>
            </div>
            <div className="carrier-item">
              <p className="year">2023</p>
              <p className="item">
                ISCA 2022 , デジタルコンテンツ部門 , 入賞
                <br />
                学生 CG コンテスト , アート部門 , 滝戸ドリタ評価員賞
                <br />
                アジア デジタルアート大賞展 2023 , インタラクティブアート部門 ,
                優秀賞
                <br />
                anonymous project 2023 , 特別賞受賞
              </p>
            </div>
            <div className="carrier-item">
              <p className="year">2024</p>
              <p className="item">
                山梨メディアアートアワード 2024
                <br />
                汗かくメディア2024 汗かくメディア賞
                <br />
                クリエイティブリンクナゴヤ , キャリアアップ支援助成
              </p>
            </div>
          </div>
        </div>
      </FadeInElement>
      <style jsx>{`
        .container {
          width: 80vw;
          margin: 23rem auto 0;
          display: flex;
          justify-content: space-between;
        }
        .carrier-container {
          width: 60vw;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          column-gap: 1rem;
          row-gap: 1rem;
        }
        .carrier-item {
          width: 400px;
          display: flex;
          gap: 2rem;
        }
        .year {
          font-weight: 700;
        }
        .item {
          line-height: 1.8rem;
          font-size: 0.9rem;
        }

        @media screen and (max-width: 600px) {
          .profile-container,
          .carrier-container {
            width: auto;
          }
        }
      `}</style>
    </>
  );
};
