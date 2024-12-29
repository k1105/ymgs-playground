import Head from "next/head";
import { Inter } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import { SceneManager } from "@/components/SceneManager";

const inter = Inter({ subsets: ["latin"] });

// 何ミリ秒 イベントが来なければ “スクロール終了” とみなすか
const SCROLL_END_TIMEOUT = 10;

export default function Home() {
  const [scene, setScene] = useState<number>(0);

  // 今のスクロールで累積した deltaY
  const deltaAccumRef = useRef<number>(0);
  // タイマーIDを保持
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // デフォルトのスクロール動作を止めたい場合:
      // e.preventDefault();

      // まず 累積delta に加算
      deltaAccumRef.current += e.deltaY;

      // 既存のタイマーがあればクリア
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }

      // 一定時間 (SCROLL_END_TIMEOUT) wheel イベントが来なければ “操作終了”
      scrollTimerRef.current = setTimeout(() => {
        // 累積deltaY を見て、下スクロールか上スクロールか判定
        const accumulated = deltaAccumRef.current;

        if (accumulated > 50) {
          // シーンを 1つ進める
          setScene((prev) => (prev + 1) % 2);
        } else if (accumulated < -50) {
          // シーンを 1つ戻す
          setScene((prev) => (prev + 2 - 1) % 2);
        }

        // リセット
        deltaAccumRef.current = 0;
        scrollTimerRef.current = null;
      }, SCROLL_END_TIMEOUT);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Scrolling Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* 高さ固定 + overflow:hidden でスクロールしない */}
      <main style={{ width: "100vw", height: "100vh", color: "white" }}>
        <SceneManager scene={scene} />
      </main>
    </>
  );
}
