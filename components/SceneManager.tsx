import { useEffect, useRef, useState } from "react";
import { Profile } from "./scene/Profile";
import { Carrier } from "./scene/Carrier";

export const SceneManager = ({ scene }: { scene: number }) => {
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [mountScene, setMountScene] = useState<number>(0);
  const isAutoTransitionRef = useRef<boolean>(false);

  const [transitionProgress, setTransitionProgress] = useState<number>(1); //-100 - 100

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAutoTransitionRef.current) return;
      setTransitionProgress((prev) => prev + e.deltaY);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // ▼ scrollAccum の絶対値が一定以上になったらシーン切り替え
  useEffect(() => {
    const threshold = 100; // 適宜調整
    if (Math.abs(transitionProgress) > threshold) {
      // たとえば 下スクロール: scene++
      if (transitionProgress > 0) {
        // scene を増やす
        setMountScene((prev) => (prev + 1) % 3);
      } else {
        setMountScene((prev) => (prev + 3 - 1) % 3);
      }

      // 累積リセット
      isAutoTransitionRef.current = true;
      setTimeout(() => {
        isAutoTransitionRef.current = false;
      }, 1000);
      setTransitionProgress(0);
    }
  }, [transitionProgress]);

  const grantsAwards: { year: number; items: string[] }[] = [
    { year: 2019, items: ["ISCA 2019 , デジタルコンテンツ部門 , 最優秀賞"] },
    { year: 2020, items: ["秋田県アーツアーツサポートプログラム 2020"] },
    {
      year: 2021,
      items: ["3331 ART FAIR 2021 , コレクタープライズ 林曉甫賞"],
    },
    {
      year: 2022,
      items: [
        "情報科学芸術大学院大学 , 特別給費生",
        "アートアワードトーキョー丸の内 2022",
      ],
    },
    {
      year: 2023,
      items: [
        "ISCA 2022 , デジタルコンテンツ部門 , 入賞",
        "学生 CG コンテスト , アート部門 , 滝戸ドリタ評価員賞",
        "アジア デジタルアート大賞展 2023 , インタラクティブアート部門 , 優秀賞",
        "anonymous project 2023 , 特別賞受賞",
      ],
    },
    {
      year: 2024,
      items: [
        "山梨メディアアートアワード 2024",
        "汗かくメディア2024 汗かくメディア賞",
        "クリエイティブリンクナゴヤ , キャリアアップ支援助成",
      ],
    },
  ];

  const soloExhibitions: { year: number; items: string[] }[] = [
    { year: 2019, items: ["「ISCA 2019」 , グランフロント大阪 , 大阪"] },
    { year: 2020, items: ["「個展 壁越しの声」 , アトリオン秋田 , 秋田"] },
    {
      year: 2021,
      items: ["「3331 ART FAIR 2021」 , 3331 Arts Chiyoda , 東京"],
    },
    {
      year: 2022,
      items: [
        "「アートアワードトーキョー丸の内 2022」東京駅マルキューブ  , 東京",
        "「インターカレッジ・ソニックアーツ・フェスティバル 2022」 , 東京都立大学 , 東京",
        "「IAMAS OPEN HOUSE 2022」 , IAMAS , 岐阜",
      ],
    },
    {
      year: 2023,
      items: [
        "「LED. 実行委員会 2023」 , 名古屋駅クリスタル広場 , 愛知",
        "「ISCA 2022 受賞作品展」 , グランフロント大阪 , 大阪",
      ],
    },
  ];

  return (
    <>
      <div
        style={{
          color: "white",
          position: "fixed",
          top: "10px",
          right: "30px",
        }}
      >
        <p>{mountScene}</p>
        <p>{transitionProgress}</p>
      </div>
      {mountScene == 0 && <Profile transitionProgress={transitionProgress} />}
      {mountScene == 1 && (
        <Carrier
          transitionProgress={transitionProgress}
          items={grantsAwards}
          title="Grants and Awards"
        />
      )}
      {mountScene == 2 && (
        <Carrier
          transitionProgress={transitionProgress}
          items={soloExhibitions}
          title="Solo Exhibitions"
        />
      )}
    </>
  );
};
