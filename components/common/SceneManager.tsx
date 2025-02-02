"use client";

import { useEffect, useRef, useState, useContext, ReactElement } from "react";
import { useRouter } from "next/navigation";
import { createContext, Dispatch, SetStateAction } from "react";

export type SceneContextValue = {
  transitionProgress: number;
  currentSegmentIndex: number;
  setSegmentsLength: Dispatch<SetStateAction<number>>;
  languageMode: string;
  // 必要に応じて他の値も追加
};

export const SceneContext = createContext<SceneContextValue | null>(null);

type SceneManagerProps = {
  scenes: ReactElement<any>[];
  languageMode: string;
  redirectNextTo?: string;
  redirectPrevTo?: string;
};

export const SceneManager = ({
  scenes,
  languageMode,
  redirectNextTo,
  redirectPrevTo,
}: SceneManagerProps) => {
  const router = useRouter();
  const [sceneIndex, setSceneIndex] = useState<number>(0);
  const [transitionProgress, setTransitionProgress] = useState<number>(0);
  const [isEasing, setIsEasing] = useState<boolean>(false);
  const [isAutoTransition, setIsAutoTransition] = useState<boolean>(false);
  const [isTouching, setIsTouching] = useState<boolean>(false);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState<number>(0);
  const [segmentsLength, setSegmentsLength] = useState<number>(0);
  const [lastWheelTime, setLastWheelTime] = useState<number>(0);
  const touchStartYRef = useRef<number>(0);
  const [pendingRedirect, setPendingRedirect] = useState<string | null>(null);

  useEffect(() => {
    if (pendingRedirect) {
      router.push(pendingRedirect);
      setPendingRedirect(null);
    }
  }, [pendingRedirect, router]);

  /**
   * シーンorセグメント切り替え判定
   */
  useEffect(() => {
    const threshold = 80;
    if (!isAutoTransition && !isTouching) {
      if (transitionProgress > threshold) {
        // ▼ 最終セグメントならシーン切り替え
        if (currentSegmentIndex >= segmentsLength - 1) {
          // 最終シーンかどうかチェック
          if (sceneIndex === scenes.length - 1) {
            // redirectNextToがあればリダイレクト、なければ一周
            if (redirectNextTo) {
              setPendingRedirect(redirectNextTo);
            } else {
              setSceneIndex(0);
            }
          } else {
            setSceneIndex((prev) => prev + 1);
          }
          setCurrentSegmentIndex(0);
          setSegmentsLength(0);
          resetTransition();
        } else {
          // セグメントをひとつ進める
          setCurrentSegmentIndex((prev) => prev + 1);
          resetTransition();
        }
      } else if (transitionProgress < -threshold) {
        // ▼ 先頭セグメントならシーン切り替え
        if (currentSegmentIndex <= 0) {
          if (sceneIndex === 0) {
            // redirectPrevToがあればリダイレクト、なければ一周
            if (redirectPrevTo) {
              setPendingRedirect(redirectPrevTo);
            } else {
              setSceneIndex(scenes.length - 1);
            }
          } else {
            setSceneIndex((prev) => prev - 1);
          }
          setSegmentsLength(0);
          resetTransition();
        } else {
          // セグメントをひとつ戻す
          setCurrentSegmentIndex((prev) => prev - 1);
          resetTransition();
        }
      } else {
        // 微小量スクロール: 50ms後にイージングで0へ戻す
        const timer = setTimeout(() => {
          const elapsed = performance.now() - lastWheelTime;
          if (elapsed >= 50 || isTouching) {
            startEasingToZero({});
          }
        }, 50);
        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [
    transitionProgress,
    isTouching,
    isAutoTransition,
    currentSegmentIndex,
    segmentsLength,
    sceneIndex,
    redirectNextTo,
    redirectPrevTo,
    lastWheelTime,
    scenes.length,
  ]);

  /**
   * タッチ終了時刻を随時更新
   */
  useEffect(() => {
    if (!isTouching) {
      setLastWheelTime(performance.now());
    }
  }, [isTouching]);

  /**
   * wheel/touchmoveイベント登録
   * 注意: wheelは passive: false でないと preventDefault() が使えない
   */
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // 自動トランジション中やイージング中であれば慣性イベントを抑止
      if (isAutoTransition || isEasing) {
        e.preventDefault();
        return;
      }
      setTransitionProgress((prev) =>
        Math.max(-110, Math.min(110, prev + e.deltaY))
      );
      setLastWheelTime(performance.now());
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
      setIsTouching(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isAutoTransition || isEasing) {
        // ページ切り替えアニメ発火中はタッチ操作も防ぐ
        e.preventDefault();
        return;
      }
      const endY = e.changedTouches[0].clientY;
      const diff = endY - touchStartYRef.current;
      setTransitionProgress(Math.max(-110, Math.min(110, -diff)));
      setLastWheelTime(performance.now());
    };

    const handleTouchEnd = () => {
      setIsTouching(false);
    };

    // ▼ ここで passive: false を指定しないと preventDefault() できない
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isAutoTransition, isEasing]);

  /**
   * 言語切り替え時にセグメントを初期化
   */
  useEffect(() => {
    setCurrentSegmentIndex(0);
  }, [languageMode]);

  /**
   * シーン切り替えなどの際に呼ぶ処理
   * → 「一定時間は isAutoTransition = true にして、余計なスクロールイベントを無視」
   */
  const resetTransition = () => {
    setIsAutoTransition(true);
    startEasingToZero({ duration: 400 });
    setTimeout(() => {
      setIsAutoTransition(false);
    }, 500);
  };

  /**
   * イージングで transitionProgress を 0 に戻す
   */
  const startEasingToZero = ({ duration = 200 }: { duration?: number }) => {
    setIsEasing(true);

    const startValue = transitionProgress;
    const endValue = 0;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = startValue + (endValue - startValue) * progress;
      setTransitionProgress(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsEasing(false);
      }
    };

    requestAnimationFrame(animate);
  };

  // (A) ここで Context に渡す「値のオブジェクト」を作る
  const sceneContextValue = {
    transitionProgress,
    currentSegmentIndex,
    setSegmentsLength,
    languageMode,
    // 他にもシーンが直接参照したい値があれば追加
  };

  return (
    <SceneContext.Provider value={sceneContextValue}>
      {/* シーンの切替ロジック: i===sceneIndexだけ描画 */}
      {scenes.map((scene, i) => {
        if (i !== sceneIndex) return null;
        // もう cloneElement はせず、そのままシーンを表示
        // これにより、"Propsがどこから来ているのか"という煩雑さを減らせる
        return <div key={i}>{scene}</div>;
      })}
    </SceneContext.Provider>
  );
};

export const useSceneProps = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error("useSceneProps must be used within a SceneContextProvider");
  }
  return context;
};
